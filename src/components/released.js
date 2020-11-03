// import React, { useState } from "react";
// import { PlusCircleOutlined} from '@ant-design/icons';
import React, { useState, useEffect } from "react";
import { PlusCircleOutlined} from '@ant-design/icons';
import { Tooltip } from 'antd';
import MButton from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import firebase from "./Config";
// import ClassButton from "./classbutton";
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

function Tree() {
  const [treeData, setTreeData] = useState(seed);

  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [offerD, setOffer] = React.useState("");
  const [expiry, setExpiry] = React.useState("");
  // const [brand, setBrand] = React.useState("");
  // const [setUnsubscribe] = React.useState(null);
  // const [ref, setRef] = React.useState(null);
  const [products, setProducts] = React.useState([]);
  const [products1, setProducts1] = React.useState([]);
  const [products2, setProducts2] = React.useState([]);
  const [products3, setProducts3] = React.useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleOpen3 = () => {
    setOpen3(true);
  };

  const handleClose3 = () => {
    setOpen3(false);
  };

  useEffect(() => {
    checkAuth();
		firebase.auth().onAuthStateChanged((productowner)=> {
			if (productowner) {
				firebase.firestore().collection("productOwnerDetails").doc(productowner.uid).get()
        .then((doc)=>{
          console.log("ref val: ", firebase.firestore().collection("offerDetails").where("Brand","==",doc.data().brand));
          firebase.firestore().collection("productDetails").where("Brand","==",doc.data().brand).onSnapshot(onCollectionUpdate);
				})
				.catch(function(error){
          console.log("Error getting document:", error);
          console.log(productowner.uid)
				})
			}
		})
  }, [])

  function onCollectionUpdate(querySnapshot){
		querySnapshot.forEach((doc)=>{
			const {Name, Description, Brand, Price, Category, imageurl, producturl, SubCategory1, SubCategory2, SubCategory3}=doc.data();
      
      setProducts(products => products.concat({
        key:doc.id,
				Name,
				Brand,
				Description,
				Price,
				Category,
				imageurl,
        SubCategory1,
        SubCategory2,
        SubCategory3,
        producturl
      }))
		});
		console.log(products);
  }

  function onCollectionUpdate1(querySnapshot){
		querySnapshot.forEach((doc)=>{
			const {Name, Description, Brand, Price, Category, imageurl, producturl, SubCategory1, SubCategory2, SubCategory3}=doc.data();
      
      setProducts1(products1 => products1.concat({
        key:doc.id,
				Name,
				Brand,
				Description,
				Price,
				Category,
				imageurl,
        SubCategory1,
        SubCategory2,
        SubCategory3,
        producturl
      }))
		});
		console.log(products1);
  }

  function onCollectionUpdate2(querySnapshot){
		querySnapshot.forEach((doc)=>{
			const {Name, Description, Brand, Price, Category, imageurl, producturl, SubCategory1, SubCategory2, SubCategory3}=doc.data();
      
      setProducts2(products2 => products2.concat({
        key:doc.id,
				Name,
				Brand,
				Description,
				Price,
				Category,
				imageurl,
        SubCategory1,
        SubCategory2,
        SubCategory3,
        producturl
      }))
		});
		console.log(products2);
  }

  function onCollectionUpdate3(querySnapshot){
		querySnapshot.forEach((doc)=>{
			const {Name, Description, Brand, Price, Category, imageurl, producturl, SubCategory1, SubCategory2, SubCategory3}=doc.data();
      
      setProducts3(products3 => products3.concat({
        key:doc.id,
				Name,
				Brand,
				Description,
				Price,
				Category,
				imageurl,
        SubCategory1,
        SubCategory2,
        SubCategory3,
        producturl
      }))
		});
		console.log(products3);
  }
  
  function checkAuth(){
		var produser = firebase.auth().currentUser;
		if(localStorage.getItem('usersession')) {console.log("Offer Details: ", offerD);
    console.log("Expiry: ", expiry);
    products.map(p=>{
      var Category = p.Category
      var SubCategory1 = p.SubCategory1
      var SubCategory2 = p.SubCategory2
      var SubCategory3 = p.SubCategory3
      var Description = p.Description
      var Name = p.Name
      var Offer = offerD
      var Expiry = expiry
      var Brand = p.Brand
      var imageurl = p.imageurl
      var Price = p.Price
    
      firebase.firestore().collection("offerDetails").add({
        Category, Description, Name, Offer, Expiry, Brand, SubCategory1, SubCategory2, SubCategory3, imageurl, Price
      })
      .catch((error)=>{
        console.error("Error adding document:",error);
      });
      return null;
    })
    console.log("Products: ", products);
    alert('Offer Added!');
    setOpen(false);

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
      var SubCategory1 = p.SubCategory1
      var SubCategory2 = p.SubCategory2
      var SubCategory3 = p.SubCategory3
      var Description = p.Description
      var Name = p.Name
      var Offer = offerD
      var Expiry = expiry
      var Brand = p.Brand
      var imageurl = p.imageurl
      var Price = p.Price
    
      firebase.firestore().collection("offerDetails").add({
        Category, Description, Name, Offer, Expiry, Brand, SubCategory1, SubCategory2, SubCategory3, imageurl, Price
      })
      .catch((error)=>{
        console.error("Error adding document:",error);
      });
      return null;
    })
    console.log("Products: ", products);
    alert('Offer Added!');
    setOpen(false);
  }

  function addofferatsubcat1(rowInfo) {
    var title = rowInfo["node"].title;

    firebase.auth().onAuthStateChanged((productowner)=> {
			if (productowner) {
				firebase.firestore().collection("productOwnerDetails").doc(productowner.uid).get()
        .then((doc)=>{
          firebase.firestore().collection("productDetails").where("Brand","==",doc.data().brand).where("SubCategory1", "==", title).onSnapshot(onCollectionUpdate1);
				})
				.catch(function(error){
          console.log("Error getting document:", error);
          console.log(productowner.uid)
				})
			}
    })
    
    products1.map(p=>{
      var Category = p.Category
      var SubCategory1 = p.SubCategory1
      var SubCategory2 = p.SubCategory2
      var SubCategory3 = p.SubCategory3
      var Description = p.Description
      var Name = p.Name
      var Offer = offerD
      var Expiry = expiry
      var Brand = p.Brand
      var imageurl = p.imageurl
      var Price = p.Price
    
      firebase.firestore().collection("offerDetails").add({
        Category, Description, Name, Offer, Expiry, Brand, SubCategory1, SubCategory2, SubCategory3, imageurl, Price
      })
      .catch((error)=>{
        console.error("Error adding document:",error);
      });
      return null;
    })
    console.log("Products: ", products1);
    alert('Offer Added!');
    setOpen1(false);
  }

  function addofferatsubcat2(rowInfo) {
    var title = rowInfo["node"].title;

    firebase.auth().onAuthStateChanged((productowner)=> {
			if (productowner) {
				firebase.firestore().collection("productOwnerDetails").doc(productowner.uid).get()
        .then((doc)=>{
          firebase.firestore().collection("productDetails").where("Brand","==",doc.data().brand).where("SubCategory2", "==", title).onSnapshot(onCollectionUpdate2);
				})
				.catch(function(error){
          console.log("Error getting document:", error);
          console.log(productowner.uid)
				})
			}
    })
    
    products2.map(p=>{
      var Category = p.Category
      var SubCategory1 = p.SubCategory1
      var SubCategory2 = p.SubCategory2
      var SubCategory3 = p.SubCategory3
      var Description = p.Description
      var Name = p.Name
      var Offer = offerD
      var Expiry = expiry
      var Brand = p.Brand
      var imageurl = p.imageurl
      var Price = p.Price
    
      firebase.firestore().collection("offerDetails").add({
        Category, Description, Name, Offer, Expiry, Brand, SubCategory1, SubCategory2, SubCategory3, imageurl, Price
      })
      .catch((error)=>{
        console.error("Error adding document:",error);
      });
      return null;
    })
    console.log("Products: ", products2);
    alert('Offer Added!');
    setOpen2(false);
  }

  function addofferatsubcat3(rowInfo) {
    var title = rowInfo["node"].title;

    firebase.auth().onAuthStateChanged((productowner)=> {
			if (productowner) {
				firebase.firestore().collection("productOwnerDetails").doc(productowner.uid).get()
        .then((doc)=>{
          firebase.firestore().collection("productDetails").where("Brand","==",doc.data().brand).where("SubCategory3", "==", title).onSnapshot(onCollectionUpdate3);
				})
				.catch(function(error){
          console.log("Error getting document:", error);
          console.log(productowner.uid)
				})
			}
    })
    
    products3.map(p=>{
      var Category = p.Category
      var SubCategory1 = p.SubCategory1
      var SubCategory2 = p.SubCategory2
      var SubCategory3 = p.SubCategory3
      var Description = p.Description
      var Name = p.Name
      var Offer = offerD
      var Expiry = expiry
      var Brand = p.Brand
      var imageurl = p.imageurl
      var Price = p.Price
    
      firebase.firestore().collection("offerDetails").add({
        Category, Description, Name, Offer, Expiry, Brand, SubCategory1, SubCategory2, SubCategory3, imageurl, Price
      })
      .catch((error)=>{
        console.error("Error adding document:",error);
      });
      return null;
    })
    console.log("Products: ", products3);
    alert('Offer Added!');
    setOpen3(false);
  }

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
          generateNodeProps={rowInfo => ({
            buttons: [
              <div>
                {( (rowInfo["node"] !== null) &&(rowInfo["node"].title===sessionStorage.getItem('brandN'))) && (
                  <Tooltip title="Add offer at Level 2 (on all brand products)">
                    <PlusCircleOutlined style={{ fontSize: '22px', color: '#08c' }} onClick={handleOpen} label="Add Offer" />{" "}
                    {/* <ClassButton rowInfo={rowInfo}/> */}
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
                    <Tooltip title="Add offer at Level 3">
                      <PlusCircleOutlined style={{ fontSize: '22px', color: '#08c' }} label="Add" onClick={handleOpen1} /> {" "}
                      {/* <ClassButton/> */}
                    </Tooltip>

                    <Dialog open={open1} onClose={handleClose1} aria-labelledby="form-dialog-title">
                      <DialogTitle id="form-dialog-title">Add Offer at Level 3</DialogTitle>
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
                        <MButton style={{ color: '#08c' }} onClick={handleClose1} color="primary">
                          Cancel
                        </MButton>
                        <MButton style={{ color: '#08c' }} onClick={event => addofferatsubcat1(rowInfo)} color="primary">
                          Add Offer
                        </MButton>
                      </DialogActions>
                    </Dialog> 
                  </span>
                )}

                

                {( (Object.keys(rowInfo["node"]).length !== 1) && (rowInfo["node"].title!==sessionStorage.getItem('category')) && (rowInfo["parentNode"].title!==sessionStorage.getItem('brandN')) && (rowInfo["parentNode"].title!==sessionStorage.getItem('category')) ) && (
                  <span>
                    <Tooltip title="Add offer at Level 4">
                    <PlusCircleOutlined style={{ fontSize: '22px', color: '#08c' }} label="Add" onClick={handleOpen2} /> {" "}
                      {/* <ClassButton/> */}
                    </Tooltip>

                    <Dialog open={open2} onClose={handleClose2} aria-labelledby="form-dialog-title">
                      <DialogTitle id="form-dialog-title">Add Offer at Level 4</DialogTitle>
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
                        <MButton style={{ color: '#08c' }} onClick={handleClose2} color="primary">
                          Cancel
                        </MButton>
                        <MButton style={{ color: '#08c' }} onClick={event => addofferatsubcat2(rowInfo)} color="primary">
                          Add Offer
                        </MButton>
                      </DialogActions>
                    </Dialog>
                  </span>
                )}   

                {( (Object.keys(rowInfo["node"]).length === 1) && (rowInfo["node"].title!==sessionStorage.getItem('category')) && (rowInfo["parentNode"].title!==sessionStorage.getItem('brandN')) && (rowInfo["parentNode"].title!==sessionStorage.getItem('category')) ) && (
                  <span>
                    <Tooltip title="Add offer at Level 5">
                    <PlusCircleOutlined style={{ fontSize: '22px', color: '#08c' }} label="Add" onClick={handleOpen3} /> {" "}
                      {/* <ClassButton/> */}
                    </Tooltip>

                    <Dialog open={open3} onClose={handleClose3} aria-labelledby="form-dialog-title">
                      <DialogTitle id="form-dialog-title">Add Offer at Level 5</DialogTitle>
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
                        <MButton style={{ color: '#08c' }} onClick={handleClose3} color="primary">
                          Cancel
                        </MButton>
                        <MButton style={{ color: '#08c' }} onClick={event => addofferatsubcat3(rowInfo)} color="primary">
                          Add Offer
                        </MButton>
                      </DialogActions>
                    </Dialog>
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