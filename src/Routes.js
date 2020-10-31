  
import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import Home from "./components/Home";
import i1signup from "./components/i1signup";
import i2signup from "./components/i2signup";
import i3signup from "./components/i3signup";
import userhome from "./components/userhome";
// import productownerhome from "./components/productownerhome";
import addoffer from "./components/AddOffer";
import addproduct from "./components/AddProduct";
import showproduct from "./components/ShowProduct";
import updateoffer from "./components/UpdateOffer";
import manageoffers from "./components/ManageOffers";
import updateproduct from "./components/UpdateProduct";
import add from "./components/add";
import nav from "./components/NavBar"
import history from './history';
import somebuttons from './components/somebuttons'

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/i1signup" component={i1signup} />
                    <Route path="/i2signup" component={i2signup} />
                    <Route path="/i3signup" component={i3signup} />
                    <Route path="/userhome" component={userhome}/>
                    {/* <Route path="/productownerhome" component={productownerhome}/> */}
                    <Route path="/addoffer" component={addoffer}/>
                    <Route path="/addproduct" component={addproduct}/>                  
                    <Route path="/showproduct" component={showproduct}/>
                    <Route path="/updateoffer" component={updateoffer}/>
                    <Route path="/manageoffers" component={manageoffers}/>
                    <Route path="/updateproduct" component={updateproduct}/>
                    <Route path="/somebuttons" component={somebuttons}/>
                    <Route path="/add" component={add}/>
                    <Route path="/nav" component={nav}/>
                </Switch>
            </Router>
        )
    }
}