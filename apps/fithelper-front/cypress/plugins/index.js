const dotenv = require('dotenv');

dotenv.config({ path: '../../../.env' }); // Adjust the path according to your directory structure

module.exports = (on, config) => {
  // copy environment variables from process.env to Cypress.env
  config.env = { ...config.env, ...process.env };
  return config;
};
