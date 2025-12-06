/**
 * Human attribute mapper
 * Converts normalized state data values to actual Human schema attributes
 */

import DistributionUtils from './distributions.js';

class HumanAttributeMapper {
  /**
   * Map normalized factor values to human attributes
   * @param {Object} factorMap - Map of factor names to normalized values
   * @param {Object} stateData - State-level demographic data
   * @param {string} division - District/division name
   * @returns {Object} - Complete human attribute object
   */
  static mapFactorsToAttributes(factorMap, stateData, division) {
    const attrs = {};

    // ============ DEMOGRAPHICS ============
    attrs.demographics = {
      age: Math.round(DistributionUtils.denormalize(
        factorMap['1.1 Age Mean'] || 0.5,
        18,
        85
      )),
      
      householdSize: Math.round(DistributionUtils.denormalize(
        factorMap['1.2 Household Size'] || 0.5,
        1,
        10
      )),
      
      sex: Math.random() > (factorMap['1.3 Sex Ratio'] || 0.5) ? 'Female' : 'Male',
      
      urbanization: this.mapUrbanization(factorMap['1.4 Urbanization Category'] || 0.5),
      
      religion: this.mapReligion(factorMap['1.5 Religion Hindu %'] || 0.5),
      
      caste: this.mapCaste(factorMap['1.6 Caste SC %'] || 0.5, factorMap['1.7 Tribal Concentration %'] || 0.01),
      
      tribalConcentration: Math.round((factorMap['1.7 Tribal Concentration %'] || 0) * 100),
    };

    // ============ SOCIO-ECONOMIC ============
    attrs.socioEconomic = {
      incomePerCapita: Math.round(DistributionUtils.denormalize(
        factorMap['2.7 Wealth Quintile Q1 %'] || 0.5,
        500,
        50000
      )),
      
      povertyStatus: Math.random() < (factorMap['2.2 Poverty Below Line %'] || 0.3) ? 1 : 0,
      
      literacy: this.mapLiteracy(factorMap['2.3 Literacy Rate %'] || 0.7),
      
      educationLevel: this.mapEducationLevel(factorMap['2.4 Education Level Secondary %'] || 0.5),
      
      occupation: this.mapOccupation(factorMap['2.5 Occupation Agriculture %'] || 0.5),
      
      employmentType: this.mapEmploymentType(factorMap['2.6 Employment Formal %'] || 0.2),
      
      wealthQuintile: this.mapWealthQuintile(factorMap['2.7 Wealth Quintile Q1 %'] || 0.2),
    };

    // ============ BEHAVIORAL ============
    attrs.behavioral = {
      casteConsciousness: Math.ceil(DistributionUtils.denormalize(
        factorMap['3.1 Caste Consciousness Scale'] || 0.5,
        1,
        5
      )),
      
      riskTolerance: Math.ceil(DistributionUtils.denormalize(
        factorMap['3.2 Risk Tolerance Scale'] || 0.5,
        1,
        5
      )),
      
      institutionalTrust: Math.round(DistributionUtils.denormalize(
        factorMap['3.3 Institutional Trust 0to100'] || 0.5,
        0,
        100
      )),
      
      changeAdaptability: Math.ceil(DistributionUtils.denormalize(
        factorMap['3.4 Change Adaptability Scale'] || 0.5,
        1,
        5
      )),
      
      optimism: Math.round(DistributionUtils.denormalize(
        Math.random(),
        0,
        100
      )),
    };

    // ============ HEALTH ============
    attrs.health = {
      healthcareAccess: Math.round(DistributionUtils.denormalize(
        factorMap['4.1 Healthcare Access Scale'] || 0.5,
        0,
        100
      )),
      
      healthLiteracy: Math.ceil(DistributionUtils.denormalize(
        factorMap['4.2 Health Literacy Scale'] || 0.5,
        1,
        5
      )),
      
      nutritionalStatus: this.mapNutritionalStatus(factorMap['4.3 Nutritional Status Stunting %'] || 0.3),
      
      diseaseRisk: Math.round(DistributionUtils.denormalize(
        factorMap['4.4 Disease Risk 0to100'] || 0.5,
        0,
        100
      )),
    };

    // ============ ECONOMIC STABILITY ============
    attrs.economicStability = {
      incomeStability: Math.ceil(DistributionUtils.denormalize(
        factorMap['5.1 Income Stability Scale'] || 0.5,
        1,
        5
      )),
      
      debtVulnerability: Math.round(DistributionUtils.denormalize(
        factorMap['5.2 Debt Vulnerability %'] || 0.3,
        0,
        100
      )),
      
      savingsRate: Math.round(DistributionUtils.denormalize(
        factorMap['5.3 Savings Rate %'] || 0.1,
        -50,
        50
      )),
    };

    // ============ HOUSING ============
    attrs.housing = {
      housingType: this.mapHousingType(factorMap['6.1 Housing Type Pucca %'] || 0.5),
      
      housingCostBurden: Math.round(DistributionUtils.denormalize(
        factorMap['6.2 Housing Cost Burden %'] || 0.3,
        0,
        100
      )),
    };

    // ============ MOBILITY ============
    attrs.mobility = {
      commuteTime: Math.round(DistributionUtils.denormalize(
        factorMap['7.1 Commute Time Minutes'] || 0.3,
        0,
        180
      )),
      
      transportationMode: this.mapTransportation(factorMap['7.2 Transportation Mode'] || 0.5),
      
      geographicMobility: Math.ceil(DistributionUtils.denormalize(
        factorMap['7.3 Geographic Mobility Scale'] || 0.5,
        1,
        5
      )),
    };

    // ============ POLITICAL / CIVIC ============
    attrs.political = {
      votingBehavior: this.mapVotingBehavior(factorMap['9.1 Voting Behavior'] || 0.7),
      
      civicParticipation: Math.round(DistributionUtils.denormalize(
        factorMap['9.2 Civic Participation Hours Year'] || 0.1,
        0,
        100
      )),
      
      mediaConsumption: this.mapMediaConsumption(factorMap['9.3 Media Consumption'] || 0.5),
    };

    // ============ DIGITAL ACCESS ============
    attrs.digital = {
      internetConnectivity: this.mapInternetConnectivity(factorMap['10.1 Internet Connectivity'] || 0.5),
      
      digitalLiteracy: Math.ceil(DistributionUtils.denormalize(
        factorMap['10.2 Digital Literacy Scale'] || 0.5,
        1,
        5
      )),
      
      digitalServicesAccess: Math.round(DistributionUtils.denormalize(
        factorMap['10.3 Digital Services Access 0to100'] || 0.3,
        0,
        100
      )),
    };

    // ============ ENVIRONMENTAL ============
    attrs.environmental = {
      pollutionExposure: Math.round(DistributionUtils.denormalize(
        factorMap['11.1 Pollution Exposure AQI'] || 0.3,
        0,
        500
      )),
      
      climateVulnerability: Math.ceil(DistributionUtils.denormalize(
        factorMap['11.2 Climate Vulnerability Scale'] || 0.5,
        1,
        5
      )),
      
      greenSpaceAccess: Math.round(DistributionUtils.denormalize(
        factorMap['11.3 Green Space Access %'] || 0.2,
        0,
        100
      )),
    };

    // ============ LEGAL ============
    attrs.legal = {
      citizenshipStatus: (factorMap['12.1 Citizenship Status'] || 1.0) > 0.9 ? 'Citizen' : 'Permanent Resident',
      
      criminalRecord: Math.random() < (factorMap['12.2 Criminal Record Yes %'] || 0.02),
    };

    // ============ INFORMATION ============
    attrs.information = {
      policyAwareness: Math.ceil(DistributionUtils.denormalize(
        factorMap['13.1 Policy Awareness Scale'] || 0.3,
        1,
        5
      )),
    };

    // ============ INITIAL OPINION (for simulation) ============
    attrs.opinion = {
      current: (Math.random() - 0.5) * 2, // Random from -1 to 1
      confidence: Math.random() * 0.5 + 0.25, // 0.25 to 0.75
      history: [],
      reasoning: '',
    };

    return attrs;
  }

