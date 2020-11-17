import 'bootstrap-css-only/css/bootstrap.min.css';
import React,{Component} from 'react';
import firebase from "./Config";
import history from './../history';
import Released from "./released";
import Add from "./add";
import { Tabs } from "antd";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const { TabPane } = Tabs;
const products=[];
var E = [];
var O = [];

class ManageOffers extends Component{
    constructor(props){
		super(props);
		this.logout = this.logout.bind(this);
		this.unsubscribe=null;
		this.state={
			offers:[],
			open: false
		};
        this.handleOpen = this.handleOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
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

	componentDidMount(){
		this.checkAuth();
		console.log("Component in Offer Manager.");
		firebase.auth().onAuthStateChanged((productowner)=> {
			if (productowner) {
				firebase.firestore().collection("productOwnerDetails").doc(productowner.uid).get()
				.then((doc)=> {
					this.setState({brand : doc.data().brand})
					sessionStorage.setItem('brandN', (doc.data().brand))
					sessionStorage.setItem('category', (doc.data().category))
				}).then((doc)=>{
					console.log("ref val in manage offer: ", firebase.firestore().collection("offerDetails").where("Brand","==",this.state.brand));
					this.ref=firebase.firestore().collection("offerDetails").where("Brand","==",this.state.brand);
					this.unsubscribe=this.ref.onSnapshot(this.onCollectionUpdate);
				})
				.catch(function(error){
					console.log("Error getting document:", error);
					console.log(productowner.uid)
				})
			}

			if (productowner) {
				firebase.firestore().collection("productOwnerDetails").doc(productowner.uid)
				.get()
				.then((doc) => {
					this.ref=firebase.firestore().collection("released")
					this.unsubscribe=this.ref.onSnapshot(this.onCollectionUpdate1);
				})
				.catch(function(error){
					console.log("Error getting particular document:", error);
				})
			}

			if (productowner) {
				firebase.firestore().collection("productOwnerDetails").doc(productowner.uid).get()
				.then((doc)=> {
					this.setState({brand : doc.data().brand})
				}).then((doc)=>{
					this.ref=firebase.firestore().collection("productDetails").where("Brand","==",this.state.brand);
					this.unsubscribe=this.ref.onSnapshot(this.onCollectionUpdate2);
				})
				.catch(function(error){
					console.log("Error getting document:", error);
					console.log(productowner.uid)
				})
			}
		})
	}

	onCollectionUpdate1=(querySnapshot)=>{
		const tree1=[];
		querySnapshot.forEach((doc)=>{
			const {treeData}=doc.data();
			if(doc.id === this.state.brand){
				tree1.push({
					treeData
				});
			}
		});
		this.setState({tree1});
		localStorage.setItem('treeValue1', JSON.stringify(tree1));
	}

	onCollectionUpdate=(querySnapshot)=>{
		const offers=[];
		querySnapshot.forEach((doc)=>{
			const {Model, Name, Description, Brand, Price, Expiry, Category, Offer, imageurl, producturl, SubCategory1, SubCategory2, SubCategory3}=doc.data();
			offers.push({
				key:doc.id,
				doc,
				Name,
				Brand,
				Description,
				Price,
				Category,
				Expiry,
				Offer,
				imageurl,
				Model,
				SubCategory1,
				SubCategory2,
				SubCategory3,
				producturl
			});
		});
		this.setState({offers});
	}

	onCollectionUpdate2=(querySnapshot)=>{
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
		console.log(this.state.Expiry);
		console.log(this.state.Offer);
		E = this.state.Expiry;
		O = this.state.Offer;
	}

	addoffer(){
		products.map(p=>{
			var Category = p.Category
			var SubCategory1 = p.SubCategory1
			var SubCategory2 = p.SubCategory2
			var SubCategory3 = p.SubCategory3
			var Model = p.Model
			var Description = p.Description
			var Name = p.Name
			var Offer = O
			var Expiry = E
			var Brand = p.Brand
			var imageurl = p.imageurl
			var producturl = p.producturl
			var Price = p.Price
	  
			firebase.firestore().collection("offerDetails").add({
			  Model, Category, Description, Name, Offer, Expiry, Brand, SubCategory1, SubCategory2, SubCategory3, imageurl, Price, producturl
			})
			.catch((error)=>{
			  console.error("Error adding document:",error);
			});
			return null;
		})
		console.log("Products: ", products);
		alert('Offers added');
		history.push("/manageoffers");
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

	logout() {
		firebase.auth().signOut()
		.then(function(){
			localStorage.removeItem('usersession');
			console.log("successfully logged out");
			history.push("/");
		})
		.catch(function(error){
			console.log(error);
		});
	}

	update(u){
		var offerId = u;
		localStorage.setItem('offersession', offerId);
		history.push("/updateoffer");
	}

	delete(u){
		firebase.firestore().collection('offerDetails').doc(u).delete().then(function(){
			console.log("Document deleted successfully!");
			alert("Offer deleted successfully!");
		}).catch(function(error){
			console.log("Error deleting document: ", error);
		});

		this.setState({
            open: false
        });
	}

	render() {
  		return (
			<div className="App body">
      			<div><br></br></div>
				
				<div className="row">
					<div className="col-lg-3 lol"><div className="mb-4 pt-3 card card-small">
					<div className="border-bottom text-center card-header">
						<div className="mb-3 mx-auto">
							<img className="rounded-circle" src="" alt="" width="80"/>
						</div>
						<h4 className="mb-0" id="brand"> Welcome! <br></br> {this.state.brand} Offer Manager </h4>
						<br></br>

                        <div>
							<button onClick={() => history.push('/add')} className="mb-2 btn btn-outline-primary btn-sm btn-pill">
								<i className="material-icons mr-1">Add Offer</i> </button>
                        
                            <button onClick={this.logout} className="mb-2 btn btn-outline-primary btn-sm btn-pill">
                                <i className="material-icons mr-1">LogOut</i> </button>	                        
                        </div>			
					</div>
					</div>
					</div>

					<div className="col-lg-8">
					<div className="row">
					<div className="lol ">
						<Tabs tabPosition="top" >			
							<TabPane  tab="Product Tree " key="1" >
								<h4 style= {{marginLeft:"-30vw"}} >Product Tree</h4>
								<Released isleaf={false}/>
							</TabPane>

							<TabPane  tab="Products" key="3" >
								<Add/>
							</TabPane>
							
							<TabPane  tab="All Offers" key="2" >
								<div className="row" style={{margin:"0.25vw"}}>	  
								<div className="col-sm-10">
									<h5>Your Offers:</h5>			  
									{this.state.offers.map(offer=>
										<div className="card-post mb-4 card card-small">
											<div className="card-body">
												<h7 className="card-title">{offer.Category} -{">"} {offer.Brand} -{">"} {offer.SubCategory1} -{">"} {offer.Model}</h7>
												<h5 className="card-tit0le">
													{offer.Name}
												</h5>
												<img src= {offer.imageurl} alt="DealArena" width="100px" height="100px"/> <br />
												<h6 className="card-title"> {offer.Description}</h6>
											</div>
						
											<div className="border-top d-flex card-footer">
											<div className="card-post__author d-flex">
											<a href="/" className="card-post__author-avatar card-post__author-avatar--small" >
												Offer: {offer.Offer} </a>
											<div className="d-flex flex-column justify-content-center ml-3"><span className="card-post__author-name">Rs.{offer.Price}</span><small className="text-muted"> Offer expires:{offer.Expiry}</small></div></div><div className="my-auto ml-auto"><a href={offer.producturl}> URL</a></div></div>
									
											<div>
												<button onClick={()=>this.update(offer.key)} className="mb-2 btn btn-outline-warning btn-sm btn-pill">
												<i className="material-icons mr-1">Update Offer</i> </button>

												<button onClick={this.handleOpen} className="mb-2 btn btn-outline-danger btn-sm btn-pill">
												<i className="material-icons mr-1">Delete Offer</i> </button>

												<Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
													<DialogTitle id="form-dialog-title">Delete Offer</DialogTitle>
													<DialogContent>
														<DialogContentText>
															Are you sure you want to delete the offer?
														</DialogContentText>
													</DialogContent>
													<DialogActions>
														<Button style={{ color: '#08c' }} onClick={this.handleClose} color="primary">
															Cancel
														</Button>
														<Button style={{ color: '#08c' }} onClick={()=>this.delete(offer.key)} color="primary">
															Delete
														</Button>
													</DialogActions>
												</Dialog>
											</div>
										</div>
									)}
								</div>
								</div>
							</TabPane>	
						</Tabs>
					</div>
					</div>
					</div>
				</div>
			</div>	
  		)
	}
}

export default ManageOffers;