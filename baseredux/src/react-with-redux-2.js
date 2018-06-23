import React, { Component, PureComponent } from 'react';
import { createStore } from './redux/index';
import ReactDOM from 'react-dom';
function connect(Wrapcomponent){
    return class extends Component {
        componentWillMount() {
            this.setState(store.getState())
            store.subscribe(() => {
                var newState = store.getState();
                console.log('newState', newState);
                this.setState(newState);
            });
        }

        render(){
            const extraProps={
                ...this.state,
                dispatch:store.dispatch
            }
            return <Wrapcomponent {...this.props} {...extraProps} />
        }
    }
}
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


@connect
class Counter extends Component {
    add = () => {
        const {dispatch}=this.props
        dispatch({ type: 'INCREMENT' });
    }
    minus = () => {
        const {dispatch}=this.props
        dispatch({ type: 'DECREMENT' });
    }

    render() {
        const {num}=this.props;
        return (<div>
            <p>num:{num} </p>
            <button onClick={this.add}>+</button>
            <button onClick={this.minus}>-</button>
        </div>)
    }
}
const appTree = (
    <div>
        <Counter />
    </div>
)
ReactDOM.render(appTree, document.getElementById('root'))