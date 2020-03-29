import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import CSSReset from '@tds/core-css-reset';

ReactDOM.render(<Fragment><CSSReset /><App /></Fragment>, document.getElementById('root'));
