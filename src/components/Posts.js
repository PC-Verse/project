import React, { Component } from 'react'
import AddPost from './AddPost'
import Post from './Post'

class Posts extends Component {
    constructor() {
        super()
        this.state ={
            posts: [<Post title="First Post" content="Hello there!" />],
            shouldClear : false,
            showPost: true
        }
    }
    hideCard = () => {
        this.setState({
            showPost: !this.state.showPost
        })
    }
    createPost = (newTitle, newContent) => {
        
        let newPosts = this.state.posts
        newPosts.unshift(<Post title={newTitle} content={newContent}/>)
        this.setState({
            posts: newPosts,
        })
        this.setState({
            showPost: false
        })
        this.setState({shouldClear: true});
    }
    render = ()=>{
        return(
            <div>
                <AddPost hideCard = {this.hideCard} showPost = {this.state.showPost} createPost={this.createPost}/>
                {this.state.posts.map((x) => {
                        return x;
                    })
                }
            </div>
        )
    }
}

export default Posts