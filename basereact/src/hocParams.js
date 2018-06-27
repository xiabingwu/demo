import React, { createElement,cloneElement,PureComponent } from 'react';
import ReactDOM from 'react-dom';

class Tencent extends PureComponent{
    render(){
        const {message}=this.props;
        return <p>{message} tencent</p>
    }
}

function componentHoc(message,Wrapcomponent){
    return class extends PureComponent {
        render(){
            const newProps={message};
            return <Wrapcomponent {...this.props} {...newProps} />
        }
    }
}
const T=componentHoc('hello',Tencent);

ReactDOM.render(<div>
    <T />
</div>, document.getElementById('root'));










//curry
//https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/ch4.html#%E4%B8%8D%E5%8F%AF%E6%88%96%E7%BC%BA%E7%9A%84-curry


// function componentHoc(message){
//     return function(Wrapcomponent){
//         return class extends PureComponent {
//             render(){
//                 const newProps={message};
//                 return <Wrapcomponent {...this.props} {...newProps} />
//             }
//         }
//     }
// }
// const T=componentHoc('hello')(Tencent);