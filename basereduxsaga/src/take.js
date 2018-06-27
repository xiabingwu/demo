import { createStore, applyMiddleware } from './redux/index'
import createSagaMiddleware,{delay} from './redux-saga/index'
import { call,put, take ,fork} from './redux-saga/effects'
function* listenA(){
    while(true){
      const action = yield take('REQUEST');
      console.log('listenA',action);
    }
  }
  function* listenB() {
    while (true) {
      const action = yield take('REQUEST');
      //yield delay(500)
      console.log('listenB', action);
    }
  }
function* rootSaga() {
      yield fork(listenA);
      yield fork(listenB);
      yield put({ type:'REQUEST',num:'1'});
      yield put({ type:'REQUEST',num:'2'});
  }
const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  (state,action)=>{return state},
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(rootSaga)