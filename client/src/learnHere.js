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

    var headers=[];
    var data = [];
    const display=props.location.data.message[0];
    console.log(display)
    if(display){
        for (let [key, value] of Object.entries(display)) {
            
            headers.push(key)
            data.push(value)
          }
        //   for(let i=0;i<data.length;i++){
              
        //   }
          console.log(headers,data)
          console.timeEnd()
        return(
            <table>
                <thead>
                    <tr>
                {(headers).map((k)=>
                <th key={k} className="lh-header">{k}</th>
                )}
                </tr>
                </thead>
                <tbody>
                    {data.map(k=>
                        {k.map(val=> <tr><td>{val}</td></tr>)}
                        )}
                 
                </tbody>
            </table>
        )
    }
    else
            return(<div>Details will be added soon</div>)
        }
}

export default Learnhere;