  /**
   * Helper: Map urbanization factor to category
   */
  static mapUrbanization(normalized) {
    if (normalized < 0.25) return 'Rural';
    if (normalized < 0.75) return 'Semi-Urban';
    return 'Urban';
  }

  /**
   * Helper: Map religion factor
   */
  static mapReligion(hinduPercent) {
    const rand = Math.random();
    if (rand < hinduPercent) return 'Hindu';
    if (rand < hinduPercent + 0.15) return 'Muslim';
    if (rand < hinduPercent + 0.25) return 'Christian';
    if (rand < hinduPercent + 0.32) return 'Sikh';
    if (rand < hinduPercent + 0.35) return 'Buddhist';
    return 'Other';
  }

  /**
   * Helper: Map caste factor
   */
  static mapCaste(scPercent, tribalPercent) {
    const rand = Math.random();
    if (rand < scPercent) return 'SC';
    if (rand < scPercent + tribalPercent * 5) return 'ST';
    if (rand < scPercent + tribalPercent * 5 + 0.25) return 'OBC';
    return 'General';
  }

  /**
   * Helper: Map literacy factor
   */
  static mapLiteracy(litPercent) {
    if (litPercent < 0.5) return 0; // Illiterate
    if (litPercent < 0.75) return 1; // Basic
    if (litPercent < 0.9) return 2; // Intermediate
    return 3; // Advanced
  }

