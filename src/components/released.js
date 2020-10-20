import React, { useState } from "react";

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

  return (
    
    <div>
      <div style={{  flex: "0 0 auto", padding: "0 15px" , marginLeft:"10vw", height: "60vh", width:"60vw" }}>
        <SortableTree
          treeData={treeData}
          canDrag={({ node }) => node.dragDisabled}
          onChange={treeData => updateTreeData(treeData)}
        />
        <span style={{marginLeft:"-10vw", marginTop:"-15vh"}} >
          <button onClick={createNode} >View Tree</button>
        </span>
      </div>
    </div>
  );
}

export default Tree;