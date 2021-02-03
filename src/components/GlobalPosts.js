import React, { Component } from 'react'
import Post from './Post'

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
    }

    render = () => {
        return (
            <div>
                <div id="globalPostTitle">COMMUNITY</div>
                {this.props.globalPosts.map((post) => {
                    return post;
                })
                }
                {/*The code down here doesn't get shown on the website for some reason, but it is logging the correct stuff. It logs on every rerender of the page, so the console will get filled up*/}
                {this.props.database != null &&
                    this.props.database.ref('globalPosts').on('value',(posts) => {
                        posts.forEach(post => {
                            console.log(post.val())
                            // let posts = this.state.globalPosts
                            // posts.unshift(<Post title={post.title} content={post.content} dateDay={post.dateDay} dateTime={post.dateTime} id={post.id} imageList={[]} removePost={this.removePost} isGlobalPost={true} name={post.name} />)
                            // this.setState({
                            //     globalPosts: posts
                            // })
                        })
                        // let post = posts.val()[0];
                        // console.log(post)
                    })
                }
                {/* {this.state.globalPosts.map((post) => {
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