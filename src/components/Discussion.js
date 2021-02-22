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
        // let newComments = this.state.CommentsList;
        // // let newCommentObj = {
        // //     content: newContent,
        // //     numLikes : 0,
        // //     profileObj: this.props.profileObj
        // // }
        // newComments.unshift(newContent);
        // this.setState({
        //     CommentsList: newComments
        // })

        // database.ref('globalPosts/'+this.props.postObj.postKey).update({
        //     comments: this.state.CommentsList
        // });
        let dateObj = new Date();
        let dateDay = dateObj.toLocaleDateString()
        let dateTime= dateObj.toLocaleTimeString();
        database.ref('globalPosts/' + this.props.postObj.postKey + '/comments/').push({
            content: newContent,
            numLikes: 0,
            profileObj: this.props.profileObj,
            dateDay:dateDay,
            dateTime:dateTime
        });
        // database.ref('userPosts/' + this.props.profileObj.googleId+ '/'+this.props.postObj.postKey + '/comments/').push({
        //     content: newContent,
        //     numLikes: 0,
        //     profileObj: this.props.profileObj,
        //     dateDay:dateDay,
        //     dateTime:dateTime
        // });
    }

    // removeComment = (postKey) => {
    //     database.ref('globalPosts'+ this.props.postObj.postKey+"/comments/"+postKey).remove()
    //     database.ref('userPosts/' + this.props.profileObj.googleId+ '/'+postKey + '/comments/').remove()
        
    //     let comments = this.state.CommentsList;
    //     for (let i = 0; i < comments.length; i++) {
    //         if (comments[i].postKey == postKey) {
    //             comments.splice(i,1);
    //             break;
    //         }
    //     }
    //     this.setState({
    //         CommentsList: comments
    //     })
    // }

    componentDidMount = () => {
        console.log("Running componentDidMount")
        // database.ref('/globalPosts/' + this.props.postObj.postKey + '/comments').on("value", (snapshot) => {
        //    console.log(snapshot.val());
        //    this.setState({
        //     CommentsList: snapshot.val()
        //    })
        // })
        database.ref('/globalPosts/' + this.props.postObj.postKey + '/comments').on("value", (snapshot) => {
            snapshot.forEach(comment => {
                let commentObj = {
                    content: comment.val().content,
                    numLikes: comment.val().numLikes == undefined ? 0 : comment.val().numLikes,
                    profileObj: comment.val().profileObj,
                    dateDay: comment.val().dateDay,
                    dateTime: comment.val().dateTime,
                    postKey: comment.key
                }
                let comments = this.state.CommentsList;
                if (comments[0] == "Empty") {
                    comments = [];
                }
                comments.unshift(commentObj)
                this.setState({
                    CommentsList: comments
                })
            })
        })


    }


    //will pass the string list as a prop through the database
    render = () => {
        // console.log("showing di");

        return (

            <div className="Discussion">
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
                    toggleComponent={this.props.toggleComponent}
                />

                {this.state.CommentsList.map(comment => {
                    return <Comments
                        commentObj={comment}
                        // removeComment = {this.removeComment}
                        currentProfileObj = {this.props.profileObj}
                    />
                })}

                <AddComment
                    createPost={this.createPost}
                />

            </div>

        )
    }
}



export default Discussion