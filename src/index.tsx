import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import 'whatwg-fetch';
import env from './apis/env';
import App from './components/App';

console.log(env);

render(<App />, document.getElementById('root'));
