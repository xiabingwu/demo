import React, { createElement,PureComponent } from 'react';
import ReactDOM from 'react-dom';
class App extends PureComponent{
    render(){
        //this.props.message.word='hello';
        console.log(Object.getOwnPropertyDescriptor(this.props, 'name'))
        let props={...this.props}
        console.log(Object.getOwnPropertyDescriptor(props, 'name'))
        props.name='tencent';
        return <h1>{props.message.word} {props.name}</h1>
    }
}
ReactDOM.render(<App name="腾讯" message={{word:'你好'}} />, document.getElementById('root'));
















//immutable
//https://facebook.github.io/immutable-js/
// const
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/const
// Object.defineProperty
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
// Object.freeze
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze