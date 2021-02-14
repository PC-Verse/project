import React, { Component } from 'react'
// import Post from './Post'
import '../App.css'
import database from '../firebase'
import SwipeCard from './SwipeCard'
import { CSSTransition } from 'react-transition-group'

class Swipe extends Component {
    constructor() {
        super()
        this.state = {
            imageLists: [],
            index: 0,
            swipeImgClassName: "",
            appearCard: true
        }

    }

    componentDidMount = () => {
        database.ref('/globalPosts/').on("value", (snapshot) => {
            snapshot.forEach(data => {
                let imageList = data.val().imageList;
                if (imageList !== undefined)
                {
                    let lazy = this.state.imageLists;
                    lazy.unshift(imageList);
                    this.setState({imageLists: lazy})
                }
            })
        })
        console.log(this.state.imageLists)
    }
    swipeRight = () => {
        if (this.state.index >= this.state.imageLists.length - 1) {
            this.setState({
                index: 0
            })
        }
        else {
            this.setState({
                index: this.state.index + 1
            })
        }
    }
    swipeLeft = () => {
        if (this.state.index <= 0) {
            this.setState({
                index: this.state.imageLists.length - 1
            })
        }
        else {
            this.setState({
                index: this.state.index - 1
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

                    <SwipeCard imageList={this.state.imageLists[this.state.index]} swipeImgClassName={this.state.swipeImgClassName} setSwipeImgClassName={this.setSwipeImgClassName}  swipeRight={this.swipeRight} swipeLeft={this.swipeLeft} index={this.state.index}></SwipeCard>

                }
            </div>
        )
    }
}

export default Swipe;

/*
link={this.state.swipePosts[this.state.index]}*/ 