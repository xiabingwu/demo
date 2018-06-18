import React, { cloneElement,PureComponent } from 'react';
import ReactDOM from 'react-dom';
import dynamic from './dva/dynamic';
const app={
    model:{}
}
const App= dynamic({
    app,
    component: () => import('./components/Hello.js'),
});
ReactDOM.render(<App  />, document.getElementById('root'));