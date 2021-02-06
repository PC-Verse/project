import React, { Component } from 'react'
// import Post from './Post'
import '../App.css'
import SwipeCard from './SwipeCard'
import { CSSTransition } from 'react-transition-group'

class Swipe extends Component {
    constructor() {
        super()
        this.state = {
            swipePosts: [
                "/images/RGB.png",
                '/images/maxresdefault.jpg'
            ],
            index: 0,
            swipeImgClassName: "",
            appearCard: true
        }

    }

swipeRight = () => {
    if(this.state.index>=this.state.swipePosts.length-1){
        this.setState({
            index:0
        })
    }
    else{
        this.setState({
            index: this.state.index+1
        })
    }
}
swipeLeft = () =>{
    if(this.state.index<=0){
        this.setState({
            index: this.state.swipePosts.length-1
        })
    }
    else{
        this.setState({
            index: this.state.index-1
        })
    }
}

setSwipeImgClassName = (name) => {
    this.setState({
        swipeImgClassName: name
    })
}

    render = () => {
        return (
            <div id="swiping-feature">
                <div>Happy Swiping!</div>
                {
                    <CSSTransition
                        in={this.state.appearCard}
                        appear={true}
                        timeout={300}
                        classNames="fade"   // classNames bc fade is base keyword for many classes
                    >
                        <SwipeCard swipeImgClassName={this.state.swipeImgClassName} setSwipeImgClassName={this.setSwipeImgClassName} link = {this.state.swipePosts[this.state.index]} swipeRight={this.swipeRight} swipeLeft={this.swipeLeft} index={this.state.index}></SwipeCard>
                     </CSSTransition>
                }
            </div>
        )
    }
}

export default Swipe;