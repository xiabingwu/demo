import { createStore, applyMiddleware } from './redux/index'
import createSagaMiddleware from './redux-saga/index'
import { call, put, takeEvery, takeLatest } from './redux-saga/effects'
const delay = (ms) => new Promise(res => setTimeout(res, ms))
function* incrementAsync() {
    yield delay(1000)
    yield put({ type: 'INCREMENT' })
}
function* mySaga() {
    yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}
const sagaMiddleware = createSagaMiddleware()

function reducer(state = 0, action) {
    switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
    }
}

// mount it on the Store
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)
store.subscribe(() =>
  console.log(store.getState())
);
// then run the saga
sagaMiddleware.run(mySaga)

store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'INCREMENT_ASYNC' });