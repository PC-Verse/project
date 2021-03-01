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
        }, 1000)        // time should be exit time + slideIn time
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
        if (this.state.renderAnimation != "")   // if they spam the button, won't change pic until done rendering this one
            return

        // set variables to correct values
        let renderAnimation;
        let exit;
        if (a > 0) {
            renderAnimation = "slideToRight"
            exit = "exitRight"
        }
        else  {  // a < 0
            renderAnimation = "slideToLeft"
            exit = "exitLeft"
        }

        // stop other animations, this stuff is actually not needed anymore. But keep it just in case
        this.clearAllTimeouts()
        this.setState({
            renderAnimation : ""
        })

        // calc newIndex
        let newIndex = (this.state.index == 0 && a == -1 ? this.props.images.length - 1 : this.state.index + a) % this.props.images.length
        
        // start exit animation
        this.setState({
            renderAnimation : exit    // takes 0.5s
        })

        // run slide animation after exit function finishes
        let exitTime = 500;
        let timeout = setTimeout(() => {
            this.setState({
                index : newIndex,
                renderAnimation : renderAnimation
            })
        }, exitTime)
        this.addTimeout(timeout);
        
        // reset class name after aniamtion finishes
        this.setRenderAnimationFalse()
    }


    setSwipeImgClassName = (name) => {
        this.setState({
            swipeImgClassName: name
        })
    }

    render = () => {
        // console.log("HERE");
        // let picClasses = ['postPic', this.state.renderAnimation].join(' ');
        return (
            <div>
                <div id="picture-wheel">
                    {/* {console.log("From pictures list" + this.props.images)} */}
                    {this.props.images.length > 1 && this.props.images[this.state.index] != undefined &&        // don't think these checks work. Had tp add checks in Post.js
                        <button id="leftTogglePicBtn" onClick={() => { this.goNext(-1) }}>&#8592;</button>}
                        <div id="picContainer" className={this.state.renderAnimation}>
                            <img src={this.props.images[this.state.index]['data_url']}
                                key={this.props.images[this.state.index]['data_url']}
                                // className={picClasses}
                                className="postPic"
                                id="postPic"
                                alt="Post Picture"/>
                        </div>
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
