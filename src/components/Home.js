import React, { Component } from 'react';
// import { Button } from 'react-bootstrap';
import history from './../history';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody} from 'mdbreact';
import firebase from "./Config";
import 'antd/dist/antd.css';
import '../index.css';
import { Form, Input, Button } from 'antd';

const products = [];
const products1 = [];
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
  }

  onCollectionUpdate1=(querySnapshot)=>{
		// const products=[];
		querySnapshot.forEach((doc)=>{
			const {Name, Email}=doc.data();
		products1.push({
			Name,
      Email
		});
  });
	this.setState({products1});
  }

    login2(e){
      e.preventDefault();
      firebase.auth().onAuthStateChanged((user)=> {
        if (user) {
          firebase.firestore().collection("userDetails").doc(user.uid)
          .get()
          .then((doc)=>{
            this.ref=firebase.firestore().collection("userDetails").where("Email","==",this.state.Email);
            this.unsubscribe=this.ref.onSnapshot(this.onCollectionUpdate1);
          })
        }
      })
      firebase.auth().signInWithEmailAndPassword(this.state.Email,this.state.Password).then((u)=>{
        if(products1.length===0){
          console.log("No such user exists!");
          alert("No such user exists!");
        }
        else{
          this.props.history.push("/userhome");
        }
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
        if(temp==="Offer Manager"){
          this.props.history.push("/manageoffers");
        }
        else{
          console.log("Invalid offer manager");
          alert("You're not an Offer Manager!");
        }
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
          alert("You're not a Product Manager!");
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
              <br />
              <MDBRow>
                <MDBCol md="8">
                  <MDBCard>
                    <div className="header pt-3 blue-gradient">
                      <MDBRow className="d-flex justify-content-center">
                        <h1 className="white-text mb-3 pt-3 font-weight-bold"> Deal Arena </h1>
                      </MDBRow>
                    </div>

                    <MDBCardBody className="mx-4 mt-4">
                      {/* <MDBInput label="Your Email" group type="text" name="Email" onChange={this.handleChange} validate />
                      <MDBInput label="Your Password" group type="password" name="Password" onChange={this.handleChange} validate /> */}
                      <Form>
                        <Form.Item
                          label="Your Email"
                          name="Email"
                          rules={[
                          {
                            required: true,
                            message: 'Please input your username!',
                          },
                          ]}
                        >
                          <Input
                            name="Email"
                            placeholder="Enter your email."
                            onChange={this.handleChange}
                            validate 
                          />
                        </Form.Item>

                        <Form.Item
                          label="Your Password"
                          name="Password"
                          rules={[
                          {
                            required: true,
                            message: 'Please input your password!',
                          },
                          ]}
                        >
                          <Input.Password 
                            name="Password"
                            placeholder="Enter an 8-digit password."
                            onChange={this.handleChange}
                            validate
                          />
                        </Form.Item>
                      </Form>
                      <br />

                      <div>
                        <form>
                        <Button onClick={this.login2} type="primary" m-2 htmlType="submit">
                            User Login
                        </Button>{' '}
                            {/* <Button variant="btn btn-success" onClick={this.login2}>User Login</Button> */}
                        {/* </form>  */}
                          {/* <p /> */}
                        {/* <form> */}
                        <Button onClick={this.login1} type="primary" m-2 htmlType="submit">
                            Product Manager Login
                        </Button> {' '}
                        <Button onClick={this.login3} type="primary" m-2 htmlType="submit">
                            Offer Maker Login
                        </Button>
                            {/* <Button variant="btn btn-success" onClick={this.login1}>Product Manager Login</Button>
                            <Button variant="btn btn-success" onClick={this.login3}>Offer Maker Login</Button> */}
                        </form>
                      </div>  

                      <br />
                      <br />
                    
                      <div>
                        <p> Don't have an account?</p>
                        <form>
                        <Button onClick={() => history.push('/i1signup')} type="primary" m-2 htmlType="submit">
                            User Sign Up
                        </Button> {' '}
                        <Button onClick={() => history.push('/i2signup')} type="primary" m-2 htmlType="submit">
                            Product Owner Sign Up
                        </Button>
                            {/* <Button variant="btn btn-success" onClick={() => history.push('/i1signup')}>User SignUp</Button>
                            <Button variant="btn btn-success" onClick={() => history.push('/i2signup')}>Product Owner SignUp</Button> */}
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