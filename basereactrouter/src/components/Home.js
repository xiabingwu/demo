import React from "react";
import { connect } from "../react-redux/src";
const Home = (props) => {
    console.log(props)
    return (
        <div>
            <h2>{props.HomeReducer}</h2>
        </div>
    );
}
export default connect((state)=>{
    return state
})(Home)