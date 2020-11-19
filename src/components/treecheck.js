import React, {Component} from 'react';
import 'antd/dist/antd.css';
import { TreeSelect } from 'antd';
import firebase from "./Config";

const { SHOW_PARENT } = TreeSelect;

const treeData = [
  {
    title: "Electronics",
    value: "Electronics",
    id: "E",
    children: [
      {
        title: "Apple",
        value: "Apple",
        id: "EA",
        parent: "E",
        children: [
          { 
            title: "Laptops", 
            value: "Laptops", 
            parent: "EA", 
            id: "EAL",
            children: [
              { 
                title: "Macbook Air", 
                value: "Macbook Air", 
                parent: "EAL", 
                id: "EALMA" ,
                children: [
                  { 
                    title: "Model 100", 
                    value: "Model 100", 
                    parent: "EALMA", 
                    id: "EALMAM100" 
                  }]
              },
              { 
                title: "Macbook Pro", 
                value: "Macbook Pro", 
                parent: "EAL", 
                id: "EALPA" ,
                children: [
                  { 
                    title: "Model 200", 
                    value: "Model 200", 
                    parent: "EALPA", 
                    id: "EALPAM200" 
                  }]
              }
            ]
          },
          { 
            title: "Earphones", 
            value: "Earphones", 
            parent: "EA", 
            id: "EAE" ,
            children: [
              { 
                title: "Model 108", 
                value: "Model 108", 
                parent: "EA", 
                id: "EALM108" 
              }]
          },
          {
            title: "Model 400", 
            value: "Model 400", 
            parent: "EA", 
            id: "EAM400" 
          }
        ]
      }
   
    ]
  },
  // {
  //   title: "Flights",
  //   value: "Flights",
  //   id: "F",
  //   children: [
  //     {
  //       title: "Indigo",
  //       value: "Indigo",
  //       id: "FI",
  //       parent: "F",
  //       children: [
  //         { 
  //           title: "DEL-BLR Flights", 
  //           value: "DEL-BLR Flights",
  //           id: "FIDB",
  //           parent: "FI",
  //         },
  //         { 
  //           title: "DEL-MUM Flights", 
  //           value: "DEL-MUM Flights",
  //           id: "FIDM",
  //           parent: "FI",
  //         }
  //       ]
  //     },
  //     {
  //       title: "Spicejet",
  //       value: "Spicejet",
  //       id: "FS",
  //       parent: "F",
  //     }
  //   ]
  // },
  {
    title: "Footwear",
    value: "Footwear",
    id: "I",
    children: [
      {
        title: "Adidas",
        value: "Adidas",
        id: "IA",
        parent: "I",
        children: [
          {
            title: "Sports",
            value: "Sports",
            id: "IAS",
            parent: "IA",
            children: [
              { 
                title: "SportsWomen", 
                value: "SportsWomen", 
                parent: "IAS", 
                id: "IASSW" ,
                children: [
                  { 
                    title: "Model 204", 
                    value: "Model 204", 
                    parent: "IASSWM204", 
                    id: "IASSWM204" 
                  }]
              },
              { 
                title: "SportsMen", 
                value: "SportsMen", 
                parent: "IAS", 
                id: "IASSM" ,
                children: [
                  { 
                    title: "Model 101", 
                    value: "Model 101", 
                    parent: "IASSM", 
                    id: "IASSMM101" 
                  }]
              }
            ]
           
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
      console.log(this.props);
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
        <button onClick={this.saveButton} className="mb-2 btn btn-outline-primary btn-sm btn-pill">
          <i className="material-icons mr-1">Save</i> 
        </button>
      </div>
    )
  }
}

export default TreeCheck;