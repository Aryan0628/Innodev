/**
 * Family clustering and household generation
 * Creates realistic family structures with kinship relationships
 */

import DistributionUtils from './distributions.js';
import HumanAttributeMapper from './attributeMapper.js';
import { v4 as uuid } from 'uuid';

class FamilyClusterer {
  /**
   * Generate households for a division
   * @param {number} populationCount - Total humans needed
   * @param {Object} divisionFactors - Factor map from state data
   * @param {string} stateName - State name
   * @param {string} divisionName - Division/district name
   * @returns {Object} - { households: [], humans: [], connections: [] }
   */
  static generateHouseholds(populationCount, divisionFactors, stateName, divisionName) {
    const households = [];
    const humans = [];
    const connections = [];

    // Get average household size from data
    const avgHouseholdSize = DistributionUtils.denormalize(
      divisionFactors['1.2 Household Size'] || 0.5,
      1,
      10
    );

    const numHouseholds = Math.ceil(populationCount / avgHouseholdSize);
    let humansGenerated = 0;

    for (let h = 0; h < numHouseholds && humansGenerated < populationCount; h++) {
      const householdId = `HH_${stateName}_${divisionName}_${h}`;
      const householdSize = Math.max(
        1,
        Math.round(DistributionUtils.gaussian(avgHouseholdSize, avgHouseholdSize * 0.3))
      );

      const householdHumans = this.generateFamily(
        householdId,
        householdSize,
        divisionFactors,
        stateName,
        divisionName,
        humansGenerated
      );

      // Add within-household connections
      const householdConnections = this.createFamilyConnections(householdHumans);

      households.push({
        householdId,
        size: householdHumans.length,
        memberIds: householdHumans.map(h => h.humanId),
        location: { state: stateName, division: divisionName },
        createdAt: new Date(),
      });

      humans.push(...householdHumans);
      connections.push(...householdConnections);
      humansGenerated += householdHumans.length;
    }

    return { households, humans, connections };
  }

  /**
   * Generate a realistic family structure
   * @private
   */
  static generateFamily(householdId, size, divisionFactors, stateName, divisionName, startIdx) {
    const family = [];
    const ageDistribution = DistributionUtils.generateAgeDistribution(
      divisionFactors['1.1 Age Mean'],
      size
    );

    // Sort by age to create realistic family hierarchy
    ageDistribution.sort((a, b) => a - b);

    // Determine household head (oldest person, 60% chance male, 40% female)
    const headAge = ageDistribution[size - 1];
    const headSex = Math.random() > 0.4 ? 'Male' : 'Female';
    
    const headAttrs = HumanAttributeMapper.mapFactorsToAttributes(divisionFactors, {}, divisionName);
    headAttrs.demographics.age = headAge;
    headAttrs.demographics.sex = headSex;

    const headId = `HUM_${stateName}_${divisionName}_${startIdx}`;
    family.push(this.createHumanObject(headId, householdId, stateName, divisionName, headAttrs));

    // Create spouse if household size >= 2 (90% of households have spouse/partner)
    if (size >= 2 && Math.random() < 0.9) {
      const spouseAge = Math.max(18, headAge - 5 + Math.random() * 10);
      const spouseSex = headSex === 'Male' ? 'Female' : 'Male';
      
      const spouseAttrs = HumanAttributeMapper.mapFactorsToAttributes(divisionFactors, {}, divisionName);
      spouseAttrs.demographics.age = Math.round(spouseAge);
      spouseAttrs.demographics.sex = spouseSex;
      
      const spouseId = `HUM_${stateName}_${divisionName}_${startIdx + 1}`;
      family.push(this.createHumanObject(spouseId, householdId, stateName, divisionName, spouseAttrs));
    }

    // Create children
    let childrenNeeded = size - family.length;
    let childIndex = 0;
    
    while (childrenNeeded > 0 && childIndex < 6) { // Max 6 children per family
      // Age gap of 2-4 years between children
      const childAge = Math.max(18, headAge - 40 + (childIndex * (2 + Math.random() * 2)));
      
      if (childAge >= 18 && childAge < 85) { // Valid age range
        const childSex = Math.random() > 0.5 ? 'Male' : 'Female';
        const childAttrs = HumanAttributeMapper.mapFactorsToAttributes(divisionFactors, {}, divisionName);
        childAttrs.demographics.age = Math.round(childAge);
        childAttrs.demographics.sex = childSex;
        
        const childId = `HUM_${stateName}_${divisionName}_${startIdx + family.length}`;
        family.push(this.createHumanObject(childId, householdId, stateName, divisionName, childAttrs));
        childrenNeeded--;
      }
      childIndex++;
    }

    // Add any remaining members (aunts, uncles, grandparents, etc.)
    while (family.length < size) {
      const relativeAge = DistributionUtils.gaussian(headAge - 20, 15);
      const validAge = Math.max(18, Math.min(85, Math.round(relativeAge)));
      
      const relativeSex = Math.random() > 0.5 ? 'Male' : 'Female';
      const relativeAttrs = HumanAttributeMapper.mapFactorsToAttributes(divisionFactors, {}, divisionName);
      relativeAttrs.demographics.age = validAge;
      relativeAttrs.demographics.sex = relativeSex;
      
      const relativeId = `HUM_${stateName}_${divisionName}_${startIdx + family.length}`;
      family.push(this.createHumanObject(relativeId, householdId, stateName, divisionName, relativeAttrs));
    }

  
    return family;
  }


  
  /**
   * Create a single Human object
   * @private
   */
  static createHumanObject(humanId, householdId, stateName, divisionName, attributes) {
    return {
      humanId,
      householdId,
      state: stateName,
      district: divisionName,
      ...attributes,
      connections: [],
      metadata: {
        createdAt: new Date(),
        version: 1,
      },
    };
  }

