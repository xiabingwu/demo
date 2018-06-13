import React from "react";
import { connect } from "../react-redux/src";
const Topics = (props) => {
    console.log(props)
    return (
        <div>
            <h2>{props.TopicsReducer}</h2>
        </div>
    );
}
export default connect((state)=>{
    return state
})(Topics)