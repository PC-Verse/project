import React, { Component } from 'react'
// import Post from './Post'
import '../App.css'
import { CSSTransition } from 'react-transition-group'
import { getNodeText } from '@testing-library/react'
import ReactCSSTransitionGroup from 'react-transition-group'

class PicturesList extends Component {
    constructor() {
        super()
        this.state = {
            index: 0,
            fade_in : true,
            timeouts : []
        }
        this.setFadeInFalse()
    }

    setFadeInFalse = () => {
        let timeout = setTimeout(() => {
            this.setState({
                fade_in: false
            })
        }, 1500)
        let timeouts = this.state.timeouts;
        timeouts.push(timeout)
        this.setState({
            timeouts : timeouts
        })
    }
    clearAllTimeouts = () => {
        let timeouts = this.state.timeouts
        while (timeouts.length > 0) {
            clearTimeout(timeouts[0]);  // stops the timeoutf
            timeouts.shift(); // delete first elemnnt in array
        }
        this.setState({
            timeouts : timeouts
        })
    }
    goNext = (a) => {
        this.clearAllTimeouts()
        this.setState({
            fade_in: false
        })
        let newIndex = (this.state.index == 0 && a == -1 ? this.props.images.length - 1 : this.state.index + a) % this.props.images.length
        this.setState({
            index: newIndex,
            fade_in : true
        })
        this.setFadeInFalse()
    }


    setSwipeImgClassName = (name) => {
        this.setState({
            swipeImgClassName: name
        })
    }

    render = () => {
        // console.log("HERE");
        let picClasses = ['picture', this.state.fade_in ? 'fade-in' : ''].join(' ');
        return (
            <div>
                <div id="picture-wheel">
                    {this.props.images.length > 1 &&
                        <button id="leftTogglePicBtn" onClick={() => { this.goNext(-1) }}>&#8592;</button>}
                    {/* <ReactCSSTransitionGroup
                        transitionName="fade"
                        transitionEnterTimeout={300}
                        transitionLeaveTimeout={300}> */}
                        <img src={this.props.images[this.state.index]['data_url']}
                            key={this.props.images[this.state.index]['data_url']}
                            className={picClasses}
                            id="postPic"
                            alt="Post Picture"/>
                    {/* </ReactCSSTransitionGroup> */}
                    {this.props.images.length > 1 &&
                        <button id="rightTogglePicBtn" onClick={() => { this.goNext(1) }}>&#8594;</button>}
                </div>
                <div>
                    <p>{this.state.index + 1} / {this.props.images.length}</p>
                </div>
            </div>

        )
    }
}

export default PicturesList;
