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
            renderAnimation : "slideToLeft",
            timeouts : []
        }
        this.setRenderAnimationFalse()
    }

    setRenderAnimationFalse = () => {
        let timeout = setTimeout(() => {
            this.setState({
                renderAnimation : ""
            })
        }, 2000)
        this.addTimeout(timeout)
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
    addTimeout = (timeout) => {
        let timeouts = this.state.timeouts;
        timeouts.push(timeout)
        this.setState({
            timeouts : timeouts
        })
    }
    goNext = (a) => {
        let renderAnimation;
        if (a > 0)
            renderAnimation = "slideToRight"
        else    // a < 0
            renderAnimation = "slideToLeft"

        this.clearAllTimeouts()
        this.setState({
            renderAnimation : ""
        })

        let newIndex = (this.state.index == 0 && a == -1 ? this.props.images.length - 1 : this.state.index + a) % this.props.images.length
        this.setState({
            renderAnimation : "exit"    // takes 1s
        })

        let timeout = setTimeout(() => {
            this.setState({
                index: newIndex,
                renderAnimation : renderAnimation
            })
        }, 1000)
        this.addTimeout(timeout);
        
        this.setRenderAnimationFalse()
    }


    setSwipeImgClassName = (name) => {
        this.setState({
            swipeImgClassName: name
        })
    }

    render = () => {
        // console.log("HERE");
        let picClasses = ['picture', this.state.renderAnimation].join(' ');
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
