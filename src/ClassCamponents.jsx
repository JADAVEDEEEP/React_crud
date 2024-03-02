
import React, { Component } from "react";

class MyComponent extends Component 
{
    //THIS CONSTRUCTOR METHOD IS ACCESS THE STATE 
   constructor(props){
    //SUPER IS USED TO ACCESS THE PARENT CHILD
     super(props);
      //STATE IS USED TO HANDLE INTERNAL STATE
     this.state = {
      message: 'Hello, React!',
    };
  }

render() {
    return (
      <div>
        <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default MyComponent;