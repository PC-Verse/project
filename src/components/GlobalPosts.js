import React, { Component } from 'react'
import '../App.css'
import Post from './Post'
import database from '../firebase'
import LazyLoad from "react-lazyload"
import PostPicture from './PostPicture'
import BlueLoadingBar from '../images/BlueLoadingBarSmaller.svg'


const Spinner = () => (
    <div className = "loadingPost">
        {/* <h>loading...</h> */}
        <img id="loadingIcon" src={BlueLoadingBar} alt="Loading icon"/>
    </div>
);

class GlobalPosts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            globalPosts: [],
            LazyLoad: []
        }
    }
    componentDidMount = () => {
        console.log("Running componentDidMount")
        database.ref('/globalPosts/').on("value", (snapshot) => {
            snapshot.forEach(data => {
                // let post = <Post
                //     content={data.val().content}
                //     dateDay={data.val().dateDay}
                //     dateTime={data.val().dateTime}
                //     key={data.key}
                //     isGlobalPost={data.val().isGlobalPost}
                //     haveDiscussBtn={true}
                //     numLikes={data.val().numLikes}
                //     name={data.val().name}
                //     title={data.val().title}
                //     imageList={data.val().imageList}
                // />

                // let LazyLoadPost = 
                // // <LazyLoad
                // //     height = {500}
                // // >   
                // <LazyLoad
                //     height= {50}
                //     offset = {[-150, 150]}
                //     placeholder = {<Spinner/>}
                // >
                //     <Post
                //     content={data.val().content}
                //     dateDay={data.val().dateDay}
                //     dateTime={data.val().dateTime}
                //     key={data.key}
                //     isGlobalPost={data.val().isGlobalPost}
                //     haveDiscussBtn={true}
                //     // numLikes={data.val().numLikes}
                //     name={data.val().name}
                //     title={data.val().title}
                //     imageList={data.val().imageList}
                //     toggleComponent = {this.props.toggleComponent}
                //     numLikes = {data.val().numLikes == undefined ? 0 : data.val().numLikes}
                //     setPostObj={this.props.setPostObj}
                //     />
                // </LazyLoad>

                let LazyLoadPost = {
                    postKey: data.key,
                    imageList: data.val().imageList,
                    title: data.val().title,
                    content:data.val().content,
                    dateDay:data.val().dateDay,
                    dateTime:data.val().dateTime,
                    isGlobalPost:data.val().isGlobalPost,
                    haveDiscussBtn:true,
                    name: data.val().name,
                    numLikes:data.val().numLikes == undefined ? 0 : data.val().numLikes
                }
                // console.log("Adding posts to state from database: ", LazyLoadPost)
                // this.props.addGlobalPost(post)
                this.addGlobalPost(LazyLoadPost);

                // let lazy = this.state.LazyLoad;
                // lazy.unshift(LazyLoadPost);
                // this.setState({LazyLoad: lazy})
            })
        })
    }

    addGlobalPost = (newPost) => {
        // console.log("ran setGlobalPosts")
        let posts = this.state.globalPosts;
        posts.unshift(newPost);  // concatenate newPosts to front of posts
        this.setState({
          globalPosts: posts
        })
        // console.log(this.state.globalPosts)
      }

    render = () => {
        return (
            <div>
                <div id="globalPostTitle">COMMUNITY</div>

                {this.state.LazyLoad.map(lazy => {

                //attempt to lazy load a page of posts
                //currently doesnt display anything
                    // console.log("new post loading");                        

                    return lazy;


                    })
                }

                {this.state.globalPosts.map(post => {
                    return <LazyLoad        // these need to be on the same line as the return for some reason
                        height= {50}
                        offset = {[-150, 150]}
                        placeholder = {<Spinner/>}
                    >
                        <Post
                        content={post.content}
                        dateDay={post.dateDay}
                        dateTime={post.dateTime}
                        postKey={post.postKey}
                        isGlobalPost={post.isGlobalPost}
                        haveDiscussBtn={true}
                        // numLikes={data.val().numLikes}
                        name={post.name}
                        title={post.title}
                        imageList={post.imageList}
                        toggleComponent = {this.props.toggleComponent}
                        numLikes = {post.numLikes}
                        setPostObj={this.props.setPostObj}
                        />
                    </LazyLoad>
                })}

                {/* {console.log(this.props.globalPosts)} */}

                {/* {this.props.globalPosts.map(post => {

                    //attempt to lazy load a page of posts
                    //currently doesnt display anything
                    console.log("new post loading");                        

                    return post;

                   
                })
                } */}
                {/* {this.props.globalPosts.map((post) => {
                    return post;
                })
                } */}

                {/* } */}
                {/* {this.props.database != null &&
                    this.props.database.ref('globalPosts').map(post => (
                        <Post title={post.title} content={post.content} dateDay={post.dateDay} dateTime={post.dateTime} id={post.id} name={post.name} />
                    ))} */}
            </div>
        )
    }
}

export default GlobalPosts