  /**
   * Create kinship connections within a family
   * @private
   */
  static createFamilyConnections(familyMembers) {
    const connections = [];
    
    if (familyMembers.length < 2) return connections;

    // Sort by age to identify relationships
    const sorted = [...familyMembers].sort((a, b) => a.demographics.age - b.demographics.age);
    
    // Head (oldest) to all others
    const head = sorted[sorted.length - 1];
    
    // Spouse (second oldest, opposite sex) - bidirectional with high weight
    for (let i = sorted.length - 2; i >= 0; i--) {
      if (sorted[i].demographics.sex !== head.demographics.sex && 
          head.demographics.age - sorted[i].demographics.age < 10) {
        connections.push(
          {
            sourceId: head.humanId,
            targetId: sorted[i].humanId,
            relationType: 'spouse',
            influenceWeight: 0.9,
            bidirectional: true,
          },
          {
            sourceId: sorted[i].humanId,
            targetId: head.humanId,
            relationType: 'spouse',
            influenceWeight: 0.9,
            bidirectional: true,
          }
        );
        break;
      }
    }

    // Parent-child relationships (age diff >= 18)
    for (let i = 0; i < sorted.length; i++) {
      for (let j = i + 1; j < sorted.length; j++) {
        const ageDiff = sorted[j].demographics.age - sorted[i].demographics.age;
        if (ageDiff >= 18 && ageDiff <= 60) {
          // Parent-child
          const childWeight = 0.7;
          const parentWeight = 0.6;

          connections.push(
            {
              sourceId: sorted[j].humanId,
              targetId: sorted[i].humanId,
              relationType: 'parent',
              influenceWeight: parentWeight,
              bidirectional: false,
            },
            {
              sourceId: sorted[i].humanId,
              targetId: sorted[j].humanId,
              relationType: 'child',
              influenceWeight: childWeight,
              bidirectional: false,
            }
          );
        }
      }
    }

    // Sibling relationships (similar age, different sex)
    for (let i = 0; i < sorted.length; i++) {
      for (let j = i + 1; j < sorted.length; j++) {
        const ageDiff = Math.abs(sorted[j].demographics.age - sorted[i].demographics.age);
        // Check if already connected (parent-child)
        const alreadyConnected = connections.some(
          c => (c.sourceId === sorted[i].humanId && c.targetId === sorted[j].humanId) ||
               (c.sourceId === sorted[j].humanId && c.targetId === sorted[i].humanId)
        );
        
        if (ageDiff < 18 && ageDiff >= 1 && !alreadyConnected) {
          connections.push(
            {
              sourceId: sorted[i].humanId,
              targetId: sorted[j].humanId,
              relationType: 'sibling',
              influenceWeight: 0.5,
              bidirectional: true,
            },
            {
              sourceId: sorted[j].humanId,
              targetId: sorted[i].humanId,
              relationType: 'sibling',
              influenceWeight: 0.5,
              bidirectional: true,
            }
          );
        }
      }
    }

    return connections;
  }
}

export default FamilyClusterer;
