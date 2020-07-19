// import '@fortawesome/fontawesome-free/css/all.min.css';
// import 'bootstrap-css-only/css/bootstrap.min.css';
// import 'mdbreact/dist/css/mdb.css';
import React,{Component} from 'react';
// import '../App.css';
// import { Card } from 'react-bootstrap';
// import {Button} from "react-bootstrap";
import firebase from "./Config";
// import {Link} from "react-router-dom";
import history from '../history';

class AddOffer extends Component{
    constructor(props){
        super(props);
        this.state={
            Name:"",
            Description:"",
            Expiry:"",
            Price:"",
            Category:"",
            Offer:"",
            imageurl:"",
            Brand:"",
            image:null,
            producturl:""
        }
    }

    componentDidMount(){
        var productId = localStorage.getItem('productsession');
		firebase.firestore().collection("productDetails").doc(productId).get().then((doc)=>{
            if(doc.exists){
                this.setState({
                    Name: doc.data().Name,
                    Brand : doc.data().Brand,
                    Description: doc.data().Description,
                    Price: doc.data().Price,
                    Category: doc.data().Category,
                    imageurl: doc.data().imageurl,
                    producturl: doc.data().producturl
                });
            }
            else{
                console.log("No such document is here!");
            }
		})
    }

    onChange=(e)=>{
        const state=this.state;
        state[e.target.name]=e.target.value;
        this.setState(state);
    }
    onSubmit=(e)=>{
        console.log("hogya submit re")
        e.preventDefault();
        const {Name, Description, Expiry, Price, Category, Brand,Offer,imageurl,producturl}=this.state;
        firebase.firestore().collection("offerDetails").add({
            Name,
            Brand,
            Description,
            Expiry,
            Price,
            Category,
            Offer,
            imageurl,
            producturl,
        }).then((docRef)=>{
            this.setState({
                Name:'',
                Brand:"",
                Description:"",
                Expiry:"",
                Price:"",
                Category:"",
                Offer:"",
                imageurl:"",
                producturl:"",
            });
            this.props.history.push("/productownerhome")
        })
        .catch((error)=>{
            console.error("Error adding document:",error);
        });

        console.log("notif chala?")
        firebase.firestore().collection("notifications").add({
            content: 'A new offer added.',
            offerD: `${Brand} ${Category} ${Offer}`,
            time: firebase.firestore.Timestamp.fromDate(new Date()).toDate()
        });
        console.log("check kro chala?")
    }   

    handleChange = (e) => {
        if (e.target.files[0]){         
            this.setState({
                image:e.target.files[0]
            });
      };
      console.log(e.target.files[0])
    };

    handleUpload=(e)=>{
          const {image}=this.state;
          const uploadTask=firebase.storage().ref(`image/${image.name}`).put(this.state.image)
          uploadTask.on("state_changed",(snapshot)=>{console.log("snapshot")},
          (error)=>{console.log("error");},
          ()=>{
              firebase.storage().ref("image").child(image.name).getDownloadURL().then(imageurl=>this.setState({imageurl}))
          })
    }

    render(){
        const {Name, Description, Expiry, Price, Category,Brand, Offer, producturl}=this.state;
        
        const divStyle = {
            margin: '40px'
        };
        const bottomStyle = {
            margin: '20px'
        };
        return(
            <div style={divStyle}>
                {/* <Card class="col-sm-9"> */}
                    {/* <Link to="/productownerhome">
                        <button>Show Products</button>
                    </Link> */}
                {/* </Card> */}
                <div id="formbutton" className="Buttons" style={bottomStyle}>
                    <button type="submit" className="btn btn-primary" onClick={() => history.push('/productownerhome')}> Show Offers </button>
                </div>

                <div>
                    <div>
                        <div className="form-group row"></div>
                        {/* <label class="sol-sm-3" for="Name">Name</label> */}
                        <div className="col-sm-9">
                      
                            <input type="text" className="form-control" name="Name" value ={Name} onChange={this.onChange} placeholder="Name"></input>
                        </div>
                        <div className="col-sm-9">
                      
                        <input type="text" className="form-control" name="Brand" value ={Brand} onChange={this.onChange} placeholder="Brand"></input>
                    </div>
                    </div>
                    <div>
                        <div className="form-group row"></div>
                        {/* <label for="Description">Description:</label> */}
                        <div className="col-sm-9">
                        <textArea className="form-control" name="Description"  onChange={this.onChange} placeholder="Description">{Description}</textArea>
                        </div>
                    </div>
                    <div>
                        <div className="form-group row"></div>
                        {/* <label for="description">Price</label> */}
                        <div className="col-sm-9">
                        <textArea className="form-control" name="Price" onChange={this.onChange} placeholder="Price">{Price}</textArea>
                        </div>
                    </div>
                    <div>
                        <div className="form-group row"></div>
                        {/* <label for="Expiry">Expiry</label> */}
                        <div className="col-sm-9">
                        <textArea className="form-control" name="Expiry" onChange={this.onChange} placeholder="Expiry">{Expiry}</textArea>
                        </div>
                    </div>
                    <div>
                        <div className="form-group row"></div>
                        {/* <label for="Category">Category</label> */}
                        <div className="col-sm-9">
                        <textArea className="form-control" name="Category" onChange={this.onChange} placeholder="Category">{Category}</textArea>
                        </div>
                    </div>
                    <div>
                        <div className="form-group row"></div>
                        {/* <label for="Offer">Offer</label> */}
                        <div className="col-sm-9">
                        <textArea className="form-control" name="Offer" onChange={this.onChange} placeholder="Offer">{Offer}</textArea>
                        </div>
                    </div>

                    <div>
                        <div className="form-group row"></div>
                        {/* <label for="producturl">producturl</label> */}
                        <div className="col-sm-9">
                        <textArea className="form-control" name="producturl" onChange={this.onChange} placeholder="URL to buy this product">{producturl}</textArea>
                        </div>
                    </div>

                    <div>
                      <input type="file" onChange={this.handleChange} />
                      <img src={this.state.imageurl} alt="DealArena" height="100px" width="100px"/>

                    </div>
                </div> 

                <div id="formbutton" className="Buttons justify-content-between" style={bottomStyle}>
                    <button type="submit" className="btn btn-primary" onClick={this.handleUpload}> Upload photo first </button>
                    <button type="submit" className="btn btn-primary" onClick={this.onSubmit}> Save all </button>

                </div>
            </div>
        )
    }
}

export default AddOffer;