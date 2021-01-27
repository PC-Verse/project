import React, { Component } from 'react'
import AddPost from './AddPost'
import Post from './Post'

class UserPosts extends Component {
    constructor() {
        super()
        let date = new Date()
        this.state ={
            posts: [<Post title="First Post" content="Hello there!" id={0} removePost={this.removePost} dateDay={date.toLocaleDateString()} dateTime={date.toLocaleTimeString()}/>],
            ids: [0],
            availableId: 0,
            shouldClear : false,
            showAddPost: false
        }
    }
    hideCard = () => {
        this.setState({
            showAddPost: !this.state.showAddPost
        })
    }
    createPost = (newTitle, newContent) => {
        
        let newPosts = this.state.posts
        let updatedIds = this.state.ids
        let date = new Date()
        this.setState((prevState, props) => ({
            availableId: prevState.availableId+1
        }))

        newPosts.unshift(<Post title={newTitle} content={newContent} removePost ={this.removePost} id={this.state.availableId} dateDay={date.toLocaleDateString()} dateTime={date.toLocaleTimeString()}/>)
        updatedIds.unshift(this.state.availableId)
        this.setState({
            posts: newPosts,
            ids: updatedIds,
            showPost: false
        })
        this.setState({shouldClear: true});
    }
    removePost = (postId) => {
        let updatedIds = this.state.ids
        let updatedPosts = this.state.posts
        for (let i = 0; i < this.state.ids.length; i++) {
            if (this.state.ids[i] == postId) {
                // remove the post and remove the id
                updatedIds.splice(i,1);
                updatedPosts.splice(i,1);

                this.setState({
                    posts: updatedPosts,
                    ids: updatedIds
                })
            }
        }
    }
    render = ()=>{
        return(
            <div>
                <AddPost hideCard = {this.hideCard} showPost = {this.state.showAddPost} createPost={this.createPost}/>
                {this.state.posts.map((x) => {
                        return x;
                    })
                }
            </div>
        )
    }
}

export default UserPosts