import React, { Component, //useState
  // useState, useRef 
} from "react";
// import firebase from "./Config";
import SomeButtons from "./somebuttons";
import firebase from "./Config";


import SortableTree, {
  addNodeUnderParent,
  removeNodeAtPath,
  changeNodeAtPath
  //toggleExpandedForAll
} from "react-sortable-tree";
import { Tooltip } from 'antd';

import "react-sortable-tree/style.css";
// import { Tooltip } from 'antd';
// import SomeButtons from "./somebuttons";
// import Tree from "./tree";
// import history from './../history';

// const tree1 = [];
// const seed = [];
// const inputEl = useRef();


const getNodeKey = ({ treeIndex }) => treeIndex;
const setTreeData=[];
const treeData=[]
const [searchString]=[]
const [searchFocusIndex]=[]
// const [searchString] = useState("");
// const [searchFocusIndex] = useState(0);
// const [treeData, setTreeData] = useState(seed);
var d = [];
  const t = JSON.parse(localStorage.getItem('treeValue'));
  if(t!=null){
    d = t[0];
    console.log(d["treeData"]);
  }
const inputEl = React.createRef();

  
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

  inputEl = React.createRef();



  updateTreeData(treeData) {
    setTreeData(treeData);
    console.log(treeData);

  }

  createNode() {
    // console.log(("Brand in tree is: "+ sessionStorage.getItem('brandN')));
    // console.log(("Category in tree is: "+ sessionStorage.getItem('category')));

    const value = sessionStorage.getItem('category');
    if (value === "") {
      // inputEl.current.focus();
      return;
    }

    let newTree = addNodeUnderParent({
      treeData: treeData,
      parentKey: null,
      expandParent: true,
      getNodeKey,
      newNode: {
        id: "123",
        title: value
      }
    })

    setTreeData(newTree);
    console.log(treeData);
  }

  
  removeNode(rowInfo){
    const { path } = rowInfo;
    setTreeData(
      removeNodeAtPath({
        treeData,
        path,
        getNodeKey
      })
    );
    }
  
  updateNode(rowInfo) {
    const { node, path } = rowInfo;
    const { children } = node;

    const value = inputEl.current.value;

    if (value === "") {
      inputEl.current.focus();
      return;
    }

    let newTree = changeNodeAtPath({
      treeData,
      path,
      getNodeKey,
      newNode: {
        children,
        title: value
      }
    });

    setTreeData(newTree);
    console.log(treeData);

    inputEl.current.value = "";
  }

  addNodeChild(rowInfo){

    let { path } = rowInfo;

    const value = inputEl.current.value;

    if (value === "") {
      inputEl.current.focus();
      return;
    }

    let newTree = addNodeUnderParent({
      treeData: treeData,
      parentKey: path[path.length - 1],
      expandParent: true,
      getNodeKey,
      newNode: {
        title: value
      }
    });

    setTreeData(newTree.treeData);
    console.log(treeData);

    inputEl.current.value = "";
  }

  saveyo(){
    console.log(treeData);
    // console.log(typeof treeData);
    // firebase.firestore().collection("tree").add(treeData);
    firebase.firestore().collection("tree").doc(sessionStorage.getItem('brandN')).set({ treeData: treeData });
  }



 
  render() {
    console.log(inputEl);
    return (
      // <div>
      //   <Tree
      //     treeData={this.state.treeData}
      //     onChange={treeData => this.setState({ treeData })}
      //   />
      // </div>
    <div>
      <div style={{ flex: "0 0 auto", padding: "0 15px" }}>
      <br />
      <input placeholder="Enter text here" ref={inputEl} type="text" />
      <br />
      
      <form
        style={{ display: "inline-block" }}
        onSubmit={event => {
          event.preventDefault();
        }}
      >
      </form>

    </div>

      <div style={{ height: 400 }}>
        <SortableTree
          treeData={this.state.treeData}
          onChange={treeData => this.setState({ treeData })}
          // treeData={treeData}
          // onChange={treeData => updateTreeData(treeData)}
          searchQuery={searchString}
          searchFocusOffset={searchFocusIndex}
          canDrag={({ node }) => !node.dragDisabled}
          generateNodeProps={rowInfo => ({
            buttons: [
              <div>
                {/* <button
                  style={{size: "100px", height: "100px", width: "100px" }}
                  label="Add Sibling"
                  onClick={event => addNodeSibling(rowInfo)}
                >
                <img src="images/add_icon.png" alt="a"/>
                </button> */}
                {/* <button onMouseOver={changeBackground}>Hover over me!</button> */}
                <Tooltip title="Add Child">
                <button style={{backgroundColor:'grey'}} label="Add Child" onClick={ this.addNodeChild(rowInfo)}
                >
                  <img src="images/add_icon.png" alt="add" style={{size: "20px", height: "20px", width: "20px"}} />
                </button>
                </Tooltip>
                <Tooltip title="Edit Node">
                <button style={{backgroundColor:'grey'}} label="Update" //onClick={event => updateNode(rowInfo)}
                >
                  <img src="images/edit_icon.png" alt="edit" style={{size: "20px", height: "20px", width: "20px"}} />
                </button>
                </Tooltip>
                <Tooltip title="Delete Node">
                <button style={{backgroundColor:'grey'}} label="Delete" //onClick={event => removeNode(rowInfo)}
                >
                  <img src="images/delete_icon.png" alt="delete" style={{size: "20px", height: "20px", width: "20px"}} />
                </button>
                </Tooltip>  
                <SomeButtons/>
 
                  </div>
            ],
            style: {
              height: "50px"
            }
          })}
        />
        
        {/* <button onClick={this.createNode}>Create Tree</button> */}
        </div>  
        <button onClick={this.saveyo}> Save</button>
      <button>Release</button>
          </div>        

    )}

              }
  

export default Treee1;