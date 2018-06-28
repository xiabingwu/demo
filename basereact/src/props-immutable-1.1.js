import React, { createElement,PureComponent } from 'react';
import ReactDOM from 'react-dom';
class App extends PureComponent{
    render(){
        //this.props.name='tencent';
        //this.props.message.word='hello';
        return <p>{this.props.message.word},{this.props.name}</p>
    }
}
ReactDOM.render(<App message={{word:'你好'}} name="腾讯"  />, document.getElementById('root'));