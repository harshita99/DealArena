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

var Model = '';
var Name = '';
var Description = ''; 
var Brand = '';
var Price = '';
var Category = '';
var imageurl = '';
var producturl = '';
var SubCategory1 = '';
var SubCategory2 = '';
var SubCategory3 = '';
var productId = '';

class SomeButtons extends React.Component {

  // const {Model, Name, Description, Brand, Price, Category, imageurl, producturl, SubCategory1, SubCategory2, SubCategory3}
  constructor(props) {
    super(props);
    this.state = { 
      issOpen: true,
      open: false,
      formOpen: false,
      viewOpen: false,
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
      producturl:"",
      openn: false,
      isOpen: false
    };
    this.toggle = this.toggle.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleClose1 = this.handleClose1.bind(this);
    this.handleFormOpen = this.handleFormOpen.bind(this);
    this.handleFormClose = this.handleFormClose.bind(this);
    this.handleViewOpen = this.handleViewOpen.bind(this);
    this.handleViewClose = this.handleViewClose.bind(this);
    this.viewProduct = this.viewProduct.bind(this);
    this.handleOpenn = this.handleOpenn.bind(this);
    this.handleClosee = this.handleClosee.bind(this);
    this.handleIsOpen = this.handleIsOpen.bind(this);
		this.handleIsClose = this.handleIsClose.bind(this);
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

  handleIsOpen(e) {
    this.setState({
      isOpen: true
    });
    this.viewProduct();
  }

  handleIsClose(e) {
    this.setState({
      isOpen: false
    });
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

  handleViewOpen(e) {
    this.setState({
      viewOpen: true
    });
  }

  handleViewClose(e) {
    this.setState({
      viewOpen: false
    });
    this.setState({
      isOpen: false
    });
  }

  handleOpenn() {
    this.setState({
        openn: true
    });
  }
    
  handleClosee(e) {
    this.setState({
        openn: false
    });
  }
  
  toggle(e) {
    this.setState(prevState => ({
      issOpen: !prevState.issOpen
    }));

    if (!this.state.issOpen)
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

  update(){
		localStorage.setItem('productsession', sessionStorage.getItem("productId"));
		history.push("/updateproduct");
	}

	delete(){
		firebase.firestore().collection('productDetails').doc(sessionStorage.getItem("productId")).delete().then(function(){
			alert("Product deleted successfully!");
			console.log("Product deleted successfully!");
		}).catch(function(error){
			console.log("Error deleting document: ", error);
		});

		this.setState({
      openn: false
    });

    this.setState({
      viewOpen: false
    });

    this.setState({
      isOpen: false
    });   
	}

  viewProduct = (e) => {
    var Model1 = this.props.node["node"].title;
    console.log("Model: ", Model1)
    firebase.firestore().collection("productDetails").where("Brand","==",sessionStorage.getItem('brandN')).where("Model","==",Model1).onSnapshot(this.onCollectionUpdate)
  }
  
  onCollectionUpdate=(querySnapshot)=>{
		querySnapshot.forEach((doc)=>{
      console.log("doc: ", doc)
      Category = doc.data().Category
      SubCategory1 = doc.data().SubCategory1
      SubCategory2 = doc.data().SubCategory2
      SubCategory3 = doc.data().SubCategory3
      Model = doc.data().Model
      Description = doc.data().Description
      Name = doc.data().Name
      Brand = doc.data().Brand
      imageurl = doc.data().imageurl
      producturl = doc.data().producturl
      Price = doc.data().Price
      productId = doc.id
      console.log(productId)

      sessionStorage.setItem("Category", Category);
      sessionStorage.setItem("SubCategory1", SubCategory1);
      sessionStorage.setItem("SubCategory2", SubCategory2);
      sessionStorage.setItem("SubCategory3", SubCategory3);
      sessionStorage.setItem("Model", Model);
      sessionStorage.setItem("Description", Description);
      sessionStorage.setItem("Name", Name);
      sessionStorage.setItem("Brand", Brand);
      sessionStorage.setItem("imageurl", imageurl);
      sessionStorage.setItem("producturl", producturl);
      sessionStorage.setItem("Price", Price);
      sessionStorage.setItem("productId", productId);
    })
	}

  render() {
    return(
      <span>
        { (localStorage.getItem("list2").indexOf(this.props.node["node"].title) >= 0) &&
          <Tooltip title="Product exists at this level">
            <SendOutlined style={{ fontSize: '22px', color: '#000000' }} onClick={this.handleIsOpen} label="Leaf"  />   
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

        {/* { this.state.issOpen && 
            <Tooltip title="View Product">
              <SendOutlined style={{ fontSize: '22px', color: '#000000' }} label="View" onClick={() => history.push('/addproduct')} />
            </Tooltip>
        } */}

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

        <Dialog open={this.state.isOpen} onClose={this.handleIsClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Product Exists</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Product Exists at this Model Level. Do you want to view it?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <MButton style={{ color: '#08c' }} onClick={this.handleIsClose} color="primary">
              Cancel
            </MButton>
            <MButton style={{ color: '#08c' }} onClick={this.handleViewOpen} color="primary">
              View Product
            </MButton>
          </DialogActions>
        </Dialog>

        <Dialog open={this.state.viewOpen} onClose={this.handleViewClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">View Product</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <div className="card-post mb-4 card card-small">
                <div className="card-body">
                  <h7 className="card-title" style= {{marginLeft:"5vw", marginRight:"5vw"}}>{sessionStorage.getItem("Category")} -{">"} {sessionStorage.getItem("Brand")} -{">"} {sessionStorage.getItem("SubCategory1")} -{">"} {sessionStorage.getItem("Model")}</h7>
                  <h5 className="card-title" style= {{marginLeft:"12vw", marginRight:"12vw"}}>
                    {sessionStorage.getItem("Name")}
                  </h5>
                  <img src= {sessionStorage.getItem("imageurl")} alt="DealArena" width="100px" height="100px" style= {{marginLeft:"14vw", marginRight:"14vw"}}/> <br />
                  <h6 className="card-title" style= {{marginLeft:"10vw", marginRight:"10vw"}}> {sessionStorage.getItem("Description")}</h6>
                </div>

                <div className="border-top d-flex card-footer" >
                  <div className="card-post__author d-flex">
                    <div className="d-flex flex-column justify-content-center ml-3">
                      <span className="card-post__author-name">Rs.{sessionStorage.getItem("Price")}</span>
                    </div>
                  </div>
                  <div className="my-auto ml-auto">
                    <a href={sessionStorage.getItem("producturl")}> URL </a>
                  </div>
                </div>
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <MButton style={{ color: '#08c' }} onClick={this.handleViewClose} color="primary">
              Exit
            </MButton>
            <MButton style={{ color: '#08c' }} onClick={()=>this.update()} color="primary">
              Edit Product
            </MButton>
            <MButton style={{ color: '#08c' }} onClick={()=>this.handleOpenn()} color="primary">
              Delete Product
            </MButton>
          </DialogActions>
        </Dialog>

        <Dialog open={this.state.openn} onClose={this.handleClosee} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Delete Product</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete the product?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <MButton style={{ color: '#08c' }} onClick={this.handleClosee} color="primary">
              Cancel
            </MButton>
            <MButton style={{ color: '#08c' }} onClick={()=>this.delete()} color="primary">
              Delete
            </MButton>
          </DialogActions>
        </Dialog>

      </span>
    );
  } 
}

export default SomeButtons;