import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput } from 'mdbreact';
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

    localStorage.setItem('brandname', this.state.BrandName);
    console.log("Type of Local Brand: ", typeof(localStorage.getItem('brandname')));
    console.log("Type of Const Brand: ", typeof(brand));
    console.log("Type of State Brand: ", typeof(this.state.BrandName));

    console.log("Local Brand: ", (localStorage.getItem('brandname')));
    console.log("Const Brand: ", (brand));
    console.log("State Brand: ", (this.state.BrandName));

    firebase.firestore().collection(localStorage.getItem('brandname')).doc("Parent").set({
      title: localStorage.getItem('brandname'),
      parent: null,
      isOpen: false,
      children: null
    });

    firebase.firestore().collection("productOwnerDetails").where("BrandName","==",this.state.BrandName)
    .get()
    .then(function(querySnapshot){ 
        console.log("new");
        console.log(temp);
        firebase.firestore().collection("productOwnerDetails").add({
          Name:name,
          Email:email,
          Password:password,
          BrandName:brand,
          Category:temp.Category,
          Role:"Product Manager"
        });
        
          firebase.firestore().collection("tree").doc(brand).set({ 
            treeData: [{ 
              title: temp.Category, 
              children: [{ title: brand }] },
            ] 
          });

          firebase.firestore().collection("released").doc(brand).set({ 
            treeData: [{ 
              title: temp.Category, 
              children: [{ title: brand }] },
            ] 
          });

        firebase.auth().createUserWithEmailAndPassword(email,password).then((u)=>{
          if (firebase.auth().currentUser){
            firebase.firestore().collection("productOwnerDetails").doc(firebase.auth().currentUser.uid).set({
              name:name,
              brand:brand,
            });
            history.push("/");
            alert('Successfully signed up..... Proceed to LogIn!');
          }
          else{
            console.log("helllooooo");
          }
        })
        .catch((err)=>{
          console.log(err);
        }); 
    })
    .catch(function(error){
      console.log("error getting documents:", error);
    })
  }
    render(){
        return(
            <MDBContainer>
              <MDBRow>
                <MDBCol md="10">
                  <br />
                  <MDBCard>
                    <div className="header pt-3 blue-gradient">
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

                        {/* <Form.Item name="Role" label="Role" rules={[ { required: true } ]} >
                          <Select placeholder="Select Role" allowClear >
                            <Option value="Product Manager">Product Manager</Option>
                            <Option value="Offer Manager">Offer Manager</Option>
                          </Select>
                        </Form.Item> */}

                        <Form.Item {...tailLayout}>
                          <Button type="primary" htmlType="submit">
                            Submit
                          </Button>
                        </Form.Item>
                      
                      </Form>

                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
        );
    }
}

export default i2signup;