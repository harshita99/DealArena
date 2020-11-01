import React, { useState } from "react";
// import { PlusCircleOutlined} from '@ant-design/icons';
// import { Tooltip } from 'antd';
// import firebase from "./Config";
// import history from './../history';


import SortableTree from "react-sortable-tree";
import "react-sortable-tree/style.css";

var d = [];
const t = JSON.parse(localStorage.getItem('treeValue1'));
// console.log(t);


if(t!=null){
  d = t[0];
  // console.log(d["treeData"]);
}

const seed = [];

function Tree() {
  const [treeData, setTreeData] = useState(seed);

  function createNode() {
    setTreeData(d["treeData"]);
  }

  function updateTreeData(treeData) {
    setTreeData(treeData);
    console.log(treeData);
  }
  // function addofferonall(rowInfo){


  // }
  // function addofferatsubcat1(rowInfo){

  // }
  // function addofferatsubcat2(rowInfo){

  // }
  // function addofferatsubcat3(rowInfo){

  // }
  return (
    
    <div>
      <div style={{  flex: "0 0 auto", padding: "0 15px" , marginLeft:"10vw", height: "60vh", width:"60vw" }}>
        <SortableTree
          treeData={treeData}
          canDrag={({ node }) => node.dragDisabled}
          onChange={treeData => updateTreeData(treeData)}
          generateNodeProps={rowInfo => ({
            buttons: [
              <div>
                {/* {( (rowInfo["node"].title===sessionStorage.getItem('brandN'))) && (
                  <Tooltip title="Add offer on all brand products">
                    <PlusCircleOutlined style={{ fontSize: '22px', color: '#08c' }} onClick={event => addofferonall(rowInfo)} label="Add Offer"  />{" "}
                  </Tooltip>
                )}

          

                 {(  (rowInfo["node"].title!==sessionStorage.getItem('category')) && (rowInfo["parentNode"].title===sessionStorage.getItem('brandN')) ) && (
                  <span>
                    <Tooltip title="Add offer at subcategory level 1 ">
                      <PlusCircleOutlined style={{ fontSize: '22px', color: '#08c' }} label="Add" onClick={event => addofferatsubcat1(rowInfo)} /> {" "}
                    </Tooltip>
                  </span>
                )}  */}

                 {/* {( (Object.keys(rowInfo["node"]).length !== 1) && (rowInfo["node"].title!==sessionStorage.getItem('category')) && (rowInfo["parentNode"].title!==sessionStorage.getItem('brandN')) && (rowInfo["parentNode"].title!==sessionStorage.getItem('category')) ) && (
                  <span>
                    <Tooltip title="Add offer at subcategory level 2 ">
                      <PlusCircleOutlined style={{ fontSize: '22px', color: '#08c' }} label="Add" onClick={event => addofferatsubcat2(rowInfo)} /> {" "}
                    </Tooltip>
                  </span>
                )}   

              {( (Object.keys(rowInfo["node"]).length === 1) && (rowInfo["node"].title!==sessionStorage.getItem('category')) && (rowInfo["parentNode"].title!==sessionStorage.getItem('brandN')) && (rowInfo["parentNode"].title!==sessionStorage.getItem('category')) ) && (
                  <span>
                    <Tooltip title="Add offer at subcategory level 3 ">
                      <PlusCircleOutlined style={{ fontSize: '22px', color: '#08c' }} label="Add" onClick={event => addofferatsubcat3(rowInfo)} /> {" "}
                    </Tooltip>
                  </span>
                )}    */}
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
    </div>
  );
}
export default Tree;