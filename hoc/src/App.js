import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import hot from './hoc';
//支持 修饰符https://medium.com/@rodcisal/ejecting-and-adding-decorator-support-to-your-create-react-app-a4a7d80e4077
@hot('error')
class App extends Component {
  static defaultProps = {
    a: 1,
    b: 2
  }
  componentWillMount() {
    console.log('App componentWillMount');
  }
  componentDidMount() {
    console.log('App componentDidMount');
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
