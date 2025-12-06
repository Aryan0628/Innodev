/**
 * Friend and social network builder
 * Creates realistic friend connections using homophily principle
 * (people connect to those similar to themselves)
 */

import DistributionUtils from './distributions.js';

class FriendNetworkBuilder {
  /**
   * Build friend network across division population
   * @param {Object[]} humans - All humans in the division
   * @param {number} avgFriendsPerPerson - Average friend count
   * @returns {Object[]} - Connection objects of type 'friend'
   */
  static buildFriendNetwork(humans, avgFriendsPerPerson = 5) {
    const connections = [];
    const connectionSet = new Set(); // Prevent duplicates

    // For each human, find potential friends based on homophily
    for (const person of humans) {
      const targetFriends = Math.max(
        1,
        Math.round(DistributionUtils.gaussian(avgFriendsPerPerson, 2))
      );

      // Find candidate friends (homophily-based)
      const candidates = this.findFriendCandidates(person, humans, targetFriends * 3);
      
      // Select friends based on similarity score
      const selectedFriends = this.selectBestMatches(person, candidates, targetFriends);

      for (const friend of selectedFriends) {
        const connectionId = [person.humanId, friend.humanId].sort().join('_');
        
        if (!connectionSet.has(connectionId)) {
          const influenceWeight = this.calculateInfluenceWeight(person, friend);
          
          connections.push({
            sourceId: person.humanId,
            targetId: friend.humanId,
            relationType: 'friend',
            influenceWeight,
            bidirectional: true,
          });

          // Add reverse connection
          connections.push({
            sourceId: friend.humanId,
            targetId: person.humanId,
            relationType: 'friend',
            influenceWeight,
            bidirectional: true,
          });

          connectionSet.add(connectionId);
        }
      }
    }

    return connections;
  }

