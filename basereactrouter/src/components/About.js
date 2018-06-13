import React from "react";
import { connect } from "../react-redux/src";
const About = (props) => {
    console.log(props)
    return (
        <div>
            <h2>{props.AboutReducer}</h2>
        </div>
    );
}
export default connect((state)=>{
    return state
})(About)