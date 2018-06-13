import React, { Component } from 'react';
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
export default (lazyComponentPromise)=>{
    return ()=>{
        return <DynamicComponent lazy={lazyComponentPromise} />
    }
}