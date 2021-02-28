import React, { Component } from 'react'
import '../App.css'
import Picture from './Picture'
import PostPicture from './PostPicture'
import PicturesList from './PicturesList'
import fire from '../images/fire.png'
import database from '../firebase'

class Post extends Component {
    constructor(props) {
        super(props)
        this.props = props
        this.state = {
            swipes: 0,
            disALeft: false,
            disARight: false,
        }
    }

    componentDidMount = () => {
        this.checkInteracted();
    }
    componentDidUpdate(prevProps) {
        // console.log("Component did update from post.js")
        if (prevProps.currUser != this.props.currUser) {
            this.checkInteracted()
        }
    }

    checkInteracted = () => {
        // console.log("in checkInteracted")
        // console.log(this.props.currUser)
        if (this.props.currUser != -1) {
            database.ref('userPosts/'+this.props.currUser + '/interactedPosts/').on("value", (snapshot) => {
            let interactedState = -1;
            // console.log("Started reading from database")
            //    console.log(snapshot)
            snapshot.forEach(data => {
                //    console.log("data.key: " + data.key)
                //    console.log("this.props.postKey: " + this.props.postKey)
                    if(data.key == this.props.postKey) {
                        // console.log("from database: " + data.val().interactedState)
                            if(data.val().interactedState == 0){
                                this.setState({
                                    disALeft: true,
                                    disARight: false
                                })
                            }else if (data.val().interactedState ==1) {
                                this.setState({
                                    disARight: true,
                                    disALeft : false
                                })    
                            }
                    }

            })
            })
        }
        if (this.props.currUser == -1)
        {
            this.setState({
                disALeft: true,
                disARight: true
            })
        }
        // console.log("disALeft: "+this.state.disALeft);
        // console.log("disAright: "+this.state.disARight);
    }

    incrementSwipesFireBase = (key) => {
        let disALeft;
        let disARight;
        let interactedState = -1;
        if (this.state.disALeft== true) {       // this means the post is disliked, so undo the like, by setting both btns to undisabled
            this.setState({
                disALeft: false,
                disARight: false,
            })
            interactedState = -1;
        }
        else {      // the post is neutral, so like it and disable like btn
            this.setState({
                disALeft: false,
                disARight: true
            })
            interactedState = 1;
        }
        database.ref('globalPosts/'+this.props.postKey).update({
            numLikes: this.props.numLikes+1,
        });
        database.ref('userPosts/'+this.props.profileObj.googleId+"/"+this.props.postKey).update({
            numLikes: this.props.numLikes+1,
        });
        
        
        database.ref('userPosts/'+this.props.currUser + '/interactedPosts/'+ this.props.postKey+'/').set({
            //0 is disliked, 1 is liked, -1 is not interacted
            interactedState: interactedState,
        })
    }

    decrementSwipesFireBase = (key) => {
        let disALeft;
        let disARight;
        let interactedState = -1;   // -1 for neutral, 0 for dislike, 1 for like
        if (this.state.disARight == true) {     // this means the post is liked, so undo the like so set both btns to undisabled
            // this.setState({
                disALeft= false;
                disARight= false
            // })
            interactedState = -1;
        }
        else {  // post is not liked, so just dislike it and set dislike btn to disabled
            // this.setState({
                disALeft= true;
                disARight= false
            // })
            interactedState = 0;

        }
        this.setState({
            disALeft : disALeft,
            disARight : disARight
        })
        database.ref('globalPosts/'+key).update({
            numLikes: this.props.numLikes-1,
        });
        database.ref('userPosts/'+this.props.profileObj.googleId+'/'+this.props.postKey+'/').update({
            numLikes: this.props.numLikes-1,
        });
        database.ref('userPosts/'+this.props.currUser + '/interactedPosts/'+ this.props.postKey+'/').set({
            //0 is disliked, 1 is liked, -1 is not interacted
            interactedState: interactedState,
            
        })
    }
    // incrementNumViews = () => {
    //     database.ref('globalPosts/'+this.props.postKey).update({
    //         numViews: this.props.numViews+1,
    //     });
    //     // uncomment this after clean database, bc rn most posts don't have profile obj so this will cause an error
    //     // database.ref('userPosts/'+this.props.profileObj.googleId+'/'+this.props.postKey+'/').update({
    //     //     numViews: this.props.numViews+1,
    //     // });
    // }

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
                    numSwipeRights: this.props.numSwipeRights,
                    currUser: this.props.currUser
        }
        this.props.setPostObj(postObj);
        this.props.setPostKey(this.props.postKey);
        this.props.toggleComponent("showDiscussion");
    }


    render = () => {
        return (
            <div className = "card" id= "post-card-1">
                <p class = "text-card">
                    <div className="postTitle">{this.props.title}</div>
                    <div id="nameOfPoster">{this.props.name}</div>
                    <div className="timeStamp">{this.props.dateDay} {this.props.dateTime}</div>
                    <div className="postContent">{this.props.content}</div>
                    {this.props.haveDiscussBtn && this.props.community != undefined && 
                        <div class = "compName">
                        <img src = ""></img>
                        <li>{this.props.community.toString().toUpperCase()} </li>
                        </div>
                    }


                    {this.props.imageList &&



                    <div className="pictureContainer">
                        {/* {this.props.imageList.map((image, index) => (
                            <img src={image['data_url']} className="picture" id="postPic"/>
                        ))} */}

                        <PicturesList
                            images = {this.props.imageList}
                        ></PicturesList>
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
                           
                            {(this.props.numSwipeRights / this.props.numViews * 10).toFixed(2) > 8.5 &&
                               <img id = "hot" src={fire}></img>
                            }
                           </div>
                           

                        } 
                        <div className="numLikes">Likes: {this.props.numLikes}</div>
                        { 
                        // this.props.isGlobalPost && 
                            <div className="swipeBtnContainer">
                            {/* {console.log(this.props.currUser)} */}
                            
                            <button disabled ={ this.state.disALeft} id="swipeLeftBtn" className="swipeBtn" onClick={()=>{this.decrementSwipesFireBase(this.props.postKey)}}>&#x1F44E;</button>
                            
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