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

class ManageOffers extends Component{
    constructor(props){
		super(props);
		this.logout = this.logout.bind(this);
		this.unsubscribe=null;
		this.state={
			offers:[],
			open1: false,
			open: false,

			open2: false,
			discards: []
		};
        this.handleOpen = this.handleOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleOpen1 = this.handleOpen1.bind(this);
		this.handleClose1 = this.handleClose1.bind(this);
		this.handleOpen2 = this.handleOpen2.bind(this);
		this.handleClose2 = this.handleClose2.bind(this);
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
	
	handleOpen1(e) {
        this.setState({
            open1: true
        });
    }
    
    handleClose1(e) {
        this.setState({
            open1: false
        });
    }

	handleOpen2(e) {
        this.setState({
            open2: true
        });
    }
    
    handleClose2(e) {
        this.setState({
            open2: false
        });
	}
	
	componentDidMount(){
		this.checkAuth();
		firebase.auth().onAuthStateChanged((productowner)=> {
			if (productowner) {
				firebase.firestore().collection("productOwnerDetails").doc(productowner.uid).get()
				.then((doc)=> {
					this.setState({brand : doc.data().brand})
					sessionStorage.setItem('brandN', (doc.data().brand))
					sessionStorage.setItem('category', (doc.data().category))
				}).then((doc)=>{
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
					sessionStorage.setItem('brandN', (doc.data().brand))
					sessionStorage.setItem('category', (doc.data().category))
				}).then((doc)=>{
					// console.log("ref val in manage offer: ", firebase.firestore().collection("offerDetails").where("Brand","==",this.state.brand));
					this.ref=firebase.firestore().collection("discardedOffers").where("Brand","==",this.state.brand);
					this.unsubscribe=this.ref.onSnapshot(this.onCollectionUpdate3);
				})
				.catch(function(error){
					console.log("Error getting document:", error);
					console.log(productowner.uid)
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

	onCollectionUpdate3=(querySnapshot)=>{
		const discards=[];
		querySnapshot.forEach((doc)=>{
			const {Model, Name, Description, Brand, Price, Expiry, Category, Offer, imageurl, producturl, SubCategory1, SubCategory2, SubCategory3}=doc.data();
			discards.push({
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
		this.setState({discards});
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
	}

	// addoffer(){
	// 	products.map(p=>{
	// 		var Category = p.Category
	// 		var SubCategory1 = p.SubCategory1
	// 		var SubCategory2 = p.SubCategory2
	// 		var SubCategory3 = p.SubCategory3
	// 		var Model = p.Model
	// 		var Description = p.Description
	// 		var Name = p.Name
	// 		var Offer = O
	// 		var Expiry = E
	// 		var Brand = p.Brand
	// 		var imageurl = p.imageurl
	// 		var producturl = p.producturl
	// 		var Price = p.Price
	  
	// 		firebase.firestore().collection("offerDetails").add({
	// 		  Model, Category, Description, Name, Offer, Expiry, Brand, SubCategory1, SubCategory2, SubCategory3, imageurl, Price, producturl
	// 		})
	// 		.catch((error)=>{
	// 		  console.error("Error adding document:",error);
	// 		});
	// 		return null;
	// 	})
	// 	console.log("Products: ", products);
	// 	alert('Offers added');
	// 	history.push("/manageoffers");
	// }

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

	restore(p) {
		var Category = p.Category
		var SubCategory1 = p.SubCategory1
		var SubCategory2 = p.SubCategory2
		var SubCategory3 = p.SubCategory3
		var Model = p.Model
		var Description = p.Description
		var Name = p.Name
		var Offer = p.Offer
		var Expiry = p.Expiry
		var Brand = p.Brand
		var imageurl = p.imageurl
		var producturl = p.producturl
		var Price = p.Price
		var time = firebase.firestore.FieldValue.serverTimestamp()
	
		firebase.firestore().collection("offerDetails").add({
			Model, Category, Description, Name, Offer, Expiry, Brand, SubCategory1, SubCategory2, SubCategory3, imageurl, Price, producturl, time
		}).then(()=>{
			console.log("Offer restored successfully!");
		})
		.catch((error)=>{
			console.error("Error restoring document:", error);
		});

		firebase.firestore().collection('discardedOffers').doc(p.key).delete().then(function(){
			alert("Offer restored successfully!");
			console.log("Offer deleted successfully!");
		}).catch(function(error){
			console.log("Error restoring document: ", error);
		});

		this.setState({
            open2: false
        });
	}
	delete(p){
		firebase.firestore().collection('discardedOffers').doc(p.key).delete().then(function(){
			alert("Offer deleted successfully!");
			console.log("Offer deleted successfully!");
		}).catch(function(error){
			console.log("Error deleting document: ", error);
		});

		this.setState({
            open1: false
        });
	}

	discard(p){
		var Category = p.Category
		var SubCategory1 = p.SubCategory1
		var SubCategory2 = p.SubCategory2
		var SubCategory3 = p.SubCategory3
		var Model = p.Model
		var Description = p.Description
		var Name = p.Name
		var Offer = p.Offer
		var Expiry = p.Expiry
		var Brand = p.Brand
		var imageurl = p.imageurl
		var producturl = p.producturl
		var Price = p.Price
		// var time = p.time
		var discardTime = firebase.firestore.FieldValue.serverTimestamp()
	
		firebase.firestore().collection("discardedOffers").add({
			Model, Category, Description, Name, Offer, Expiry, Brand, SubCategory1, SubCategory2, SubCategory3, imageurl, Price, producturl, discardTime
		}).then(()=>{
			console.log("Offer added to discard pile successfully!");
		})
		.catch((error)=>{
			console.error("Error discarding document:", error);
		});

		firebase.firestore().collection('offerDetails').doc(p.key).delete().then(function(){
			alert("Offer discarded successfully!");
			console.log("Offer discarded successfully!");
		}).catch(function(error){
			console.log("Error discarding document: ", error);
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
							<TabPane tab="Product Tree " key="1" >
								<h4 style= {{marginLeft:"-30vw"}} >Product Tree</h4>
								<Released isleaf={false}/>
							</TabPane>

							<TabPane tab="Products" key="3" >
								<Add/>
							</TabPane>
							
							<TabPane tab="All Offers" key="2" >
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
												<i className="material-icons mr-1">Discard Offer</i> </button>

												<Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
													<DialogTitle id="form-dialog-title">Discard Offer</DialogTitle>
													<DialogContent>
														<DialogContentText>
															Are you sure you want to discard the offer? It will be added to a collection of discarded offers.
														</DialogContentText>
													</DialogContent>
													<DialogActions>
														<Button style={{ color: '#08c' }} onClick={this.handleClose} color="primary">
															Cancel
														</Button>
														<Button style={{ color: '#08c' }} onClick={()=>this.discard(offer)} color="primary">
															Discard
														</Button>
													</DialogActions>
												</Dialog>
											</div>
										</div>
									)}
								</div>
								</div>
							</TabPane>

							<TabPane tab="Discarded Offers" key="4" >
								<div className="row" style={{margin:"0.25vw"}}>	  
								<div className="col-sm-10">
									<h5>Your Discarded Offers:</h5>			  
									{this.state.discards.map(offer=>
										<div className="card-post mb-4 card card-small">
											<div className="card-body">
												<h6> Expired </h6>
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
											<div className="d-flex flex-column justify-content-center ml-3"><span className="card-post__author-name">Rs.{offer.Price}</span></div></div><div className="my-auto ml-auto"><a href={offer.producturl}> URL</a></div></div>
									
											<div>
												<button onClick={this.handleOpen2} className="mb-2 btn btn-outline-warning btn-sm btn-pill">
												<i className="material-icons mr-1">Restore Offer</i> </button>

												<button onClick={this.handleOpen1} className="mb-2 btn btn-outline-danger btn-sm btn-pill">
												<i className="material-icons mr-1">Delete Offer</i> </button>

												<Dialog open={this.state.open1} onClose={this.handleClose1} aria-labelledby="form-dialog-title">
													<DialogTitle id="form-dialog-title">Delete Offer</DialogTitle>
													<DialogContent>
														<DialogContentText>
															Are you sure you want to permanently delete the offer? You cannot restore the offer.
														</DialogContentText>
													</DialogContent>
													<DialogActions>
														<Button style={{ color: '#08c' }} onClick={this.handleClose1} color="primary">
															Cancel
														</Button>
														<Button style={{ color: '#08c' }} onClick={()=>this.delete(offer)} color="primary">
															Delete
														</Button>
													</DialogActions>
												</Dialog>

												<Dialog open={this.state.open2} onClose={this.handleClose2} aria-labelledby="form-dialog-title">
													<DialogTitle id="form-dialog-title">Restore Offer</DialogTitle>
													<DialogContent>
														<DialogContentText>
															Are you sure you want to restore the offer? It will be available to users.
															Note: Reset its expiry if needed.
														</DialogContentText>
													</DialogContent>
													<DialogActions>
														<Button style={{ color: '#08c' }} onClick={this.handleClose2} color="primary">
															Cancel
														</Button>
														<Button style={{ color: '#08c' }} onClick={()=>this.restore(offer)} color="primary">
															Restore
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