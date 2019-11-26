import React from 'react';

export const learnhere=(props)=>{
    // const {subCat}=this.state;
    console.log(props.location.data.message[0])
    const display=props.location.data.message[0]
    return(
        <div>{Object.keys(display).map((k)=>
            <div>{k}</div>
        )} </div>
    )
}

export default learnhere;