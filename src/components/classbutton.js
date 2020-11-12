import React from 'react';
import { Tooltip } from 'antd';
import 'antd/dist/antd.css';
import { ShoppingTwoTone} from '@ant-design/icons';


class ClassButton extends React.Component {
  click=()=>{
    console.log(this.props.rowInfo);
  }
  
  render() {

    return(
      <span>
        <Tooltip title="Add offer">
              <ShoppingTwoTone style={{ fontSize: '22px', color: '#08c' }} 
              label="Leaf" onClick={this.click} 
              /> {" "}
            </Tooltip>
      </span>
    );
  } 
}

export default ClassButton;