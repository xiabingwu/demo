import { createStore, applyMiddleware } from './redux/index'
import createSagaMiddleware from './redux-saga/index'
import { call, put, takeEvery, takeLatest,fork } from './redux-saga/effects'
import { resolve } from 'url';
const rejectDelay = (ms) => new Promise((resolve,reject) => setTimeout(()=>{
    reject()
}, ms))
function* doRejectDelay(ms){
    yield call(rejectDelay,ms)
    console.log(`执行完毕delay:${ms}`)//异常导致任务都被终止
}
function* doAsync() {//异步 
    try{
        yield fork(rejectDelay,1000)
        yield fork(rejectDelay,3000)
    }catch(e){
        console.log('doAsync捕获到异常')
    }
}
function* main(){
    try{
        yield call(doAsync)
        console.log('完成')
    }catch(e){//主任务捕获异常
        console.log('main捕获到了异常')
    }
}
const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  (state,action)=>{return state},
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(main)
store.dispatch({ type: 'doAsync' });