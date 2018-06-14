import React, { createElement,PureComponent } from 'react';
import ReactDOM from 'react-dom';
class App extends PureComponent{
    render(){
        console.log(Object.getOwnPropertyDescriptor(this.props, 'name'))
        let props={...this.props}
        console.log(Object.getOwnPropertyDescriptor(props, 'name'))
        props.name='tencent';
        return <h1>{props.name}</h1>
    }
}
ReactDOM.render(<App name="腾讯" />, document.getElementById('root'));