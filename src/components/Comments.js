import React, { Component } from 'react';
import '../App.css'



class Comments extends Component {

  constructor(props) {
    super(props);

  }


    render = () => {
        return(
        <div>
            <div className = "card">
                <p>{this.props.content}</p>
            </div>
        </div>
        )
    }
}



export default Comments