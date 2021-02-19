import React, { Component } from 'react'
import AddPost from './AddPost'
// import Picture from './Picture'
import Post from './Post'
import database from '../firebase'
import LazyLoad from "react-lazyload"
import BlueLoadingBar from '../images/BlueLoadingBarSmaller.svg'
// import '../App.css'

const Spinner = () => (
    <div className = "loadingPost">
        {/* <h>loading...</h> */}
        <img id="loadingIcon" src={BlueLoadingBar} alt="Loading icon"/>
    </div>
);

class UserPosts extends Component {
    constructor(props) {
        super(props)
        let date = new Date()
        this.state = {
            // posts: [<Post title="No Posts Yet" content="Make a Post!" id={0} removePost={this.removePost} dateDay={date.toLocaleDateString()} dateTime={date.toLocaleTimeString()} isGlobalPost={false}/>],
            shouldClear: false,
            showAddPost: false,
            name: "Anonymous",
            userPosts : []
        }
    }
    componentDidMount = () => {
        if (this.props.profileObj.googleId != -1)   // only read from database if signed in
        {
            database.ref('/userPosts/'+this.props.profileObj.googleId+'/').on("value", (snapshot) => {
                snapshot.forEach(data => {
                    // let post = 
                    // <LazyLoad
                    // height= {50}
                    // offset = {[-150,150]}
                    // placeholder = {<Spinner/>}
                    // >
                    //     <Post
                    //         content={data.val().content}
                    //         dateDay={data.val().dateDay}
                    //         dateTime={data.val().dateTime}
                    //         key={data.key}
                    //         isGlobalPost={data.val().isGlobalPost}
                    //         haveDiscussBtn={false}
                    //         name={data.val().name}
                    //         title={data.val().title}
                    //         imageList={data.val().imageList}
                    //         numLikes = {data.val().numLikes == undefined ? 0 : data.val().numLikes}
                    //         removePost={this.removePost}
                    //     />
                    // </LazyLoad>
                    let post = {
                        postKey: data.key,
                        imageList: data.val().imageList,
                        title: data.val().title,
                        content:data.val().content,
                        dateDay:data.val().dateDay,
                        dateTime:data.val().dateTime,
                        isGlobalPost:false,
                        haveDiscussBtn:false,
                        name:data.val().name,
                        numLikes:data.val().numLikes == undefined ? 0 : data.val().numLikes
                        // removePost:this.removePost
                    }
                    console.log(data.key + typeof(data.key))
                    console.log(this.state.userPosts)
                    // console.log("Adding posts to state from database: ", post)
                    // this.props.addUserPosts(post)
                    // this.setState((prevState) => ({
                    //     userPosts : prevState.userPosts.unshift(post)
                    //   }));
                    this.addUserPost(post)      // adding it to state
                    // let posts = this.state.userPosts;
                    // posts.unshift(post);
                    // this.setState({
                    //     userPosts : posts
                    // })
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
            userPosts : posts
          }))
        // this.setState((prevState) => ({
        //   userPosts : prevState.userPosts.unshift(newPost)
        // }))

    }
    createPost = (newTitle, newContent, newImageList) => {

        // let newPosts = this.props.userPosts
        // let newImagesList = this.props.userImageLists
        // let updatedIds = this.props.userIds
        let date = new Date()
        // this.props.globalSetState((prevState, props) => ({
        //     availableId: prevState.availableId + 1
        // }))
        let dateDay = date.toLocaleDateString();
        let dateTime = date.toLocaleTimeString();

    
        // this works
        let userPostRef = this.props.database.ref('userPosts/'+this.props.profileObj.googleId+'/').push({
            imageList: newImageList, title: newTitle, content: newContent, dateDay: dateDay, dateTime: dateTime, isGlobalPost: false, name: this.props.profileObj.name, numLikes:0, comments: ["no comments yet"]
        })
        let globalPostRef = this.props.database.ref('globalPosts/'+userPostRef.key +'/').set({
            imageList: newImageList, title: newTitle, content: newContent, dateDay: dateDay, dateTime: dateTime, isGlobalPost: true, name: this.props.profileObj.name, numLikes:0, comments: ["no comments yet"]
        })

        // if (this.props.profileObj.googleId == -1)   // user is not signed in
        // {
            // update the state so page rerenders
            // let post = 
            // <LazyLoad
            //     height= {50}
            //     offset = {[-150,150]}
            //     placeholder = {<Spinner/>}
            //     >
            //     <Post
            //         key={userPostRef.key}
            //         title={newTitle}
            //         content={newContent}
            //         imageList={newImageList}
            //         dateDay={dateDay}
            //         dateTime={dateTime}
            //         isGlobalPost={false}
            //         haveDiscussBtn={false}
            //         name={this.props.profileObj.name}
            //         numLikes={0}
            //         removePost={this.removePost}
            //     />
            // </LazyLoad>
            let post = {
                postKey: userPostRef.key,
                imageList: newImageList,
                title: newTitle,
                content:newContent,
                dateDay:dateDay,
                dateTime:dateTime,
                isGlobalPost:false,
                haveDiscussBtn:false,
                name:this.props.profileObj.name,
                numLikes:0
                // removePost:this.removePost
            }
            if (this.props.profileObj.googleId == -1) {
                this.props.addUserPost(post);
            }
            else {
                this.addUserPost(post);
            }
            // this.props.addUserPost(post);
        // }

        // this one doesn't work for some reason
        // let postKeysKey = this.props.database.ref('postKeys/'+this.props.profileObj.googleId+'/'+userPostKey+"/").push({
        //     userPostKey: userPostKey,
        //     globalPostKey: globalPostKey
        // })



        // newPosts.unshift(<Post imageList={newImageList} title={newTitle} Picture={this.state.Picture} setPicture={this.setPicture} content={newContent} removePost={this.removePost} id={this.props.availableId} dateDay={date.toLocaleDateString()} dateTime={date.toLocaleTimeString()} isGlobalPost={false} name={this.props.profileObj.name} />)
        // updatedIds.unshift(this.props.availableId)
        // this.props.globalSetState({
        //     userPosts: newPosts,
        //     userIds: updatedIds,
        // })
        // this.setState({
        //     showPost: false,
        //     shouldClear: true
        // });

        // // add it to global posts
        // let globalPosts = this.props.globalPosts;
        // let globalIds = this.props.globalIds;
        // globalPosts.unshift(<Post imageList={newImageList} title={newTitle} setPicture={this.setPicture} content={newContent} Picture={this.state.Picture} removePost={this.removePost} id={this.props.availableId} dateDay={date.toLocaleDateString()} dateTime={date.toLocaleTimeString()} isGlobalPost={true} name={this.props.profileObj.name} />)
        // globalIds.unshift(this.props.availableId)
        // this.props.globalSetState({
        //     posts: globalPosts,
        //     ids: globalIds
        // })
    }




    removePost = (postKey) => {     //key is undefined for someone
        // let userPostKey;
        // let globalPostKey;
        // database.ref('postKeys/'+this.profileObj.googleId+'/'+key+'/').on("value", (snapshot) => {
        //     snapshot.forEach(data => {
        //         userPostKey = data.val().userPostKey;
        //         globalPostKey = data.val().globalPostKey;
        //     })
        // })

        console.log("Atempting to remove post with key: " + postKey)
        database.ref('userPosts/'+this.props.profileObj.googleId+"/"+postKey+'/').remove()
        database.ref('globalPosts/'+postKey+'/').remove()
        
        let userPosts;
        if (this.props.profileObj.googleId == -1) {
            userPosts = this.props.userPosts
        }
        else {
            userPosts = this.state.userPosts
        }
        for (let i = 0; i < userPosts.length; i++) {
            if (userPosts[i].key == postKey) {
                userPosts.splice(i,1);  
            }
        }
        
        // let updatedIds = this.props.userIds
        // let updatedPosts = this.props.userPosts
        // for (let i = 0; i < this.props.userIds.length; i++) {
        //     if (this.props.userIds[i] == postId) {
        //         // remove the post and remove the id
        //         updatedIds.splice(i, 1);
        //         updatedPosts.splice(i, 1);

        //         this.props.globalSetState({
        //             userPosts: updatedPosts,
        //             userIds: updatedIds
        //         })
        //         break
        //     }
        // }

        // // remove it from global posts
        // let globalPosts = this.props.globalPosts;
        // let globalIds = this.props.globalIds;
        // for (let i = 0; i < this.props.globalIds.length; i++) {
        //     if (this.props.globalIds[i] == postId) {
        //         globalIds.splice(i, 1)
        //         globalPosts.splice(i, 1)
        //     }
        //     this.props.globalSetState({
        //         posts: globalPosts,
        //         ids: globalIds
        //     })
        // }
    }

    render = () => {
        const postComponents = this.props.userPosts.map((post) => {
            // return post;
            return <LazyLoad    // these need to be on the same line as the return for some reason
                    height= {50}
                    offset = {[-150,150]}
                    placeholder = {<Spinner/>}
                >
                <Post
                    // title={post.title}
                    postKey={post.postKey}
                    content={post.content}
                    imageList={post.imageList}
                    dateDay={post.dateDay}
                    dateTime={post.dateTime}
                    isGlobalPost={false}
                    haveDiscussBtn={false}
                    name={this.props.profileObj.name}
                    numLikes={0}
                    removePost={this.removePost}
                />
            </LazyLoad>
        })
        console.log(this.state.userPosts[0])
        return (
            <div>
                {/* {this.props.showAddPostBTN && */}
                <AddPost hideCard={this.hideCard} showPost={this.state.showAddPost} createPost={this.createPost} />
                {/* } */}

                {this.props.profileObj.googleId == -1 &&    // user not signed in
                    postComponents
                }

                {this.props.profileObj.googleId != -1 &&    // user is signed in
                    this.state.userPosts.map((post) => {
                            // return post;
                            return <LazyLoad    // these need to be on the same line as the return for some reason
                                height= {50}
                                offset = {[-150,150]}
                                placeholder = {<Spinner/>}
                            >
                            <Post
                                postKey={post.postKey}
                                title={post.title}
                                content={post.content}
                                imageList={post.imageList}
                                dateDay={post.dateDay}
                                dateTime={post.dateTime}
                                isGlobalPost={false}
                                haveDiscussBtn={false}
                                name={this.props.profileObj.name}
                                numLikes={0}
                                removePost={this.removePost}
                            />
                        </LazyLoad>
                        })
                }

                {(this.state.userPosts.length == 0 && this.props.userPosts.length == 0) && <div id="noPostYetMsg">No Posts Yet!</div>}
            </div>
        )
    }
}

export default UserPosts