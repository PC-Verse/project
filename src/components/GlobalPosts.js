import React, { Component } from 'react'
import '../App.css'
import Post from './Post'
import database from '../firebase'
import LazyLoad from "react-lazyload"
import PostPicture from './PostPicture'

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
                    key={data.key}
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
                    height= {200}
                    offset = {[-100,100]}

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
                    />
                </LazyLoad>
                console.log("Adding posts to state from database: ", post)
                // this.props.addGlobalPosts(post)
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
                {/* {console.log(this.props.globalPosts)} */}

                {/* {this.props.globalPosts.map(post => {

                    //attempt to lazy load a page of posts
                    //currently doesnt display anything
                    console.log("new post loading");                        

                    return post;

                   
                })
                } */}
                {this.state.LazyLoad.map(lazy => {

                //attempt to lazy load a page of posts
                //currently doesnt display anything
                    console.log("new post loading");                        

                    return lazy;


                    })
                }


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