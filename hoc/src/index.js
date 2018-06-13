import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App a={1} b={2} />, document.getElementById('root'));
registerServiceWorker();
