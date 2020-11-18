import React, { Component} from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBFormInline} from 'mdbreact';
// import history from './../history';
import firebase from "./Config";
import 'antd/dist/antd.css';
import '../index.css';
import { Button } from 'antd';
// import { Form, Input, Button } from 'antd';

class i1signup extends Component{

  constructor(props){
    super(props);
    this.ref=firebase.firestore().collection("userDetails");
    this.state={
        Name:"",
        Email:"",
        Password:"",
        Age:"",
        Gender:"",
        MaritalStatus:"",
        Occupation:"",
        Nationality:"",
    }
  }
  
  onInput=(e)=>{
    const state=this.state;
    state[e.target.name]=e.target.value;
    this.setState(state);
  }

  
  onSubmit=(e)=>{
    const x=document.getElementById("name").value
    const footwear=document.getElementById("checkbox1").value
    const elec=document.getElementById("checkbox2").value
    const flights=document.getElementById("checkbox3").value

    e.preventDefault();
    const { Name,Email,Password,Age,Gender,MaritalStatus,Occupation,Nationality}=this.state;
    this.ref.add({
      Name,Email,Password,Age,Gender,MaritalStatus,Occupation,Nationality
    }).then((docRef)=>{
        this.setState({
          Name:"",
          Email:"",
          Password:"",
          Age:"",
          Gender:"",
          MaritalStatus:"",
          Occupation:"",
          Nationality:"",
        });
    })
    .catch((error)=>{
        console.error("Error adding document:",error);
    });
    firebase.auth().createUserWithEmailAndPassword(this.state.Email,this.state.Password).then((u)=>{
      this.props.history.push("/userhome");
      console.log(u);

      if (firebase.auth().currentUser){
        firebase.firestore().collection("userDetails").doc(firebase.auth().currentUser.uid).set({
          name:x,
          lastLogTime: firebase.firestore.FieldValue.serverTimestamp(),
          interests:[elec,
          footwear,
          flights]
        });
      }
    }).catch((err)=>{
       console.log(err);
    })
  }

    render(){
        return(
            <MDBContainer>
              <br />
              <MDBRow>
                <MDBCol md="10">
                  <MDBCard>
                    <div className="header pt-3 blue-gradient">
                      <MDBRow className="d-flex justify-content-center">
                        <h3 className="white-text mb-3 pt-3 font-weight-bold"> Sign Up </h3>
                      </MDBRow>
                    </div>

                    <MDBCardBody className="mx-4 mt-4">
                      <MDBInput label="Your Name" group type="text"  id="name" name="Name"  validate onChange={this.onInput} />
                      <MDBInput label="Your Email" group type="email" name="Email" validate onChange={this.onInput}/>
                      <MDBInput label="Your Password" group type="password" name="Password"validate onChange={this.onInput}/>

                     

                      <MDBInput label="Age" group type="number" name="Age" validate onChange={this.onInput}/>
                      <MDBInput label="Gender" group type="text" name="Gender" validate onChange={this.onInput}/>
                      <MDBInput label="Marital Status" group type="text" name="MaritalStatus" validate onChange={this.onInput}/>
                      <MDBInput label="Occupation" group type="text" validate name="Occupation" onChange={this.onInput}/>
                      <MDBInput label="Nationality" group type="text" validate name="Nationality" onChange={this.onInput}/>

                      <div>
                        <h7>What are you interested in?</h7>
                        <MDBFormInline>
                          <MDBInput label='Interest 1' type='text' name='checkbox1'  id='checkbox1' containerClass='mr-5' />
                          <MDBInput label='Interest 2' type='text' name='checkbox2' id='checkbox2' containerClass='mr-5' />
                          <br></br>
                          <MDBInput label='Interest 3' type='text' name="checkbox3" id='checkbox3' containerClass='mr-5' />
                        </MDBFormInline>
                      </div>
                      
               

                      <div className="text-center">
                      <Button onClick={this.onSubmit} type="primary" m-2 htmlType="submit">
                            Sign Up
                        </Button>
                        {/* <MDBBtn  onClick={this.onSubmit} color="grey" rounded type="button" className="z-depth-1a" > Sign Up </MDBBtn> */}
                      </div>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
        );
    }
}

export default i1signup;