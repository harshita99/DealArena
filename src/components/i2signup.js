import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn } from 'mdbreact';
import history from './../history';
import firebase from "./Config";

class i2signup extends Component{
  constructor(props){
    super(props);
    this.ref=firebase.firestore().collection("productOwnerDetails");
    this.state={
        Name:"",
        Email:"",
        Password:"",
        BrandName:"",
    }
  }

  onInput=(e)=>{
    const state=this.state;
    state[e.target.name]=e.target.value;
    this.setState(state);
  }
 
  onSubmit=(e)=>{
    
    const name=document.getElementById("name").value
    const brand=document.getElementById("brand").value

    const email = this.state.Email;
    const password = this.state.Password;
    e.preventDefault();
    // const { Name,Email,Password,BrandName }=this.state;

    // this.ref.add({
    //   Name,Email,Password,BrandName
    // }).then((docRef)=>{
    //     this.setState({
        
    //       Name:"",
    //       Email:"",
    //       Password:"",
    //       BrandName:""

    // });
    //   console.log("success");
    // })
    // .catch((error)=>{
    //   console.error("Error adding document:",error);
    // });

    firebase.firestore().collection("productOwnerDetails").where("BrandName","==",this.state.BrandName)
    .get()
    .then(function(querySnapshot){ 
      if(querySnapshot.docs.length>0){
        console.log("old");
        alert('Brand already exists!');
        return;
      }
      else{
        console.log("new");
        firebase.firestore().collection("productOwnerDetails").add({
          Name:name,
          Email:email,
          Password:password,
          BrandName:brand
        });
        firebase.auth().createUserWithEmailAndPassword(email,password).then((u)=>{
          if (firebase.auth().currentUser){
            firebase.firestore().collection("productOwnerDetails").doc(firebase.auth().currentUser.uid).set({
              name:name,
              brand:brand,
            });
            history.push("/productownerhome");
          }
          else{
            console.log("helllooooo");
          }
        })
        .catch((err)=>{
          console.log(err);
        }); 
      }
    })
    .catch(function(error){
      console.log("error getting documents:", error);
    })
    // history.push("/productownerhome");
  }
    render(){
        return(
            <MDBContainer>
              <MDBRow>
                <MDBCol md="6">
                  <MDBCard>
                    <div className="header pt-3 peach-gradient">
                      <MDBRow className="d-flex justify-content-center">
                        <h3 className="white-text mb-3 pt-3 font-weight-bold"> Sign Up </h3>
                      </MDBRow>
                    </div>

                    <MDBCardBody className="mx-4 mt-4">
                      <MDBInput label="Your Name" group type="text" id="name" name="Name" validate onChange={this.onInput}/>
                      <MDBInput label="Your Email" group type="email" name="Email" validate onChange={this.onInput}/>
                      <MDBInput label="Your Company/Brand Name" group id="brand" type="text" name="BrandName" validate onChange={this.onInput}/>
                      <MDBInput label="Your Password" group type="password" name="Password" validate onChange={this.onInput}/>

                      <div className="text-center">
                        <MDBBtn onClick={this.onSubmit} color="grey" rounded type="button" className="z-depth-1a" > Sign Up </MDBBtn>
                      </div>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
        );
    }
}

export default i2signup;