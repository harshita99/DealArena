import React from 'react';
import 'antd/dist/antd.css';
import { TreeSelect } from 'antd';
import firebase from "./Config";



const { SHOW_PARENT } = TreeSelect;

const treeData = [
    {
      title: "Electronics",
      value: "Electronics",
      key: "0-0",
      children: [
        {
          title: "Mobile",
          value: "Mobile",
          key: "0-0-0",
          children: [
            { title: "Samsung", value: "Samsung", key: "0-0-0-0" },
            { title: "Apple", value: "Apple", key: "0-0-0-1" }
          ]
        }
      ]
    },
    {
      title: "Flights",
      value: "Flights",
      key: "0-1",
      children: [
        {
          title: "Indigo",
          value: "Indigo",
          key: "0-1-0"
        }
      ]
    },
    {
      title: "Footwear",
      value: "Footwear",
      key: "0-2",
      children: [
        {
          title: "Bata",
          value: "Bata",
          key: "0-2-0"
        },
        {
          title: "Adidas",
          value: "Adidas",
          key: "0-2-1"
        },
        {
          title: "Nike",
          value: "Nike",
          key: "0-2-2"
        }
      ]
    }
  ];
  

export default class TreeCheck extends React.Component {

  state = {
    value: [],
  };

  saveButton=value=>{

    window.location.reload(true); 

 
    
    }


  onChange = value => {
    console.log('onChange ', value);
    this.setState({ value });

    if (firebase.auth().currentUser){
        firebase.firestore().collection("userDetails").doc(firebase.auth().currentUser.uid).update({
          interests: value
        }
    
        )};


  };
  


  render() {
    const tProps = {
      treeData,
      value: this.state.value,
      onChange: this.onChange,
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      placeholder: 'Please select your interests',
      style: {
        width: "80%"
      }
     
    };
    return( 
        <div>
            <TreeSelect {...tProps} />
            <button onClick={this.saveButton} class="mb-2 btn btn-outline-primary btn-sm btn-pill">
                   <i class="material-icons mr-1">Save</i> </button>
        </div>
    )
    }
}

