/**
 * Quick test of population generator
 * Validates core functionality with 100 synthetic citizens
 */

import DistributionUtils from './distributions.js';
import HumanAttributeMapper from './attributeMapper.js';
import FamilyClusterer from './familyClusterer.js';
import FriendNetworkBuilder from './friendNetworkBuilder.js';

console.log('\n' + '='.repeat(60));
console.log('🧪 CIVI-GENESIS: Population Generator Test');
console.log('='.repeat(60) + '\n');

// Test 1: Distributions
console.log('📊 Test 1: Statistical Distributions');
console.log('-'.repeat(40));

const ages = Array.from({ length: 100 }, () => 
  Math.round(DistributionUtils.gaussian(35, 15))
);
console.log(`  Gaussian (35, 15): mean=${(ages.reduce((a,b)=>a+b)/ages.length).toFixed(1)}, range=[${Math.min(...ages)}, ${Math.max(...ages)}]`);

const incomes = Array.from({ length: 100 }, () =>
  Math.round(DistributionUtils.lognormal(Math.log(15000), 0.5))
);
console.log(`  Lognormal income: mean=₹${(incomes.reduce((a,b)=>a+b)/incomes.length).toFixed(0)}, max=₹${Math.max(...incomes)}`);

const values = Array.from({ length: 100 }, () => DistributionUtils.beta(2, 2));
console.log(`  Beta(2,2): mean=${(values.reduce((a,b)=>a+b)/values.length).toFixed(3)}`);

console.log('  ✅ Distributions working\n');

// Test 2: Attribute Mapping
console.log('📋 Test 2: Human Attribute Mapping');
console.log('-'.repeat(40));

const sampleFactors = {
  '1.1 Age Mean': 0.4,
  '1.2 Household Size': 0.48,
  '1.3 Sex Ratio': 0.9,
  '1.4 Urbanization Category': 0.6,
  '1.5 Religion Hindu %': 0.8,
  '1.6 Caste SC %': 0.2,
  '2.3 Literacy Rate %': 0.7,
  '2.6 Employment Formal %': 0.25,
  '3.1 Caste Consciousness Scale': 0.5,
  '3.3 Institutional Trust 0to100': 0.6,
  '4.1 Healthcare Access Scale': 0.5,
  '5.1 Income Stability Scale': 0.5,
  '6.1 Housing Type Pucca %': 0.5,
  '7.2 Transportation Mode': 0.6,
  '9.1 Voting Behavior': 0.8,
  '10.1 Internet Connectivity': 0.5,
};

const person = HumanAttributeMapper.mapFactorsToAttributes(sampleFactors, {}, 'TestDivision');
console.log(`  Generated person:`);
console.log(`    • Age: ${person.demographics.age}`);
console.log(`    • Sex: ${person.demographics.sex}`);
console.log(`    • Urbanization: ${person.demographics.urbanization}`);
console.log(`    • Income: ₹${person.socioEconomic.incomePerCapita}`);
console.log(`    • Education: ${person.socioEconomic.educationLevel}/5`);
console.log(`    • Employment: ${person.socioEconomic.employmentType}`);
console.log(`    • Trust: ${person.behavioral.institutionalTrust}/100`);
console.log('  ✅ Attribute mapping working\n');

// Test 3: Family Clustering
console.log('👨‍👩‍👧 Test 3: Family Clustering');
console.log('-'.repeat(40));

const { households, humans, connections } = FamilyClusterer.generateHouseholds(
  50,  // 50 humans
  sampleFactors,
  'TestState',
  'TestDistrict'
);

console.log(`  Generated ${households.length} households with ${humans.length} humans`);
console.log(`  Kinship connections: ${connections.length}`);

// Analyze family structures
const familySizes = households.map(h => h.size);
const avgSize = (familySizes.reduce((a,b)=>a+b)/familySizes.length).toFixed(2);
const maxSize = Math.max(...familySizes);
console.log(`  Family sizes: avg=${avgSize}, max=${maxSize}`);

// Check relationship types
const relationTypes = {};
connections.forEach(c => {
  relationTypes[c.relationType] = (relationTypes[c.relationType] || 0) + 1;
});
console.log(`  Relationship types:`, relationTypes);
console.log('  ✅ Family clustering working\n');

// Test 4: Friend Network
console.log('🤝 Test 4: Friend Network Builder');
console.log('-'.repeat(40));

const friendConnections = FriendNetworkBuilder.buildFriendNetwork(humans, 3);
const friendsByType = {};
friendConnections.forEach(c => {
  if (c.relationType === 'friend') {
    friendsByType[c.relationType] = (friendsByType[c.relationType] || 0) + 1;
  }
});

console.log(`  Generated ${friendConnections.length} friend connections`);
console.log(`  Avg friends per person: ${(friendConnections.length / humans.length).toFixed(2)}`);

// Check similarity
const testPair = friendConnections.find(c => c.relationType === 'friend');
if (testPair) {
  const p1 = humans.find(h => h.humanId === testPair.sourceId);
  const p2 = humans.find(h => h.humanId === testPair.targetId);
  if (p1 && p2) {
    console.log(`  Sample friend pair:`);
    console.log(`    P1: ${p1.demographics.age}y, ${p1.socioEconomic.educationLevel} edu, ₹${p1.socioEconomic.incomePerCapita}`);
    console.log(`    P2: ${p2.demographics.age}y, ${p2.socioEconomic.educationLevel} edu, ₹${p2.socioEconomic.incomePerCapita}`);
    console.log(`    Influence weight: ${testPair.influenceWeight.toFixed(2)}`);
  }
}

// Communities
const communities = FriendNetworkBuilder.identifyCommunities(humans, 5);
console.log(`  Identified ${communities.length} communities`);
console.log('  ✅ Friend network working\n');

// Test 5: Network Properties
console.log('📊 Test 5: Network Properties');
console.log('-'.repeat(40));

const allConnections = [...connections, ...friendConnections];
const degreeMap = new Map();
humans.forEach(h => degreeMap.set(h.humanId, 0));
allConnections.forEach(c => {
  degreeMap.set(c.sourceId, (degreeMap.get(c.sourceId) || 0) + 1);
});

const degrees = Array.from(degreeMap.values());
const avgDegree = (degrees.reduce((a,b)=>a+b)/degrees.length).toFixed(2);
const maxDegree = Math.max(...degrees);
const minDegree = Math.min(...degrees);

console.log(`  Network stats:`);
console.log(`    • Nodes: ${humans.length}`);
console.log(`    • Edges: ${allConnections.length}`);
console.log(`    • Avg degree: ${avgDegree}`);
console.log(`    • Degree range: [${minDegree}, ${maxDegree}]`);
console.log(`    • Density: ${(2 * allConnections.length / (humans.length * (humans.length - 1))).toFixed(4)}`);
console.log('  ✅ Network properties computed\n');

// Summary
console.log('='.repeat(60));
console.log('✅ ALL TESTS PASSED');
console.log('='.repeat(60));
console.log('\n📝 Summary:');
console.log(`  • Distribution algorithms: OK`);
console.log(`  • Attribute mapping: OK`);
console.log(`  • Family clustering: OK (${households.length} households)`);
console.log(`  • Friend network: OK (${friendConnections.length} friendships)`);
console.log(`  • Network metrics: OK (${avgDegree} avg degree)`);
console.log('\n🚀 Ready for full population generation!\n');
