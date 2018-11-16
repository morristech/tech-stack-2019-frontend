import Ajv from 'ajv';
import env from './env';
export interface Hello {
  hello: string;
}
const ENDPOINT = env.helloEndpoint;
const SCHEMA = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  description: 'Hello API',
  properties: {
    hello: {
      description: 'Hello',
      type: 'string',
    },
  },
  required: ['hello'],
  title: 'Hello API',
  type: 'object',
};

const ajv = new Ajv();
const validate = ajv.compile(SCHEMA);
export const fetchHello = async () => {
  const response = await fetch(ENDPOINT);
  const jsonObj = await response.json();
  const valid = validate(jsonObj);
  if (!valid) { throw new Error('500'); }
  return jsonObj as Hello;
};
