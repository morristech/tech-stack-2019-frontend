export interface Env {
  HELLO_ENDPOINT: string;
}

const { HELLO_ENDPOINT } = process.env;
const env = {
  HELLO_ENDPOINT,
};
// VALIDATED IN WEBPACK
export default env as Env;
