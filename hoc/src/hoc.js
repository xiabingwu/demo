import React, { Component } from 'react';
// export default (WrapComponent)=>{
//     return class extends Component{
//         componentWillMount(){
//             console.log('hot componentWillMount');
//         }
//         componentDidMount(){
//             console.log('hot componentDidMount');
//         }
//         render(){
//             console.log('打印组件props',this.props);
//             return <WrapComponent {...this.props} />
//         }
//     }
// }
















export default (type)=>{
    return (WrapComponent)=>{
        return class extends Component{
            componentWillMount(){
                console.log('hot componentWillMount');
            }
            componentDidMount(){
                console.log('hot componentDidMount');
            }
            render(){
                console[type]('打印组件props',this.props);
                return <WrapComponent {...this.props} />
            }
        }
    }
}