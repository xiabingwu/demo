import React from 'react';
import dva, { connect } from './dva';
import createLoading from './dva-loading/src/';
//改编自官网demo
// 1. Initialize
const app = dva({
  // history,//hashhistory 或者 browserhistory
  // initialState,
  // onError,
  // onAction,
  // onStateChange,
  // onReducer,
  // onEffect,
  // onHmr,
  // extraReducers,
  // extraEnhancers,
});

app.use(createLoading({ effects: true }));

// 2. Model
app.model({
  subscriptions: {//model加载后执行
    setup({ dispatch }, done) {
      dispatch({ type: 'add' });
    }
  },
  namespace: 'count',
  state: 0,
  reducers: {
    add(count) { return count + 1 },
    minus(count) { return count - 1 },
  },
  effects: {//https://github.com/dvajs/dva/blob/master/docs/API.md#effects
    *effectsMinus({ payload }, { select, call, put }) {
      let count = yield select(state => {
        return state
      });
      yield put({ type: 'minus' })
    }
  }
});


// 3. View
const App = connect((state) => {
  return {
    count: state.count
  }
})(function (props) {
  return (
    <div>
      <h2>{props.count}</h2>
      <button key="add" onClick={() => { props.dispatch({ type: 'count/add' }) }}>+</button>
      <button key="minus" onClick={() => { props.dispatch({ type: 'count/effectsMinus' }) }}>-</button>
    </div>
  );
});

// 4. Router
app.router(() => <App />);

// 5. Start
app.start('#root');

//dva api
//https://github.com/dvajs/dva/blob/master/docs/API.md