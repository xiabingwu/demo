import React, { createElement,PureComponent } from 'react';
import ReactDOM from 'react-dom';
function Test(props){
    return <div onClick={props.onClick}>{props.name}{props.id}</div>
}
function componentHoc(Wrapcomponent){
    return class extends PureComponent {
        render(){
            console.log(Object.getOwnPropertyDescriptor(this.props, 'id'))
            let props={...this.props}
            console.log(Object.getOwnPropertyDescriptor(props, 'id'))
            props.onClick=()=>{
                alert('test');
            }
            props.id=3;
            return <Wrapcomponent {...props} />
        }
    }
}

//四个概念
//React element
//tag name string
//React component
//React fragment
// Create and return a new React element of the given type. 
// The type argument can be either a tag name string (such as 'div' or 'span'), 
// a React component type (a class or a function), or a React fragment type.
const Div=<div></div>
const App=componentHoc(Test);
ReactDOM.render(<App name="小明" id="1" />, document.getElementById('root'));
//ReactDOM.render(<div>测试</div>, document.getElementById('root'));