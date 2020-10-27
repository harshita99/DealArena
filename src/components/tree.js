import React, { useState, useRef } from "react";
import firebase from "./Config";
import SortableTree, {
  addNodeUnderParent,
  removeNodeAtPath,
  changeNodeAtPath
} from "react-sortable-tree";


import "react-sortable-tree/style.css";
import { Tooltip } from 'antd';
import { PlusCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import SomeButtons from "./somebuttons";

var d = [];
const t = JSON.parse(localStorage.getItem('treeValue'));
if(t!=null){
  d = t[0];
}

const seed = [];

function Tree() {
  const [treeData, setTreeData] = useState(seed);
  var  x=0;
  const inputEl = useRef();


  function createNode() {
    setTreeData(d["treeData"]);

    console.log(x);
  }

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
    console.log("Update Node: ", rowInfo);
  }

  function addNodeChild(rowInfo) {
    let { path } = rowInfo;
    console.log(rowInfo["node"].title);
    console.log(rowInfo["node"].title,sessionStorage.getItem('category'));

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
    console.log("Add Node: ", rowInfo);
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
    // console.log("Remove Node: ", rowInfo);
    // console.log(Object.keys(rowInfo["node"]).length);
  }

  function updateTreeData(treeData) {
    setTreeData(treeData);
    console.log(treeData);
  }

  function saveyo(){
    console.log(treeData);
    firebase.firestore().collection("tree").doc(sessionStorage.getItem('brandN')).set({ treeData: treeData });
    console.log("Saved to database");
    alert("Saved to database");
  }

  function release(){
    console.log("Number of leaf nodes in the tree:",y/2);
    console.log("numberofproducts:",(parseInt(sessionStorage.getItem('numberofproducts'))));


    if ((Math.trunc(y))===2*(parseInt(sessionStorage.getItem('numberofproducts')))){
      
      saveyo()
      firebase.firestore().collection("released").doc(sessionStorage.getItem('brandN')).set({ treeData: treeData });
      console.log("Released to Offer Manager");
      alert("Released to Offer Manager ");
    }
    else{
      alert("Please add products at each end");

    }
  }
  
    
    
  var y;
  const getNodeKey = ({ treeIndex }) => treeIndex;

  return (
    <div>  
     <span style={{visibility: "hidden" }}> {y=0}</span>
 

      <div style={{ flex: "0 0 auto", padding: "0 15px" }}>
        <br />
        <input style={{marginLeft:"-30vw"}} placeholder="Enter text here" ref={inputEl} type="text" />
        <br />
        <form
          style={{ display: "inline-block" }}
          onSubmit={event => {
            event.preventDefault();
          }}
        >
        </form>
      </div>

      <div style={{  flex: "0 0 auto", padding: "0 15px" , marginLeft:"10vw", height: "60vh", width:"60vw" }}>

        <SortableTree
          treeData={treeData}
          onChange={treeData => updateTreeData(treeData)}
          canDrag={({ node }) => node.dragDisabled}
          generateNodeProps={rowInfo => ({
            buttons: [
              <div>
                {( (rowInfo["node"].title!==sessionStorage.getItem('category'))) && (
                  <Tooltip title="Add Child">
                    <PlusCircleOutlined style={{ fontSize: '22px', color: '#08c' }} label="Add Child" onClick={event => addNodeChild(rowInfo)} />{" "}

                  </Tooltip>
                )}

                {( (rowInfo["node"].title!==sessionStorage.getItem('brandN')) && (rowInfo["node"].title!==sessionStorage.getItem('category'))) && (
                  <span>
                    <Tooltip title="Edit Node">
                      <EditOutlined style={{ fontSize: '22px', color: '#08c' }} label="Update" onClick={event => updateNode(rowInfo)} /> {" "}
             
                    </Tooltip>
                    <Tooltip title="Delete Node">
                      <DeleteOutlined style={{ fontSize: '22px', color: '#08c' }} label="Delete" onClick={event => removeNode(rowInfo)} /> {" "}
                  
                    </Tooltip>
                    { Object.keys(rowInfo["node"]).length === 1 && (
                      <SomeButtons/>
                    ) 
                  } 
              
                  <div  style={{visibility: "hidden" }}>
                    {y=  ((rowInfo["node"].title===sessionStorage.getItem('brandN')) || (rowInfo["node"].title===sessionStorage.getItem('category'))||(Object.keys(rowInfo["node"]).length !== 1))? y:y+1}
                    </div>
                  </span>
                )}
              </div>
            ],
            style: {
              height: "50px"
            }
          })}
        />

        <span style={{marginLeft:"-10vw", marginTop:"-15vh"}} >
          <button onClick={createNode} >View Tree</button>
        </span>
      </div>

      <button onClick={saveyo} style={{ marginTop:"-10vh"}}> Save </button> { }
      <button onClick={release} style={{ marginTop:"-10vh"}}> Save & Release </button>
    </div>
  );
}

export default Tree;