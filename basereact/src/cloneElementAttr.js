
import React, { createElement,cloneElement,PureComponent } from 'react';
import ReactDOM from 'react-dom';
function Button(props){
    return <button {...props} />
}

const App=function(props){
    //const okBtn=props.okBtn;
    const okBtn=cloneElement(props.okBtn,{
        style:{
            color:'red'
        }
    })
    return (<div>
        你是男生吗？{okBtn}
    </div>)
};
ReactDOM.render(<App okBtn={<Button type='primary'>确定</Button>} />, document.getElementById('root'));





//antd大量用了ReactNode
//https://ant.design/components/modal-cn/