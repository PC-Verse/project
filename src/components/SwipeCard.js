import React, { Component } from 'react'
import '../App.css'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

// import Swipeable from 'react-swipeable'
// import Pic from '../images/RGB.png'

class SwipeCard extends Component {
    constructor(props) {
        super(props)
        // const pic = require(this.props.link)
        this.state = {
            // pic: pic
            touchStart: 0,
            touchEnd: 0,
            dragStart: 0,
        }
    }
    handleTouchStart = (e) => {
        this.setState({
            touchStart: e.targetTouches[0].clientX,
        })
    }
    handleTouchMove = (e) => {
        this.setState({
            touchEnd: e.targetTouches[0].clientX
        })
    }
    handleTouchEnd = () => {
        if (this.state.touchEnd - this.state.touchStart > 150) {
            this.props.swipeLeft();
        }
        if (this.state.touchEnd - this.state.touchStart < -150) {
            this.props.swipeRight();
        }
    }

    // onSwipedLeft = (e, deltaX, deltaY, isFlick, velocity) => {
    //     console.log("You swiped left...", e, deltaX, deltaY, isFlick, velocity)
    //     this.props.swipeLeft();
    // }
    // onSwipedRight = () => {
    //     console.log("You swiped right ...", e, deltaX, deltaY, isFlick, velocity)
    //     this.props.swipeRight();
    // }
    handleDragStart = (e) => {
        this.setState({
            dragStart: e.clientX
        })
        this.props.setSwipeImgClassName("dragging")
    }
    handleDragEnd = (e) => {
        let endPos = e.clientX
        this.props.setSwipeImgClassName("load")
        this.setState({
            dragStart: 0
        })
        if (endPos - this.state.dragStart > 150) {
            this.props.swipeRight();
        }
        if (endPos - this.state.dragStart < -150) {
            this.props.swipeLeft();
        }
    }

    render = () => {
        return (
            <div className="swipeCard">
                {/* <Swipeable
                     onSwipedLeft={this.onSwipedLeft}
                     onSwipedRight={this.onSwipedRight}> */}
                <TransitionGroup>   {/* transition group bc we need to aniamte entering and exiting card*/}
                    <CSSTransition
                        timeout={300}
                        classNames="fade"
                        key={this.props.index}  // need key so it knows which is which
                    >
                        <img id='swipeIMG'
                            className={this.props.swipeImgClassName}
                            src={window.location.origin + this.props.link}
                            onDragStart={this.handleDragStart}
                            onDragEnd={this.handleDragEnd}
                            onTouchStart={this.handleTouchStart}
                            onTouchMove={this.handleTouchMove}
                            onTouchEnd={this.handleTouchEnd}
                        // onSwipe={() => {console.log("Swiped")}}
                        >
                        </img>
                    </CSSTransition>
                </TransitionGroup>
                {/* </Swipeable> */}
                {/* <div className="image">
                    <h></h>

                </div> */}
                <div>
                    {/* <div class="item">
                            <button>R 
                                <i class="fa fa-long-arrow-right arrow1" aria-hidden="true"></i>
                            </button>
                        </div>` */}
                    <button className="btn1" onClick={this.props.swipeLeft} > &lt; &lt;  </button>
                    <button className="btn1" onClick={this.props.swipeRight} > &#x3e; &#x3e;  </button>
                </div>

            </div>

        )
    }
}



export default SwipeCard