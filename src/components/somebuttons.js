import React from 'react';

const Button = (props) => {  
  return (

    <button label="Leaf"    onClick={props.toggle}>
        {/* onClick={changeBackground}     */}
    <img src="images/star_icon.png" alt="makeleaf" style={{size: "20px", height: "20px", width: "20px"}} />
 
      {props.name}
    </button>
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



    if (e.target.style.background === 'red'){
      e.target.style.background = 'grey';
    }
    else
      e.target.style.background = 'red';


  }
  
  render() {
    return(
      <div class="container mg-top">
        <Button 
          toggle={this.toggle}
        />

        
        
        {this.state.isOpen && 
            <button class="white-text">
              Go </button>
        }
        
      </div>
    );
  } 
}


export default SomeButtons;