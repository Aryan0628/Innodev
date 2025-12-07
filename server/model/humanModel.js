import mongoose from 'mongoose';
const { Schema } = mongoose;

/* ==========================================
   SUB-SCHEMAS FOR ORGANIZATION
========================================== */

// Connection Schema (graph relationships)
const ConnectionSchema = new Schema(
  {
    targetId: {
      type: Schema.Types.ObjectId,
      ref: 'Human',
      required: true,
    },
    relationType: {
      type: String,
      enum: ['spouse', 'parent', 'child', 'sibling', 'friend'],
      required: true,
    },
    influenceWeight: {
      type: Number,
      min: 0,
      max: 1,
      default: 0.5,
    },
    bidirectional: {
      type: Boolean,
      default: true,
    },
  },
  { _id: false }
);




// Opinion Schema (simulation state)
const OpinionSchema = new Schema(
  {
    current: {
      type: Number,
      min: -1,
      max: 1,
      default: 0,
      description: '-1 (oppose) to +1 (support)',
    },
    confidence: {
      type: Number,
      min: 0,
      max: 1,
      default: 0.5,
    },
    history: [
      {
        round: Number,
        value: Number,
        timestamp: Date,
      },
    ],
    reasoning: String, // LLM-generated reasoning
  },
  { _id: false }
);



/* ==========================================
   MAIN HUMAN SCHEMA
========================================== */


