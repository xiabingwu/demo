import React, { cloneElement,PureComponent } from 'react';
import ReactDOM from 'react-dom';
import dynamic from '../dva/dynamic';
import DynamicComponent from './DynamicComponent'
import customDynamic from './customDynamic'
//=================
// const app={
//     model:()=>{}
// }
// const App= dynamic({
//     app,
//     component: () => import('./Lazylndex'),
// });
// ReactDOM.render(<App  />, document.getElementById('root'));
//=================

//ReactDOM.render(<DynamicComponent lazy={import('./Lazylndex')}  />, document.getElementById('root'));


//=================
const App=customDynamic(import('./Lazylndex'));
ReactDOM.render(<App  />, document.getElementById('root'));