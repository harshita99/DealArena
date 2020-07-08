import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn} from 'mdbreact';

class i2form extends Component{
    render(){
        return(
            <MDBContainer>
              <MDBRow>
                <MDBCol md="6">
                  <MDBCard>
                    <div className="header pt-3 peach-gradient">
                      <MDBRow className="d-flex justify-content-center">
                        <h3 className="white-text mb-3 pt-3 font-weight-bold"> Add product </h3>
                      </MDBRow>
                    </div>

                    <MDBCardBody className="mx-4 mt-4">
                      <div>
                        <p>Category of product</p>
                        <select className="browser-default custom-select">
                          <option>Select an option</option>
                          <option value="1">Footwear</option>
                          <option value="2">Electronics</option>
                          <option value="3">Clothing</option>
                        </select>
                      </div>

                      <br />

                      <MDBInput label="Sub-category" group type="text" validate />
                      <MDBInput label="Model No." group type="text" validate />
                      <MDBInput label="Price" group type="number" validate />
                      <MDBInput label="Color" group type="text" validate />
                      <MDBInput label="Offer Details" group type="text" validate />
                      <MDBInput label="Expiry Date" group type="date" validate />

                      <div className="text-center">
                        <MDBBtn color="grey" rounded type="button" className="z-depth-1a" > Submit </MDBBtn>
                      </div>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
        );
    }
}

export default i2form;