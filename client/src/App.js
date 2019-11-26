import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Link,NavLink,useHistory } from "react-router-dom";
import axios from "axios";
import './App.css';

const helloWorld = 'Welcome to Where to Learn';

const courseSites = [
  "MIT openCourseware","Geeks for Geeks"];
const codingPlatforms = ["Codechef","spoj","hackerearth","hackerrank","leetcode"]
const books = ["Java 8 in action","Head First Design Principles","Head First Java"]
const cppBooks = ["The C++ Programming Language Book by Bjarne Stroustrup"]
const topics={};

const whereTo={};
const serverUrl = "http://localhost:3001/api/";
class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
        error: null,
        selectTopic:"",
        subjects:[],
        isLoaded: false,
        subCategories:[],
      }
      this.handleTopicChange = this.handleTopicChange.bind(this)
      this.subCategoryChange = this.subCategoryChange.bind(this)
      this.fetchSubjects = this.fetchSubjects.bind(this)
      this.fetchSubCategory = this.fetchSubCategory.bind(this)
    }

  componentDidMount(){
    console.log("COmponent mounted");
    this.fetchSubjects();
  }

  // static getDerivedStateFromProps(props,state){
  //   console.log("Component will update",props,state)
  //   return props
  // }

  fetchSubjects(){
    fetch(serverUrl+"list?sc=CS").then(res=>res.json()).then(result=>{
      // Forces batching
      console.log(result)
      ReactDOM.unstable_batchedUpdates(() => {
        this.setState({isLoaded : true});
        this.setState({subjects : result.message })
      });
    },(error) => {
      this.setState({
        isLoaded: true,
        error
      });
    }
      );
  }

  fetchSubCategory(e){
    console.log("fetchSubCategory",e);
    let url=serverUrl+"subcat?sc="+e;
    fetch(decodeURI(url)).then(res=>res.json()).then(result=>{
      console.log(result);
      this.props.history.push({
        pathname:'/learn',
        data:result}
        )
    })
  }

  handleTopicChange(selectedSub){
    if(Object.keys(selectedSub).length === 0 && selectedSub.constructor === Object)
    {
      this.setState({selectTopic:""})
      this.setState({subCategories:[]})      
    }
    else{
      this.setState({selectTopic:selectedSub.subject})
      this.setState({subCategories:selectedSub.sub_category})
    }
    
  }

  subCategoryChange(subCat){
    let history = useHistory();
  
  }
  render(){
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    }
  return (
  
      <div className="App">
        <h2>{helloWorld}</h2>
        <h4>Please select a topic</h4>
        <ul className="App-navmain">
          {this.state.subjects.map(el=> <li key={el.topic_code} onClick={this.fetchSubCategory.bind(this,el.topic_code)} className="App-navlist" value={el.topic_code}>
            {el.display_val}
          </li>)}
        </ul>
          {/* <NavBar onclk={this.fetchSubCategory} list={this.state.subCategories}></NavBar> */}
    
      </div>
  );
  }
}

function NavBar(props){
  return(
    <ul className="App-navmain">
    {props.list.map((itm,i)=>
    <li key={i} onClick={(e)=>props.onclk(itm)} className="App-navlist">{itm}</li>
    )}</ul>
    
  )
}

export default App;


// /client/App.js
// import React, { Component } from "react";
// import axios from "axios";

// class App extends Component {
//   state = {
//     data: [],
//     id: 0,
//     message: null,
//     intervalIsSet: false,
//     idToDelete: null,
//     idToUpdate: null,
//     objectToUpdate: null
//   };

//   componentDidMount() {
//     this.getDataFromDb();
//     if (!this.state.intervalIsSet) {
//       let interval = setInterval(this.getDataFromDb, 1000);
//       this.setState({ intervalIsSet: interval });
//     }
//   }

//   componentWillUnmount() {
//     if (this.state.intervalIsSet) {
//       clearInterval(this.state.intervalIsSet);
//       this.setState({ intervalIsSet: null });
//     }
//   }



//   putDataToDB = message => {
//     let currentIds = this.state.data.map(data => data.id);
//     let idToBeAdded = 0;
//     while (currentIds.includes(idToBeAdded)) {
//       ++idToBeAdded;
//     }

//     axios.post("http://localhost:3001/api/putData", { 
//       id: idToBeAdded,
//       message: message
//     });
//   };

//   deleteFromDB = idTodelete => {
//     let objIdToDelete = null;
//     this.state.data.forEach(dat => {
//       if (dat.id === idTodelete) {
//         objIdToDelete = dat._id;
//       }
//     });

//     axios.delete("http://localhost:3001/api/deleteData", {
//       data: {
//         id: objIdToDelete
//       }
//     });
//   };

//   updateDB = (idToUpdate, updateToApply) => {
//     let objIdToUpdate = null;
//     this.state.data.forEach(dat => {
//       if (dat.id === idToUpdate) {
//         objIdToUpdate = dat._id;
//       }
//     });

//     axios.post("http://localhost:3001/api/updateData", {
//       id: objIdToUpdate,
//       update: { message: updateToApply }
//     });
//   };

//   render() {
//     const { data } = this.state;
//     return (
//       <div>
//         <ul>
//           {data.length <= 0 ? "NO DB ENTRIES YET" : data.map(dat => (
//             <li style={{ padding: "10px" }} key={dat}>
//               <span style={{ color: "gray" }}> id: </span> {dat.id} <br />
//               <span style={{ color: "gray" }}> data: </span>
//               {dat.message}
//             </li>
//           ))}
//         </ul>
//         <div style={{ padding: "10px" }}>
//           <input
//             type="text"
//             onChange={e => this.setState({ message: e.target.value })}
//             placeholder="add something in the database"
//             style={{ width: "200px" }}
//           />
//           <button onClick={() => this.putDataToDB(this.state.message)}>
//             ADD
//           </button>
//         </div>
//         <div style={{ padding: "10px" }}>
//           <input
//             type="text"
//             style={{ width: "200px" }}
//             onChange={e => this.setState({ idToDelete: e.target.value })}
//             placeholder="put id of item to delete here"
//           />
//           <button onClick={() => this.deleteFromDB(this.state.idToDelete)}>
//             DELETE
//           </button>
//         </div>
//         <div style={{ padding: "10px" }}>
//           <input
//             type="text"
//             style={{ width: "200px" }}
//             onChange={e => this.setState({ idToUpdate: e.target.value })}
//             placeholder="id of item to update here"
//           />
//           <input
//             type="text"
//             style={{ width: "200px" }}
//             onChange={e => this.setState({ updateToApply: e.target.value })}
//             placeholder="put new value of the item here"
//           />
//           <button
//             onClick={() =>
//               this.updateDB(this.state.idToUpdate, this.state.updateToApply)
//             }
//           >
//             UPDATE
//           </button>
//         </div>
//       </div>
//     );
//   }
// }

// export default App;