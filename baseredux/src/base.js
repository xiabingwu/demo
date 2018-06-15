import { createStore, combineReducers } from './redux/index';

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
//word reducer
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
//future reducer
function future(state = '', action) {
  switch (action.type) {
    case 'SAY':
      return '说话';
      break;
    case 'SLEEP':
      return '睡觉';
      break;
    default:
      return state;
  }
}
let store = createStore(combineReducers({ counter, word }));

store.subscribe(() =>
  console.info('state发生改变', store.getState())
);

store.dispatch({ type: 'INCREMENT' });

store.dispatch({ type: 'TENCENT' });


store.replaceReducer(future); //dispatch了一次ActionTypes.REPLACE
store.dispatch({ type: 'SLEEP' });