const HumanSchema = new Schema(
  {
    /* ============ IDENTIFIERS ============ */
    humanId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    householdId: {
      type: String,
      required: true,
      index: true,
    },

    state: {
      type: String,
      required: true,
      index: true,
    },

    district: {
      type: String,
      required: true,
      index: true,
    },

    /* ============ 1. DEMOGRAPHICS ============ */
    demographics: {
      age: {
        type: Number,
        required: true,
        min: 18,
        max: 85,
      },
      ageNormalized: {
        type: Number,
        min: 0,
        max: 100,
        default: function () {
          return ((this.demographics.age - 18) / (85 - 18)) * 100;
        },
      },

      householdSize: {
        type: Number,
        required: true,
        min: 1,
        max: 10,
      },

      sex: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true,
      },

      urbanization: {
        type: String,
        enum: ['Urban', 'Semi-Urban', 'Rural'],
        required: true,
      },

      urbanizationEncoded: {
        type: Number,
        enum: [0, 1, 2],
        default: function () {
          const map = { Rural: 0, 'Semi-Urban': 1, Urban: 2 };
          return map[this.demographics.urbanization];
        },
      },

      religion: {
        type: String,
        enum: ['Hindu', 'Muslim', 'Christian', 'Sikh', 'Buddhist', 'Other'],
        required: true,
      },

      caste: {
        type: String,
        enum: ['General', 'OBC', 'SC', 'ST', 'Other'],
        required: true,
      },

      tribalConcentration: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
      },
    },

    /* ============ 2. SOCIO-ECONOMIC ============ */
    socioEconomic: {
      incomePerCapita: {
        type: Number,
        required: true,
        min: 500,
        max: 50000,
      },

      incomeNormalized: {
        type: Number,
        min: 0,
        max: 100,
      },

      povertyStatus: {
        type: Number,
        enum: [0, 1],
        required: true,
      },

      literacy: {
        type: Number,
        enum: [0, 1, 2, 3],
        required: true,
      },

      educationLevel: {
        type: Number,
        enum: [0, 1, 2, 3, 4],
        required: true,
      },

      occupation: {
        type: String,
        enum: [
          'Agriculture',
          'Manufacturing',
          'Services',
          'Informal',
          'Unemployed',
        ],
        required: true,
      },

      employmentType: {
        type: String,
        enum: ['Formal', 'Informal', 'Self-employed', 'Unemployed'],
        required: true,
      },

      wealthQuintile: {
        type: String,
        enum: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5'],
        required: true,
      },
    },

    /* ============ 3. BEHAVIORAL ============ */
    behavioral: {
      casteConsciousness: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
      },

      casteConsciousnessNormalized: {
        type: Number,
        min: 0,
        max: 100,
      },

      riskTolerance: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
      },

      institutionalTrust: {
        type: Number,
        min: 0,
        max: 100,
        required: true,
      },

      changeAdaptability: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
      },
    },

    /* ============ 4. HEALTH ============ */
    health: {
      healthcareAccess: {
        type: Number,
        min: 0,
        max: 100,
        required: true,
      },

      healthLiteracy: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
      },

      nutritionalStatus: {
        bmi: {
          type: Number,
          min: 12,
          max: 40,
        },
        category: {
          type: String,
          enum: ['Underweight', 'Normal', 'Overweight', 'Obese'],
        },
      },

      diseaseRisk: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
      },
    },

    /* ============ 5. ECONOMIC STABILITY ============ */
    economicStability: {
      incomeStability: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
      },

      debtVulnerability: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
      },

      savingsRate: {
        type: Number,
        min: -50,
        max: 50,
        default: 5,
      },
    },

    /* ============ 6. HOUSING ============ */
    housing: {
      housingType: {
        type: String,
        enum: ['Owned', 'Rented', 'Informal Settlement'],
        required: true,
      },

      housingCostBurden: {
        type: Number,
        min: 0,
        max: 100,
        default: 20,
      },
    },

    /* ============ 7. MOBILITY ============ */
    mobility: {
      commuteTime: {
        type: Number,
        min: 0,
        max: 180,
        default: 30,
      },

      transportationMode: {
        type: String,
        enum: ['Walk', 'Bike', 'Bus', 'Train', 'Car', 'Multiple'],
        required: true,
      },

      geographicMobility: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
      },
    },

    /* ============ 9. POLITICAL / CIVIC ============ */
    political: {
      votingBehavior: {
        type: String,
        enum: ['Regular', 'Occasional', 'Non-voter'],
        required: true,
      },

      votingBehaviorEncoded: {
        type: Number,
        enum: [0, 1, 2],
        default: function () {
          const map = { 'Non-voter': 0, Occasional: 1, Regular: 2 };
          return map[this.political.votingBehavior];
        },
      },

      civicParticipation: {
        type: Number,
        min: 0,
        max: 100,
        default: 10,
      },

      mediaConsumption: {
        type: String,
        enum: ['Social Media', 'Traditional', 'Both', 'None'],
        required: true,
      },
    },

    /* ============ 10. DIGITAL ACCESS ============ */
    digital: {
      internetConnectivity: {
        type: String,
        enum: ['None', 'Mobile Only', 'Broadband'],
        required: true,
      },

      internetConnectivityEncoded: {
        type: Number,
        enum: [0, 1, 2],
        default: function () {
          const map = { None: 0, 'Mobile Only': 1, Broadband: 2 };
          return map[this.digital.internetConnectivity];
        },
      },

      digitalLiteracy: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
      },

      digitalServicesAccess: {
        type: Number,
        min: 0,
        max: 100,
        default: 30,
      },
    },

    /* ============ 11. ENVIRONMENTAL ============ */
    environmental: {
      pollutionExposure: {
        type: Number,
        min: 0,
        max: 500,
        default: 50,
      },

      climateVulnerability: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
      },

      greenSpaceAccess: {
        type: Number,
        min: 0,
        max: 100,
        default: 20,
      },
    },

    /* ============ 12. LEGAL ============ */
    legal: {
      citizenshipStatus: {
        type: String,
        enum: ['Citizen', 'Permanent Resident', 'Temporary', 'Undocumented'],
        default: 'Citizen',
      },

      criminalRecord: {
        type: Boolean,
        default: false,
      },
    },

    /* ============ 13. INFORMATION ============ */
    information: {
      policyAwareness: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
      },
    },

    /* ============ GRAPH CONNECTIONS ============ */
    connections: [ConnectionSchema],

    /* ============ SIMULATION STATE ============ */
    opinion: OpinionSchema,

    /* ============ METADATA ============ */
    metadata: {
      createdAt: {
        type: Date,
        default: Date.now,
      },
      simulationId: {
        type: Schema.Types.ObjectId,
        ref: 'Simulation',
      },
      version: {
        type: Number,
        default: 1,
      },
    },
  },
  {
    timestamps: true,
    collection: 'humans',
  }
);

const Human = mongoose.model('Human', HumanSchema);
export default Human;
