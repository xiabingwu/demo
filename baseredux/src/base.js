import { createStore, combineReducers, applyMiddleware, compose } from './redux/index';
//counter reducer
function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}
//message reducer
function message(state = '', action) {
  switch (action.type) {
    case 'HELLO':
      return '你好，腾讯！';
    default:
      return state;
  }
}
//自定义日志一个中间件
let logMiddleware = store => next => action => {
  console.log('dispatch:', action.type);
  return next(action);
};
//扩张store
let storeEnhancer = function (createStore) {
  return function (...args) {
    let store = createStore(...args);
    store.say = function () {
      return 'hello tencent';
    }
    return store
  }
}
let store = createStore(combineReducers({ counter, message }), compose(applyMiddleware(logMiddleware), storeEnhancer));

console.log('say:',store.say())
store.subscribe(() => {
  console.info('state发生改变', store.getState())
});

store.dispatch({ type: 'INCREMENT' });

store.dispatch({ type: 'HELLO' });








//react-router-redux
//https://github.com/reactjs/react-router-redux
//redux-form官网demo
//https://codesandbox.io/s/mZRjw05yp
//extrareducers
//https://github.com/dvajs/dva/blob/master/docs/API.md#extrareducers


//dva如果懒加载redux-form