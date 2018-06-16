import React, { createElement,cloneElement,PureComponent } from 'react';
import ReactDOM from 'react-dom';

class Test extends PureComponent{
    render(){
        return <p {...this.props} />
    }
}

function componentHoc(name,Wrapcomponent){
    return class extends PureComponent {
        render(){
            let props={...this.props}
            props.onClick=()=>{
                alert(`你好，${name}！`);
            }
            //props.children=<span>你好,腾讯！</span>
            return <Wrapcomponent {...props} />
        }
    }
}
const App=componentHoc('腾讯',Test);

ReactDOM.render(<App id="app">hello tencent</App>, document.getElementById('root'));


//缺陷：
//
//不能更好的抽象
//不能使用修饰符语法糖


// function componentHoc(name){
//     return function(Wrapcomponent){
//         return class extends PureComponent {
//             render(){
//                 let props={...this.props}
//                 props.onClick=()=>{
//                     alert(`你好，${name}！`);
//                 }
//                 //props.children=<span>你好,腾讯！</span>
//                 return <Wrapcomponent {...props} />
//             }
//         }
//     }

// }
// const App=componentHoc('腾讯')(Test);