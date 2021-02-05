import React, { Component } from 'react'
import Post from './Post'
import SwipeCard from './SwipeCard'

class Swipe extends Component {
    constructor() {
        super()
        this.state = {
            swipePosts: [
                "/images/RGB.png",
                '/images/maxresdefault.jpg'
            ],
            index: 0
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

    render = () => {
        return (
            <div id="swiping-feature">
                <div>Tinder</div>
                {
                    <SwipeCard link = {this.state.swipePosts[this.state.index]}swipeRight={this.swipeRight} swipeLeft={this.swipeLeft} index={this.state.index}></SwipeCard>
                }
            </div>
        )
    }
}

export default Swipe