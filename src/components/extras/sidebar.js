import React,{Component} from 'react';
// import firebase from "./Config";

// import history from './../history';

class Sidebar extends Component{

  render(){
    return(
      <aside className="single_sidebar_widget post_category_widget">
        <h4 className="widget_title">Filter by Category</h4>
        <ul className="list cat-list">
          <li>
            <a href="/userhome?category=Electronics" className="d-flex">
              <p>Electronics</p>
            </a>
          </li>
          <li>
            <a href="/userhome?category=Flights" className="d-flex">
              <p>Flights</p>
            </a>
          </li>
          <li>
            <a href="/userhome?category=Footwear" className="d-flex">
              <p>Footwear</p>
            </a>
          </li>
        </ul>
      </aside>
    )
  }
}

export default Sidebar;
