import React from 'react'
import '../App.css'

const Post = (props) => {
    return (
        <div class = "card">
            <p>Your Post Here:</p>
            <div class = "container">
                <div>
                    <input type="text" id="fname" class="title" placeholder="Your title.."></input>
                </div>
                <div>
                    <input type="text" id="fname" class="description" placeholder="Description..."></input>
                </div>
                <button class = "post">Post!</button>
            </div>
             {/* </div><input type="text" id="fname" name="firstname" placeholder="Your name.."> */}
        </div>
    )
}



export default Post