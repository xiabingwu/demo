import React, { Component, PureComponent } from 'react';
import { createStore,combineReducers } from './redux/index';
import ReactDOM from 'react-dom';
function connect(mapStateToProps){
    return function(Wrapcomponent){
        return class extends Component {
            componentWillMount() {
                this.setState(mapStateToProps(store.getState()))
                store.subscribe(() => {
                    var newState = mapStateToProps(store.getState());
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
function message(state = '', action) {
    switch (action.type) {
      case 'HELLO':
        return '你好，腾讯！';
      default:
        return state;
    }
  }
let store = createStore(combineReducers({counter,message}));

setTimeout(function(){//假设这里是其他组件发出的dispatch
    console.log('dispatch TENCENT')
    store.dispatch({type:'TENCENT'})//
},1000);


@connect(({counter})=>{
    return {
        num:counter.num
    }
})
class Counter extends PureComponent {
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
        console.log('Counter render')
        return (<div>
            <p>num:{num} </p>
            <button onClick={this.add}>+</button>
            <button onClick={this.minus}>-</button>
        </div>)
    }
}
@connect(({message})=>{
    return {
        message:message
    }
})
class Message extends Component{
    hello=()=>{
        const {dispatch}=this.props
        dispatch({ type: 'HELLO' });
    }
    render(){
        //console.log('Message render')
        return (<div>
            {this.props.message}
            <button onClick={this.hello}>click me</button>
        </div>)
        
    }
}
const appTree = (
    <div>
        <Counter />
        <Message />
    </div>
)
ReactDOM.render(appTree, document.getElementById('root'))