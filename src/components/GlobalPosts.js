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
                {this.props.globalPosts.map((x) => {
                            return x;
                    })
                }
            </div>
        )
    }
}

export default GlobalPosts