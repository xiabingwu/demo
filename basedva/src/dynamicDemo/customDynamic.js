import React  from 'react';
import DynamicComponent from './DynamicComponent'
export default (lazyComponentPromise)=>{
    return ()=>{
        return <DynamicComponent lazy={lazyComponentPromise} />
    }
}