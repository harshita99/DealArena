import React from 'react';
import firebase from "./Config";
import { Tooltip } from 'antd';
import 'antd/dist/antd.css';
import history from './../history';
import { ShoppingTwoTone, SendOutlined, setTwoToneColor, getTwoToneColor } from '@ant-design/icons';
import MButton from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const Button = (props) => {  
  return (
    <Tooltip title="Make Leaf">
      <ShoppingTwoTone style={{ fontSize: '22px', color: '#08c' }} label="Leaf" onClick={props.toggle} /> {" "}
    </Tooltip>
  )
}

class SomeButtons extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isOpen: true }
    this.toggle = this.toggle.bind(this);
    this.state = { open: false };
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = { formOpen: false };
    this.handleFormOpen = this.handleFormOpen.bind(this);
    this.handleFormClose = this.handleFormClose.bind(this);

    this.state={
      Name:"",
      Description:"",
      Price:"",
      Category:"",
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

  handleFormOpen(e) {
    this.setState({
        formOpen: true
    });
  }

  handleFormClose(e) {
    this.setState({
        formOpen: false
    });
    this.handleClose();
  }
  
  toggle(e) {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));

    console.log(getTwoToneColor);

    if (!this.state.isOpen)
    {
      this.handleClickOpen();
      setTwoToneColor("black");
    }

    else
    {
      setTwoToneColor("#08c");
    }
  }
  
  onChange=(e)=>{
    const state=this.state;
    state[e.target.name]=e.target.value;
    this.setState(state);
  }

  onSubmit=(e)=>{
    e.preventDefault();
    const {Name, Description, Price, Category, SubCategory1, SubCategory2, SubCategory3, Brand,imageurl,producturl}=this.state;
    firebase.firestore().collection("productDetails").add({
      Name,
      Brand,
      Description,
      Price,
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
        SubCategory1:"",
        SubCategory2:"",
        SubCategory3:"",
        imageurl:"",
        producturl:""
      });
      // this.props.history.push("/showproduct");
      this.handleFormClose();
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


  render() {
    // const {Name, Description, Price, Category, SubCategory, Brand, producturl}=this.state;

    return(
      <span>
        <Button 
          toggle={this.toggle}
        />

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

        {this.state.isOpen && 
            <Tooltip title="View Product">
              <SendOutlined style={{ fontSize: '22px', color: '#08c' }} label="View" onClick={() => history.push('/addproduct')} />
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