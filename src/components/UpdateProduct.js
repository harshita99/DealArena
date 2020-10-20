import React,{Component} from 'react';
import firebase from "./Config";
// import history from '../history';

class UpdateProduct extends Component{
    constructor(props){
        super(props);
        this.state={
            Name:"",
            Description:"",
            Price:"",
            Category:"",
            SubCategory:"",
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
                    SubCategory: doc.data().SubCategory,
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
        var productId = localStorage.getItem('productsession');
        const {Name, Description, Price, Category, SubCategory, Brand,imageurl,producturl}=this.state;
        const updateRef = firebase.firestore().collection("productDetails").doc(productId);
        updateRef.set({
            Name,
            Brand,
            Description,
            Price,
            Category,
            SubCategory,
            imageurl,
            producturl,
        }).then((docRef)=>{
            this.setState({
                key:"",
                Name:"",
                Brand:"",
                Description:"",
                Price:"",
                Category:"",
                SubCategory:"",
                imageurl:"",
                producturl:"",
            });
            this.props.history.push("/showproduct")
        })
        .catch((error)=>{
            console.error("Error editing the document:",error);
        });
    }

    render(){
        const {Name, Description, Price, Category, SubCategory, Brand, producturl}=this.state;
        
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
                        <textArea className="form-control" name="Category" onChange={this.onChange} placeholder="Category">{Category}</textArea>
                        </div>
                    </div>
                    <div>
                        <div className="form-group row"></div>
                        <div className="col-sm-9">
                        <textArea className="form-control" name="SubCategory" onChange={this.onChange} placeholder="SubCategory">{SubCategory}</textArea>
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

export default UpdateProduct;