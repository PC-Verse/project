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
            CommentsList: [],
            post: {},
            listsize: 0
        }
    }

    createPost = (newContent) => {


        let dateObj = new Date();
        let dateDay = dateObj.toLocaleDateString()
        let dateTime = dateObj.toLocaleTimeString();
        database.ref('globalPosts/' + this.props.postObj.postKey + '/comments/').push({
            content: newContent,
            numLikes: 0,
            profileObj: this.props.profileObj,
            dateDay: dateDay,
            dateTime: dateTime
        });

        // database.ref('userPosts/' + this.props.profileObj.googleId + '/' + this.props.postObj.postKey + '/comments/').push({
        //     content: newContent,
        //     numLikes: 0,
        //     profileObj: this.props.profileObj,
        //     dateDay: dateDay,
        //     dateTime: dateTime
        // });
    }

    removeComment = (commentKey) => {
        database.ref('globalPosts/' + this.props.postObj.postKey + "/comments/" + commentKey+'/').remove()
        database.ref('userPosts/' + this.props.profileObj.googleId + '/' + this.props.postObj.postKey + '/comments/'+commentKey+'/').remove()
        let comments = this.state.CommentsList;
        for (let i = 0; i < comments.length; i++) {
            if (comments[i].commentKey == commentKey) {
                comments.splice(i, 1);
                break;
            }
        }
        this.setState({
            CommentsList: comments
        })
    }

    componentDidMount = () => {
        
        // database.ref('/globalPosts/' + this.props.postObj.postKey + '/comments').on("value", (snapshot) => {
        //    console.log(snapshot.val());
        //    this.setState({
        //     CommentsList: snapshot.val()
        //    })
        // })
        // console.log("running mount");
        // console.log("setting to empty");
        // this.setState({
        //     CommentsList: ['empty']
        // })
        // console.log(this.state.CommentsList);
        
        database.ref('/globalPosts/' + this.props.postObj.postKey + '/comments').on("value", (snapshot) => {
            snapshot.forEach(comment => {
                let commentObj = {
                    content: comment.val().content,
                    numLikes: comment.val().numLikes == undefined ? 0 : comment.val().numLikes,
                    profileObj: comment.val().profileObj,
                    dateDay: comment.val().dateDay,
                    dateTime: comment.val().dateTime,
                    commentKey: comment.key
                }
                let comments = this.state.CommentsList;
                let found = false;
                for(let g=0; g<this.state.CommentsList.length; g++){
                    if(this.state.CommentsList[g].commentKey == commentObj.commentKey)
                        found = true;
                }
                if(!found){
                    comments.push(commentObj)
                    this.setState({
                        CommentsList: comments,
                    })
                }

            })


        })

        database.ref('globalPosts/' + this.props.postKey).on("value", (data) => {
            let post = {
                postKey: data.key,
                imageList: data.val().imageList,
                title: data.val().title,
                content: data.val().content,
                dateDay: data.val().dateDay,
                dateTime: data.val().dateTime,
                isGlobalPost: data.val().isGlobalPost,
                haveDiscussBtn: false,
                name: data.val().name,
                numLikes: data.val().numLikes == undefined ? 0 : data.val().numLikes,
                numViews: data.val().numViews == undefined ? 1 : data.val().numViews,
                numSwipeRights: data.val().numSwipeRights == undefined ? 0 : data.val().numSwipeRights,
            }
            this.setState({
                post: post
            })
        })

    }


    //will pass the string list as a prop through the database
    render = () => {
        // console.log("showing di");

        return (

            <div className="Discussion">
                {

                /* <Post
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
                    numViews={this.props.postObj.numViews}
                    numSwipeRights={this.props.postObj.numSwipeRights}
                /> */}
                <Post
                    content={this.state.post.content}
                    dateDay={this.state.post.dateDay}
                    dateTime={this.state.post.dateTime}
                    postKey={this.state.post.postKey}
                    isGlobalPost={this.state.post.isGlobalPost}
                    haveDiscussBtn={this.state.post.haveDiscussBtn}
                    name={this.state.post.name}
                    profileObj={this.props.postObj.profileObj}
                    title={this.state.post.title}
                    imageList={this.state.post.imageList}
                    numLikes={this.state.post.numLikes}
                    toggleComponent={this.props.toggleComponent}
                    numViews={this.state.post.numViews}
                    numSwipeRights={this.state.post.numSwipeRights}
                    currUser={this.props.postObj.currUser}
                />


                {console.log(this.state.CommentsList)}
                {
                    
                this.state.CommentsList.map(comment => {
                    return <Comments
                        commentObj={comment}
                        removeComment={this.removeComment}
                        currentProfileObj={this.props.profileObj}
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