import React, { Component } from 'react'
// import Post from './Post'
import '../App.css'
import { CSSTransition } from 'react-transition-group'
import { getNodeText } from '@testing-library/react'

class PicturesList extends Component {
    constructor() {
        super()
        this.state = {
            index: 0
        }

    }


    goNext = (a) => {

        let newIndex = (this.state.index == 0 && a == -1 ? this.props.images.length - 1 : this.state.index + a) % this.props.images.length
        this.setState({
            index: newIndex
        })

    }


    setSwipeImgClassName = (name) => {
        this.setState({
            swipeImgClassName: name
        })
    }

    render = () => {
        console.log("HERE");
        return (
            <div>
<<<<<<< HEAD
            <div id="picture-wheel">
                <button onClick = {()=>{this.goNext(-1)}}>&#8592;</button>
                {
                    this.props.images[this.state.index] &&
                    <img src={this.props.images[this.state.index]['data_url']} className="picture" id="postPic"/>

                }
                <button onClick = {()=>{this.goNext(1)}}>&#8594;</button>
            </div>
            <div>
                <p>{this.state.index+1} / {this.props.images.length}</p>
            </div>
=======
                <div id="picture-wheel">
                    {this.props.images.length > 1 &&
                        <button id="leftTogglePicBtn" onClick={() => { this.goNext(-1) }}>&#8592;</button>}
                    <img src={this.props.images[this.state.index]['data_url']} className="picture" id="postPic" alt="Post Picture"/>
                    {this.props.images.length > 1 &&
                        <button id="rightTogglePicBtn" onClick={() => { this.goNext(1) }}>&#8594;</button>}
                </div>
                <div>
                    <p>{this.state.index + 1} / {this.props.images.length}</p>
                </div>
>>>>>>> 14df56c5e3e3bed0fe9e44f7b8016e446cf87b1c
            </div>

        )
    }
}

export default PicturesList;
