import React, { Component } from 'react'
import AddPost from './AddPost'
import Post from './Post'

class UserPosts extends Component {
    constructor() {
        super()
        let date = new Date()
        this.state = {
            // posts: [<Post title="No Posts Yet" content="Make a Post!" id={0} removePost={this.removePost} dateDay={date.toLocaleDateString()} dateTime={date.toLocaleTimeString()} isGlobalPost={false}/>],
            posts: [],
            ids: [0],
            availableId: -1,
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

        newPosts.unshift(<Post title={newTitle} content={newContent} removePost ={this.removePost} id={this.state.availableId} dateDay={date.toLocaleDateString()} dateTime={date.toLocaleTimeString()} isGlobalPost={false}/>)
        updatedIds.unshift(this.state.availableId)
        this.setState({
            posts: newPosts,
            ids: updatedIds,
            showPost: false
        })
        this.setState({shouldClear: true});

        // add it to global posts
        let globalPosts = this.props.globalPosts;
        let globalIds = this.props.globalIds;
        globalPosts.unshift(<Post title={newTitle} content={newContent} removePost ={this.removePost} id={this.state.availableId} dateDay={date.toLocaleDateString()} dateTime={date.toLocaleTimeString()} isGlobalPost={true}/>)
        globalIds.unshift(this.state.availableId)
        this.props.globalSetState({
            posts: globalPosts,
            ids: globalIds
        })
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
                break
            }
        }

        // remove it from global posts
        let globalPosts = this.props.globalPosts;
        let globalIds = this.props.globalIds;
        for (let i = 0; i < this.props.globalIds.length; i++) {
            if (this.props.id[i] == postId) {
                globalIds.splice(i,1)
                globalPosts.splice(i,1)
            }
            this.props.globalSetState({
                posts: globalPosts,
                ids: globalIds
            })
        }
    }
    render = ()=>{
        return(
            <div>
                {/* {this.props.showAddPostBTN && */}
                    <AddPost hideCard = {this.hideCard} showPost = {this.state.showAddPost} createPost={this.createPost}/>
                {/* } */}

                {this.state.posts.map((x) => {
                        return x;
                    })
                }
                {this.state.availableId==-1 && <div id="noPostYetMsg">No Posts Yet!</div>}
            </div>
        )
    }
}

export default UserPosts