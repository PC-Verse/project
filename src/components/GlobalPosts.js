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
                {this.props.posts.map((x) => {
                            return x;
                    })
                }
            </div>
        )
    }
}

export default GlobalPosts