import { createStore, applyMiddleware } from './redux/index'
import createSagaMiddleware from './redux-saga/index'
import { call, put, takeEvery, takeLatest } from './redux-saga/effects'
const resolveDelay = (ms) => new Promise((resolve,reject) => setTimeout(resolve, ms))

function counter(state = 0, action) {//同步 
  console.log('type',action.type)
  switch (action.type) {
  case 'INCREMENT':
    return state + 1;
  case 'DECREMENT':
    return state - 1;
  default:
    return state;
  }
}
function* incrementAsync() {//异步 
    yield call(resolveDelay,1000)
    yield put({ type: 'INCREMENT' })
}

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  counter,
  applyMiddleware(sagaMiddleware)
)
store.subscribe(() =>{
  console.log(store.getState())
});

// sagaMiddleware.run(function* () {
//   yield takeEvery('INCREMENT_ASYNC', incrementAsync)
// })
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'INCREMENT_ASYNC' });//不会被saga捕获到
store.dispatch({ type: 'INCREMENT_ASYNC' });//不会被saga捕获到
store.dispatch({ type: 'INCREMENT_ASYNC' });//不会被saga捕获到



// sagaMiddleware.run(function* () {
//   yield takeEvery('INCREMENT_ASYNC', incrementAsync)
// })