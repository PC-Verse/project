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
            imageList: [],
            index: 0,
            swipeImgClassName: "",
            appearCard: true,
            postKeys: []
        }

    }

    componentDidMount = () => {
        database.ref('/globalPosts/').on("value", (snapshot) => {
            snapshot.forEach(data => {
                if (data.val().imageList !== undefined) {
                    // console.log(data.key);
                    let imageList = data.val().imageList;
                    let lazy = this.state.imageList;
                    lazy.unshift(imageList);
                    this.setState({ imageList: lazy })

                    let postKeyCopy = this.state.postKeys;
                    postKeyCopy.unshift(data.key);
                    this.setState({ postKeys: postKeyCopy })
                }
            })
        })
    }
    swipeRight = () => {
        let num = 0;
        database.ref('/globalPosts/' + this.state.postKeys[this.state.index] + '/numViews').on("value", (snapshot) => {
            num = snapshot.val()
        });
        database.ref('/globalPosts/' + this.state.postKeys[this.state.index]).update({
            numViews: num + 1
        });
        let right = 0;
        database.ref('/globalPosts/' + this.state.postKeys[this.state.index] + '/numSwipeRights').on("value", (snapshot) => {
            right = snapshot.val()
        });
        database.ref('/globalPosts/' + this.state.postKeys[this.state.index]).update({
            numSwipeRights: right + 1
        });

        if (this.state.index >= this.state.imageList.length - 1) {
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
        let num = 0;
        database.ref('/globalPosts/' + this.state.postKeys[this.state.index] + '/numViews').on("value", (snapshot) => {
            num = snapshot.val()
        });
        database.ref('/globalPosts/' + this.state.postKeys[this.state.index]).update({
            numViews: num + 1
        });
        if (this.state.index <= 0) {
            this.setState({
                index: this.state.imageList.length - 1
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

                    <SwipeCard imageList={this.state.imageList[this.state.index]} swipeImgClassName={this.state.swipeImgClassName} setSwipeImgClassName={this.setSwipeImgClassName} swipeRight={this.swipeRight} swipeLeft={this.swipeLeft} index={this.state.index}></SwipeCard>

                }
            </div>
        )
    }
}

export default Swipe;

/*
link={this.state.swipePosts[this.state.index]}*/