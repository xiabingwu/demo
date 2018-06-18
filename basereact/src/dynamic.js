import React, { Component } from 'react';
import ReactDOM from 'react-dom';
class DynamicComponent extends Component {
    constructor(props){
        super(props);
        this.state={
            mod:()=>{return null}
        }
    }
    load=()=>{
        const {lazy}=this.props
        console.log(lazy)
        lazy.then((mod)=>{
            this.setState({
                mod:mod.default || mod
            })
        })
    }
    componentWillMount(){
        this.load()
    }
    componentDidMount(){

    }
    render(){
        return <this.state.mod />
    }
}
ReactDOM.render(<DynamicComponent lazy={import('./components/Hello.js')}  />, document.getElementById('root'));














// const lazy=(lazyComponentPromise)=>{
//     return ()=>{
//         return <DynamicComponent lazy={lazyComponentPromise} />
//     }
// }
// const App=lazy(import('./components/Hello.js'));
// ReactDOM.render(<App  />, document.getElementById('root'));