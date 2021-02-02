import React, { Component } from 'react'
import Post from './Post'

class GlobalPosts extends Component {
    constructor() {
        super()
    }

    componentDidMount = () => {
        // {this.props.database != null && this.props.database.ref('globalPosts').on('value', (snap)=> {
        //     console.log(snap.val())
        //     let post = snap.val()[0];
        //     return <Post title={post.title} content={post.content} dateDay={post.dateDay} dateTime={post.dateTime} id={post.id}/>
        //     })
        // }
    }

    render = () => {
        return (
            <div>
                <div id="globalPostTitle">COMMUNITY</div>
                {this.props.globalPosts.map((post) => {
                        return post;
                    })
                }
                {/*The code down here doesn'tget shown on the website for some reason, but it is logging the correct stuff*/}
                {this.props.database != null &&
                    this.props.database.ref('globalPosts').on('value', (snap) => {
                        let post = snap.val()[0];
                        console.log(post)
                        return <Post title={post.title} content={post.content} dateDay={post.dateDay} dateTime={post.dateTime} id={post.id} />
                    })
                }
                {/* {this.props.dbGlobalPostsRef().map(post => (
                    <Post title={post.title} content={post.content} dateDay={post.dateDay} dateTime={post.dateTime} id={post.id} name={post.name}/>
                ))} */}
            </div>
        )
    }
}

export default GlobalPosts