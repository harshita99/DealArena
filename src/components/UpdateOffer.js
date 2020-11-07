import React,{Component} from 'react';
import firebase from "./Config";
// import history from '../history';

class UpdateOffer extends Component{
    constructor(props){
        super(props);
        this.state={
            Name:"",
            Description:"",
            Expiry:"",
            Price:"",
            Category:"",
            SubCategory1:"",
            SubCategory2:"",
            SubCategory3:"",
            Offer:"",
            imageurl:"",
            Brand:"",
            image:null,
            producturl:""
        }
    }

    componentDidMount(){
        var offerId = localStorage.getItem('offersession');
		firebase.firestore().collection("offerDetails").doc(offerId).get().then((doc)=>{
            if(doc.exists){
                this.setState({
                    Name: doc.data().Name,
                    Brand : doc.data().Brand,
                    Description: doc.data().Description,
                    Expiry: doc.data().Expiry,
                    Price: doc.data().Price,
                    Category: doc.data().Category,
                    SubCategory1: doc.data().SubCategory1,
                    SubCategory2: doc.data().SubCategory2,
                    SubCategory3: doc.data().SubCategory3,
                    Offer: doc.data().Offer,
                    imageurl: doc.data().imageurl,
                    producturl: doc.data().producturl
                });
            }
            else{
                console.log("No such document is here!");
            }
		})
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

    onChange=(e)=>{
        const state=this.state;
        state[e.target.name]=e.target.value;
        this.setState({document:state});
    }

    onSubmit=(e)=>{
        e.preventDefault();
        var offerId = localStorage.getItem('offersession');
        const {Name, Description, Expiry, Price, Category, SubCategory1, SubCategory2, SubCategory3, Brand, Offer, imageurl, producturl}=this.state;
        const updateRef = firebase.firestore().collection("offerDetails").doc(offerId);
        updateRef.set({
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
        }).then((docRef)=>{
            this.setState({
                key:"",
                Name:"",
                Brand:"",
                Description:"",
                Expiry:"",
                Price:"",
                Category:"",
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
            console.error("Error editing the document:",error);
        });
    }

    render(){
        const {Name, Description, Expiry, Price, Category, SubCategory1, SubCategory2, SubCategory3, Brand, Offer, producturl}=this.state;
        
        const bottomStyle = {
            margin: '20px'
        };

        return(
            <div>
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
                        <textArea className="form-control" name="Expiry" onChange={this.onChange} placeholder="Expiry">{Expiry}</textArea>
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
                    <button type="submit" className="btn btn-primary" onClick={this.handleUpload}> Upload photo first </button>
                    <button type="submit" className="btn btn-primary" onClick={this.onSubmit}> Save all </button>
                </div>
            </div>
        )
    }
}

export default UpdateOffer;