import { createStore, combineReducers, applyMiddleware, compose } from './redux/index';
//future reducer
function future(state = '', action) {
    switch (action.type) {
        case 'SAY':
            return '说话';
            break;
        case 'SLEEP':
            return '睡觉';
            break;
        default:
            return state;
    }
}
let store = createStore((state, action) => { return state; });

store.subscribe(() => {
    console.info('state发生改变', store.getState())
}
);
setTimeout(function () {
    store.replaceReducer(future);//dispatch了一次ActionTypes.REPLACE
    store.dispatch({ type: 'SAY' });
}, 3000);







//react-router-redux
//https://github.com/reactjs/react-router-redux
//redux-form官网demo
//https://codesandbox.io/s/mZRjw05yp


//dva如果分页面如何使用redux-form