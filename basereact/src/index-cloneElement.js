// React.cloneElement(
//     element,
//     [props],
//     [...children]
//   )
// Clone and return a new React element using element as the starting point. 
// The resulting element will have the original element’s props with the new props merged in shallowly. 
// New children will replace existing children. key and ref from the original element will be preserved.
import React, { cloneElement,PureComponent } from 'react';
import ReactDOM from 'react-dom';
function Test(){
    return '';
    //return null;
}
class App extends PureComponent{
    render(){
        let tree=<Test />
        console.log(tree)
        return cloneElement(tree)
    }
}
ReactDOM.render(<App  />, document.getElementById('root'));