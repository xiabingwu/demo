import React, { Component, PureComponent } from 'react';
import { createStore } from './redux/index';
import ReactDOM from 'react-dom';
import { stat } from 'fs';
function counter(state = { num: 0 }, action) {
    switch (action.type) {
        case 'INCREMENT':
            return {
                num: ++state.num
            }
        case 'DECREMENT':
            return {
                num: --state.num
            }
        default:
            return state;
    }
}
let store = createStore(counter);

class App extends Component {
    add = () => {
        store.dispatch({ type: 'INCREMENT' });
    }
    minus = () => {
        store.dispatch({ type: 'DECREMENT' });
    }
    componentWillMount() {
        this.setState(store.getState())
        store.subscribe(() => {
            var newState = store.getState();
            console.log('newState', newState);
            this.setState(newState);
        });
    }

    render() {
        return (<div>
            <p>num:{this.state.num} </p>
            <button onClick={this.add}>+</button>
            <button onClick={this.minus}>-</button>
        </div>)
    }
}
ReactDOM.render(<App />, document.getElementById('root'))