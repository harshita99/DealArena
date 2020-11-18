import 'bootstrap-css-only/css/bootstrap.min.css';
import React from 'react';
import firebase from "./Config";
import history from './../history';
import 'antd/dist/antd.css';
import { PlusCircleOutlined } from '@ant-design/icons';
import MButton from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Tooltip } from 'antd';

const products=[];

class ClassAllBrand extends React.Component {

    constructor(props) {
        super(props);
        this.handleOpen = this.handleOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.addoffer = this.addoffer.bind(this);
    
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
			producturl:"",
			open: false
        }
    }

    componentDidMount(){
		this.checkAuth();
		firebase.auth().onAuthStateChanged((productowner)=> {
			if (productowner) {
				firebase.firestore().collection("productOwnerDetails").doc(productowner.uid).get()
				.then((doc)=> {
					this.setState({brand : doc.data().brand})
				}).then((doc)=>{
					this.ref=firebase.firestore().collection("productDetails").where("Brand","==",this.state.brand);
					this.unsubscribe=this.ref.onSnapshot(this.onCollectionUpdate);
				})
				.catch(function(error){
					console.log("Error getting document:", error);
					console.log(productowner.uid)
				})
			}
		})
	}

	onCollectionUpdate=(querySnapshot)=>{
		querySnapshot.forEach((doc)=>{
			const {Model, Name, Description, Brand, Price, Category, imageurl, producturl, SubCategory1, SubCategory2, SubCategory3}=doc.data();
			products.push({
				key:doc.id,
				doc,
				Name,
				Brand,
				Description,
				Price,
				Category,
				imageurl,
				Model,
				SubCategory1,
				SubCategory2,
				SubCategory3,
				producturl
			});
		});
		console.log(products);
		this.setState({products});
	}

	onInput=(e)=>{
		const state=this.state;
		state[e.target.name]=e.target.value;
		this.setState(state);
	}
    
    handleOpen(e) {
        this.setState({
            open: true
        });
    }
    
    handleClose(e) {
        this.setState({
            open: false
        });
    }

    addoffer = (e) => {
		products.map(p=>{
			var Category = p.Category
			var SubCategory1 = p.SubCategory1
			var SubCategory2 = p.SubCategory2
			var SubCategory3 = p.SubCategory3
			var Model = p.Model
			var Description = p.Description
			var Name = p.Name
			var Offer = this.state.Offer
			var Expiry = this.state.Expiry
			var Brand = p.Brand
			var imageurl = p.imageurl
			var producturl = p.producturl
			var Price = p.Price
			var time = firebase.firestore.FieldValue.serverTimestamp()
	  
			firebase.firestore().collection("offerDetails").add({
			  Model, Category, Description, Name, Offer, Expiry, Brand, SubCategory1, SubCategory2, SubCategory3, imageurl, Price, producturl, time
			})
			.catch((error)=>{
			  console.error("Error adding document:",error);
			});
			return null;
		})
		console.log("Products: ", products);
        alert('Offers added');
        this.setState({
            open: false
        });
		// history.push("/manageoffers");
	}

	checkAuth(){
		var produser = firebase.auth().currentUser;
		if(localStorage.getItem('usersession')){

		}
		else if(produser) {
			localStorage.setItem('usersession', produser);
			console.log("User "+ produser.uid +" is logged in with");
			history.push("/manageoffers");
		}
		else {
			console.log("Successfully logged out");
			history.push("/");
		}
	}
  
    render() {
        return(
            <span>
				<Tooltip title="Add offer at Level 2 (on all brand products)">
					<PlusCircleOutlined style={{ fontSize: '22px', color: '#08c' }} 
						label="Add" onClick={this.handleOpen} 
					/> {" "}
				</Tooltip>

                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Offer on all Products</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Fill the details.
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    name="Offer"
                    id="Offer"
                    label="Offer Details"
                    type="text"
                    onChange={this.onInput}
                    fullWidth
                  />
                  <TextField
                    margin="dense"
                    name="Expiry"
                    id="Expiry"
                    label="Expiry Date"
                    type="text"
                    onChange={this.onInput}
                    fullWidth
                  />
                </DialogContent>
                <DialogActions>
                  <MButton style={{ color: '#08c' }} onClick={this.handleClose} color="primary">
                    Cancel
                  </MButton>
                  <MButton style={{ color: '#08c' }} onClick={this.addoffer} color="primary">
                    Add Offer
                  </MButton>
                </DialogActions>
                </Dialog>
            </span>
        );
    } 
}

export default ClassAllBrand;