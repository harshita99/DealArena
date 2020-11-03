// import React, { useState } from "react";
// import { PlusCircleOutlined} from '@ant-design/icons';
import React, { useState, useEffect } from "react";
// import { PlusCircleOutlined} from '@ant-design/icons';
import { Tooltip } from 'antd';
import MButton from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import firebase from "./Config";
import ClassButton from "./classbutton";

// import firebase from "./Config";
import history from './../history';
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
// var E = [];
// var O = [];

function Tree() {
  const [treeData, setTreeData] = useState(seed);

  const [open, setOpen] = React.useState(false);
  const [offerD, setOffer] = React.useState("");
  const [expiry, setExpiry] = React.useState("");
  // const [brand, setBrand] = React.useState("");
  const [ setUnsubscribe] = React.useState(null);
  // const [ref, setRef] = React.useState(null);
  const [products, setProducts] = React.useState([]);

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    checkAuth();
		firebase.auth().onAuthStateChanged((productowner)=> {
			if (productowner) {
				firebase.firestore().collection("productOwnerDetails").doc(productowner.uid).get()
				// .then((doc)=> {
				// 	setBrand(doc.data().brand)
        // })
        .then((doc)=>{
          // console.log("Brand is: ", brand);
          console.log("ref val: ", firebase.firestore().collection("offerDetails").where("Brand","==",doc.data().brand));
          // this.ref=firebase.firestore().collection("offerDetails").where("Brand","==",brand);
          // setRef(ref => ref.concat(firebase.firestore().collection("productDetails").where("Brand","==",brand)));
          setUnsubscribe(firebase.firestore().collection("productDetails").where("Brand","==",doc.data().brand).onSnapshot(onCollectionUpdate2));
          // console.log("ref type: ", typeof(firebase.firestore().collection("productDetails").where("Brand","==",brand)));
				})
				.catch(function(error){
          console.log("Error getting document:", error);
          console.log(productowner.uid)
				})
			}
		})
		// history.push("/manageoffers");
  })

  function onCollectionUpdate2(querySnapshot){
		querySnapshot.forEach((doc)=>{
			const {Name, Description, Brand, Price, Category, imageurl, producturl, SubCategory}=doc.data();
      
      setProducts(products => products.concat({
        key:doc.id,
				Name,
				Brand,
				Description,
				Price,
				Category,
				imageurl,
				SubCategory,
        producturl
      }))
      
      // products.push({
			// 	key:doc.id,
			// 	doc,
			// 	Name,
			// 	Brand,
			// 	Description,
			// 	Price,
			// 	Category,
			// 	imageurl,
			// 	SubCategory,
			// 	producturl
			// });
		});
		// console.log(products);
		// this.setState({products});
  }
  
  function checkAuth(){
		var produser = firebase.auth().currentUser;
		if(localStorage.getItem('usersession')) {

		}
		else if(produser) {
			localStorage.setItem('usersession', produser);
			console.log("User "+produser.uid+" is logged in with");
			history.push("/manageoffers");
		}
		else {
			console.log("Successfully logged out");
			history.push("/");
		}
	}

  function addoffer() {
    console.log("Offer Details: ", offerD);
    console.log("Expiry: ", expiry);
    products.map(p=>{
      var Category = p.Category
      var SubCategory = p.SubCategory
      var Description = p.Description
      var Name = p.Name
      var Offer = offerD
      var Expiry = expiry
      var Brand = p.Brand
      var imageurl = p.imageurl
      var Price = p.Price
    
      firebase.firestore().collection("offerDetails").add({
        Category, Description, Name, Offer, Expiry, Brand, SubCategory, imageurl, Price
      })
      .catch((error)=>{
        console.error("Error adding document:",error);
      });
      return null;
    })
    console.log("Products: ", products);
    alert('Offer Added!');
    setOpen(false);
    // history.push("/manageoffers");
    // window.location.reload(false);
  }

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
                {( (rowInfo["node"] !== null) &&(rowInfo["node"].title===sessionStorage.getItem('brandN'))) && (
                  <Tooltip title="Add offer on all brand products">
                    {/* <PlusCircleOutlined style={{ fontSize: '22px', color: '#08c' }} onClick={handleOpen} label="Add Offer" />{" "} */}
                    <ClassButton/>

                  </Tooltip>
                )}

                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Offer on all Products</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Fill the details.
                  </DialogContentText>
                  <TextField
                    autoFocus
                    value={offerD}
                    margin="dense"
                    name="OfferDetails"
                    id="OfferDetails"
                    label="Offer Details"
                    type="text"
                    onChange={e => setOffer(e.target.value)}
                    fullWidth
                  />
                  <TextField
                    margin="dense"
                    value={expiry}
                    name="ExpiryDate"
                    id="ExpiryDate"
                    label="Expiry Date"
                    type="text"
                    onChange={e => setExpiry(e.target.value)}
                    fullWidth
                  />
                </DialogContent>
                <DialogActions>
                  <MButton style={{ color: '#08c' }} onClick={handleClose} color="primary">
                    Cancel
                  </MButton>
                  <MButton style={{ color: '#08c' }} onClick={addoffer} color="primary">
                    Add Offer
                  </MButton>
                </DialogActions>
                </Dialog>

                {( (rowInfo!==null) && (rowInfo["node"].title!==sessionStorage.getItem('category')) && (rowInfo["parentNode"].title===sessionStorage.getItem('brandN')) ) && (
                  <span>
                    <Tooltip title="Add offer at subcategory level 1 ">
                      {/* <PlusCircleOutlined style={{ fontSize: '22px', color: '#08c' }} label="Add" onClick={event => addofferatsubcat1(rowInfo)} /> {" "} */}
                      <ClassButton/>

                    </Tooltip>
                  </span>
                )} 

                {( (Object.keys(rowInfo["node"]).length !== 1) && (rowInfo["node"].title!==sessionStorage.getItem('category')) && (rowInfo["parentNode"].title!==sessionStorage.getItem('brandN')) && (rowInfo["parentNode"].title!==sessionStorage.getItem('category')) ) && (
                  <span>
                    <Tooltip title="Add offer at subcategory level 2 ">
                    <ClassButton/>

                      {/* <PlusCircleOutlined style={{ fontSize: '22px', color: '#08c' }} label="Add" onClick={event => addofferatsubcat2(rowInfo)} /> {" "} */}
                    </Tooltip>
                  </span>
                )}   

                {( (Object.keys(rowInfo["node"]).length === 1) && (rowInfo["node"].title!==sessionStorage.getItem('category')) && (rowInfo["parentNode"].title!==sessionStorage.getItem('brandN')) && (rowInfo["parentNode"].title!==sessionStorage.getItem('category')) ) && (
                  <span>
                    <Tooltip title="Add offer at subcategory level 3 ">
                      {/* <PlusCircleOutlined style={{ fontSize: '22px', color: '#08c' }} label="Add" onClick={event => addofferatsubcat3(rowInfo)} /> {" "} */}
                      <ClassButton/>

                    </Tooltip>
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
    </div>
  );
}
export default Tree;