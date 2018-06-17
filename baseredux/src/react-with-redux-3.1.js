import React, { Component, PureComponent } from 'react';
import { createStore,combineReducers } from './redux/index';
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
function word(state = '', action) {
    switch (action.type) {
      case 'HELLO':
        return '你好';
        break;
      case 'TENCENT':
        return '腾讯';
        break;
      default:
        return state;
    }
  }
let store = createStore(combineReducers({counter,word}));

setTimeout(function(){//假设这里是其他组件发出的dispatch
    store.dispatch({type:'TENCENT'})//
},1000);

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
@connect
class App extends Component {
    add = () => {
        const {dispatch}=this.props
        dispatch({ type: 'INCREMENT' });
    }
    minus = () => {
        const {dispatch}=this.props
        dispatch({ type: 'DECREMENT' });
    }

    render() {
        const {counter}=this.props;
        console.log('App render')
        return (<div>
            <p>num:{counter.num} </p>
            <button onClick={this.add}>+</button>
            <button onClick={this.minus}>-</button>
        </div>)
    }
}
ReactDOM.render(<App />, document.getElementById('root'))