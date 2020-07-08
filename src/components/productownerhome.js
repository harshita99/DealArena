import 'bootstrap-css-only/css/bootstrap.min.css';
import React,{Component} from 'react';
import firebase from "./Config";
// import {Link} from "react-router-dom";
import history from './../history';

class productownerhome extends Component{
    constructor(props){
		super(props);
		//this.ref=firebase.firestore().collection("offerDetails");
		this.logout = this.logout.bind(this);
		this.unsubscribe=null;
		this.state={
			offers:[]
		};
	}

	componentDidMount(){
		this.checkAuth();
		firebase.auth().onAuthStateChanged((productowner)=> {


			if (productowner) {
			
			  console.log(productowner.uid);

			  firebase.firestore().collection("productOwnerDetails").doc(productowner.uid)
				.get()
				.then((doc)=> {
				  console.log("Document data:", doc.data().name);
				  console.log("Document data:", doc.data().brand);
				  this.setState({brand : doc.data().brand})
				}).then((doc)=>{
					this.ref=firebase.firestore().collection("offerDetails").where("Brand","==",this.state.brand);
					this.unsubscribe=this.ref.onSnapshot(this.onCollectionUpdate);


				})
				.catch(function(error){
				  console.log("Error getting document:", error);
				  console.log(productowner.id)
				})
			}
		}
	)
	console.log("yo")
		history.push("productownerhome");
	}

	onCollectionUpdate=(querySnapshot)=>{
		const offers=[];
		querySnapshot.forEach((doc)=>{
			const {Name, Description,Brand, Price, Expiry, Category, Offer,imageurl}=doc.data();
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
			
		});
	});
	this.setState({offers});
	//this.ref=firebase.firestore().collection("offerDetails").where("Brand","==",this.state.brand);

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
			console.log("zzzzzzzzz");
			history.push("/");
		})
		.catch(function(error){
			console.log(error);
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
			  
					<button onClick={() => history.push('/addproduct')} className="mb-2 btn btn-outline-primary btn-sm btn-pill">
				   <i className="material-icons mr-1">Add product</i> </button>	

				   <button onClick={this.logout} className="mb-2 btn btn-outline-primary btn-sm btn-pill">
				   <i className="material-icons mr-1">LogOut</i> </button>				
			
				   </div>
				   </div>
				</div>
		
     <div className="col-lg-8">
	 <div className="row">


	  
	  <div className="col-sm-5">
			  
			  
				{this.state.offers.map(offer=>
						  <div className="card-post mb-4 card card-small">

					<div className="card-body">
						<h5 className="card-title">
							{offer.Name}
						</h5>
						<img src= {offer.imageurl} alt="DealArena" width="100px" height="100px"/>
					<h5 className="card-title"> {offer.Description}</h5>					

					<h5 className="card-title">Category: {offer.Category}</h5>

						</div>

						<div className="border-top d-flex card-footer">
							<div className="card-post__author d-flex">
								<a href="/" className="card-post__author-avatar card-post__author-avatar--small" >
						Offer: {offer.Offer} </a>
						<div className="d-flex flex-column justify-content-center ml-3"><span className="card-post__author-name">Rs.{offer.Price}</span><small className="text-muted"> Offer expires {offer.Expiry}</small></div></div><div className="my-auto ml-auto"><button className="btn btn-white btn-sm"><i className="far fa-bookmark mr-1"></i> Save</button></div></div></div>


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

export default productownerhome;