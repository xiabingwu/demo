import { createStore, applyMiddleware } from './redux/index'
import createSagaMiddleware from './redux-saga/index'
import { call, put, takeEvery, takeLatest } from './redux-saga/effects'
import { resolve } from 'url';
const apiPromise = (flag) => {
    return new Promise((resolve, reject) => {
        resolve({flag})
    }).then(function(resp){
        if(resp.flag=='resolve'){
            return {data:'数据'}
        }else{
            return {error:'出错了'}
        }
    })
}
function* doAsync() {//异步 
    const {data,error}=yield apiPromise('resolve')
    console.log('resovle',data,error)
    const {data:rejectData,error:rejectError}=yield apiPromise('reject')
    console.log('reject',rejectData,rejectError)
}
const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    (state,action)=>{return state},
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(doAsync)
store.dispatch({ type: 'doAsync' });