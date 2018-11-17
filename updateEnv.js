const Ajv = require('ajv');
const dotenv = require('dotenv');
const fs = require('fs');

const ENV_FILE = './.env';

const ajv = new Ajv();
module.exports = (envKeys) => {
  const envSchema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    required: envKeys,
    type: 'object',
  };
  const envValidate = ajv.compile(envSchema);
  if (fs.existsSync(ENV_FILE)) {
    envKeys.map(key => delete process.env[key]);
    dotenv.config();
  }
  const envValid = envValidate(process.env);
  return envValid;
};
