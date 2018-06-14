
import React, { createElement,cloneElement,PureComponent } from 'react';
import ReactDOM from 'react-dom';
function Test(props){
    return <p {...props} />
}

function componentHoc(Wrapcomponent){
    return class extends PureComponent {
        render(){
            let props={...this.props}
            props.onClick=()=>{
                alert('你好，腾讯！');
            }
            return <Wrapcomponent {...props} />
        }
    }
}
const App=componentHoc(Test);
ReactDOM.render(<App>hello tencent</App>, document.getElementById('root'));




































//
// function componentHoc(Wrapcomponent){
//     return class extends PureComponent {
//         render(){
//             const newTree = cloneElement(<Wrapcomponent  />,{
//                 ...this.props,
//                 onClick:()=>{
//                     alert('你好，腾讯！');
//                 }
//             },<span>你好腾讯</span>)
//             console.log(newTree)
//             return newTree
//         }
//     }
// }