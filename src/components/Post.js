import React from 'react'
import '../App.css'

const Post = (props) => {

    return (
        <div className = "card">
            <p class = "text-card">
                <div className="postTitle">{props.title}</div>
                <span className="timeStamp">{props.dateDay} {props.dateTime}</span>
                <div className="postContent">{props.content}</div>
            </p>
            <br/>
            <button onClick={() => {props.removePost(props.id)}} className="removeBtn">Remove Post</button>

        </div>
    )
}



export default Post