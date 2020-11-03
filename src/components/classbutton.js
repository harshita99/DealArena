import React from 'react';
// import firebase from "./Config";
import { Tooltip } from 'antd';
import 'antd/dist/antd.css';
// import history from './../history';
import { ShoppingTwoTone} from '@ant-design/icons';
// import MButton from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// import Input from '@material-ui/core/Input';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';



class ClassButton extends React.Component {

  // constructor(props) {
  //   super(props);
  //   this.state = { isOpen: true }
   
  
  // }

  

//   handleClickOpen(e) {
//     this.setState({
//         open: true
//     });
//   }

//   handleClose(e) {
//     this.setState({
//         open: false
//     });
//     this.toggle();
//   }

//   handleFormOpen(e) {
//     this.setState({
//         formOpen: true
//     });
//   }

//   handleFormClose(e) {
//     this.setState({
//         formOpen: false
//     });
//     this.handleClose();
//   }
  
//   toggle(e) {
//     this.setState(prevState => ({
//       isOpen: !prevState.isOpen
//     }));

//     console.log(getTwoToneColor);

//     if (!this.state.isOpen)
//     {
//       this.handleClickOpen();
//       setTwoToneColor("black");
//     }

//     else
//     {
//       setTwoToneColor("#08c");
//     }
//   }
  
//   onChange=(e)=>{
//     const state=this.state;
//     state[e.target.name]=e.target.value;
//     this.setState(state);
//   }

//   onSubmit=(e)=>{
//     e.preventDefault();
//     const {Name, Description, Price, Category, SubCategory, Brand,imageurl,producturl}=this.state;
//     firebase.firestore().collection("productDetails").add({
//       Name,
//       Brand,
//       Description,
//       Price,
//       SubCategory,
//       Category,
//       imageurl,
//       producturl
//     }).then(()=>{
//       this.setState({
//         Name:"",
//         Brand:"",
//         Description:"",
//         Price:"",
//         Category:"",
//         SubCategory:"",
//         imageurl:"",
//         producturl:""
//       });
//       // this.props.history.push("/showproduct");
//       this.handleFormClose();
//       console.log("product added");
//     })
//     .catch((error)=>{
//       console.error("Error adding product:",error);
//     });
//   }   

//   handleChange = (e) => {
//     if (e.target.files[0]){         
//       this.setState({
//         image:e.target.files[0]
//       });
//     };
//     console.log(e.target.files[0])
//   };

  // handleUpload=(e)=>{
  //   const {image}=this.state;
  //   const uploadTask=firebase.storage().ref(`image/${image.name}`).put(this.state.image)
  //   uploadTask.on("state_changed",(snapshot)=>{console.log("snapshot")},
  //   (error)=>{console.log("error");},
  //   ()=>{
  //     firebase.storage().ref("image").child(image.name).getDownloadURL().then(imageurl=>this.setState({imageurl}))
  //   })
  // }

  click=()=>{
    console.log(this.props.rowInfo);
  }
  
  render() {

    return(
      <span>
        {/* {( (this.props.rowInfo["node"] !== null) &&(this.props.rowInfo["node"].title===sessionStorage.getItem('brandN'))) && (
                  <Tooltip title="Add offer on all brand products">

                    <ShoppingTwoTone style={{ fontSize: '22px', color: '#08c' }} 
              label="Leaf" onClick={this.click} 
              /> {" "}
                  </Tooltip>
                )} */}

        
        <Tooltip title="Add offer">
              <ShoppingTwoTone style={{ fontSize: '22px', color: '#08c' }} 
              label="Leaf" onClick={this.click} 
              /> {" "}
            </Tooltip>

        
      </span>
    );
  } 
}

export default ClassButton;