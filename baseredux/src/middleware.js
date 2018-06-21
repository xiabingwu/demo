import { compose } from './redux/index';
let store={
    dispatch(action){
        return {name:action.type,data:''}
    }
};
function A(dispatch){
    return function(action){
        console.log('=====执行A开始=====')
        let result = dispatch(action);
        result.data+='A';
        return result;
    }
}
function B(dispatch){
    return function(action){
        console.log('=====执行B开始=====')
        // if(action.type=='endB'){
        //     return {name:'endB',data:''}
        // }
        let result = dispatch(action);
        result.data+='B';
        return result;
    }
}
function C(dispatch){
    return function(action){
        console.log('=====执行C开始=====')
        let result = dispatch(action);
        result.data+='C';
        return result;
    }
}
let newDispatch=compose(A,B,C)//compose(A,compose(B,C))
let result=newDispatch(store.dispatch)({type:'hello'})
console.log(result)