  /**
   * Helper: Map education level
   */
  static mapEducationLevel(secondaryPercent) {
    const rand = Math.random();
    if (rand < 0.2) return 0; // No formal education
    if (rand < 0.4) return 1; // Primary
    if (rand < (0.4 + secondaryPercent)) return 2; // Secondary
    if (rand < (0.6 + secondaryPercent)) return 3; // Higher secondary
    return 4; // Tertiary
  }

  /**
   * Helper: Map occupation
   */
  static mapOccupation(agriculturePercent) {
    const rand = Math.random();
    if (rand < agriculturePercent) return 'Agriculture';
    if (rand < agriculturePercent + 0.15) return 'Manufacturing';
    if (rand < agriculturePercent + 0.4) return 'Services';
    if (rand < agriculturePercent + 0.6) return 'Informal';
    return 'Unemployed';
  }

  /**
   * Helper: Map employment type
   */
  static mapEmploymentType(formalPercent) {
    const rand = Math.random();
    if (rand < formalPercent) return 'Formal';
    if (rand < formalPercent + 0.2) return 'Self-employed';
    if (rand < formalPercent + 0.5) return 'Informal';
    return 'Unemployed';
  }

  /**
   * Helper: Map wealth quintile
   */
  static mapWealthQuintile(q1Percent) {
    const rand = Math.random();
    if (rand < q1Percent) return 'Q1';
    if (rand < q1Percent + 0.2) return 'Q2';
    if (rand < q1Percent + 0.4) return 'Q3';
    if (rand < q1Percent + 0.6) return 'Q4';
    return 'Q5';
  }

  /**
   * Helper: Map nutritional status
   */
  static mapNutritionalStatus(stuntingPercent) {
    const bmi = DistributionUtils.gaussian(22, 3); // Mean 22, stdev 3
    let category;
    if (bmi < 18.5) category = 'Underweight';
    else if (bmi < 25) category = 'Normal';
    else if (bmi < 30) category = 'Overweight';
    else category = 'Obese';
    
    return { bmi: Math.round(bmi * 10) / 10, category };
  }

  /**
   * Helper: Map housing type
   */
  static mapHousingType(puccaPercent) {
    const rand = Math.random();
    if (rand < puccaPercent) return 'Owned';
    if (rand < puccaPercent + 0.3) return 'Rented';
    return 'Informal Settlement';
  }

  /**
   * Helper: Map transportation mode
   */
  static mapTransportation(transPercent) {
    const rand = Math.random();
    if (rand < 0.3) return 'Walk';
    if (rand < 0.5) return 'Bike';
    if (rand < 0.7) return 'Bus';
    if (rand < 0.85) return 'Train';
    if (rand < 0.95) return 'Car';
    return 'Multiple';
  }

  /**
   * Helper: Map voting behavior
   */
  static mapVotingBehavior(votingFactor) {
    if (votingFactor > 0.7) return 'Regular';
    if (votingFactor > 0.4) return 'Occasional';
    return 'Non-voter';
  }

  /**
   * Helper: Map media consumption
   */
  static mapMediaConsumption(mediaFactor) {
    if (mediaFactor > 0.7) return 'Both';
    if (mediaFactor > 0.4) return 'Traditional';
    if (mediaFactor > 0.1) return 'Social Media';
    return 'None';
  }

  /**
   * Helper: Map internet connectivity
   */
  static mapInternetConnectivity(internetFactor) {
    if (internetFactor > 0.7) return 'Broadband';
    if (internetFactor > 0.3) return 'Mobile Only';
    return 'None';
  }
}

export default HumanAttributeMapper;
