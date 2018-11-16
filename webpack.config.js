const Ajv = require('ajv');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const dotenv = require('dotenv');
const DotenvWebpack = require('dotenv-webpack');
const fs = require('fs');
const path = require('path');
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
let UsedEnvPlugin;
if (fs.existsSync(ENV_FILE)) {
  ENV_KEYS.map(key => delete process.env[key]);
  const envParseResult = dotenv.config();
  if (envParseResult.error) { throw new Error('Invalid Environment File'); }
  UsedEnvPlugin = new DotenvWebpack();
} else {
  UsedEnvPlugin = new webpack.EnvironmentPlugin(ENV_KEYS);
}
const validEnvironment = validateEnvironment(process.env);
if (!validEnvironment) { throw new Error('Invalid Environment') };

module.exports = (env) => ({
  mode: env.NODE_ENV === 'production' ? 'production': 'development',
  entry: './src/index.tsx',
  devtool: env.NODE_ENV === 'production' ? 'source-map' : 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CopyWebpackPlugin([
      'public/index.html',
    ]),
    UsedEnvPlugin,
  ],
});
