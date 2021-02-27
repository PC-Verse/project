import React, { Component } from 'react'
import '../App.css'
import TinderCard from 'react-tinder-card'
import PicturesList from './PicturesList'

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
        console.log(direction)
        if (direction == 'left') {
            this.props.swipeLeft();
        } else {
            this.props.swipeRight();
        }
    }

    onCardLeftScreen = (myIdentifier) => {
        console.log(myIdentifier + ' left the screen')
    }



    render = () => {
        return (
            <div className="swipeCard">

                {console.log(this.props.id)}

                <TinderCard
                    onSwipe={this.onSwipe}
                    onCardLeftScreen={() => this.onCardLeftScreen('fooBar')}
                    preventSwipe={['right', 'left', 'up', 'down']}>

                        <div className="pictures">
                            {this.props.imageList &&
                                    
                                    
                                    <PicturesList
                                    images = {this.props.imageList}
                                ></PicturesList>
                            }
                        </div>


                        
                        
                </TinderCard>




            </div>

        )
    }
}



export default SwipeCard