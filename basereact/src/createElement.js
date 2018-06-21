import React, { createElement,PureComponent } from 'react';
import ReactDOM from 'react-dom';
//一个html标签
//const App='h1';
//一个函数
// const App=function(props){
//     return <h1 {...props}></h1>
// }
//一个React.Fragment
//一个class
class App extends PureComponent {
    render(){
        return <h1 {...this.props}></h1>
    }
}

ReactDOM.render(<App>hello tencent</App>, document.getElementById('root'));

// React.createElement
// https://reactjs.org/docs/react-api.html#createelement
// React.cloneElement
// https://reactjs.org/docs/react-api.html#cloneelement
