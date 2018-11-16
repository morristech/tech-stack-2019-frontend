export interface Env {
  helloEndpoint: string;
}

const env = {
  helloEndpoint: process.env.HELLO_ENDPOINT,
};
// VALIDATED IN WEBPACK
export default env as Env;
