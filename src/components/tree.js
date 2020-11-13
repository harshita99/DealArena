import React, { useState, useRef } from "react";
import firebase from "./Config";
import SortableTree, {addNodeUnderParent,removeNodeAtPath,changeNodeAtPath} from "react-sortable-tree";
import "react-sortable-tree/style.css";
import { Tooltip } from 'antd';
import { PlusCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import SomeButtons from "./somebuttons";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
  const [open, setOpen] = React.useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [saveOpen, setSaveOpen] = React.useState(false);

  const handleSaveOpen = () => {
    setSaveOpen(true);
  };

  const handleSaveClose = () => {
    setSaveOpen(false);
  };

  const [releaseOpen, setReleaseOpen] = React.useState(false);

  const handleReleaseOpen = () => {
    setReleaseOpen(true);
  };

  const handleReleaseClose = () => {
    setReleaseOpen(false);
  };

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
    handleClose();
  }

  function updateTreeData(treeData) {
    setTreeData(treeData);
    console.log(treeData);
  }

  function saveyo(){
    console.log(treeData);
    console.log("y=", y)
    firebase.firestore().collection("tree").doc(sessionStorage.getItem('brandN')).set({ treeData: treeData });
    console.log("Saved to database");
    setSaveOpen(false);
    alert("Saved to Database!");
  }

  function release(){
    console.log("Number of leaf nodes in the tree:",y/2);
    console.log("numberofproducts:",(parseInt(sessionStorage.getItem('numberofproducts'))));
    setReleaseOpen(false);
<<<<<<< HEAD
    // if ((Math.trunc(y/2))===(parseInt(sessionStorage.getItem('numberofproducts')))){
=======
    if ((Math.trunc(y/2))<=(parseInt(sessionStorage.getItem('numberofproducts')))){
>>>>>>> 82d8e11120c09939ae944c8237631a3f9e0ea3d9
      saveyo()
      firebase.firestore().collection("released").doc(sessionStorage.getItem('brandN')).set({ treeData: treeData });
      console.log("Released to Offer Manager!");
      alert("Released to Offer Manager!");
    }
    else{
      alert("Please add products at each end!");
    }
  }
  
  var y=0;
  const getNodeKey = ({ treeIndex }) => treeIndex;
  console.log("y=", y);
  return (
    <div>  
     <span style={{visibility: "hidden" }}> {y=0} </span>

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
                      <DeleteOutlined style={{ fontSize: '22px', color: '#08c' }} label="Delete" onClick={handleClickOpen} /> {" "}
                    </Tooltip>
                    { Object.keys(rowInfo["node"]).length === 1 && (
                      <SomeButtons  node={rowInfo}  />
                    )}
                    { Object.keys(rowInfo["node"]).length === 1 && (
                      y=y+1,
                      console.log(rowInfo["node"].title)
                    )}
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                      <DialogTitle id="form-dialog-title">Delete</DialogTitle>
                      <DialogContent>
                      <DialogContentText>
                          Are you sure you want to delete the node? <br />All the children of this node, if any, will also be deleted.
                      </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                      <Button style={{ color: '#08c' }} onClick={handleClose} color="primary">
                          Cancel
                      </Button>
                      <Button style={{ color: '#08c' }} onClick={event => removeNode(rowInfo)} color="primary">
                          Delete
                      </Button>
                      </DialogActions>
                    </Dialog>

                    <Dialog open={saveOpen} onClose={handleSaveClose} aria-labelledby="form-dialog-title">
                      <DialogTitle id="form-dialog-title">Save Tree</DialogTitle>
                      <DialogContent>
                      <DialogContentText>
                          Are you sure you want to save the tree? <br /> You can keep editing it later.
                      </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                      <Button style={{ color: '#08c' }} onClick={handleSaveClose} color="primary">
                          Cancel
                      </Button>
                      <Button style={{ color: '#08c' }} onClick={saveyo} color="primary">
                          Save
                      </Button>
                      </DialogActions>
                    </Dialog>

                    <Dialog open={releaseOpen} onClose={handleReleaseClose} aria-labelledby="form-dialog-title">
                      <DialogTitle id="form-dialog-title">Release Tree</DialogTitle>
                      <DialogContent>
                      <DialogContentText>
                          Are you sure you want to release the tree? <br /> The Offer Manager would now be able to Add Offers on them.
                      </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                      <Button style={{ color: '#08c' }} onClick={handleReleaseClose} color="primary">
                          Cancel
                      </Button>
                      <Button style={{ color: '#08c' }} onClick={release} color="primary">
                          Release
                      </Button>
                      </DialogActions>
                    </Dialog> 
                    {/* <span style={{visibility: "hidden" }}>
                      {y= ((rowInfo["node"].title === sessionStorage.getItem('brandN')) || (rowInfo["node"].title===sessionStorage.getItem('category')) || (Object.keys(rowInfo["node"]).length !== 1)) ? y:y+1}
                    </span> */}
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

      <button onClick={handleSaveOpen} style={{ marginTop:"-10vh"}}> Save </button> { }
      <button onClick={handleReleaseOpen} style={{ marginTop:"-10vh"}}> Save & Release </button>
    </div>
  );
}

export default Tree;