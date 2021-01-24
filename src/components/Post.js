import React from 'react'
import '../App.css'

const Post = (props) => {

    return (
        <div className = "card">
            <p>{props.title}</p>
            <p>{props.content}</p>
        </div>
    )
}



export default Post