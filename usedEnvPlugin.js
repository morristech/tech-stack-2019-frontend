const Ajv = require('ajv');
const dotenv = require('dotenv');
const DotenvWebpack = require('dotenv-webpack');
const fs = require('fs');
const webpack = require('webpack');

// ENVIRONMENT VALIDATOR
const ENV_KEYS = ['HELLO_ENDPOINT'];
const ajv = new Ajv();
const envReducer = (accumulator, currentValue) => {
  accumulator[currentValue] = { type: 'string' };
  return accumulator;
};
const envProperties = ENV_KEYS.reduce(envReducer, {});
const ENV_SCHEMA = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  properties: envProperties,
  required: ENV_KEYS,
  type: 'object',
};
const validateEnvironment = ajv.compile(ENV_SCHEMA);

// ENVIRONMENT
const ENV_FILE = './.env';
let usedEnvPlugin;
if (fs.existsSync(ENV_FILE)) {
  ENV_KEYS.map(key => delete process.env[key]);
  const envParseResult = dotenv.config();
  if (envParseResult.error) { throw new Error('Invalid Environment File'); }
  usedEnvPlugin = new DotenvWebpack();
} else {
  usedEnvPlugin = new webpack.EnvironmentPlugin(ENV_KEYS);
}
const validEnvironment = validateEnvironment(process.env);
if (!validEnvironment) { throw new Error('Invalid Environment') };
module.exports = usedEnvPlugin;