  /**
   * Find candidate friends based on homophily
   * @private
   */
  static findFriendCandidates(person, allHumans, limit = 20) {
    return allHumans
      .filter(h => h.humanId !== person.humanId && 
                   h.householdId !== person.householdId) // No household members
      .map(h => ({
        human: h,
        similarity: this.calculateSimilarity(person, h),
      }))
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, limit)
      .map(x => x.human);
  }

  /**
   * Calculate similarity score between two people (0-1)
   * Based on: age proximity, education, income, caste, religion, urbanization
   * @private
   */
  static calculateSimilarity(person1, person2) {
    let similarityScore = 0;
    let weightSum = 0;

    // Age proximity (strong homophily)
    const ageDiff = Math.abs(person1.demographics.age - person2.demographics.age);
    const ageWeight = 0.25;
    const ageSimilarity = Math.max(0, 1 - (ageDiff / 30)); // Decay over 30 years
    similarityScore += ageSimilarity * ageWeight;
    weightSum += ageWeight;

    // Education level (strong homophily)
    const educationWeight = 0.2;
    const educationSimilarity = person1.socioEconomic.educationLevel === 
                                person2.socioEconomic.educationLevel ? 1 : 0.5;
    similarityScore += educationSimilarity * educationWeight;
    weightSum += educationWeight;

    // Income proximity (moderate homophily)
    const incomeWeight = 0.15;
    const incomeDiff = Math.abs(person1.socioEconomic.incomePerCapita - 
                                person2.socioEconomic.incomePerCapita);
    const maxIncome = 50000;
    const incomeSimilarity = Math.max(0, 1 - (incomeDiff / maxIncome));
    similarityScore += incomeSimilarity * incomeWeight;
    weightSum += incomeWeight;

    // Caste (moderate homophily - important in Indian context)
    const casteWeight = 0.15;
    const casteSimilarity = person1.demographics.caste === person2.demographics.caste ? 1 : 0.3;
    similarityScore += casteSimilarity * casteWeight;
    weightSum += casteWeight;

    // Religion (moderate homophily)
    const religionWeight = 0.1;
    const religionSimilarity = person1.demographics.religion === person2.demographics.religion ? 1 : 0.4;
    similarityScore += religionSimilarity * religionWeight;
    weightSum += religionWeight;

    // Urbanization (mild homophily)
    const urbanWeight = 0.1;
    const urbanSimilarity = person1.demographics.urbanization === person2.demographics.urbanization ? 1 : 0.6;
    similarityScore += urbanSimilarity * urbanWeight;
    weightSum += urbanWeight;

    // Occupation (mild homophily)
    const occupationWeight = 0.05;
    const occupationSimilarity = person1.socioEconomic.occupation === person2.socioEconomic.occupation ? 1 : 0.5;
    similarityScore += occupationSimilarity * occupationWeight;
    weightSum += occupationWeight;

    return weightSum > 0 ? similarityScore / weightSum : 0;
  }

  /**
   * Select best matches from candidates
   * Uses weighted random selection to add some randomness
   * @private
   */
  static selectBestMatches(person, candidates, count) {
    const selected = [];
    const remaining = [...candidates];

    while (selected.length < count && remaining.length > 0) {
      // Weighted random selection (favor high similarity)
      const similarities = remaining.map(c => this.calculateSimilarity(person, c));
      const weights = similarities.map(s => Math.pow(s + 0.1, 2)); // Exponential weight
      const totalWeight = weights.reduce((a, b) => a + b, 0);
      
      const rand = Math.random() * totalWeight;
      let accumulated = 0;
      
      for (let i = 0; i < remaining.length; i++) {
        accumulated += weights[i];
        if (rand < accumulated) {
          selected.push(remaining[i]);
          remaining.splice(i, 1);
          break;
        }
      }
      
      if (selected.length === 0 && remaining.length > 0) {
        // Fallback: just take the first one
        selected.push(remaining[0]);
        remaining.splice(0, 1);
      }
    }

    return selected;
  }

  /**
   * Calculate influence weight based on similarity
   * Higher similarity = higher influence
   * @private
   */
  static calculateInfluenceWeight(person1, person2) {
    const baseSimilarity = this.calculateSimilarity(person1, person2);
    
    // Consider additional factors
    let weight = baseSimilarity * 0.8; // Base contribution (80%)
    
    // Bonus for high institutional trust alignment
    const trustDiff = Math.abs(person1.behavioral.institutionalTrust - 
                               person2.behavioral.institutionalTrust);
    const trustBonus = Math.max(0, (100 - trustDiff) / 100) * 0.2; // Up to 20% bonus
    weight += trustBonus;
    
    // Clamp to [0, 1]
    return Math.min(1, Math.max(0.1, weight)); // Min 0.1 to ensure some influence
  }

  /**
   * Identify community clusters (e.g., neighborhoods)
   * Groups people by shared characteristics
   * @param {Object[]} humans
   * @param {number} numCommunities - Target number of communities
   * @returns {Object[]} - Community assignments
   */
  static identifyCommunities(humans, numCommunities = 10) {
    const communities = [];

    // Use urbanization and caste as primary clustering dimensions
    const clusters = new Map();

    for (const human of humans) {
      const key = `${human.demographics.urbanization}_${human.demographics.caste}`;
      if (!clusters.has(key)) {
        clusters.set(key, []);
      }
      clusters.get(key).push(human);
    }

    let communityId = 0;
    for (const [key, members] of clusters.entries()) {
      communities.push({
        communityId: communityId++,
        characterization: key,
        members: members.map(m => m.humanId),
        size: members.length,
        avgAge: Math.round(members.reduce((a, m) => a + m.demographics.age, 0) / members.length),
        avgIncome: Math.round(members.reduce((a, m) => a + m.socioEconomic.incomePerCapita, 0) / members.length),
      });
    }

    return communities;
  }

  /**
   * Add some random connections (weak ties) for realism
   * Weak ties increase network resilience and information flow
   * @param {Object[]} humans
   * @param {number} weakTiePercentage - % of random connections
   * @returns {Object[]} - Additional friend connections
   */
  static addWeakTies(humans, weakTiePercentage = 5) {
    const connections = [];
    const connectionSet = new Set();
    
    const numWeakTies = Math.ceil((humans.length * weakTiePercentage) / 100);

    for (let i = 0; i < numWeakTies; i++) {
      const person1 = humans[Math.floor(Math.random() * humans.length)];
      const person2 = humans[Math.floor(Math.random() * humans.length)];

      if (person1.humanId === person2.humanId || 
          person1.householdId === person2.householdId) {
        continue;
      }

      const connectionId = [person1.humanId, person2.humanId].sort().join('_');
      
      if (!connectionSet.has(connectionId)) {
        const weakInfluenceWeight = 0.2 + Math.random() * 0.2; // 0.2-0.4

        connections.push({
          sourceId: person1.humanId,
          targetId: person2.humanId,
          relationType: 'friend',
          influenceWeight: weakInfluenceWeight,
          bidirectional: true,
        });

        connections.push({
          sourceId: person2.humanId,
          targetId: person1.humanId,
          relationType: 'friend',
          influenceWeight: weakInfluenceWeight,
          bidirectional: true,
        });

        connectionSet.add(connectionId);
      }
    }

    return connections;
  }
}

export default FriendNetworkBuilder;
