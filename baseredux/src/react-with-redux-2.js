import React, { Component } from 'react';
import { createStore,combineReducers } from './redux/index';
import ReactDOM from 'react-dom';
function connect(Wrapcomponent){
    return class extends Component {
        componentWillMount() {
            this.setState(store.getState())
            store.subscribe(() => {
                var newState = store.getState();
                this.setState(newState);
            });
        }

        render(){
            const extraProps={
                ...this.state,
                dispatch:store.dispatch
            };
            return <Wrapcomponent {...this.props} {...extraProps} />
        }
    }
}
function counter(state = { num: 0 }, action) {
    switch (action.type) {
        case 'INCREMENT':
            return {
                num: ++state.num
            };
        case 'DECREMENT':
            return {
                num: --state.num
            };
        default:
            return state;
    }
}
let store = createStore(combineReducers({counter}));


@connect
class Counter extends Component {
    add = () => {
        const {dispatch}=this.props;
        dispatch({ type: 'INCREMENT' });
    }
    minus = () => {
        const {dispatch}=this.props;
        dispatch({ type: 'DECREMENT' });
    }

    render() {
        const {counter}=this.props;
        console.log('Counter render');
        return (<div>
            <p>num:{counter.num} </p>
            <button onClick={this.add}>+</button>
            <button onClick={this.minus}>-</button>
        </div>);
    }
}
const appTree = (
    <div>
        <Counter />
    </div>
)
ReactDOM.render(appTree, document.getElementById('root'));