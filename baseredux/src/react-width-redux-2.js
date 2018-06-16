import React, { Component, PureComponent } from 'react';
import { createStore } from './redux/index';
import ReactDOM from 'react-dom';
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

function connect(Wrapcomponent){
    return class extends PureComponent {
        componentWillMount() {
            this.setState(store.getState())
        }
        componentDidMount() {
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
@connect
class App extends PureComponent {
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
ReactDOM.render(<App />, document.getElementById('root'))