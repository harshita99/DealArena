import 'bootstrap-css-only/css/bootstrap.min.css';
import React,{Component} from 'react';
import firebase from "./Config";
import history from './../history';
import Tree from "./tree";
// import Treee from "./classTree";
import { Tabs } from "antd";
const { TabPane } = Tabs;
const details=[];
var z=0;
class ShowProduct extends Component{
    constructor(props){
		super(props);
		this.logout = this.logout.bind(this);
		this.unsubscribe=null;
		this.state={
			numberofproducts:0,
			products:[]
		};
	}

	componentDidMount(){
		// window.location.reload(false);
		console.log("Component in Product Manager.");

		this.checkAuth();
		firebase.auth().onAuthStateChanged((productowner)=> {
			if (productowner) {
				firebase.firestore().collection("productOwnerDetails").doc(productowner.uid)
				  .get()
				  .then((doc)=> {
					this.setState({brand : doc.data().brand})
				  }).then((doc)=>{
					this.ref=firebase.firestore().collection("productOwnerDetails").where("BrandName","==",this.state.brand)
					this.unsubscribe=this.ref.onSnapshot(this.getDetails);
				// 	  .get()
				// 	  .then((doc)=> {
				// 		this.setState({category : doc.data().Category})
				// 		this.setState({brandN : doc.data().BrandName})
				// 	  })
				  })
				  .catch(function(error){
					console.log("Error getting particular document:", error);
					console.log(productowner.uid)
				  })
			}

			if (productowner) {
				firebase.firestore().collection("productOwnerDetails").doc(productowner.uid)
				  .get()
				  .then((doc)=>{
					// console.log(this.state.brand);
					this.ref=firebase.firestore().collection("tree")
					this.unsubscribe=this.ref.onSnapshot(this.onCollectionUpdate1);
					// console.log(this.ref.onSnapshot);
				  })
				  .catch(function(error){
					console.log("Error getting particular document:", error);
				  })
			}

			if (productowner) {
			  firebase.firestore().collection("productOwnerDetails").doc(productowner.uid)
				.get()
				.then((doc)=> {
				  this.setState({brand : doc.data().brand})
				  this.setState({category : doc.data().Category})
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
		console.log(tree1);
		localStorage.setItem('treeValue', JSON.stringify(tree1));
	}

	getDetails=(querySnapshot)=>{
		querySnapshot.forEach((doc)=>{
			this.setState({category : doc.data().Category})
			this.setState({brandN : doc.data().BrandName})


			sessionStorage.setItem('brandN', (doc.data().BrandName))
			sessionStorage.setItem('category', (doc.data().Category))
			details.push({
				brand: this.state.brandN,
				category: this.state.category
			})
		})
		this.setState({details});
	}
	
	onCollectionUpdate=(querySnapshot)=>{
		const products=[];
		querySnapshot.forEach((doc)=>{
			const {Model, Name, Description, Brand, Price, Expiry, Category, SubCategory1, SubCategory2, SubCategory3, Offer,imageurl, producturl}=doc.data();
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
				Model,
				SubCategory1,
				SubCategory2,
				SubCategory3,
				producturl
			});
		});
		this.setState({products});
	}

	checkAuth(){
		var produser = firebase.auth().currentUser;
		if(localStorage.getItem('usersession')){

		}
		else if(produser){
			localStorage.setItem('usersession', produser);
			console.log("User "+produser.uid+" is logged in with");
			history.push("/showproduct");
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

	update(u){
		var productId = u;
		localStorage.setItem('productsession', productId);
		history.push("/updateproduct");
	}

	delete(u){
		firebase.firestore().collection('productDetails').doc(u).delete().then(function(){
			console.log("Document deleted successfully!");
		}).catch(function(error){
			console.log("Error deleting document: ", error);
		});
	}

	render() {
		
		return (
			<div className="App body">
      			<div><br></br></div>
				
				<div className="row">
					<div className="col-lg-3 lol" >
						<div className="mb-4 pt-3 card card-small">
							<div className="border-bottom text-center card-header">
									<div className="mb-3 mx-auto">
										<img className="rounded-circle" src="" alt="" width="80"/>
									</div>
								<h4 className="mb-0" id="brand">Welcome! <br></br>{this.state.brand} Product Manager</h4>
								<br></br>

								<div>
									<button onClick={() => history.push('/addproduct')} className="mb-2 btn btn-outline-primary btn-sm btn-pill">
										<i className="material-icons mr-1">Add product</i>
									</button>

									<button onClick={this.logout} className="mb-2 btn btn-outline-primary btn-sm btn-pill">
										<i className="material-icons mr-1">LogOut</i>
									</button>				
								</div>
							</div>
						</div>
					</div>

					<div className="col-lg-8">
					<div className="row">
					<div className="lol ">
						<Tabs tabPosition="top" >			
							<TabPane  tab="Product Tree" key="1"> 
						
											<h4 style= {{marginLeft:"-30vw"}} >Manage Your Product Tree</h4>
											<Tree isleaf={false}/>
							</TabPane>
							
							<TabPane  tab="All Products" key="2" >
								<div className="row" style={{margin:"0.25vw"}}>	  
								<div className="col-sm-10">
								<span style={{visibility: "hidden" }}> {z=0}</span>
									<h5>Your Products:</h5>			  
									{this.state.products.map(product=>

										<div className="card-post mb-4 card card-small">
										<span style={{visibility: "hidden" }}> {z=z+1}</span>
										<span style={{visibility: "hidden" }}> {sessionStorage.setItem('numberofproducts', z )}</span>

											<div className="card-body">
												<h7 className="card-title">{product.Category} -{">"} {product.Brand} -{">"} {product.SubCategory1} -{">"} {product.Model}</h7>
												<h5 className="card-title">
													{product.Name}
												</h5>
												<img src= {product.imageurl} alt="DealArena" width="100px" height="100px"/>
												<h6 className="card-title"> {product.Description}</h6>
											</div>

											<div className="border-top d-flex card-footer" >
												<div className="card-post__author d-flex">
										
													<div className="d-flex flex-column justify-content-center ml-3">
														<span className="card-post__author-name">Rs.{product.Price}</span>
													</div>
												</div>
												<div className="my-auto ml-auto">
													<a href={product.producturl}> URL </a>
												</div>
											</div>

											<div>

												<button onClick={()=>this.update(product.key)} className="mb-2 btn btn-outline-warning btn-sm btn-pill">
													<i className="material-icons mr-1">Edit product</i>
												</button>

												<button onClick={()=>this.delete(product.key)} className="mb-2 btn btn-outline-danger btn-sm btn-pill">
													<i className="material-icons mr-1">Delete product</i>
												</button>
											</div>

										</div>

										)
									}
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

export default ShowProduct;