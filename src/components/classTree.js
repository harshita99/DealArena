import React, { Component, 
  // useState, useRef 
} from "react";
// import firebase from "./Config";
import SortableTree, {
  // addNodeUnderParent,
  // removeNodeAtPath,
  // changeNodeAtPath
  //toggleExpandedForAll
} from "react-sortable-tree";
import "react-sortable-tree/style.css";
// import { Tooltip } from 'antd';
// import SomeButtons from "./somebuttons";
// import Tree from "./tree";
// import history from './../history';

// const tree1 = [];
var d = [];
  const t = JSON.parse(localStorage.getItem('treeValue'));
  if(t!=null){
    d = t[0];
    console.log(d["treeData"]);
  }

class Treee1 extends Component {
  // componentDidMount(){
	// 	this.checkAuth();
	// 	firebase.auth().onAuthStateChanged((productowner)=> {
	// 		if (productowner) {
	// 			firebase.firestore().collection("productOwnerDetails").doc(productowner.uid)
	// 			  .get()
	// 			  .then((doc)=>{
	// 				// console.log(sessionStorage.getItem('brandN'));
	// 				this.ref=firebase.firestore().collection("tree")
	// 				this.unsubscribe=this.ref.onSnapshot(this.onCollectionUpdate1);
	// 				// console.log(this.ref.onSnapshot);
	// 			  })
	// 			  .catch(function(error){
	// 				console.log("Error getting particular document:", error);
	// 			  })
	// 		}
	// 	})
	// 	history.push("/showproduct");
  // }
  
  // onCollectionUpdate1=(querySnapshot)=>{
	// 	// const tree1=[];
	// 	querySnapshot.forEach((doc)=>{
	// 		// console.log(doc.id);
	// 		const {treeData}=doc.data();
	// 		if(doc.id === sessionStorage.getItem('brandN')){
	// 			tree1.push({
	// 				treeData
	// 			});
	// 		}
	// 	});
	// 	this.setState({tree1});
  //   console.log(tree1);
  //   console.log(tree1[0]);
  //   d = tree1[0];
  //   // console.log(tree1[0]["treeData"]);
  //   // d = tree1[0]["treeData"];
  //   console.log(d);
  // }
  
  // checkAuth(){
	// 	var produser = firebase.auth().currentUser;
	// 	if(localStorage.getItem('usersession')){

	// 	}
	// 	else if(produser){
	// 		localStorage.setItem('usersession', produser);
	// 		console.log("User "+produser.uid+" is logged in with");
	// 		history.push("/productownerhome");
	// 	}
	// 	else{
	// 		console.log("Successfully logged out");
	// 		history.push("/");
	// 	}
  // }

  constructor(props) {
    super(props);
    console.log(d);
    this.state = {
      // treeData: d,
      // treeData: [],
      treeData: d["treeData"],
      
      // treeData: [
      //   { title: sessionStorage.getItem('category'), children: [{ title: sessionStorage.getItem('brandN') }] },
      //   // { title: 'Fish', children: [{ title: 'fingerline' }] },
      // ]
    };
    console.log(this.state.treeData);
  }
 
  render() {
    // console.log(typeof this.state.treeData);
    return (
      // <div>
      //   <Tree
      //     treeData={this.state.treeData}
      //     onChange={treeData => this.setState({ treeData })}
      //   />
      // </div>
      <div style={{ height: 400 }}>
        <SortableTree
          treeData={this.state.treeData}
          onChange={treeData => this.setState({ treeData })}
        />
      </div>
    );
  }
}
export default Treee1;