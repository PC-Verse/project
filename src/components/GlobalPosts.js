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
            globalPosts: []
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
                // console.log("Adding posts to state from database: ", post)
                this.props.addGlobalPosts(post)
            })
        })
    }



    render = () => {
        return (
            <div>
                <div id="globalPostTitle">COMMUNITY</div>
                {/* {console.log(this.props.globalPosts)} */}

                {this.props.globalPosts.map(post => {

                    //attempt to lazy load a page of posts
                    //currently doesnt display anything
                    <LazyLoad
                        key = {post.id}
                        height = {100}
                        offset = {[-100,100]}
                    >
                        <Post 
                            content = {post.content}
                            dateDay={post.dateDay}
                            dateTime={post.dateTime}
                            key={post.key}
                            isGlobalPost={post.isGlobalPost}
                            name={post.name}
                            title={post.title}
                            imageList={post.imageList}
                        ></Post>
                    </LazyLoad>
                    // console.log(post);

                    //return post;
                   
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