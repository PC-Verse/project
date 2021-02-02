import React, { Component } from 'react'
import AddPost from './AddPost'
import Picture from './Picture'
import Post from './Post'

class UserPosts extends Component {
    constructor() {
        super()
        let date = new Date()
        this.state = {
            // posts: [<Post title="No Posts Yet" content="Make a Post!" id={0} removePost={this.removePost} dateDay={date.toLocaleDateString()} dateTime={date.toLocaleTimeString()} isGlobalPost={false}/>],
            shouldClear: false,
            showAddPost: false,
            name: "Anonymous"
        }
        // if (this.props.profileObj != null) {
        //     this.state= {
        //         name : this.props.profileObj.name
        //     }
        // }
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

        let newPosts = this.props.userPosts
        let newImagesList = this.props.userImageLists
        let updatedIds = this.props.userIds
        let date = new Date()
        this.props.globalSetState((prevState, props) => ({
            availableId: prevState.availableId + 1
        }))

        // this works
        let postData = {
            imageList: newImageList, title: newTitle, content: newContent, id: this.props.availableId, dateDay: date.toLocaleDateString(), dateTime: date.toLocaleTimeString(), isGlobalPost: false, name:this.state.name
        }
        let newPostKey = this.props.database.ref('userPosts').push({
            imageList: newImageList, title: newTitle, content: newContent, id: this.props.availableId, dateDay: date.toLocaleDateString(), dateTime: date.toLocaleTimeString(), isGlobalPost: false, name:this.state.name
        })
        let newPostKey2 = this.props.database.ref('globalPosts').push({
            imageList: newImageList, title: newTitle, content: newContent, id: this.props.availableId, dateDay: date.toLocaleDateString(), dateTime: date.toLocaleTimeString(), isGlobalPost: true, name:this.state.name
        })
 


        newPosts.unshift(<Post imageList={newImageList} title={newTitle} Picture={this.state.Picture} setPicture={this.setPicture} content={newContent} removePost={this.removePost} id={this.props.availableId} dateDay={date.toLocaleDateString()} dateTime={date.toLocaleTimeString()} isGlobalPost={false} name={this.state.name}/>)
        updatedIds.unshift(this.props.availableId)
        this.props.globalSetState({
            userPosts: newPosts,
            userIds: updatedIds,
        })
        this.setState({
            showPost: false,
            shouldClear: true
        });

        // add it to global posts
        let globalPosts = this.props.globalPosts;
        let globalIds = this.props.globalIds;
        globalPosts.unshift(<Post imageList={newImageList} title={newTitle} setPicture={this.setPicture} content={newContent} Picture={this.state.Picture} removePost={this.removePost} id={this.props.availableId} dateDay={date.toLocaleDateString()} dateTime={date.toLocaleTimeString()} isGlobalPost={true} name={this.state.name}/>)
        globalIds.unshift(this.props.availableId)
        this.props.globalSetState({
            posts: globalPosts,
            ids: globalIds
        })
    }
    removePost = (postId) => {
        let updatedIds = this.props.userIds
        let updatedPosts = this.props.userPosts
        for (let i = 0; i < this.props.userIds.length; i++) {
            if (this.props.userIds[i] == postId) {
                // remove the post and remove the id
                updatedIds.splice(i, 1);
                updatedPosts.splice(i, 1);

                this.props.globalSetState({
                    userPosts: updatedPosts,
                    userIds: updatedIds
                })
                break
            }
        }

        // remove it from global posts
        let globalPosts = this.props.globalPosts;
        let globalIds = this.props.globalIds;
        for (let i = 0; i < this.props.globalIds.length; i++) {
            if (this.props.globalIds[i] == postId) {
                globalIds.splice(i, 1)
                globalPosts.splice(i, 1)
            }
            this.props.globalSetState({
                posts: globalPosts,
                ids: globalIds
            })
        }
    }
    render = () => {
        return (
            <div>
                {/* {this.props.showAddPostBTN && */}
                <AddPost hideCard={this.hideCard} showPost={this.state.showAddPost} createPost={this.createPost} />
                {/* } */}

                {this.props.userPosts.map((post) => {
                    return post;
                })
                }
                {this.props.userPosts.length == 0 && <div id="noPostYetMsg">No Posts Yet!</div>}
            </div>
        )
    }
}

export default UserPosts