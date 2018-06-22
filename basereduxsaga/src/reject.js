import { createStore, applyMiddleware } from './redux/index'
import createSagaMiddleware from './redux-saga/index'
import { call, put, takeEvery, takeLatest } from './redux-saga/effects'
const rejectDelay = (ms) => new Promise((resolve,reject) => setTimeout(reject, ms))

// rejectDelay(10).catch(function(e){
//     console.log(e)
// })
function* doAsync() {//异步 
    try{
        yield rejectDelay(1000)
    }catch(e){
        console.log('出现异常啦')
    }
}
const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  (state,action)=>{return state},
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(doAsync)
store.dispatch({ type: 'doAsync' });