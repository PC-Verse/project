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
                        {/* <div class="item">
                            <button>R 
                                <i class="fa fa-long-arrow-right arrow1" aria-hidden="true"></i>
                            </button>
                        </div>` */}
                <button class ="btn1" onClick={this.props.swipeLeft} > left </button>
                <button  class ="btn1" onClick={this.props.swipeRight} > right  </button>
              </div>

            </div>
            
        )
    }
}



export default SwipeCard