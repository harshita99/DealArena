import React,{Component} from 'react';
import firebase from "./Config";
import history from '../history';

class AddProduct extends Component{
    constructor(props){
        super(props);
        this.state={
            Name:"",
            Description:"",
            Price:"",
            Category:"",
            SubCategory1:"",
            SubCategory2:"",
            SubCategory3:"",
            imageurl:"",
            Brand:"",
            image:null,
            producturl:""
        }
    }

    onChange=(e)=>{
        const state=this.state;
        state[e.target.name]=e.target.value;
        this.setState(state);
    }

    onSubmit=(e)=>{
        e.preventDefault();
        const {Name, Description, Price, Category, SubCategory1, SubCategory2, SubCategory3, Brand,imageurl,producturl}=this.state;
        firebase.firestore().collection("productDetails").add({
            Name,
            Brand,
            Description,
            Price,
            SubCategory1,
            SubCategory2,
            SubCategory3,
            Category,
            imageurl,
            producturl
        }).then(()=>{
            this.setState({
                Name:"",
                Brand:"",
                Description:"",
                Price:"",
                Category:"",
                SubCategory1:"",
                SubCategory2:"",
                SubCategory3:"",
                imageurl:"",
                producturl:""
            });
            this.props.history.push("/showproduct");
            console.log("product added");
        })
        .catch((error)=>{
            console.error("Error adding product:",error);
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

    render() {
        const {Name, Description, Price, Category, SubCategory1, SubCategory2, SubCategory3, Brand, producturl}=this.state;
        
        const divStyle = {
            margin: '40px'
        };
        const bottomStyle = {
            margin: '20px'
        };

        return(
            <div style={divStyle}>
                <div id="formbutton" className="Buttons" style={bottomStyle}>
                    <button type="submit" className="btn btn-primary" onClick={() => history.push('/showproduct')}> Show Products </button>
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

export default AddProduct;