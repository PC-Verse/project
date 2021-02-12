import React, { Component } from 'react'
import '../App.css'
import Post from './Post'
import database from '../firebase'

class GlobalPosts extends Component {
    constructor() {
        super()
        this.state = {
            globalPosts: []
        }
    }

    componentDidMount = () => {
        // {this.props.database != null && this.props.database.ref('globalPosts').on('value', (snap)=> {
        //     console.log(snap.val())
        //     let post = snap.val()[0];
        //     return <Post title={post.title} content={post.content} dateDay={post.dateDay} dateTime={post.dateTime} id={post.id}/>
        //     })
        // }
        database.ref('/globalPosts/').on("value", (snapshot) => {
            let posts = []
            snapshot.forEach(data => {
                let post = <Post
                    content={data.val().content}
                    dateDay={data.val().dateDay}
                    dateTime={data.val().dateTime}
                    id={data.key}
                    isGlobalPost={data.val().isGlobalPost}
                    namee={data.val().name}
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
                {console.log(this.props.globalPosts)}
                {this.props.globalPosts.map(post => {
                    // console.log(post);
                    return post;
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