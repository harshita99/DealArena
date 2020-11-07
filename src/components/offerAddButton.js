import React from 'react';
// import firebase from "./Config";
// import { Tooltip } from 'antd';
// import 'antd/dist/antd.css';
// import history from './../history';
// import { ShoppingTwoTone, SendOutlined, setTwoToneColor, getTwoToneColor } from '@ant-design/icons';
// import MButton from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// import Input from '@material-ui/core/Input';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';

class OfferAddButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { open: false };
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = { formOpen: false };
        this.handleFormOpen = this.handleFormOpen.bind(this);
        this.handleFormClose = this.handleFormClose.bind(this);
    
        this.state={
          Name:"",
          Description:"",
          Price:"",
          Category:"",
          SubCategory1:"",
          SubCategory2:"",
          SubCategory13:"",
          imageurl:"",
          Brand:"",
          image:null,
          producturl:""
        }
    }
}

export default OfferAddButton;