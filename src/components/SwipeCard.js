import React, { Component } from 'react'
import '../App.css'
// import Pic from '../images/RGB.png'

class SwipeCard extends Component {
    constructor(props) {
        super(props)
        // const pic = require(this.props.link)
        // this.state = {
        //     pic: pic
        // }
    }

   
    render = () => {
        return (
            <div className = "swipeCard">
             <img id="swipeIMG"
                src={window.location.origin + this.props.link}>
            </img>
              <div className = "image">
                  <h></h>
                 
              </div>
              <div>
                <button onClick={this.props.swipeLeft} >swipe left</button>
                <button onClick={this.props.swipeRight} >swipe right</button>
              </div>

            </div>
            
        )
    }
}



export default SwipeCard