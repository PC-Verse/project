import React, { Component } from 'react';
import '../App.css'

class SelectCommunity extends Component {

  constructor(props) {
    super(props);
    this.state = {
        content: '',
    };
  }


    render = () => {
        return(
            <div>

                
                 <div className = "card">
                     <h>Select a community to post: </h>
                        <button onClick = {()=> this.props.toggleCommuity("Apple")}>Apple</button>
                        <button onClick = {()=> this.props.toggleCommuity("Nvidia")}> Nvidia</button>
                        <button onClick = {()=> this.props.toggleCommuity("AMD")}>AMD</button>
                        <button onClick = {()=> this.props.toggleCommuity("Microsoft")} >Microsoft</button>
                </div>
                
            </div>
        )
    }
}



export default SelectCommunity