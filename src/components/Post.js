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
        // console.log("this.props in post's key" + this.props.name.toString())
    }

    incrementSwipesFireBase = (key) =>{
        console.log(key + "");
        database.ref('globalPosts/'+key).update({
            numLikes: 30,
        });
    }

    incrementSwipes = (name) => {
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
        // let prevNumLikes = 0;
        // console.log(this.props.key)
        // database.ref('/globalPosts/'+ this.props.key).on("value", (snapshot) => {
        //     if (snapshot.val().numLikes != null) {
        //         prevNumLikes = snapshot.val().numLikes
        //     }
        // })
        // database.ref('/globalPosts/'+ this.props.key).update({
        //     numLikes: prevNumLikes+1
        // });
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
        let prevNumLikes;
        database.ref('/globalPosts/'+ this.props.key+'/').on("value", (snapshot) => {
            prevNumLikes = snapshot.val().numLikes;
        })
        database.ref('/globalPosts/'+ this.props.key+'/numLikes/').update({
            numLikes: prevNumLikes-1,
        });
        this.setState((prevState, props) => ({
            swipes: prevState.swipes-1,
            disALeft: disALeft,
            disARight: disARight
        }))
        
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
                            <button disabled ={this.state.disALeft} id="swipeLeftBtn" className="swipeBtn" onClick={this.decrementSwipes}>{this.props.key}Dislike</button>
                            
                            <button disabled ={this.state.disARight} id="swipeRightBtn" className="swipeBtn" onClick={this.incrementSwipes(this.props.key)}>Like{}</button>
                            {this.props.haveDiscussBtn &&
                                <button onClick={this.openDiscussion}>Click to Discuss</button>
                            }
                        </div>
                    </div>
                }
                
                {/* <PostPicture/> */}

                {!(this.props.isGlobalPost) && 

                <div> 
                    <button onClick={() => {this.props.removePost(this.props.postKey)}} className="removeBtn">Remove Post</button>
                </div>}

            </div>
        )
    }
}



export default Post