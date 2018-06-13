import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
class App extends PureComponent {
    state = {
        nums: [1, 2, 3]
    }
    add=()=>{
        let nums=this.state.nums;
        nums.push(nums.length+1);
        this.setState({
            nums:nums
        })
    }
    render() {
        return (
            <div>
                <button onClick={this.add}>+</button>
                {
                    this.state.nums.map((item,index) => {
                        return <div key={index}>{item}</div>
                    })
                }
            </div>
        )
    }
}
ReactDOM.render(<App />, document.getElementById('root'));