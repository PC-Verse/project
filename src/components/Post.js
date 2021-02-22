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
        database.ref('globalPosts/'+this.props.postKey).update({
            numLikes: this.props.numLikes+1,
            numSwipeRights: this.props.numSwipeRights+1
        });
        // uncomment this after clean database, bc rn most posts don't have profile obj so this will cause an error
        // database.ref('userPosts/'+this.props.profileObj.googleId+"/"+this.props.postKey).update({
        //     numLikes: this.props.numLikes+1,
        //     numSwipeRights: this.props.numSwipeRights+1
        // });
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
        // uncomment this after clean database, bc rn most posts don't have profile obj so this will cause an error
        // database.ref('userPosts/'+this.props.profileObj.googleId+'/'+this.props.postKey+'/').update({
        //     numLikes: this.props.numLikes-1,
        // });
    }
    incrementNumViews = () => {
        database.ref('globalPosts/'+this.props.postKey).update({
            numViews: this.props.numViews+1,
        });
        // uncomment this after clean database, bc rn most posts don't have profile obj so this will cause an error
        // database.ref('userPosts/'+this.props.profileObj.googleId+'/'+this.props.postKey+'/').update({
        //     numViews: this.props.numViews+1,
        // });
    }

    openDiscussion = () => {
        console.log("running open discussion...")
        let postObj = {
                    content: this.props.content,
                    dateDay: this.props.dateDay,
                    dateTime: this.props.dateTime,
                    postKey: this.props.postKey,
                    isGlobalPost: true,
                    haveDiscussBtn: false,
                    name: this.props.name,
                    profileObj : this.props.profileObj,
                    title : this.props.title,
                    imageList : this.props.imageList,
                    numLikes: this.props.numLikes,
                    numViews: this.props.numLikes,
                    numSwipeRights: this.props.numSwipeRights
        }
        this.props.setPostObj(postObj);
        this.props.toggleComponent("showDiscussion");
    }


    render = () => {
        return (
            <div className = "card">
                <p class = "text-card" onLoad={this.incrementNumViews}>
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
                {/* {this.props.isGlobalPost && */}
                    <div>
                        {/* this.props.isGlobalPost && */
                           <div>
                            <p>PC-RATING: {(this.props.numSwipeRights / this.props.numViews * 10).toFixed(2)}</p>
                            <progress class="tinder-bar" value={(this.props.numSwipeRights / this.props.numViews * 100).toString()} max="100"> {(this.props.numSwipeRights / this.props.numViews).toFixed(2)} </progress>
                           </div>

                        } 
                        <div className="numSwipes">Likes: {this.props.numLikes}</div>
                        {this.props.isGlobalPost && 
                            <div className="swipeBtnContainer">
                            <button disabled ={this.state.disALeft} id="swipeLeftBtn" className="swipeBtn" onClick={()=>{this.decrementSwipesFireBase(this.props.postKey)}}>&#x1F44E;</button>
                            
                            <button disabled ={this.state.disARight} id="swipeRightBtn" className="swipeBtn" onClick={()=>{this.incrementSwipesFireBase(this.props.postKey)}}> &#x1F44D;</button>   
                        </div>
                        }
                        {   this.props.haveDiscussBtn && 
                            <button id="discussBtn" onClick={this.openDiscussion}>Click to Discuss</button>
                        }   
                    </div>
                {/* } */}
                
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