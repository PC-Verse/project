import React, { Component } from 'react'
import '../App.css'
import Picture from './Picture'
import PostPicture from './PostPicture'

class Post extends Component {
    constructor() {
        super()
        this.state = {
            swipes: 0,
            disALeft: false,
            disARight: false
        }
    }

    incrementSwipes = () => {
        let disALeft;
        let disARight;
        if (this.state.disALeft == true) {
            disALeft = false;
            disARight = false;
        }
        else {
            disALeft = false;
            disARight = true;
        }
        this.setState((prevState, props) => ({
            swipes: prevState.swipes+1,
            disARight: disARight,
            disALeft: disALeft
        }))
        

    }

    decrementSwipes = () => {
        let disALeft;
        let disARight;
        if (this.state.disARight == true) {
            disALeft = false;
            disARight = false;
        }
        else {
            disALeft = true;
            disARight = false;
        }
        this.setState((prevState, props) => ({
            swipes: prevState.swipes-1,
            disALeft: disALeft,
            disARight: disARight
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
                    {this.props.imageList &&
                    <div className="pictureContainer">
                        {this.props.imageList.map((image, index) => (
                            <img src={image['data_url']} className="picture"/>
                        ))}
                    </div>
                    }
                </p>
                <br/>
                {this.props.isGlobalPost &&
                    <div>
                        <div className="numSwipes">Likes: {this.state.swipes}</div>
                        <div className="swipeBtnContainer">
                            <button disabled ={this.state.disALeft} id="swipeLeftBtn" className="swipeBtn" onClick={this.decrementSwipes}>{}Dislike</button>
                            
                            <button disabled ={this.state.disARight} id="swipeRightBtn" className="swipeBtn" onClick={this.incrementSwipes}>Like{}</button>

                        </div>
                    </div>
                }
                
                {/* <PostPicture/> */}

                {!(this.props.isGlobalPost) && 

                <div> 
                    <button onClick={() => {this.props.removePost(this.props.key)}} className="removeBtn">Remove Post</button>
                </div>}

            </div>
        )
    }
}



export default Post