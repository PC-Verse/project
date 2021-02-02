import React, { Component } from 'react'
import '../App.css'
import Picture from './Picture'
import PostPicture from './PostPicture'

class Post extends Component {
    constructor() {
        super()
        this.state = {
            swipes: 0,
        }
    }

    incrementSwipes = () => {
        this.setState((prevState, props) => ({
            swipes: prevState.swipes+1
        }))
    }

    decrementSwipes = () => {
        this.setState((prevState, props) => ({
            swipes: prevState.swipes-1
        }))
    }

    render = () => {
        return (
            <div className = "card">
                <p class = "text-card">
                    <div className="postTitle">{this.props.title}</div>
                    <div id="nameOfPoster">{this.props.name}</div>
                    <div className="timeStamp">{this.props.dateDay} {this.props.dateTime}</div>
                    <div className="postContent">{this.props.content}</div>
                    <div className="pictureContainer">
                        {this.props.imageList.map((image, index) => (
                            <img src={image['data_url']} className="picture"/>
                        ))}
                    </div>
                </p>
                <br/>
                {this.props.isGlobalPost &&
                    <div>
                        <div className="numSwipes">Swipes: {this.state.swipes}</div>
                        <div className="swipeBtnContainer">
                            <button id="swipeLeftBtn" className="swipeBtn" onClick={this.decrementSwipes}>{"<"}= Swipe</button>
                            <button id="swipeRightBtn" className="swipeBtn" onClick={this.incrementSwipes}>Swipe ={">"}</button>
                        </div>
                    </div>
                }
                
                {/* <PostPicture/> */}

                {!(this.props.isGlobalPost) && 

                <div> 
                    <button onClick={() => {this.props.removePost(this.props.id)}} className="removeBtn">Remove Post</button>
                </div>}

            </div>
        )
    }
}



export default Post