import React from 'react'

class Button extends React.Component {
    state ={i:0};
    clickHandler = () => {
      this.setState( {i: this.state.i+1});
    }
    render = () => {
      return (
        <button onClick={this.clickHandler}>Hello this is {this.props.name}'s {this.state.i}th class</button>
      )
    }
  }

  export default Button