import { createStore, applyMiddleware } from './redux/index'
import createSagaMiddleware from './redux-saga/index'
import { call, put, takeEvery, takeLatest,fork } from './redux-saga/effects'
const resolveDelay = (ms) => new Promise((resolve,reject) => setTimeout(()=>{
    console.log(`执行完毕delay:${ms}`)
    resolve()
}, ms))
function* doAsync() {//异步 
        yield fork(resolveDelay,1000)
        yield fork(resolveDelay,3000)
}
function* main(){
    yield call(doAsync)
    console.log('完成')//两个fork task执行完后才执行
}
const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  (state,action)=>{return state},
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(main)
store.dispatch({ type: 'doAsync' });



//fork
//https://redux-saga.js.org/docs/advanced/ForkModel.html