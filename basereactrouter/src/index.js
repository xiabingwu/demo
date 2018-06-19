import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
//import Home from './components/Home'
import About from './components/About'
import Topics from './components/Topics'
import HomeReducer from './reducers/Home'
import AboutReducer from './reducers/About'
import TopicsReducer from './reducers/Topics'
import { Provider } from './react-redux/src';
import {combineReducers, createStore} from "redux";
import dynamic from './components/dynamic';
const store=createStore(combineReducers({
  HomeReducer,
  AboutReducer,
  TopicsReducer
}));
const BasicExample = () => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/topics">Topics</Link>
        </li>
      </ul>
      <hr />
      <Route exact path="/" component={dynamic(import('./components/Home'))} />
      <Route path="/about" component={About} />
      <Route path="/topics" component={Topics} />
    </div>
  </Router>
);

const App=()=>{
  return (<Provider store={store}>
    <BasicExample />
  </Provider>)
}


ReactDOM.render(<App />, document.getElementById('root'));
