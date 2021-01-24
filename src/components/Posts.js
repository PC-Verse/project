import React, { Component } from 'react'
import AddPost from './AddPost'
import Post from './Post'

class Posts extends Component {
    constructor() {
        super()
        this.state ={
            posts: [<Post title="First Post" content="Hello there!"/>]
        }
    }
    createPost = (newTitle, newContent) => {
        let newPosts = this.state.posts
        newPosts.push(<Post title={newTitle} content={newContent}/>)
        this.setState({
            posts: newPosts
        })
    }
    render = ()=>{
        return(
            <div>
                <AddPost createPost={this.createPost}/>
                {this.state.posts.map((x) => {
                        return x;
                    })
                }
            </div>
        )
    }
}

export default Posts