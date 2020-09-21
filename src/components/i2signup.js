import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn } from 'mdbreact';
import history from './../history';
import firebase from "./Config";
import 'antd/dist/antd.css';
import { Form, Button, Select } from 'antd';

const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

var temp = [];

class i2signup extends Component{
  constructor(props){
    super(props);
    this.ref=firebase.firestore().collection("productOwnerDetails");
    this.state={
        Name:"",
        Email:"",
        Password:"",
        BrandName:"",
        Category:"",
        Role:""
    }
  }

  formRef = React.createRef();
  onFinish = (values) => {
    // console.log(values);
    temp = values;
    this.onSubmit()

  };

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
    // e.preventDefault();
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
        console.log(temp);
        firebase.firestore().collection("productOwnerDetails").add({
          Name:name,
          Email:email,
          Password:password,
          BrandName:brand,
          Category:temp.Category,
          Role:temp.Role
        });
        firebase.auth().createUserWithEmailAndPassword(email,password).then((u)=>{
          if (firebase.auth().currentUser){
            firebase.firestore().collection("productOwnerDetails").doc(firebase.auth().currentUser.uid).set({
              name:name,
              brand:brand,
            });
            if(temp.Role==='Offer Manager'){
              history.push("/manageoffers");
            }
            else{
              history.push("/showproduct");
            }
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

                      <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish}>

                        <Form.Item name="Category" label="Category" rules={[ { required: true } ]} >
                          <Select placeholder="Select Category" allowClear >
                            <Option value="Electronics">Electronics</Option>
                            <Option value="Flights">Flights</Option>
                            <Option value="Footwear">Footwear</Option>
                          </Select>
                        </Form.Item>

                        <Form.Item name="Role" label="Role" rules={[ { required: true } ]} >
                          <Select placeholder="Select Role" allowClear >
                            <Option value="Product Manager">Product Manager</Option>
                            <Option value="Offer Manager">Offer Manager</Option>
                          </Select>
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                          <Button type="primary" htmlType="submit">
                            Submit
                          </Button>
                        </Form.Item>
                      
                      </Form>

                      {/* <div className="text-center">
                        <MDBBtn onClick={this.onSubmit} color="grey" rounded type="button" className="z-depth-1a" > Sign Up </MDBBtn>
                      </div> */}

                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
        );
    }
}

export default i2signup;