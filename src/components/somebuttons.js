import React from 'react';
import { Tooltip } from 'antd';
import 'antd/dist/antd.css';
import history from './../history';
import Icon from '@ant-design/icons';
import { ShoppingTwoTone, SendOutlined, setTwoToneColor, getTwoToneColor } from '@ant-design/icons';
const Button = (props) => {  
  return (
    <Tooltip title="Make Leaf">
      {/* <Icon type="message" style={{ fontSize: '22px', color: '#08c' }} label="Leaf" theme="outlined"  onClick={props.toggle} /> */}
      <ShoppingTwoTone style={{ fontSize: '22px', color: '#08c' }} label="Leaf" onClick={props.toggle} /> {" "}
    {/* <button style={{backgroundColor:'grey'}} label="Leaf" onClick={props.toggle}>
        {/* onClick={changeBackground}     */}
   {/*} <img src="images/star_icon.png" alt="makeleaf" style={{size: "20px", height: "20px", width: "20px"}} />
      {/* {props.name} */}
   {/* </button> */}
    </Tooltip>
  )
}

class SomeButtons extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = { isOpen: false }
    this.toggle = this.toggle.bind(this);
  }
  
toggle(e) {
  this.setState(prevState => ({
    isOpen: !prevState.isOpen
  }));

  console.log(getTwoToneColor);
  
  if (!this.state.isOpen)
    setTwoToneColor("black");

  else
    setTwoToneColor("#08c");
}
  
  render() {
    return(
      <span>
        <Button 
          toggle={this.toggle}
        />

        {this.state.isOpen && 
            <Tooltip title="View Product">
              <SendOutlined style={{ fontSize: '22px', color: '#08c' }} label="View" onClick={() => history.push('/addproduct')} />
            {/* <button onClick={() => history.push('/addproduct')} style={{backgroundColor:'grey', color:'black'}}>
              Go </button> */}
            </Tooltip>
        }
      </span>
    );
  } 
}

export default SomeButtons;