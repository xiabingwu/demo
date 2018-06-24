import React, { Component, PureComponent } from 'react';
import { createStore, combineReducers } from './redux/index';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
const shallowequal = require('shallowequal');
const storeShape = PropTypes.shape({//摘自react-redux源码
    subscribe: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    getState: PropTypes.func.isRequired
});
function connect(mapStateToProps) {
    return function (Wrapcomponent) {
        class Com extends Component {
            componentWillMount() {
                const store = this.context.store;//从context获取store
                this.setState(mapStateToProps(store.getState()))
                store.subscribe(() => {
                    var newState = mapStateToProps(store.getState());
                    console.log('newState', newState);
                    this.setState(newState);
                });
            }
            shouldComponentUpdate(nextProps, nextState) {//浅比较
                return !(shallowequal(this.props, nextProps) && shallowequal(this.state, nextState));
            }
            render() {
                const extraProps = {
                    ...this.state,
                    dispatch: store.dispatch
                }
                return <Wrapcomponent {...this.props} {...extraProps} />
            }
        }
        Com.contextTypes = {//这里的PropTypes是必须设置的否则取不到store
            store: storeShape
        };
        return Com
    }
}
class Provider extends Component {
    getChildContext() {
        const { store } = this.props
        return { store: store };
    }
    render() {
        return React.Children.only(this.props.children);
    }
}
Provider.childContextTypes = {//这里的PropTypes是必须设置的否则取不到store
    store: storeShape.isRequired
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
let store = createStore(combineReducers({ counter, message }));

@connect(({ counter }) => {
    return {
        num: counter.num
    }
})
class Counter extends Component {
    add = () => {
        const { dispatch } = this.props
        dispatch({ type: 'INCREMENT' });
    }
    minus = () => {
        const { dispatch } = this.props
        dispatch({ type: 'DECREMENT' });
    }

    render() {
        const { num } = this.props;
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
        console.log('Message render')
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
ReactDOM.render(<Provider store={store}>
    {appTree}
</Provider>, document.getElementById('root'))