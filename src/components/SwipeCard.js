import React, { Component } from 'react'
import '../App.css'
import TinderCard from 'react-tinder-card'

// import Pic from '../images/RGB.png'

class SwipeCard extends Component {
    constructor(props) {
        super(props)
        // const pic = require(this.props.link)
        // this.state = {
        //     pic: pic
        // }
        this.onSwipe = this.onSwipe.bind(this);
        this.onCardLeftScreen = this.onCardLeftScreen.bind(this);


    }
     onSwipe = (direction) => {
        console.log('You swiped: ' + direction)
        if(direction>0){
            this.props.swipeLeft();
        }else{
            this.props.swipeRight();
        }
      }
       
    onCardLeftScreen = (myIdentifier) => {
        console.log(myIdentifier + ' left the screen')
      }


   
    render = () => {
        return (
            <div className = "swipeCard">

            <TinderCard onSwipe={this.onSwipe} 
            
            preventSwipe={['right', 'left']}>
                <img id="swipeIMG"
                src={window.location.origin + this.props.link}>
                </img>
            
            </TinderCard>

            

            </div>
            
        )
    }
}



export default SwipeCard