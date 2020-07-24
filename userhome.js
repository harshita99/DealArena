import React,{Component} from 'react';
// import Sidebar from "./sidebar.js"
import firebase from "./Config";
import history from './../history';
import TreeCheck from './treecheck';
import moment from 'moment';
import ThreeTabs from './threetabs';

//import { findAllByPlaceholderText } from '@testing-library/react';


const offers=[];
const notifs=[];
//const offersand=[];
//const timeStamp = firebase.firestore.FieldValue.serverTimestamp();

// var db=firebase.firestore()
class userhome extends Component{
	
	constructor(props){
		super(props);
		// this.ref=db.collection("offerDetails")
		this.unsubscribe=null;
		this.state={
			offers:[],
			notifs:[]
		};
	}
  
	componentDidMount(){
		this.checkAuth();
		// const params = new URLSearchParams(this.props.location.search);

		// const category = params.get("category");
		// var offers = firebase.firestore().collection("offerDetails");
		// if (category) offers = offers.where("Category", "==", category);
		// offers
		// 	.get()
		// 	.then((querySnapshot) => {
		// 		const data = querySnapshot.docs.map((doc) => doc.data());
		// 		this.setState({ offers: data });
		//   	})
		// .catch((err) => console.log(err));

		firebase.auth().onAuthStateChanged((user)=> {
			if (user) {
			  console.log(user.uid);
			  firebase.firestore().collection("userDetails").doc(user.uid)
				.get()
				.then((doc)=> {
					console.log("Document data:", doc.data().name);
					console.log("Document data:", doc.data().interests);
				//   console.log("Document data:", doc.data().interests[0],doc.data().interests[1],doc.data().interests[2]);
				//	document.getElementById("username").innerHTML = doc.data().name ;				  
				//	document.getElementById("interest1").innerHTML = doc.data().interests ;
				//   document.getElementById("interest1").innerHTML = doc.data().interests[0] ;
				//   document.getElementById("interest2").innerHTML = doc.data().interests[1] ;
				//   document.getElementById("interest3").innerHTML = doc.data().interests[2] ;
					this.setState({name : doc.data().name})
					this.setState({interests : doc.data().interests})
					sessionStorage.setItem('logTime', (doc.data().lastLogTime.toDate()).valueOf())
				//   this.setState({interest1 : doc.data().interests[0]})
				//   this.setState({interest2 : doc.data().interests[1]})
				//   this.setState({interest3 : doc.data().interests[2]})

				}).then(()=>{
					// this.ref=firebase.firestore().collection("offerDetails").where("Category","in",[this.state.interest1,this.state.interest2,this.state.interest3]);
					this.ref1=firebase.firestore().collection("offerDetails").where("Brand","in",this.state.interests);
					this.ref1.onSnapshot(this.onCollectionUpdate);

					this.ref2=firebase.firestore().collection("offerDetails").where("SubCategory","in",this.state.interests);
					this.ref2.onSnapshot(this.onCollectionUpdate);

					this.ref=firebase.firestore().collection("offerDetails").where("Category","in",this.state.interests);
					console.log(this.state.interests);
					
					this.unsubscribe=this.ref.onSnapshot(this.onCollectionUpdate);
					// this.ref2=firebase.firestore().collection("offerDetails").where("Category","in",this.state.interests).where("Brand","in",this.state.interests);
					// this.ref1.onSnapshot(this.onCollectionUpdate2);
				})
				.catch(function(error) {
					history.push("/userhome");
					console.log("Error getting document:", error);
					console.log(user.uid)
				})
			}
		})
	}

	// onCollectionUpdate2=(querySnapshot)=>{
	// 	querySnapshot.forEach((doc)=>{
	// 		const {Name, Description, Price, Expiry, category, Offer,imageurl, producturl}=doc.data();
	// 		offersand.push({
	// 			key:doc.id,
	// 			doc,
	// 			Name,
	// 			Description,
	// 			Price,
	// 			category,
	// 			Expiry,
	// 			Offer,
	// 			imageurl,
	// 			producturl,
	// 		});
	// 	});

	// 	this.setState({offersand});
	// 	this.setState({offers: this.state.offers-this.state.offersand});

	// 	console.log(this.state.offers);
	// }

