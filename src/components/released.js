// import React, { useState } from "react";
// import { PlusCircleOutlined} from '@ant-design/icons';
import React, { useState } from "react";
// import { PlusCircleOutlined} from '@ant-design/icons';
// import { Tooltip } from 'antd';
// import MButton from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import firebase from "./Config";
import ClassAllBrands from "./classAllBrand";
import ClassSub1 from "./classSub1";
import ClassSub2 from "./classSub2";
// import ClassSub3 from "./classSub3";
// import history from './../history';
import SortableTree from "react-sortable-tree";
import "react-sortable-tree/style.css"

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
  // const [open, setOpen] = React.useState(false);
  // const [open1, setOpen1] = React.useState(false);
  // const [open2, setOpen2] = React.useState(false);
  // const [open3, setOpen3] = React.useState(false);
  // const [offerD, setOffer] = React.useState("");
  // const [expiry, setExpiry] = React.useState("");
  // const [brand, setBrand] = React.useState("");
  // const [setUnsubscribe] = React.useState(null);
  // const [ref, setRef] = React.useState(null);
  // const [products, setProducts] = React.useState([]);
  // const [products1, setProducts1] = React.useState([]);
  // const [products2, setProducts2] = React.useState([]);
  // const [products3, setProducts3] = React.useState([]);

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  // const handleOpen1 = () => {
  //   setOpen1(true);
  // };

  // const handleClose1 = () => {
  //   setOpen1(false);
  // };

  // const handleOpen2 = () => {
  //   setOpen2(true);
  // };

  // const handleClose2 = () => {
  //   setOpen2(false);
  // };

  // const handleOpen3 = () => {
  //   setOpen3(true);
  // };

  // const handleClose3 = () => {
  //   setOpen3(false);
  // };

  // useEffect(() => {
  //   checkAuth();
	// 	firebase.auth().onAuthStateChanged((productowner)=> {
	// 		if (productowner) {
	// 			firebase.firestore().collection("productOwnerDetails").doc(productowner.uid).get()
  //       .then((doc)=>{
  //         console.log("ref val: ", firebase.firestore().collection("offerDetails").where("Brand","==",doc.data().brand));
  //         firebase.firestore().collection("productDetails").where("Brand","==",doc.data().brand).onSnapshot(onCollectionUpdate);
	// 			})
	// 			.catch(function(error){
  //         console.log("Error getting document:", error);
  //         console.log(productowner.uid)
	// 			})
	// 		}
	// 	})
  // })

  // function onCollectionUpdate(querySnapshot){
	// 	querySnapshot.forEach((doc)=>{
	// 		const {Model, Name, Description, Brand, Price, Category, imageurl, producturl, SubCategory1, SubCategory2, SubCategory3}=doc.data();
      
  //     setProducts(products => products.concat({
  //       key:doc.id,
	// 			Name,
	// 			Brand,
	// 			Description,
	// 			Price,
	// 			Category,
  //       imageurl,
  //       Model,
  //       SubCategory1,
  //       SubCategory2,
  //       SubCategory3,
  //       producturl
  //     }))
	// 	});
	// 	console.log(products);
  // }

  // function onCollectionUpdate1(querySnapshot){
	// 	querySnapshot.forEach((doc)=>{
	// 		const {Model, Name, Description, Brand, Price, Category, imageurl, producturl, SubCategory1, SubCategory2, SubCategory3}=doc.data();
      
  //     setProducts1(products1 => products1.concat({
  //       key:doc.id,
	// 			Name,
	// 			Brand,
	// 			Description,
	// 			Price,
	// 			Category,
  //       imageurl,
  //       Model,
  //       SubCategory1,
  //       SubCategory2,
  //       SubCategory3,
  //       producturl
  //     }))
	// 	});
  //   console.log(products1);
  //   console.log("Hi there, SubLevel 1");
  // }

  // function onCollectionUpdate2(querySnapshot){
	// 	querySnapshot.forEach((doc)=>{
	// 		const {Model, Name, Description, Brand, Price, Category, imageurl, producturl, SubCategory1, SubCategory2, SubCategory3}=doc.data();
      
  //     setProducts2(products2 => products2.concat({
  //       key:doc.id,
	// 			Name,
	// 			Brand,
	// 			Description,
	// 			Price,
	// 			Category,
  //       imageurl,
  //       Model,
  //       SubCategory1,
  //       SubCategory2,
  //       SubCategory3,
  //       producturl
  //     }))
	// 	});
	// 	console.log(products2);
  // }

  // function onCollectionUpdate3(querySnapshot){
	// 	querySnapshot.forEach((doc)=>{
	// 		const {Model, Name, Description, Brand, Price, Category, imageurl, producturl, SubCategory1, SubCategory2, SubCategory3}=doc.data();
      
  //     setProducts3(products3 => products3.concat({
  //       key:doc.id,
	// 			Name,
	// 			Brand,
	// 			Description,
	// 			Price,
	// 			Category,
  //       imageurl,
  //       Model,
  //       SubCategory1,
  //       SubCategory2,
  //       SubCategory3,
  //       producturl
  //     }))
	// 	});
	// 	console.log(products3);
  // }
  
  // function checkAuth(){
	// 	var produser = firebase.auth().currentUser;
	// 	if(localStorage.getItem('usersession')) {
      
	// 	}
	// 	else if(produser) {
	// 		localStorage.setItem('usersession', produser);
	// 		console.log("User "+produser.uid+" is logged in with");
	// 		history.push("/manageoffers");
	// 	}
	// 	else {
	// 		console.log("Successfully logged out");
	// 		history.push("/");
	// 	}
	// }

  // function addoffer() {
  //   console.log("Offer Details: ", offerD);
  //   console.log("Expiry: ", expiry);
  //   products.map(p=>{
  //     var Category = p.Category
  //     var SubCategory1 = p.SubCategory1
  //     var SubCategory2 = p.SubCategory2
  //     var SubCategory3 = p.SubCategory3
  //     var Model = p.Model
  //     var Description = p.Description
  //     var Name = p.Name
  //     var Offer = offerD
  //     var Expiry = expiry
  //     var Brand = p.Brand
  //     var imageurl = p.imageurl
  //     var Price = p.Price
  //     var time = firebase.firestore.FieldValue.serverTimestamp()
    
  //     firebase.firestore().collection("offerDetails").add({
  //       Model, Category, Description, Name, Offer, Expiry, Brand, SubCategory1, SubCategory2, SubCategory3, imageurl, Price, time
  //     })
  //     .catch((error)=>{
  //       console.error("Error adding document:",error);
  //     });
  //     return null;
  //   })
  //   console.log("Products: ", products);
  //   alert('Offer Added!');
  //   setOpen(false);
  // }

  // function addofferatsubcat1(rowInfo) {
  //   var title = rowInfo["node"].title;

  //   firebase.auth().onAuthStateChanged((productowner)=> {
	// 		if (productowner) {
	// 			firebase.firestore().collection("productOwnerDetails").doc(productowner.uid).get()
  //       .then((doc)=>{
  //         firebase.firestore().collection("productDetails").where("Brand","==",doc.data().brand).where("SubCategory1", "==", title).onSnapshot(onCollectionUpdate1);
	// 			})
	// 			.catch(function(error){
  //         console.log("Error getting document:", error);
  //         console.log(productowner.uid)
	// 			})
	// 		}
  //   })
    
  //   products1.map(p=>{
  //     var Category = p.Category
  //     var SubCategory1 = p.SubCategory1
  //     var SubCategory2 = p.SubCategory2
  //     var SubCategory3 = p.SubCategory3
  //     var Model = p.Model
  //     var Description = p.Description
  //     var Name = p.Name
  //     var Offer = offerD
  //     var Expiry = expiry
  //     var Brand = p.Brand
  //     var imageurl = p.imageurl
  //     var Price = p.Price
    
  //     firebase.firestore().collection("offerDetails").add({
  //       Model, Category, Description, Name, Offer, Expiry, Brand, SubCategory1, SubCategory2, SubCategory3, imageurl, Price
  //     })
  //     .catch((error)=>{
  //       console.error("Error adding document:",error);
  //     });
  //     return null;
  //   })
  //   console.log("Products: ", products1);
  //   alert('Offer Added!');
  //   setOpen1(false);
  // }

  // function addofferatsubcat2(rowInfo) {
  //   var title = rowInfo["node"].title;

  //   firebase.auth().onAuthStateChanged((productowner)=> {
	// 		if (productowner) {
	// 			firebase.firestore().collection("productOwnerDetails").doc(productowner.uid).get()
  //       .then((doc)=>{
  //         firebase.firestore().collection("productDetails").where("Brand","==",doc.data().brand).where("SubCategory2", "==", title).onSnapshot(onCollectionUpdate2);
	// 			})
	// 			.catch(function(error){
  //         console.log("Error getting document:", error);
  //         console.log(productowner.uid)
	// 			})
	// 		}
  //   })
    
  //   products2.map(p=>{
  //     var Category = p.Category
  //     var SubCategory1 = p.SubCategory1
  //     var SubCategory2 = p.SubCategory2
  //     var SubCategory3 = p.SubCategory3
  //     var Model = p.Model
  //     var Description = p.Description
  //     var Name = p.Name
  //     var Offer = offerD
  //     var Expiry = expiry
  //     var Brand = p.Brand
  //     var imageurl = p.imageurl
  //     var Price = p.Price
    
  //     firebase.firestore().collection("offerDetails").add({
  //       Model, Category, Description, Name, Offer, Expiry, Brand, SubCategory1, SubCategory2, SubCategory3, imageurl, Price
  //     })
  //     .catch((error)=>{
  //       console.error("Error adding document:",error);
  //     });
  //     return null;
  //   })
  //   console.log("Products: ", products2);
  //   alert('Offer Added!');
  //   setOpen2(false);
  // }

  // function addofferatsubcat3(rowInfo) {
  //   var title = rowInfo["node"].title;

  //   firebase.auth().onAuthStateChanged((productowner)=> {
	// 		if (productowner) {
	// 			firebase.firestore().collection("productOwnerDetails").doc(productowner.uid).get()
  //       .then((doc)=>{
  //         firebase.firestore().collection("productDetails").where("Brand","==",doc.data().brand).where("SubCategory3", "==", title).onSnapshot(onCollectionUpdate3);
	// 			})
	// 			.catch(function(error){
  //         console.log("Error getting document:", error);
  //         console.log(productowner.uid)
	// 			})
	// 		}
  //   })
    
  //   products3.map(p=>{
  //     var Category = p.Category
  //     var SubCategory1 = p.SubCategory1
  //     var SubCategory2 = p.SubCategory2
  //     var SubCategory3 = p.SubCategory3
  //     var Model = p.Model
  //     var Description = p.Description
  //     var Name = p.Name
  //     var Offer = offerD
  //     var Expiry = expiry
  //     var Brand = p.Brand
  //     var imageurl = p.imageurl
  //     var Price = p.Price
    
  //     firebase.firestore().collection("offerDetails").add({
  //       Model, Category, Description, Name, Offer, Expiry, Brand, SubCategory1, SubCategory2, SubCategory3, imageurl, Price
  //     })
  //     .catch((error)=>{
  //       console.error("Error adding document:",error);
  //     });
  //     return null;
  //   })
  //   console.log("Products: ", products3);
  //   alert('Offer Added!');
  //   setOpen3(false);
  // }

  function createNode() {
    setTreeData(d["treeData"]);
    console.log(treeData);
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
                {/* {console.log("length of: ", rowInfo["node"].title, "is: ", Object.keys(rowInfo["node"]).length)} */}
                {( (rowInfo["node"] !== null) && (rowInfo["node"].title===sessionStorage.getItem('brandN'))) && (
                    <ClassAllBrands node={rowInfo}/>
                )}

                {/* <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
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
                </Dialog> */}

                {/* {( (rowInfo!==null) && (rowInfo["node"].title!==sessionStorage.getItem('category')) && (rowInfo["parentNode"].title===sessionStorage.getItem('brandN')) ) && (
                  <span>
                      <ClassSub1 node={rowInfo}/>
                  </span>
                )} */}

                {( (Object.keys(rowInfo["node"]).length === 3) && (rowInfo["node"].title!==sessionStorage.getItem('category')) && (rowInfo["parentNode"].title===sessionStorage.getItem('brandN')) && (rowInfo["parentNode"].title!==sessionStorage.getItem('category')) ) && (
                  <span>
                      <ClassSub1 node={rowInfo}/>
                  </span>
                )}

                {( (Object.keys(rowInfo["node"]).length === 3) && (rowInfo["node"].title!==sessionStorage.getItem('category')) && (rowInfo["parentNode"].title!==sessionStorage.getItem('brandN')) && (rowInfo["parentNode"].title!==sessionStorage.getItem('category')) ) && (
                  <span>
                      <ClassSub2 node={rowInfo}/>
                  </span>
                )}      

                {( (Object.keys(rowInfo["node"]).length === 1) && (rowInfo["node"].title!==sessionStorage.getItem('category')) && (rowInfo["parentNode"].title!==sessionStorage.getItem('brandN')) && (rowInfo["parentNode"].title!==sessionStorage.getItem('category')) ) && (
                  <span>
          
                  </span>
                )} 
                {/* 
                {console.log(treeData)} */}
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