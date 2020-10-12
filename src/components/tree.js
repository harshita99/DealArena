import React, { useState, useRef } from "react";
import firebase from "./Config";

import SortableTree, {
  addNodeUnderParent,
  removeNodeAtPath,
  changeNodeAtPath
  //toggleExpandedForAll
} from "react-sortable-tree";
import "react-sortable-tree/style.css";
import { Tooltip } from 'antd';
import SomeButtons from "./somebuttons";

var d = [];
const t = JSON.parse(localStorage.getItem('treeValue'));
if(t!=null){
  d = t[0];
  console.log(d["treeData"]);
}

const seed = [];
// var leaf=false;

// const t = JSON.parse(localStorage.getItem('treeValue'));
// console.log(t);

function Tree() {
  const [treeData, setTreeData] = useState(seed);

  const inputEl = useRef();

  function createNode() {
    setTreeData(d["treeData"]);
  }

  // function createNode() {
  //   console.log(("Brand in tree is: "+ sessionStorage.getItem('brandN')));
  //   console.log(("Category in tree is: "+ sessionStorage.getItem('category')));

  //   const value = sessionStorage.getItem('category');
  //   if (value === "") {
  //     // inputEl.current.focus();
  //     return;
  //   }

  //   let newTree = addNodeUnderParent({
  //     treeData: treeData,
  //     parentKey: null,
  //     expandParent: true,
  //     getNodeKey,
  //     newNode: {
  //       id: "123",
  //       title: value
  //     }
  //   });

  //   setTreeData(newTree.treeData);

  //   console.log("Category set");
  //   console.log(treeData);
  // }

  function updateNode(rowInfo) {
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

  function addNodeChild(rowInfo) {

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

  function removeNode(rowInfo) {
    const { path } = rowInfo;
    setTreeData(
      removeNodeAtPath({
        treeData,
        path,
        getNodeKey
      })
    );
  }

  function updateTreeData(treeData) {
    setTreeData(treeData);
    console.log(treeData);

  }

  function saveyo(){
    console.log(treeData);
    // console.log(typeof treeData);
    // firebase.firestore().collection("tree").add(treeData);
    firebase.firestore().collection("tree").doc(sessionStorage.getItem('brandN')).set({ treeData: treeData });
    //db.collection("cities").doc().set(data);


    // let payload = {};
    // let dataArray = [];

    // let obj1 = {
    //   title: 'main',
    //   subtitle: 'sub'
    // };

    // let obj2 = {
    //   title: 'value2',
    //   expanded: true,
    //   children: []
    // };

    // let child = {
    //   title: 'value3'
    // }

    // obj2.children.push(child);
    // dataArray.push(obj1);
    // dataArray.push(obj2);
    // payload["treeData"] = dataArray;


    // firebase.firestore().collection("tree").add(payload["treeData"]);

  }

  const getNodeKey = ({ treeIndex }) => treeIndex;

  // function changeBackground(e) {

  //   if (e.target.style.background === 'red'){
  //     e.target.style.background = 'grey';
  //   }
  //   else
  //     e.target.style.background = 'red';
  // }

  return (
    
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
      {/* <div style={{ height: "50vh" }}> */}
      <div style={{ height: "50vh" }}>
        <SortableTree
          treeData={treeData}
          onChange={treeData => updateTreeData(treeData)}
          canDrag={({ node }) => !node.dragDisabled}
          generateNodeProps={rowInfo => ({
            buttons: [
              <div>
                {/* <button onMouseOver={changeBackground}>Hover over me!</button> */}
                <Tooltip title="Add Child">
                <button style={{backgroundColor:'grey'}} label="Add Child" onClick={event => addNodeChild(rowInfo)}>
                  <img src="images/add_icon.png" alt="add" style={{size: "20px", height: "20px", width: "20px"}} />
                </button>
                </Tooltip>
                <Tooltip title="Edit Node">
                <button style={{backgroundColor:'grey'}} label="Update" onClick={event => updateNode(rowInfo)}>
                  <img src="images/edit_icon.png" alt="edit" style={{size: "20px", height: "20px", width: "20px"}} />
                </button>
                </Tooltip>
                <Tooltip title="Delete Node">
                <button style={{backgroundColor:'grey'}} label="Delete" onClick={event => removeNode(rowInfo)}>
                  <img src="images/delete_icon.png" alt="delete" style={{size: "20px", height: "20px", width: "20px"}} />
                </button>
                </Tooltip>

                <SomeButtons/>

                {/*                 
                <Tooltip title="Make Leaf Node">
                <button label="Leaf" onClick={changeBackground}>
                  <img src="images/star_icon.png" alt="delete" style={{size: "20px", height: "20px", width: "20px"}} />
                </button>
                </Tooltip> */}

                {/* if (`${leaf}==true){ 
                  <button label="View" > View </button>
                } */}

              </div>
            ],
            style: {
              height: "50px"
            }
          })}
        />
          <button onClick={createNode}>View Tree</button>
      </div>

      <button onClick={saveyo}> Save</button>
      <button>Release</button>
    </div>
  );
}

export default Tree;