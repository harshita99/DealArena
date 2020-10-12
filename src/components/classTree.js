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
// import Tree from "./tree";

// const tree1 = [];
// const seed = [];
// const inputEl = useRef();
const getNodeKey = ({ treeIndex }) => treeIndex;
const setTreeData=[];
const treeData=[]
// const [treeData, setTreeData] = useState(seed);
var d = [];
const t = JSON.parse(localStorage.getItem('treeValue'));
if(t!=null){
  d = t[0];
  // console.log(d["treeData"]);
}
const inputEl = React.createRef();

class Treee1 extends Component {
  constructor(props) {
    super(props);
    this.updateTreeData = this.updateTreeData.bind(this);
    this.removeNode = this.removeNode.bind(this);
    console.log(d);
    this.state = {
      // treeData: d,
      // treeData: [],
      treeData: d["treeData"],
      // treeData: [
      //   { title: sessionStorage.getItem('category'), children: [{ title: sessionStorage.getItem('brandN') }] },
      // ]
    };
    console.log(this.state.treeData);
  }

  inputEl = React.createRef();

  updateTreeData(treeData) {
    this.setState({ treeData });
    console.log(treeData);
  }

  createNode() {
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
    this.setState({
      treeData: removeNodeAtPath({
        treeData: this.state.treeData,
        path: path,
        getNodeKey: ({node: TreeNode, treeIndex: number}) => {
          // console.log(number);
          return number;
      },
      ignoreCollapsed: false,
      })
    })
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
          canDrag={({ node }) => !node.dragDisabled}
          generateNodeProps={rowInfo => ({
            buttons: [
              <div>
                <Tooltip title="Add Child">
                <button style={{backgroundColor:'grey'}} label="Add Child" //onClick={ this.addNodeChild(rowInfo)}
                >
                  <img src="images/add_icon.png" alt="add" style={{size: "20px", height: "20px", width: "20px"}} />
                </button>
                </Tooltip>
                <Tooltip title="Edit Node">
                <button style={{backgroundColor:'grey'}} label="Update" //onClick={event => this.updateNode(rowInfo)}
                >
                  <img src="images/edit_icon.png" alt="edit" style={{size: "20px", height: "20px", width: "20px"}} />
                </button>
                </Tooltip>
                <Tooltip title="Delete Node">
                <button style={{backgroundColor:'grey'}} label="Delete" onClick={event => this.removeNode(rowInfo)}
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