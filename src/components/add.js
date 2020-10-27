import 'bootstrap-css-only/css/bootstrap.min.css';
import React,{Component} from 'react';
import firebase from "./Config";
import history from './../history';
import TreeCheck1 from './treeCheck1';
import { MDBInput} from 'mdbreact';


class add extends Component{
    constructor(props){
		super(props);
		this.logout = this.logout.bind(this);
		this.unsubscribe=null;
		this.state={
			products:[]
		};
	}

	onInput=(e)=>{
		const state=this.state;
		state[e.target.name]=e.target.value;
		this.setState(state);
	  }
	
	componentDidMount(){
		this.checkAuth();
		firebase.auth().onAuthStateChanged((productowner)=>{
			if (productowner){
			  firebase.firestore().collection("productOwnerDetails").doc(productowner.uid)
				.get()
				.then((doc)=> {
				  this.setState({brand : doc.data().brand})
				}).then((doc)=>{
					this.ref=firebase.firestore().collection("productDetails").where("Brand","==",this.state.brand);
					this.unsubscribe=this.ref.onSnapshot(this.onCollectionUpdate);
				})
				.catch(function(error){
				  console.log("Error getting document:", error);
				})
			}
		})
		history.push("/add");
	}

	onCollectionUpdate=(querySnapshot)=>{
		const products=[];
		const brand=[];
		querySnapshot.forEach((doc)=>{
			const {Name, Description,Brand, Price, Expiry, Category, Offer,imageurl, producturl}=doc.data();
			brand.push(Brand);
            products.push({
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
                producturl,
                
            });
        });
		this.setState({products});
		this.setState(brand);
	}

	checkAuth(){
		var produser = firebase.auth().currentUser;
		if(localStorage.getItem('usersession')){

		}
		else if(produser){
			localStorage.setItem('usersession', produser);
			console.log("User "+produser.uid+" is logged in with");
			history.push("/add");

		}
		else{
			console.log("Successfully logged out");
			history.push("/");
		}
	}

	logout(){
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

	addoffer(u){
		var productId = u;
		localStorage.setItem('productsession', productId);
		history.push("/addoffer");
	}

	render() {
		console.log(this.state);
		return (
			<div>
				<div className="row">

				<div className="col-lg-3">

				<div className="mb-4 pt-3 card card-small">
					<div className="border-bottom text-center card-header">
						<div className="mb-3 mx-auto">
							<img className="rounded-circle" src="" alt="" width="80"/>
						</div>
						<h4 className="mb-0" id="brand">{this.state.brand}</h4>
						<br></br>

						<div>	
							<button onClick={() => history.push('/manageoffers')} className="mb-2 btn btn-outline-primary btn-sm btn-pill">
							<i className="material-icons mr-1">Home</i> </button>
					
							<button onClick={this.logout} className="mb-2 btn btn-outline-primary btn-sm btn-pill">
							<i className="material-icons mr-1">LogOut</i> </button>				
						</div>
					</div>

					<br></br>
					<br></br>

					<div>
						<h6><b>To add an offer at intermediate node - </b></h6>
						{<TreeCheck1  brand={this.state.brand} Expiry={this.state.Expiry} Offer={this.state.Offer} products={this.state.products}/>}
					</div>

					<div>
						<MDBInput label="Offer details" group type="text" id="Offer" name="Offer" validate onChange={this.onInput}/>
						<MDBInput label="Expiry date" group type="text" id="Expiry" name="Expiry" validate onChange={this.onInput}/>
					</div>

				</div>
				</div>
			
			<div className="col-lg-8">
				<div className="row">	  
				<div className="col-sm-5">			  
					{this.state.products.map(product=>
						<div className="card-post mb-4 card card-small">
							<div className="card-body">
								<h5 className="card-title">{product.Name}</h5>
								<img src= {product.imageurl} alt="DealArena" width="100px" height="100px"/>
								<h5 className="card-title"> {product.Brand}</h5>
								<h5 className="card-title"> {product.Description}</h5>
								<h5 className="card-title">Category: {product.Category}</h5>
							</div>

							<div className="border-top d-flex card-footer">
								<div className="card-post__author d-flex col-sm-8">
									<div className="d-flex flex-column justify-content-center ml-3">
										<span className="card-post__author-name">
											Rs.{product.Price}
										</span>
									</div>
								</div>

								<div className="card-post__author d-flex col-sm-8">
									<div className="d-flex flex-column justify-content-center ml-3">
										<button onClick={()=>this.addoffer(product.key)} className="mb-2 btn btn-outline-success btn-sm btn-pill">
											<i className="material-icons mr-1">Add offer</i> 
										</button>
									</div>
								</div>
							</div>
						</div>
					)};
				</div>
				</div>
			</div>

			</div>
						</div>

		)
	}
}

export default add;