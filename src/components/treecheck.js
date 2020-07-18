import React, {Component} from 'react';
import 'antd/dist/antd.css';
import { TreeSelect } from 'antd';
import firebase from "./Config";



const { SHOW_PARENT } = TreeSelect;

const treeData = [
  {
    title: "Electronics",
    value: "Electronics",
    children: [
      {
        title: "Apple",
        value: "Apple",
        children: [
          { title: "Laptops", value: "Laptops" },
          { title: "Earphones", value: "Earphones" }
        ]
      },
      {
        title: "Samsung",
        value: "Samsung",
        
        children: [
          { title: "Mobiles", value: "Mobiles"},
          { title: "AirConditioner", value: "AirConditioner" }
        ]
      },
    ]
  },
  {
    title: "Flights",
    value: "Flights",
    children: [
      {
        title: "Indigo",
        value: "Indigo",
        children: [
          { title: "DEL-BLR Flights", value: "DEL-BLR Flights"},
          { title: "DEL-MUM Flights", value: "DEL-MUM Flights" }
        ]
      },
      {
        title: "Spicejet",
        value: "Spicejet",
      }
    ]
  },
  {
    title: "Footwear",
    value: "Footwear",
    children: [
      {
        title: "Bata",
        value: "Bata",
        children: [
          {
            title: "FormalFootwear",
            value: "FormalFootwear",
          },
          {
            title: "CasualFootwear",
            value: "CasualFootwear",
          }
        ]
      },
      {
        title: "Adidas",
        value: "Adidas",
        children: [
          {
            title: "SportsFootwear",
            value: "SportsFootwear",
          }
        ]
      }
    ]
  }
];
  

class TreeCheck extends Component {

  constructor(props){
    super(props);
    this.state = {
       value:[] ,
    };
  }

  saveButton=value=>{
    window.location.reload(true);   
  }


  onChange = value => {
    console.log('onChange ', value);
    this.setState({ value });

    if (firebase.auth().currentUser){
        firebase.firestore().collection("userDetails").doc(firebase.auth().currentUser.uid).update({
          interests: value
        })
    }
  };
  
  componentDidUpdate(prev){
    if (this.props.propinterest !== prev.propinterest) {
      this.setState({value: this.props.propinterest})
    }
  }

  render() {
    const tProps = {
      treeData,
      value: this.state.value,
      onChange: this.onChange,
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      defaultChecked:"Footwear",
      placeholder: 'Please select your interests',
      style: {
        width: "80%"
      }    
    };
    return( 
      <div>
        <TreeSelect {...tProps} />
        <button onClick={this.saveButton} class="mb-2 btn btn-outline-primary btn-sm btn-pill">
          <i class="material-icons mr-1">Save</i> 
        </button>
      </div>
    )
  }
}

export default TreeCheck;