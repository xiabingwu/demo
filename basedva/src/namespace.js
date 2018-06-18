import React from 'react';
import dva, { connect } from './dva';
import createLoading from './dva-loading/src/';
//自定义日志一个中间件
let logMiddleware = store => next => action => {
    console.log('dispatch:', action.type);
    return next(action);
};
//初始化
const app = dva({
    // onStateChange(state) {
    //     console.log(state)
    // },
    onAction: logMiddleware
});
//加载插件
app.use(createLoading({ effects: true }));
//model
app.model({
    namespace: 'count',
    state: 0,
    reducers: {
        add(count) { return count + 1 },
        minus(count) { return count - 1 },
    },
    effects: {
        *effectsAdd({ payload }, { select, call, put }) {//会被takeEvery封装
            let count = yield select(state => {
                return state
            });
            yield put({ type: 'add', payload: count + 1 })
        }
    }
});
//View
const App = connect((state) => {
    return {
        count: state.count
    }
})(function (props) {
    return (
        <div>
            <h2>{props.count}</h2>
            <button key="add" onClick={() => { props.dispatch({ type: 'count/effectsAdd' }) }}>+</button>
            <button key="minus" onClick={() => { props.dispatch({ type: 'count/minus' }) }}>-</button>
        </div>
    );
});
//加载路由
app.router(() => <App />);
//项目开始
app.start('#root');