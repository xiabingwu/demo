import { createStore, applyMiddleware } from './redux/index'
import createSagaMiddleware from './redux-saga/index'
import { call,take,put, takeEvery, cancel,fork } from './redux-saga/effects'
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
function* decrementAsync() {//异步 
    yield call(resolveDelay,1000)
    yield put({ type: 'DECREMENT' })
}
const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  counter,
  applyMiddleware(sagaMiddleware)
)
store.subscribe(() =>{
  console.log(store.getState())
});

var run=sagaMiddleware.run;
sagaMiddleware.run=function(key,saga){//封装run，让其能关闭任务
    store.dispatch({ type: 'CANCEL_SAGA' })
    run(function*(){
        var task1=yield fork(function*(){
            yield takeEvery(key, saga)
        })
        yield fork(function*(){
            yield take('CANCEL_SAGA')
            cancel(task1)
        })
    })
}

sagaMiddleware.run('INCREMENT_ASYNC',incrementAsync)
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'INCREMENT_ASYNC' });


setTimeout(function(){
    sagaMiddleware.run('DECREMENT_ASYNC',decrementAsync)
    store.dispatch({ type: 'DECREMENT_ASYNC' });

    store.dispatch({ type: 'INCREMENT_ASYNC' });
    store.dispatch({ type: 'INCREMENT_ASYNC' });
    store.dispatch({ type: 'INCREMENT_ASYNC' });
},5000)


// sagaMiddleware.run(function* () {
//   yield takeEvery('INCREMENT_ASYNC', incrementAsync)
// })