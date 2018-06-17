import { createStore, applyMiddleware } from './redux/index'
import createSagaMiddleware from './redux-saga/index'
import { call, put, takeEvery, takeLatest,fork } from './redux-saga/effects'
import { resolve } from 'url';
const rejectDelay = (ms) => new Promise((resolve,reject) => setTimeout(()=>{
    console.log(`执行完毕delay:${ms}`)
    reject()
}, ms))
function* doAsync() {//异步 
    try{
        yield fork(rejectDelay,1000)
        yield fork(rejectDelay,2000)//任务会被取消
    }catch(e){
        console.log('doAsync捕获到异常')
    }
}
function* main(){
    try{
        yield call(doAsync)
    }catch(e){
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