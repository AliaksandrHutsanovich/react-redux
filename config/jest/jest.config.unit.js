
const config = require('./jest.config');

config.testMatch = ['**/__tests__/**/?(*.)+(spec).js'];
config.setupFilesAfterEnv = ['<rootDir>/config/jest/jest.setup.js'];

console.log('RUNNING UNIT TESTS...'); // eslint-disable-line

module.exports = config;