	onCollectionUpdate=(querySnapshot)=>{
		// const offers=[];

		querySnapshot.forEach((doc)=>{
			const {Name, Brand, Description, Price, Expiry, Category, Offer,imageurl, producturl, time}=doc.data();
			var logTime = (sessionStorage.getItem('logTime'));

			offers.push({
				key:doc.id,
				doc,
				Brand,
				Name,
				Description,
				Price,
				Category,
				Expiry,
				Offer,
				imageurl,
				producturl
			});

			notifs.push({
				key:doc.id,
				doc,
				producturl,
				content: 'New Offer: ',
            	offerD: `${Brand} ${Category} ${Offer}`,
            	time: time.toDate(),
				logTime,
			});
		});

		this.setState({offers});
		console.log(this.state.offers);
		this.setState({notifs});
		console.log(this.state.notifs);
	}

	checkAuth(){
		var user = firebase.auth().currentUser;
		//console.log("User "+user.uid+" is logged in with");	
		if(localStorage.getItem('usersession')){

		}
		else if(user){
			localStorage.setItem('usersession', user);
			console.log("User "+user.uid+" is logged in with");	
		}
		else{
			console.log("Successfully logged out");
			history.push("/");
		}
	}
  
  	logout(){
		var user = firebase.auth().currentUser;
		//if (user!=null) {
		const db = firebase.firestore();
		const uid = user.uid;
		console.log("user is "+uid);
		// const docRef = db.collection('userDetails').doc(uid);
		// docRef.update({
		db.collection('userDetails').doc(uid).update({	
			lastLogTime: firebase.firestore.FieldValue.serverTimestamp()
		}).then(() => {
			console.log('Profile Successfully Edited!');
		}).catch((error) => {
			console.log('Error updating the document:', error);
		})
		//}
		
		firebase.auth().signOut().then((u)=>{
			localStorage.removeItem('usersession');
			history.push("/"); 
		})
		.then(() => {
			console.log("User"+uid+"logged out successfully");
		}).catch((err)=>{
			console.log(err);
		});
	}

    render(){
  		return (
    		<div className="App">
      			<div><br></br></div>

       			<div className="row">
        
       				<div className="col-lg-3"><div className="mb-4 pt-3 card card-small">
						<div className="border-bottom text-center card-header">
				
							{/* <h4 class="mb-0" id="username">Name of User </h4> */}
							<h4>Welcome, {this.state.name} </h4>
							<br></br>

							<p>Your current interests are:</p>
							<p>{this.state.interests}</p>
							{/* <p id="interest1"></p>
							<p id="interest2"></p>
							<p id="interest3"></p> */}
			  				<p>Manage your interests: </p>
							{/* {<TreeCheck />} */}
							{<TreeCheck propinterest={this.state.interests}  />}
				
							<button onClick={this.logout} className="mb-2 btn btn-outline-primary btn-sm btn-pill">
								<i className="material-icons mr-1">LogOut</i> </button>
					
						</div><ul className="list-group list-group-flush"></ul></div>
						
						<div className="mb-4 pt-3 card card-small">
							<div className="border-bottom text-center card-header">
								<h5 className="mb-0">New Offers From Your Interests</h5>
								<ul className="notifications">
									{ this.state.notifs.map(notif=> {

										const elapsedTime = ((notif.time).valueOf() - notif.logTime)
										console.log("OfferTime is "+ (notif.time).valueOf() + " and LogTime is "+notif.logTime)
										console.log ("Elapsed time is "+ elapsedTime)
										
										return (
											(notif.logTime <= (notif.time).valueOf()) ? 
											(	
												<li key={notif.id}>
													<span> {notif.content } </span>
													<span className="pink-text">{notif.offerD} </span>
													<div className="grey-text note-date">
														{moment(notif.time).fromNow()}
													</div>
													<a href={notif.producturl}> BUY NOW</a>	
												</li>
											) : ( 
												<span> { "" } </span>
											)	
										)
									})}
								</ul>	
								<br></br>
							</div>
						</div>
					</div>
                	
					<div className="col-lg-8">
					<div className="row">
                    <ThreeTabs propoffers={this.state.offers}/>
						{/* <Sidebar/> */}

	  				</div>
	 				</div>
    			</div>

			</div>
  		);
    }
}

export default userhome;