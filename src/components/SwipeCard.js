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
        if (direction > 0) {
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

                     
                    {this.props.imageList &&
                        <div className="pictureContainer">
                            {/*try to add the image here..not sure how*/}
                            {this.props.imageList.map((image, index) => (
                                <img src={image['data_url']} className="picture"/>
                            ))}
                        </div>
                    }

                </TinderCard>




            </div>

        )
    }
}



export default SwipeCard