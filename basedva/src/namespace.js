import React from 'react';
import dva, { connect } from './dva';
import createLoading from './dva-loading/src/';
//自定义日志一个中间件
let logMiddleware = store => next => action => {
    console.log('dispatch:', action.type);
    return next(action);
};
const resovleDelay = (ms) => new Promise((resolve, reject) => setTimeout(()=>{resolve({word:'hello tencent'})}, ms))
//初始化
const app = dva({
    onAction: logMiddleware
});
//model
app.model({
    namespace: 'company',
    state: {
        word:''
    },
    reducers: {
        save(state, { payload }) { return { ...state, ...payload };}
    },
    effects: {
        *getData({ payload }, { select, call, put }) {
            const data=yield call(resovleDelay,10)
            yield put({ type: 'save', payload: data })
        }
    }
});
//View
const App = connect((state) => {
    return {
        company: state.company
    }
})(function (props) {
    return (
        <div>
            <h2>{props.company.word}</h2>
            <button  onClick={() => { props.dispatch({ type: 'company/getData' }) }}>获取数据</button>
        </div>
    );
});
//加载路由
app.router(() => <App />);
//项目开始
app.start('#root');