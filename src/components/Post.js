import React, { Component } from 'react'
import '../App.css'
import Picture from './Picture'
import PostPicture from './PostPicture'
import database from '../firebase'

class Post extends Component {
    constructor(props) {
        super(props)
        this.props = props
        this.state = {
            swipes: 0,
            disALeft: false,
            disARight: false
        }
    }

    incrementSwipesFireBase = (key) => {
        let disALeft;
        let disARight;
        if (this.state.disALeft== true) {
            this.setState({
                disALeft: false,
                disARight: true
            })
        }
        else {
            this.setState({
                disALeft: false,
                disARight: true
            })

        }
        database.ref('globalPosts/'+key).update({
            numLikes: this.props.numLikes+1,
        });
    }

    decrementSwipesFireBase = (key) => {
        let disALeft;
        let disARight;
        if (this.state.disARight== true) {
            this.setState({
                disALeft: true,
                disARight: false
            })
        }
        else {
            this.setState({
                disALeft: true,
                disARight: false
            })
            

        }
        database.ref('globalPosts/'+key).update({
            numLikes: this.props.numLikes-1,
        });
    }

    openDiscussion = () => {
        console.log("running ope discussion...")
        let postObj = {
                    content: this.props.content,
                    dateDay: this.props.dateDay,
                    dateTime: this.props.dateTime,
                    key: this.props.key,
                    isGlobalPost: true,
                    haveDiscussBtn: false,
                    name: this.props.name,
                    title : this.props.title,
                    imageList : this.props.imageList,
                    numLikes: this.props.numLikes,
        }
        this.props.setPostObj(postObj);
        this.props.toggleComponent("showDiscussion");
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
                            <img src={image['data_url']} className="picture" id="postPic"/>
                        ))}
                    </div>
                    }
                </p>
                <br/>
                {this.props.isGlobalPost &&
                    <div>
                        <div className="numSwipes">Likes: {this.props.numLikes}</div>
                        <div className="swipeBtnContainer">
                            <button disabled ={this.state.disALeft} id="swipeLeftBtn" className="swipeBtn" onClick={()=>{this.decrementSwipesFireBase(this.props.postKey)}}>Dislike</button>
                            
                            <button disabled ={this.state.disARight} id="swipeRightBtn" className="swipeBtn" onClick={()=>{this.incrementSwipesFireBase(this.props.postKey)}}>Like</button>
                            {this.props.isGlobalPost &&
                                <button onClick={this.openDiscussion}>Click to Discuss</button>
                            }
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