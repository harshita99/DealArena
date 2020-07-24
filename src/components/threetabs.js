import React from "react";
//import ReactDOM from "react-dom";
import { Tabs } from "antd";

const { TabPane } = Tabs;

class ThreeTabs extends React.Component {
  // constructor(props){
  //   super(props);
  // }
  render() {
    return (
      <div>
        <Tabs tabPosition="left">
          <TabPane tab="New offers" key="1">
          <h5>Here are new offers from your interests: </h5>

          </TabPane>
          <TabPane tab="Old offers" key="2">
          <div className="col-sm-5">
							<h5>Here are old offers from your interests: </h5>
							{this.props.propoffers.map(offer=>
								<div className="card-post mb-4 card card-small">
								<div className="card-body">
									<h5 className="card-title">
										{offer.Name}
									</h5>
									<img src= {offer.imageurl} alt="DealArena" width="100px" height="100px"/>
									<h5 className="card-title"> {offer.Description}</h5>					

									<h5 className="card-title">Category: {offer.Category}</h5>
								</div>

								<div className="border-top d-flex card-footer">
								<div className="card-post__author d-flex">
									<a href="/" className="card-post__author-avatar card-post__author-avatar--small" >
										Offer: {offer.Offer} </a>
								<div className="d-flex flex-column justify-content-center ml-3"><span className="card-post__author-name">Rs.{offer.Price}</span><small className="text-muted"> Offer expires {offer.Expiry}</small></div></div><div className="my-auto ml-auto"><a href={offer.producturl}> BUY NOW</a></div></div></div>
							)}
						</div>

          </TabPane>
          <TabPane tab="Other offers" key="3">
          <h5>Here are all other offers: </h5>

          </TabPane>
        </Tabs>
      </div>
    );
  }
}
export default ThreeTabs;
