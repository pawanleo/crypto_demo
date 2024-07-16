const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });


const env = process.env.NODE_ENV || 'development';
const prefix = env === 'production' ? 'PROD_' : 'DEV_';


const config = {
  port: process.env[`${prefix}PORT`],
  dbString:process.env[`${prefix}DB_CONNECTION_STRING`],
  // Add other configuration properties as needed
};

module.exports = config;