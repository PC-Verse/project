import React, { Component } from 'react'
import AddPost from './AddPost'
// import Picture from './Picture'
import Post from './Post'
import database from '../firebase'
import LazyLoad from "react-lazyload"
import BlueLoadingBar from '../images/BlueLoadingBarSmaller.svg'
// import '../App.css'

const Spinner = () => (
    <div className="loadingPost">
        {/* <h>loading...</h> */}
        <img id="loadingIcon" src={BlueLoadingBar} alt="Loading icon" />
    </div>
);

class UserPosts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            shouldClear: false,
            showAddPost: false,
            userPosts: [],
            animationExit : ""
            // profileObj : this.props.profileObj       // make a state for the prop, so component did update will run
        }
    }
    componentDidMount = () => {
        this.setUserPosts();
    }
    componentDidUpdate(prevProps) {
        // console.log("Running component did update from userPosts")
        if (prevProps.profileObj.googleId != this.props.profileObj.googleId) {
            // console.log("Changing user posts")
            this.setState({
                userPosts: []
            })
            this.props.setUserPosts([])
            this.setUserPosts();
        }
    }
    setUserPosts = () => {

        // console.log("Setting user posts")
        if (this.props.profileObj.googleId != -1)   // only read from database if signed in
        {
            // console.log("reading form database for userposts")
            database.ref('/userPosts/' + this.props.profileObj.googleId + '/').on("value", (snapshot) => {
                snapshot.forEach(data => {
                    if (data.key != "interactedPosts") {
                        let post = {
                            postKey: data.key,
                            imageList: data.val().imageList,
                            title: data.val().title,
                            content: data.val().content,
                            dateDay: data.val().dateDay,
                            dateTime: data.val().dateTime,
                            isGlobalPost: false,
                            haveDiscussBtn: true,
                            name: data.val().name,
                            profileObj: data.val().profileObj,
                            numLikes: data.val().numLikes == undefined ? 0 : data.val().numLikes,
                            numViews: data.val().numViews == undefined ? 1 : data.val().numViews,
                            numSwipeRights: data.val().numSwipeRights == undefined ? 0 : data.val().numSwipeRights,
                        }

                        let found = false;
                        for (let i = 0; i < this.state.userPosts.length; i++) {
                            if (this.state.userPosts[i].postKey == post.postKey) {
                                console.log(post.postKey);
                                found = true;
                                let userPostsCopy = this.state.userPosts;
                                userPostsCopy[i] = post;
                                this.setState({
                                    userPosts: userPostsCopy
                                })
                            }
                        }
                        if (!found) {
                            this.addUserPost(post)      // adding it to state
                        }

                    }
                })
            })

        }


    }
    hideCard = () => {
        this.setState({
            showAddPost: !this.state.showAddPost
        })
    }
    setPicture = (s) => {
        this.setState({
            Picture: s
        })
    }
    addUserPost = (newPost) => {
        let posts = this.state.userPosts;
        posts.unshift(newPost);
        this.setState((prevState) => ({
            userPosts: posts
        }))
    }
    createPost = (newTitle, newContent, newImageList, community) => {


        let date = new Date()
        let dateDay = date.toLocaleDateString();
        let dateTime = date.toLocaleTimeString();


        // this works
        let userPostRef = this.props.database.ref('userPosts/' + this.props.profileObj.googleId + '/').push({
            imageList: newImageList,
            title: newTitle,
            content: newContent,
            dateDay: dateDay,
            dateTime: dateTime,
            isGlobalPost: false,
            name: this.props.profileObj.name,
            profileObj: this.props.profileObj,
            numLikes: 0,
            numViews: 1,
            numSwipeRights: 0,
            community: community

        })
        let globalPostRef = this.props.database.ref('globalPosts/' + userPostRef.key + '/').set({
            imageList: newImageList,
            title: newTitle,
            content: newContent,
            dateDay: dateDay,
            dateTime: dateTime,
            isGlobalPost: true,
            name: this.props.profileObj.name,
            profileObj: this.props.profileObj,
            numLikes: 0,
            numViews: 1,
            numSwipeRights: 0,
            community: community
        })


        if (this.props.profileObj.googleId == -1) {
            let post = {
                postKey: userPostRef.key,
                imageList: newImageList,
                title: newTitle,
                content: newContent,
                dateDay: dateDay,
                dateTime: dateTime,
                isGlobalPost: false,
                haveDiscussBtn: true,
                name: this.props.profileObj.name,
                profileObj: this.props.profileObj,
                numLikes: 0,
                numViews: 0,
                numSwipeRights: 0,
                community: community
            }
            
            this.props.addUserPost(post);
        }

    }




    removePost = (postKey) => {

        // console.log("Atempting to remove post with key: " + postKey)
        database.ref('userPosts/' + this.props.profileObj.googleId + "/" + postKey + '/').remove()
        database.ref('globalPosts/' + postKey + '/').remove()

        let userPosts;
        if (this.props.profileObj.googleId == -1) {
            userPosts = this.props.userPosts
            for (let i = 0; i < userPosts.length; i++) {
                if (userPosts[i].postKey == postKey) {
                    userPosts.splice(i, 1);
                    this.props.setUserPosts(userPosts);
                    break;
                }
            }
        }
        else {
            userPosts = this.state.userPosts
            for (let i = 0; i < userPosts.length; i++) {
                if (userPosts[i].postKey == postKey) {
                    userPosts.splice(i, 1);
                    this.setState({
                        userPosts: userPosts
                    })
                    break;
                }
            }
        }


    }

    render = () => {
        const userPostsFromProps = this.props.userPosts.map((post) => {
            // return post;
            return <LazyLoad    // these need to be on the same line as the return for some reason
                height={100}
                offset={[-150, -150]}
                placeholder={<Spinner />}
            >
                <Post
                    title={post.title}
                    postKey={post.postKey}
                    content={post.content}
                    imageList={post.imageList}
                    dateDay={post.dateDay}
                    dateTime={post.dateTime}
                    isGlobalPost={false}
                    haveDiscussBtn={post.haveDiscussBtn}
                    name={this.props.profileObj.name}
                    profileObj={this.props.profileObj}
                    numLikes={0}
                    numViews={post.numViews}
                    numSwipeRights={post.numSwipeRights}
                    removePost={this.removePost}
                    setPostObj={this.props.setPostObj}
                    setPostKey={this.props.setPostKey}
                    toggleComponent={this.props.toggleComponent}
                    currUser={this.props.profileObj.googleId}
                />
            </LazyLoad>
        })
        const userPostsFromState = this.state.userPosts.map((post) => {
            return <LazyLoad    // these need to be on the same line as the return for some reason
                height={100}
                offset={[-150, -150]}
                placeholder={<Spinner />}
            >
                <Post
                    postKey={post.postKey}
                    title={post.title}
                    content={post.content}
                    imageList={post.imageList}
                    dateDay={post.dateDay}
                    dateTime={post.dateTime}
                    isGlobalPost={false}
                    haveDiscussBtn={post.haveDiscussBtn}
                    name={this.props.profileObj.name}
                    profileObj={this.props.profileObj}
                    numLikes={0}
                    numViews={post.numViews}
                    numSwipeRights={post.numSwipeRights}
                    removePost={this.removePost}
                    setPostObj={this.props.setPostObj}
                    setPostKey={this.props.setPostKey}
                    toggleComponent={this.props.toggleComponent}
                    currUser={this.props.profileObj.googleId}
                />
            </LazyLoad>
        })
        // console.log(this.state.userPosts[0])
        return (
            <div>
                {/* {this.props.showAddPostBTN && */}
                <AddPost hideCard={this.hideCard} showPost={this.state.showAddPost} createPost={this.createPost} />     {/* thidecard and showPost arent used*/}
                {/* } */}

                {this.props.profileObj.googleId == -1 &&    // user not signed in
                    userPostsFromProps
                }

                {this.props.profileObj.googleId != -1 &&    // user is signed in
                    userPostsFromState
                }
                {/* {this.props.profileObj.googleId == -1 &&    // user not signed in
                    this.props.userPosts.map((post) => {
                        // return post;
                        return <LazyLoad    // these need to be on the same line as the return for some reason
                            height={50}
                            offset={[-150, 150]}
                            placeholder={<Spinner />}
                        >
                            <Post
                                title={post.title}
                                postKey={post.postKey}
                                content={post.content}
                                imageList={post.imageList}
                                dateDay={post.dateDay}
                                dateTime={post.dateTime}
                                isGlobalPost={false}
                                haveDiscussBtn={post.haveDiscussBtn}
                                name={this.props.profileObj.name}
                                profileObj={this.props.profileObj}
                                numLikes={0}
                                numViews={post.numViews}
                                numSwipeRights={post.numSwipeRights}
                                removePost={this.removePost}
                                setPostObj={this.props.setPostObj}
                                setPostKey={this.props.setPostKey}
                                toggleComponent={this.props.toggleComponent}
                                currUser={this.props.profileObj.googleId}
                            />
                        </LazyLoad>
                    })
                }
                {this.props.profileObj.googleId != -1 &&    // user is signed in
                    this.state.userPosts.map((post) => {
                        return <LazyLoad    // these need to be on the same line as the return for some reason
                            height={50}
                            offset={[-150, 150]}
                            placeholder={<Spinner />}
                        >
                            <Post
                                postKey={post.postKey}
                                title={post.title}
                                content={post.content}
                                imageList={post.imageList}
                                dateDay={post.dateDay}
                                dateTime={post.dateTime}
                                isGlobalPost={false}
                                haveDiscussBtn={post.haveDiscussBtn}
                                name={this.props.profileObj.name}
                                profileObj={this.props.profileObj}
                                numLikes={0}
                                numViews={post.numViews}
                                numSwipeRights={post.numSwipeRights}
                                removePost={this.removePost}
                                setPostObj={this.props.setPostObj}
                                setPostKey={this.props.setPostKey}
                                toggleComponent={this.props.toggleComponent}
                                currUser={this.props.profileObj.googleId}
                            />
                        </LazyLoad>
                    }) */}
                {/* } */}

                {((this.state.userPosts.length == 0 && this.props.profileObj.googleId != -1) || 
                    (this.props.userPosts.length == 0 && this.props.profileObj.googleId == -1)) && 
                    <div id="noPostYetMsg">No Posts Yet!</div>}
                <div className="spaceAtBottomOfPage"></div>
            </div>
        )
    }
}

export default UserPosts