import React, { createElement,cloneElement,PureComponent } from 'react';
import ReactDOM from 'react-dom';
// function Test(props){
//     return <p {...props} />
// }
class Test extends PureComponent{
    render(){
        return <p />
    }
}
function componentHoc(Wrapcomponent){
    return class extends Wrapcomponent {//继承Wrapcomponent
        render(){
            const {children,...restProps}=this.props;
            const superTree=super.render();
            const newTree = cloneElement(superTree,{
                ...restProps,
                onClick:()=>{
                    alert('你好，腾讯！');
                }
            },children);
            console.log(newTree);
            return newTree;
        }
    }
}
const App=componentHoc(Test);
ReactDOM.render(<App id="app">hello tencent</App>, document.getElementById('root'));