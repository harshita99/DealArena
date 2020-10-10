import React, { Component, useState, useRef } from "react";
import firebase from "./Config";
import SortableTree, {
  addNodeUnderParent,
  removeNodeAtPath,
  changeNodeAtPath
  //toggleExpandedForAll
} from "react-sortable-tree";
import "react-sortable-tree/style.css";
import { Tooltip } from 'antd';
import SomeButtons from "./somebuttons";

class Treee1 extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      treeData: [
        { title: sessionStorage.getItem('category'), children: [{ title: sessionStorage.getItem('brandN') }] },
        // { title: 'Fish', children: [{ title: 'fingerline' }] },
      ],
    };
  }
 
  render() {
    return (
      <div style={{ height: 400 }}>
        <SortableTree
          treeData={this.state.treeData}
          onChange={treeData => this.setState({ treeData })}
        />
      </div>
    );
  }
}
export default Treee1;