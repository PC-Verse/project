import React, { Component } from 'react'
import '../App.css'
import Post from './Post'
import AddComment from './AddComment'
import Comments from './Comments'
import database from '../firebase'


class Discussion extends Component {
    constructor(props) {
        super(props)
        this.state = {
            CommentsList: ["empty"]
        }
    }
    
    createPost = (newContent) => {
        let newComments = this.state.CommentsList;
        newComments.unshift(newContent);
        this.setState({
            CommentsList: newComments
        })

        database.ref('globalPosts/'+this.props.postObj.postKey).update({
            comments: this.state.CommentsList
        });
    }

    componentDidMount = () => {
        console.log("Running componentDidMount")
        database.ref('/globalPosts/' + this.props.postObj.postKey + '/comments').on("value", (snapshot) => {
           console.log(snapshot.val());
           this.setState({
                CommentsList: snapshot.val()
           })
        })
    }


    //will pass the string list as a prop through the database
    render = () => {
        console.log("showing di");

        return (
        
            <div className = "Discussion">
                <Post
                    content={this.props.postObj.content}
                    dateDay={this.props.postObj.dateDay}
                    dateTime={this.props.postObj.dateTime}
                    postKey={this.props.postObj.postKey}
                    isGlobalPost={this.props.postObj.isGlobalPost}
                    haveDiscussBtn={this.props.postObj.haveDiscussBtn}
                    name={this.props.postObj.name}
                    title={this.props.postObj.title}
                    imageList={this.props.postObj.imageList}
                    numLikes={this.props.postObj.numLikes}
                    toggleComponent = {this.props.toggleComponent}
                />
                {this.state.CommentsList.map(comment => {
                    if(typeof(comment) === 'string' ){
                        return <Comments
                        content = {comment}
                        />
                    }

                })}

                <AddComment
                    createPost = {this.createPost}
                />
              
            </div>

        )
    }
}



export default Discussion