import React, { Component } from 'react'
import Post from './Post'

class GlobalPosts extends Component {
    constructor() {
        super()
    }
    render = () => {
        return (
            <div>
                <div id="globalPostTitle">COMMUNITY</div>
                {this.props.globalPosts.map((post) => {
                            return post;
                    })
                }
                {/* {this.props.database.ref('globalPosts').once('value').then((snap) =>{
                    console.log(snap.val())
                })} */}
                {/* {this.props.database.ref('globalPosts').on('value', (snap)=> {
                    <Post title={snap.val().}/>
                }) */}
                {/* } */}
            </div>
        )
    }
}

export default GlobalPosts