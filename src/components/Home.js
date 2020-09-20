import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import history from './../history';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput} from 'mdbreact';
import firebase from "./Config";

const products = [];
var temp;

class Home extends Component{
  
  constructor(props)
  {
      super(props);
      this.login1 = this.login1.bind(this);
      this.login2 = this.login2.bind(this);
      this.login3 = this.login3.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.state={
          Email : "",
          Password : ""
      }
  }
  
  onCollectionUpdate=(querySnapshot)=>{
		// const products=[];
		querySnapshot.forEach((doc)=>{
			const {Name, BrandName, Email, Role}=doc.data();
		products.push({
			Name,
			BrandName,
      Email,
      Role
		});
	});
	this.setState({products});
  // console.log(products[0].Role);
  }

    login2(e){
      e.preventDefault();
      firebase.auth().signInWithEmailAndPassword(this.state.Email,this.state.Password).then((u)=>{
        this.props.history.push("/userhome");
      }).catch((err)=>{
        console.log(err);
      });
    }

    login3(e){
      e.preventDefault();
      firebase.auth().onAuthStateChanged((productowner)=> {
        if (productowner) {
          firebase.firestore().collection("productOwnerDetails").doc(productowner.uid)
          .get()
          .then((doc)=>{
            this.ref=firebase.firestore().collection("productOwnerDetails").where("Email","==",this.state.Email);
            this.unsubscribe=this.ref.onSnapshot(this.onCollectionUpdate);
          })
        }
      })
      firebase.auth().signInWithEmailAndPassword(this.state.Email,this.state.Password).then((u)=>{
        products.map(product=>
          temp = product.Role
        );
        if(temp==="Offer Manager")
          this.props.history.push("/manageoffers");
        
        else
          console.log("Invalid offer manager");
        
      }).catch((err)=>{
        console.log(err);
      });
  }

    login1(e){
      e.preventDefault();
      firebase.auth().onAuthStateChanged((productowner)=> {
        if (productowner) {
          firebase.firestore().collection("productOwnerDetails").doc(productowner.uid)
          .get()
          .then((doc)=> {
            this.setState({brand : doc.data().brand})
          }).then((doc)=>{
            this.ref=firebase.firestore().collection("productOwnerDetails").where("Email","==",this.state.Email);
            this.unsubscribe=this.ref.onSnapshot(this.onCollectionUpdate);
          })
        }
      })
      firebase.auth().signInWithEmailAndPassword(this.state.Email,this.state.Password).then((u)=>{
        products.map(product=>
          temp = product.Role
        );
        if(temp==="Product Manager"){
          this.props.history.push("/showproduct");
        }
        else{
          console.log("Invalid product manager");
        }
      }).catch((err)=>{
        console.log(err);
      });
    }

    handleChange=(e)=>{
      const state=this.state;
      state[e.target.name]=e.target.value;
      this.setState(state);
    }

    render(){
        return(
            <MDBContainer>
              <MDBRow>
                <MDBCol md="500">
                  <MDBCard>
                    <div className="header pt-3 peach-gradient">
                      <MDBRow className="d-flex justify-content-center">
                        <h1 className="white-text mb-3 pt-3 font-weight-bold"> Deal Arena </h1>
                      </MDBRow>
                    </div>

                    <MDBCardBody className="mx-4 mt-4">
                      <MDBInput label="Your Email" group type="text" name="Email" onChange={this.handleChange} validate />
                      <MDBInput label="Your Password" group type="password" name="Password" onChange={this.handleChange} validate />

                      <br />

                      <div>
                        <form>
                            <Button variant="btn btn-success" onClick={this.login2}>User Login</Button>
                        </form>

                        <form>
                            <Button variant="btn btn-success" onClick={this.login1}>Product Manager Login</Button>
                            <Button variant="btn btn-success" onClick={this.login3}>Offer Maker Login</Button>
                        </form>
                      </div>  

                      <br />
                      <br />
                    
                      <div>
                        <p> Don't have an account?</p>
                        <form>
                            <Button variant="btn btn-success" onClick={() => history.push('/i1signup')}>User SignUp</Button>

                            <Button variant="btn btn-success" onClick={() => history.push('/i2signup')}>Product Owner SignUp</Button>
                        </form>
                      </div>  
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
        );
    }
}

export default Home;