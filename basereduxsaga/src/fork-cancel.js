import { createStore, applyMiddleware } from './redux/index'
import createSagaMiddleware from './redux-saga/index'
import { call, cancel,fork } from './redux-saga/effects'
const resolveDelay = (ms) => new Promise((resolve,reject) => setTimeout(()=>{
    resolve()
}, ms))
function* doResoveDelay(ms){
    yield call(resolveDelay,ms)
    console.log(`执行完毕delay:${ms}`)
}
function* doAsync() {//异步 要明确fork的起点
        var task1=yield fork(doResoveDelay,1000)
        var task2=yield fork(doResoveDelay,3000)
        // yield cancel(task1)//不会影响doAsync和task2
        // yield fork(doResoveDelay,500)
        yield cancel()//task1和task2会被终止
        console.log('doAsync 结束')
}
function* main(){
    yield call(doAsync)
    console.log('完成')
    //yield cancel()//这里取消的是main
    
}
const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  (state,action)=>{return state},
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(main)
store.dispatch({ type: 'doAsync' });