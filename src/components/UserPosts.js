import React, { Component } from 'react'
import AddPost from './AddPost'
// import Picture from './Picture'
import Post from './Post'
import database from '../firebase'
import LazyLoad from "react-lazyload"
// import '../App.css'

const Spinner = () => (
    <div className = "loadingPost">
        <h>loading...</h>
    </div>
);

class UserPosts extends Component {
    constructor() {
        super()
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
        database.ref('/userPosts/'+this.props.profileObj.googleId+'/').on("value", (snapshot) => {
            snapshot.forEach(data => {
                let post = 
                <LazyLoad
                height= {50}
                offset = {[-70,70]}
                placeholder = {<Spinner/>}
                >
                    <Post
                        content={data.val().content}
                        dateDay={data.val().dateDay}
                        dateTime={data.val().dateTime}
                        key={data.key}
                        isGlobalPost={data.val().isGlobalPost}
                        name={data.val().name}
                        title={data.val().title}
                        imageList={data.val().imageList}
                        removePost={this.removePost}
                    />
                </LazyLoad>
                // console.log("Adding posts to state from database: ", post)
                // this.props.addUserPosts(post)
                let posts = this.state.userPosts;
                posts.unshift(post);
                this.setState({
                    userPosts : posts
                })
            })
        })
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
    createPost = (newTitle, newContent, newImageList) => {

        // let newPosts = this.props.userPosts
        // let newImagesList = this.props.userImageLists
        // let updatedIds = this.props.userIds
        let date = new Date()
        // this.props.globalSetState((prevState, props) => ({
        //     availableId: prevState.availableId + 1
        // }))

        // this works
        let userPostKey = this.props.database.ref('userPosts/'+this.props.profileObj.googleId+'/').push({
            imageList: newImageList, title: newTitle, content: newContent, dateDay: date.toLocaleDateString(), dateTime: date.toLocaleTimeString(), isGlobalPost: false, name: this.props.profileObj.name
        })
        let globalPostKey = this.props.database.ref('globalPosts').push({
            imageList: newImageList, title: newTitle, content: newContent, dateDay: date.toLocaleDateString(), dateTime: date.toLocaleTimeString(), isGlobalPost: true, name: this.props.profileObj.name
        })
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




    removePost = (key) => {
        let userPostKey;
        let globalPostKey;
        database.ref('postKeys/'+this.profileObj.googleId+'/'+key+'/').on("value", (snapshot) => {
            snapshot.forEach(data => {
                userPostKey = data.val().userPostKey;
                globalPostKey = data.val().globalPostKey;
            })
        })

        database.ref('userPosts/'+this.props.profileObj.googleId+"/"+userPostKey+'/').remove()
        database.ref('globalPosts/'+globalPostKey+'/').remove()
        
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
        return (
            <div>
                {/* {this.props.showAddPostBTN && */}
                <AddPost hideCard={this.hideCard} showPost={this.state.showAddPost} createPost={this.createPost} />
                {/* } */}

                {/* {this.props.userPosts.map((post) => {
                    return post;
                })
                } */}

                {this.state.userPosts.map((post) => {
                        return post;
                    })
                }
                {this.props.userPosts.length == 0 && <div id="noPostYetMsg">No Posts Yet!</div>}
            </div>
        )
    }
}

export default UserPosts