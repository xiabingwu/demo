import React from 'react';
import dva, { connect } from './dva';
// 1. Initialize
const app = dva({
    onError:(err, dispatch) => {//参看dva-core/src/getSaga.js sagaWithCatch(...args)函数
        console.log(err)
    }
});
const rejectDelay = (ms) => new Promise((resolve, reject) => setTimeout(()=>{reject({})}, ms))//reject得返回一个对象，不然dva对于error构建会失败，导致异常抛到外层
// 2. Model
app.model({
    namespace: 'reject',
    state: 0,
    effects: {
        *doAsync({ payload }, { call, put, select }) {//异步 
            //try {
                yield call(rejectDelay,10)
            //} catch (e) {
            //    console.log('出现异常啦')
            //}
            //throw {_dontReject:true};
        }
    }
});


// 3. View
const App = connect()(function (props) {
    return (
        <button onClick={() => { props.dispatch({ type: 'reject/doAsync' }) }}>执行reject</button>
    );
});

// 4. Router
app.router(() => <App />);

// 5. Start
app.start('#root');