import React, { createElement,PureComponent } from 'react';
import ReactDOM from 'react-dom';
class App extends PureComponent{
    render(){
        console.log(Object.getOwnPropertyDescriptor(this.props, 'name'))
        let props={...this.props}
        console.log(Object.getOwnPropertyDescriptor(props, 'name'))
        props.name='tencent';
        return <p>{props.message.word},{props.name}</p>
    }
}
ReactDOM.render(<App name="腾讯" message={{word:'你好'}} />, document.getElementById('root'));

















// const
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/const
// Object.defineProperty
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
// Object.freeze
// Object.freeze() 方法可以冻结一个对象，冻结指的是不能向这个对象添加新的属性，不能修改其已有属性的值，不能删除已有属性，以及不能修改该对象已有属性的可枚举性、可配置性、可写性。也就是说，这个对象永远是不可变的。该方法返回被冻结的对象。
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
// immutable
// https://facebook.github.io/immutable-js/