import React from 'react';
import { Tooltip } from 'antd';

const Button = (props) => {  
  return (
    <Tooltip title="Make Leaf">
    <button style={{backgroundColor:'grey'}} label="Leaf" onClick={props.toggle}>
        {/* onClick={changeBackground}     */}
    <img src="images/star_icon.png" alt="makeleaf" style={{size: "20px", height: "20px", width: "20px"}} />
      {/* {props.name} */}
    </button>
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

  if (e.target.style.background === 'red')
    e.target.style.background = 'grey';
  else
    e.target.style.background = 'red';
}
  
  render() {
    return(
      <span>
        <Button 
          toggle={this.toggle}
        />

        {this.state.isOpen && 
            <Tooltip title="View Product">
            <button style={{backgroundColor:'grey', color:'black'}}>
              Go </button>
            </Tooltip>
        }
      </span>
    );
  } 
}

export default SomeButtons;