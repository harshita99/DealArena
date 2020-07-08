import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBFormInline} from 'mdbreact';

class i1form extends Component{
    render(){
        return(
            <MDBContainer>
              <MDBRow>
                <MDBCol md="6">
                  <MDBCard>
                    <div className="header pt-3 peach-gradient">
                      <MDBRow className="d-flex justify-content-center">
                        <h3 className="white-text mb-3 pt-3 font-weight-bold"> Select Product </h3>
                      </MDBRow>
                    </div>

                    <MDBCardBody className="mx-4 mt-4">
                      
                    <p>Interested in:</p>
                    <MDBFormInline>
                        <MDBInput label='Products' type='radio' id='radio1' containerClass='mr-5' />
                        <MDBInput label='Services' type='radio' id='radio2' containerClass='mr-5' />
                      </MDBFormInline>
                      
                      <br />

                      <div>
                        <p>Category of Products</p>
                        <select className="browser-default custom-select">
                          <option>Select an option</option>
                          <option value="1">Footwear</option>
                          <option value="2">Electronics</option>
                          <option value="3">Clothing</option>
                          <option value="4">Accessories</option>
                          <option value="5">Home Appliances</option>
                          <option value="6">Furniture</option>
                          <option value="7">Vehicles</option>
                          <option value="8">Sports Equipments</option>
                          <option value="9">Books and Stationary</option>
                          <option value="10">Food Items</option>
                          <option value="11">Medicines</option>
                          <option value="12">Toys</option>
                          <option value="13">Baby Care</option>
                          <option value="14">Heavy Machinery</option>
                        </select>
                      </div>

                      <br />

                      <div>
                        <p>Sub-Category of Electronics</p>
                        <select className="browser-default custom-select">
                          <option>Select an option</option>
                          <option value="1">Mobile</option>
                          <option value="2">Laptop Accessories</option>
                          <option value="3">Laptop</option>
                          <option value="4">Laptop Accessories</option>
                          <option value="5">Tablet</option>
                          <option value="6">Speakers</option>
                          <option value="7">Camera</option>
                          <option value="8">Camera Accessories</option>
                        </select>
                      </div>

                      <br />

                      <div>
                        <p>Brand of Mobile</p>
                        <MDBFormInline>
                          <MDBInput label='Samsung' type='checkbox' id='checkbox1' containerClass='mr-5' />
                          <MDBInput label='Xiaomi' type='checkbox' id='checkbox2' containerClass='mr-5' />
                          <MDBInput label='Nokia' type='checkbox' id='checkbox3' containerClass='mr-5' />
                          <MDBInput label='Oppo' type='checkbox' id='checkbox4' containerClass='mr-5' />
                          <MDBInput label='Vivo' type='checkbox' id='checkbox5' containerClass='mr-5' />
                          <MDBInput label='OnePlus' type='checkbox' id='checkbox6' containerClass='mr-5' />
                          <MDBInput label='Apple' type='checkbox' id='checkbox7' containerClass='mr-5' />
                          <MDBInput label='All Brands' type='checkbox' id='checkbox8' containerClass='mr-5' />
                        </MDBFormInline>
                      </div>

                      <div>
                        <p>Price Range of Mobile (in INR)</p>
                        <MDBFormInline>
                          <MDBInput label='0-10k' type='checkbox' id='checkbox1' containerClass='mr-5' />
                          <MDBInput label='10k-20k' type='checkbox' id='checkbox2' containerClass='mr-5' />
                          <MDBInput label='2k-30k' type='checkbox' id='checkbox3' containerClass='mr-5' />
                          <MDBInput label='30k-40k' type='checkbox' id='checkbox4' containerClass='mr-5' />
                          <MDBInput label='50k-60k' type='checkbox' id='checkbox5' containerClass='mr-5' />
                          <MDBInput label='60k-80k' type='checkbox' id='checkbox6' containerClass='mr-5' />
                          <MDBInput label='80k+' type='checkbox' id='checkbox7' containerClass='mr-5' />
                          <MDBInput label='Any Range' type='checkbox' id='checkbox8' containerClass='mr-5' />
                        </MDBFormInline>
                      </div>

                      <div className="text-center">
                        <MDBBtn color="grey" rounded type="button" className="z-depth-1a" > Search </MDBBtn>
                      </div>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
        );
    }
}

export default i1form;