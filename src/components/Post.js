import React from 'react'
import '../App.css'

const Post = (props) => {

    return (
        <div class = "card">
            <p>{props.title}</p>
            <p>{props.body}</p>
        </div>
    )
}



export default Post