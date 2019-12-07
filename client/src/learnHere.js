import React from 'react';
import { useHistory } from "react-router-dom";

export const Learnhere=(props)=>{
    console.time();
    // const {subCat}=this.state;
    let history = useHistory();

        if(!props.location.data){
            history.push('/')
            return(<div></div>)
    }
    
  else{

    var allList = [];
    // const headerVal;
    console.log(props.location)
    var headerVal=props.location.state.toUpperCase();
    const display=props.location.data.message[0];
    console.log(display)
    if(display){
          console.timeEnd()
          for(let key in display){
            allList.push(<List place={key} list={display[key]}></List>)
          }
            console.log(allList)
          
        return(
            <div>
                <h2 className="lh-header">{headerVal}</h2>
                <span className="lh-card-layout"> {allList} </span>
           </div>
        )
    }
    else
            return(<div>Details will be added soon</div>)
        }
}

const List =({place,list})=>
<div className="lh-container">
    <div className="lh-cat-header">{place}</div>
    {list.map((val,i)=>
        <div className="lh-val" key={i} >{val}</div>
        )}
</div>

export default Learnhere;