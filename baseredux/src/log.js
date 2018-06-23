import { createStore, combineReducers,applyMiddleware } from './redux/index';
import thunk from './redux-thunk';
//自定义日志一个中间件
let logMiddleware =  store => next => action => {
    console.log('dispatch:',action.type);
    return next(action);
};
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

let store = createStore(combineReducers({ counter }),applyMiddleware(thunk,logMiddleware));

store.subscribe(() =>
  console.info('state发生改变', store.getState())
);
store.dispatch(function(dispatch){
    //ajax调用 
    //结果返回
    //
    //dispatch({type:'INCREMENT'})
});