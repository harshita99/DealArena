import React,{Component} from 'react';
import firebase from "./Config";
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
            Model:"",
            SubCategory1:"",
            SubCategory2:"",
            SubCategory3:"",
            Offer:"",
            imageurl:"",
            Brand:"",
            image:null,
            producturl:"",
            time:""
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
                    Model: doc.data().Model,
                    SubCategory1: doc.data().SubCategory1,
                    SubCategory2: doc.data().SubCategory2,
                    SubCategory3: doc.data().SubCategory3,
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
        e.preventDefault();
        const {Model, Name, Description, Expiry, Price, Category, SubCategory1, SubCategory2, SubCategory3, Brand,Offer,imageurl,producturl}=this.state;
        firebase.firestore().collection("offerDetails").add({
            Model,
            Name,
            Brand,
            Description,
            Expiry,
            Price,
            Category,
            SubCategory1,
            SubCategory2,
            SubCategory3,
            Offer,
            imageurl,
            producturl,
            time: firebase.firestore.FieldValue.serverTimestamp()
        }).then((docRef)=>{
            this.setState({
                Name:"",
                Brand:"",
                Description:"",
                Expiry:"",
                Price:"",
                Category:"",
                Model:"",
                SubCategory1:"",
                SubCategory2:"",
                SubCategory3:"",
                Offer:"",
                imageurl:"",
                producturl:"",
            });
            this.props.history.push("/manageoffers")
        })
        .catch((error)=>{
            console.error("Error adding document:",error);
        });

        firebase.firestore().collection("notifications").add({
            content: 'A new offer added.',
            offerD: `${Brand} ${Category} ${Offer}`,
            time: firebase.firestore.Timestamp.fromDate(new Date()).toDate()
        });
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
        const {Model, Name, Description, Expiry, Price, Category, SubCategory1, SubCategory2, SubCategory3, Brand, Offer, producturl}=this.state;
        
        const divStyle = {
            margin: '40px'
        };
        const bottomStyle = {
            margin: '20px'
        };
        return(
            <div style={divStyle}>
                <div id="formbutton" className="Buttons" style={bottomStyle}>
                    <button type="submit" className="btn btn-primary" onClick={() => history.push('/manageoffers')}> Show Offers </button>
                </div>

                <div>
                    <div>
                        <div className="form-group row"></div>
                        <div className="col-sm-9">
                            <textArea className="form-control" name="Name" onChange={this.onChange} placeholder="Name">{Name}</textArea>
                        </div>
                    </div>
                    <div>
                    <div className="form-group row"></div>
                        <div className="col-sm-9">
                            <textArea className="form-control" name="Brand" onChange={this.onChange} placeholder="Brand">{Brand}</textArea>
                        </div>
                    </div>
                    <div>
                        <div className="form-group row"></div>
                        <div className="col-sm-9">
                            <textArea className="form-control" name="Description" onChange={this.onChange} placeholder="Description">{Description}</textArea>
                        </div>
                    </div>
                    <div>
                        <div className="form-group row"></div>
                        <div className="col-sm-9">
                            <textArea className="form-control" name="Price" onChange={this.onChange} placeholder="Price">{Price}</textArea>
                        </div>
                    </div>
                    <div>
                        <div className="form-group row"></div>
                        <div className="col-sm-9">
                            <textArea className="form-control" name="Expiry" onChange={this.onChange} placeholder="Expiry (DD/MM/YYYY)">{Expiry}</textArea>
                        </div>
                    </div>
                    <div>
                        <div className="form-group row"></div>
                        <div className="col-sm-9">
                        <textArea className="form-control" name="Category" onChange={this.onChange} placeholder="Category">{Category}</textArea>
                        </div>
                    </div>
                    <div>
                        <div className="form-group row"></div>
                        <div className="col-sm-9">
                            <textArea className="form-control" name="SubCategory1" onChange={this.onChange} placeholder="SubCategory1">{SubCategory1}</textArea>
                        </div>
                    </div>
                    <div>
                        <div className="form-group row"></div>
                        <div className="col-sm-9">
                            <textArea className="form-control" name="SubCategory2" onChange={this.onChange} placeholder="SubCategory2">{SubCategory2}</textArea>
                        </div>
                    </div>
                    <div>
                        <div className="form-group row"></div>
                        <div className="col-sm-9">
                            <textArea className="form-control" name="SubCategory3" onChange={this.onChange} placeholder="SubCategory3">{SubCategory3}</textArea>
                        </div>
                    </div>
                    <div>
                        <div className="form-group row"></div>
                        <div className="col-sm-9">
                            <textArea className="form-control" name="Model" onChange={this.onChange} placeholder="Model">{Model}</textArea>
                        </div>
                    </div>
                    <div>
                        <div className="form-group row"></div>
                        <div className="col-sm-9">
                            <textArea className="form-control" name="Offer" onChange={this.onChange} placeholder="Offer">{Offer}</textArea>
                        </div>
                    </div>

                    <div>
                        <div className="form-group row"></div>
                        <div className="col-sm-9">
                            <textArea className="form-control" name="producturl" onChange={this.onChange} placeholder="URL to buy this product">{producturl}</textArea>
                        </div>
                    </div>

                    <br />
                    <div>
                      <input type="file" onChange={this.handleChange} />
                      <img src={this.state.imageurl} alt="DealArena" height="100px" width="100px"/>
                    </div>
                </div> 

                <div id="formbutton" className="Buttons justify-content-between" style={bottomStyle}>
                    <button type="submit" className="btn btn-primary" onClick={() => history.push('/manageoffers')}> Cancel </button>
                    <button type="submit" className="btn btn-primary" onClick={this.handleUpload}> Upload photo first </button>
                    <button type="submit" className="btn btn-primary" onClick={this.onSubmit}> Save all </button>
                </div>
            </div>
        )
    }
}

export default AddOffer;