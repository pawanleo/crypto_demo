const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CryptoDataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  code:{
    type: String,
    required: true
  },
  symbol: {
    type: String,
    
  },
  rank: {
    type: Number,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  color: {
    type: String,
    required: true,
    match: /^#[0-9A-Fa-f]{6}$/
  },
  png32: {
    type: String,
    required: true
  },
  png64: {
    type: String,
    required: true
  },
  webp32: {
    type: String,
    required: true
  },
  webp64: {
    type: String,
    required: true
  },
  exchanges: {
    type: Number,
    required: true
  },
  markets: {
    type: Number,
    required: true
  },
  pairs: {
    type: Number,
    required: true
  },
  allTimeHighUSD: {
    type: Number,
    required: true
  },
  circulatingSupply: {
    type: Number,
    required: true
  },
  totalSupply: {
    type: Number,
    default: null
  },
  maxSupply: {
    type: Number,
    default: null
  },
  categories: {
    type: [String],
    required: true
  },
  rate: {
    type: Number,
    required: true
  },
  volume: {
    type: Number,
    required: true
  },
  cap: {
    type: Number,
    required: true
  },
  delta: {
    hour: {
      type: Number,
      required: true
    },
    day: {
      type: Number,
      required: true
    },
    week: {
      type: Number,
      required: true
    },
    month: {
      type: Number,
      required: true
    },
    quarter: {
      type: Number,
      required: true
    },
    year: {
      type: Number,
      required: true
    }
  }
}, {
  timestamps: true
});
// Create a model based on the schema
const Crypto = mongoose.model('Crypto', CryptoDataSchema);

module.exports = Crypto;
