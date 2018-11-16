import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import 'whatwg-fetch';
import env from './apis/env';
import App from './components/App';

render(<App />, document.getElementById('root'));
