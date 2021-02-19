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
    constructor() {
        super()
        this.state = {
            globalPosts: [],
            LazyLoad: []
        }
    }
    componentDidMount = () => {
        database.ref('/globalPosts/').on("value", (snapshot) => {
            snapshot.forEach(data => {
                let post = <Post
                    content={data.val().content}
                    dateDay={data.val().dateDay}
                    dateTime={data.val().dateTime}
                    key={data.ref.key}
                    isGlobalPost={data.val().isGlobalPost}
                    name={data.val().name}
                    title={data.val().title}
                    imageList={data.val().imageList}
                />

                let LazyLoadPost = 
                // <LazyLoad
                //     height = {500}
                // >   
                <LazyLoad
                    height= {50}
                    offset = {[-150, 150]}
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
                    toggleComponent = {this.props.toggleComponent}
                    numLikes = {data.val().numLikes == undefined?0:data.val().numLikes}
                    />
                </LazyLoad>
                console.log("Adding posts to state from database: ", post)
                // this.props.addGlobalPost(post)
                let lazy = this.state.LazyLoad;
                lazy.unshift(LazyLoadPost);
                this.setState({LazyLoad: lazy})
            })
        })
    }



    render = () => {
        return (
            <div>
                <div id="globalPostTitle">COMMUNITY</div>

                {this.state.LazyLoad.map(lazy => {

                //attempt to lazy load a page of posts
                //currently doesnt display anything
                    console.log("new post loading");                        

                    return lazy;


                    })
                }

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