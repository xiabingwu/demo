import React from 'react';
import dva, { connect } from './dva';
import createLoading from './dva-loading/src/';
// 1. Initialize
const app = dva({
    // history,
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
  namespace: 'count',
  state: 0,
  reducers: {
    add(count) { return count + 1 },
    minus(count) { return count - 1 },
  },
  effects: {
    *effectsAdd({ payload }, { select, call, put }) {
      let count = yield select(state => {
        return state
      });
      yield put({ type: 'add', payload: count + 1 })
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
      <button key="add" onClick={() => { props.dispatch({ type: 'count/effectsAdd' }) }}>+</button>
      <button key="minus" onClick={() => { props.dispatch({ type: 'count/minus' }) }}>-</button>
    </div>
  );
});

// 4. Router
app.router(() => <App />);

// 5. Start
app.start('#root');