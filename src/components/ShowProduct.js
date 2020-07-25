import 'bootstrap-css-only/css/bootstrap.min.css';
import React,{Component} from 'react';
import firebase from "./Config";
import history from './../history';

class ShowProduct extends Component{
    constructor(props){
		super(props);
		this.logout = this.logout.bind(this);
		this.unsubscribe=null;
		this.state={
			products:[]
		};
	}

	componentDidMount(){
		this.checkAuth();
		firebase.auth().onAuthStateChanged((productowner)=> {

			if (productowner) {

			  firebase.firestore().collection("productOwnerDetails").doc(productowner.uid)
				.get()
				.then((doc)=> {
				  console.log("Document data:", doc.data().name);
				  console.log("Document data:", doc.data().brand);
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
		}
	)
	console.log("yo")
		history.push("/showproduct");
	}

	onCollectionUpdate=(querySnapshot)=>{
		const products=[];
		querySnapshot.forEach((doc)=>{
			// console.log(doc.id);
			const {Name, Description,Brand, Price, Expiry, Category, Offer,imageurl, producturl}=doc.data();
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

	}

	checkAuth(){
		var produser = firebase.auth().currentUser;
		if(localStorage.getItem('usersession')){

		}
		else if(produser){
			localStorage.setItem('usersession', produser);
			console.log("User "+produser.uid+" is logged in with");
			history.push("/productownerhome");

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
		<div>

<div className="row">
		<div className="col-lg-3"><div className="mb-4 pt-3 card card-small">
            <div className="border-bottom text-center card-header">
                <div className="mb-3 mx-auto">
                    <img className="rounded-circle" src="" alt="" width="80"/>
                </div>
                    <h4 className="mb-0" id="brand">{this.state.brand}</h4>
                    <br></br>

                    <div>
                        <button onClick={() => history.push('/addproduct')} className="mb-2 btn btn-outline-primary btn-sm btn-pill">
                        <i className="material-icons mr-1">Add product</i> </button>	
                        <button onClick={() => history.push('/productownerhome')} className="mb-2 btn btn-outline-primary btn-sm btn-pill">
                        <i className="material-icons mr-1">Home</i> </button>
					</div>
					<div>
                        <button onClick={this.logout} className="mb-2 btn btn-outline-primary btn-sm btn-pill">
                        <i className="material-icons mr-1">LogOut</i> </button>				
                    </div>
                </div>
            </div>
		</div>
		
			<div className="col-lg-8">
			<div className="row">	  
			<div className="col-sm-5">
				<h5>Your Products:</h5>			  
				{this.state.products.map(product=>
					<div className="card-post mb-4 card card-small">

						<div className="card-body">
							<h5 className="card-title">
								{product.Name}
							</h5>
							<img src= {product.imageurl} alt="DealArena" width="100px" height="100px"/>
                            <h5 className="card-title"> {product.Brand}</h5>
							<h5 className="card-title"> {product.Description}</h5>					

							<h5 className="card-title">Category: {product.Category}</h5>

						</div>

						<div className="border-top d-flex card-footer">
							<div className="card-post__author d-flex col-sm-10">
								<div className="d-flex flex-column justify-content-center ml-3">
									<span className="card-post__author-name">Rs.{product.Price}</span>
								</div>
							</div>
                            <div>
                                <div className="card-post__author d-flex col-sm-10">
                                    <a href={product.producturl} className="card-post__author-avatar card-post__author-avatar--small" > URL </a>
                                </div>
                            </div>
						</div>

						<div>
							<button onClick={()=>this.addoffer(product.key)} className="mb-2 btn btn-outline-success btn-sm btn-pill">
				   			<i className="material-icons mr-1">Add offer</i> </button>

							<button onClick={()=>this.update(product.key)} className="mb-2 btn btn-outline-warning btn-sm btn-pill">
				   			<i className="material-icons mr-1">Edit product</i> </button>

							<button onClick={()=>this.delete(product.key)} className="mb-2 btn btn-outline-danger btn-sm btn-pill">
				   			<i className="material-icons mr-1">Delete product</i> </button>
						</div>
					</div>
					)
				};
	</div>
	  </div>

	  </div>

			</div>
		</div>


  )

}
}

export default ShowProduct;
