import React, { Component, PureComponent } from 'react';
import { createStore, combineReducers } from './redux/index';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
const storeShape = PropTypes.shape({//摘自react-redux源码
    subscribe: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    getState: PropTypes.func.isRequired
  })
const shallowequal = require('shallowequal');
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
let store = createStore(combineReducers({ counter, word }));

setTimeout(function () {//假设这里是其他组件发出的dispatch
    console.log('dispatch TENCENT')
    store.dispatch({ type: 'TENCENT' })//
}, 1000);

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
        Com.contextTypes = {
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
Provider.childContextTypes = {
    store: storeShape.isRequired
}

@connect(({ counter }) => {
    return {
        num: counter.num
    }
})
class App extends Component {
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
        console.log('App render')
        return (<div>
            <p>num:{num} </p>
            <button onClick={this.add}>+</button>
            <button onClick={this.minus}>-</button>
        </div>)
    }
}


ReactDOM.render(<Provider store={store}>
    <App />
</Provider>, document.getElementById('root'))