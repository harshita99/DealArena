import React from 'react';
import firebase from "./Config";
import { Tooltip } from 'antd';
import 'antd/dist/antd.css';
import history from './../history';
import { ShoppingTwoTone, SendOutlined,  } from '@ant-design/icons';
import MButton from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


class SomeButtons extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isOpen: true }
    this.toggle = this.toggle.bind(this);
    this.state = { open: false };
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleClose1 = this.handleClose1.bind(this);
    this.state = { formOpen: false };
    this.handleFormOpen = this.handleFormOpen.bind(this);
    this.handleFormClose = this.handleFormClose.bind(this);

    this.state={
      Name:"",
      Description:"",
      Price:"",
      Category:"",
      Model:"",
      SubCategory1:"",
      SubCategory2:"",
      SubCategory3:"",
      imageurl:"",
      Brand:"",
      image:null,
      producturl:""
    }
  }

  handleClickOpen(e) {
    this.setState({
        open: true
    });
  }

  handleClose(e) {
    this.setState({
        open: false
    });
    this.toggle();
  }

  handleClose1(e) {
    this.setState({
        open: false
    });
  }

  handleFormOpen(e) {
    this.setState({
        formOpen: true
    });
  }

  handleFormClose(e) {
    this.setState({
        formOpen: false
    });
  }
  
  toggle(e) {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));

    // console.log(getTwoToneColor);

    if (!this.state.isOpen)
    {
      this.handleClickOpen();
      // setTwoToneColor("black");
    }
  }
  
  onChange=(e)=>{
    const state=this.state;
    state[e.target.name]=e.target.value;
    this.setState(state);
  }

  onSubmit=(e)=>{
    e.preventDefault();
    const {Model, Name, Description, Price, Category, SubCategory1, SubCategory2, SubCategory3, Brand,imageurl,producturl}=this.state;
    firebase.firestore().collection("productDetails").add({
      Name,
      Brand,
      Description,
      Price,
      Model,
      SubCategory1,
      SubCategory2,
      SubCategory3,
      Category,
      imageurl,
      producturl
    }).then(()=>{
      this.setState({
        Name:"",
        Brand:"",
        Description:"",
        Price:"",
        Category:"",
        Model:"",
        SubCategory1:"",
        SubCategory2:"",
        SubCategory3:"",
        imageurl:"",
        producturl:""
      });

      this.handleClose1();
      this.handleFormClose();
      alert('Product Added!');
      console.log("product added");
    })
    .catch((error)=>{
      console.error("Error adding product:",error);
    });
  }   

  handleChange = (e) => {
    if (e.target.files[0]){         
      this.setState({
        image:e.target.files[0]
      });
    };
    console.log(e.target.files[0])
  };

  handleUpload=(e)=>{
    const {image}=this.state;
    const uploadTask=firebase.storage().ref(`image/${image.name}`).put(this.state.image)
    uploadTask.on("state_changed",(snapshot)=>{console.log("snapshot")},
    (error)=>{console.log("error");},
    ()=>{
      firebase.storage().ref("image").child(image.name).getDownloadURL().then(imageurl=>this.setState({imageurl}))
    })
  }

  
	// componentDidMount(){
	// 	// window.location.reload(false);
	// 	// console.log("Component in Product Manager.");

	// 	// this.checkAuth();
	// 	firebase.auth().onAuthStateChanged((productowner)=> {
	// 		if (productowner) {
	// 			firebase.firestore().collection("productOwnerDetails").doc(productowner.uid)
	// 			  .get()
	// 			  .then((doc)=> {
	// 				this.setState({brand : doc.data().brand})
	// 			  }).then((doc)=>{
	// 				this.ref=firebase.firestore().collection("productOwnerDetails").where("BrandName","==",this.state.brand)
	// 				this.unsubscribe=this.ref.onSnapshot(this.getDetails);
	// 			// 	  .get()
	// 			// 	  .then((doc)=> {
	// 			// 		this.setState({category : doc.data().Category})
	// 			// 		this.setState({brandN : doc.data().BrandName})
	// 			// 	  })
	// 			  })
	// 			  .catch(function(error){
	// 				console.log("Error getting particular document:", error);
	// 				// console.log(productowner.uid)
	// 			  })
	// 		}

	// 		if (productowner) {
	// 			firebase.firestore().collection("productOwnerDetails").doc(productowner.uid)
	// 			  .get()
	// 			  .then((doc)=>{
	// 				// console.log(this.state.brand);
	// 				this.ref=firebase.firestore().collection("tree")
	// 				this.unsubscribe=this.ref.onSnapshot(this.onCollectionUpdate1);
	// 				// console.log(this.ref.onSnapshot);
	// 			  })
	// 			  .catch(function(error){
	// 				console.log("Error getting particular document:", error);
	// 			  })
	// 		}

	// 		if (productowner) {
	// 		  firebase.firestore().collection("productOwnerDetails").doc(productowner.uid)
	// 			.get()
	// 			.then((doc)=> {
	// 			  this.setState({brand : doc.data().brand})
	// 			  this.setState({category : doc.data().Category})
	// 			}).then((doc)=>{
	// 				this.ref=firebase.firestore().collection("productDetails").where("Brand","==",this.state.brand);
	// 				this.unsubscribe=this.ref.onSnapshot(this.onCollectionUpdate);
	// 			})
	// 			.catch(function(error){
	// 			  console.log("Error getting document:", error);
	// 			  console.log(productowner.uid)
	// 			})
	// 		}
	// 	})

	// }

	// onCollectionUpdate1=(querySnapshot)=>{
	// 	const tree1=[];
	// 	querySnapshot.forEach((doc)=>{
	// 		const {treeData}=doc.data();
	// 		if(doc.id === this.state.brand){

	// 			tree1.push({
	// 				treeData
	// 			});
	// 		}
	// 	});
	// 	this.setState({tree1});
	// 	console.log(tree1);
	// 	localStorage.setItem('treeValue', JSON.stringify(tree1));
	// }

	// getDetails=(querySnapshot)=>{
	// 	querySnapshot.forEach((doc)=>{
	// 		this.setState({category : doc.data().Category})
	// 		this.setState({brandN : doc.data().BrandName})


	// 		sessionStorage.setItem('brandN', (doc.data().BrandName))
	// 		sessionStorage.setItem('category', (doc.data().Category))

	// 	})
	// }
	
	// onCollectionUpdate=(querySnapshot)=>{
	// 	const products=[];
	// 	querySnapshot.forEach((doc)=>{
	// 		const {Model, Name, Description, Brand, Price, Expiry, Category, SubCategory1, SubCategory2, SubCategory3, Offer,imageurl, producturl}=doc.data();
	// 		products.push({
	// 			key:doc.id,
	// 			doc,
	// 			Name,
	// 			Brand,
	// 			Description,
	// 			Price,
	// 			Category,
	// 			Expiry,
	// 			Offer,
	// 			imageurl,
	// 			Model,
	// 			SubCategory1,
	// 			SubCategory2,
	// 			SubCategory3,
	// 			producturl
	// 		});
	// 	});
  //   this.setState({products});
    
  //   var list2=[];
  //   this.state.products.map(product=>
  //     list2.push(product.Model)
  //   )

  //   this.setState({list2});
  //   console.log(this.state.list2)
	// 	localStorage.setItem('list2', list2);
	// }


  render() {
    console.log(this.props.node )

    return(
      <span>

         {
          (localStorage.getItem("list2").indexOf(this.props.node["node"].title) >= 0) &&
            <Tooltip title="Product exists at this level">
              <SendOutlined style={{ fontSize: '22px', color: '#000000' }} label="Leaf"  />   
            </Tooltip>
          }
           
        { (localStorage.getItem("list2").indexOf(this.props.node["node"].title) < 0) &&
          <Tooltip title="Make Leaf">
            <ShoppingTwoTone style={{ fontSize: '22px', color: '#08c' }} onClick={this.toggle} label="Leaf"  />
          </Tooltip>
        }

        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Make Leaf</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To make it leaf, add the Product to it.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <MButton style={{ color: '#08c' }} onClick={this.handleClose} color="primary">
              Cancel
            </MButton>
            <MButton style={{ color: '#08c' }} onClick={this.handleFormOpen} color="primary">
              Add Product
            </MButton>
          </DialogActions>
        </Dialog>
      

        { this.state.isOpen && 
            <Tooltip title="View Product">
              <SendOutlined style={{ fontSize: '22px', color: '#000000' }} label="View" onClick={() => history.push('/addproduct')} />
            </Tooltip>
        }

        <Dialog open={this.state.formOpen} onClose={this.handleFormClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add Product</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Fill the details.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              name="Name"
              id="Name"
              label="Name"
              type="text"
              onChange={this.onChange}
              fullWidth
            />
            <TextField
              margin="dense"
              name="Category"
              id="Category"
              label="Category"
              type="text"
              onChange={this.onChange}
              fullWidth
            />
            <TextField
              margin="dense"
              name="Brand"
              id="Brand"
              label="Brand"
              type="text"
              onChange={this.onChange}
              fullWidth
            />
            <TextField
              margin="dense"
              name="SubCategory1"
              id="SubCategory1"
              label="SubCategory1"
              type="text"
              onChange={this.onChange}
              fullWidth
            />
            <TextField
              margin="dense"
              name="SubCategory2"
              id="SubCategory2"
              label="SubCategory2"
              type="text"
              onChange={this.onChange}
              fullWidth
            />
            <TextField
              margin="dense"
              name="SubCategory3"
              id="SubCategory3"
              label="SubCategory3"
              type="text"
              onChange={this.onChange}
              fullWidth
            />
            <TextField
              margin="dense"
              name="Model"
              id="Model"
              label="Model"
              type="text"
              onChange={this.onChange}
              fullWidth
            />
            <TextField
              margin="dense"
              name="Description"
              id="Description"
              label="Description"
              type="text"
              onChange={this.onChange}
              fullWidth
            />
            <TextField
              margin="dense"
              name="Price"
              id="Price"
              label="Price"
              type="text"
              onChange={this.onChange}
              fullWidth
            />
            <TextField
              margin="dense"
              name="producturl"
              id="producturl"
              label="URL to buy this product"
              type="text"
              onChange={this.onChange}
              fullWidth
            />
            <br />
            <Input
              margin="dense"
              name="Photo"
              id="Photo"
              type="file"
              onChange={this.handleChange}
            />
            <img src={this.state.imageurl} alt="DealArena" height="100px" width="100px"/>
          </DialogContent>
          <DialogActions>
            <MButton style={{ color: '#08c' }} onClick={this.handleFormClose} color="primary">
              Cancel
            </MButton>
            <MButton style={{ color: '#08c' }} onClick={this.handleUpload} color="primary">
              Upload Photo First
            </MButton>
            <MButton style={{ color: '#08c' }} onClick={this.onSubmit} color="primary">
              Save All
            </MButton>
          </DialogActions>
        </Dialog>
      </span>
    );
  } 
}

export default SomeButtons;