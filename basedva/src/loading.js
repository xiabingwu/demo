import React from 'react';
import dva, { connect } from './dva';
import createLoading from './dva-loading/src/';
const resovleDelay = (ms) => new Promise((resolve, reject) => setTimeout(()=>{resolve({word:'hello tencent'})}, ms))
// 1. Initialize
const app = dva({

});
app.use(createLoading({ effects: true }));
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
            const data=yield call(resovleDelay,3000)
            yield put({ type: 'save', payload: data })
        }
    }
});
//View
const App = connect(({loading,company}) => ({loading,company}))(function (props) {
    const {loading,company}=props;
    console.log(loading)
    return (
        <div>
            {/* <h2>{loading.global?'正在加载数据...':company.word}</h2> */}
            <h2>{loading.models.company?'正在加载数据...':company.word}</h2>
            <button  onClick={() => { props.dispatch({ type: 'company/getData' }) }}>获取数据</button>
        </div>
    );
});
//加载路由
app.router(() => <App />);
//项目开始
app.start('#root');