import React from 'react'
import '../App.css'
import AddPost from './AddPost'

const NavBar = (props) => {
    return (
        <div id="NavBar">
            <button id="postButton" className="headerStuff" onClick={() => {props.toggleComponent("showUserPosts")}}>Post</button>
            <div id="logoName" className="headerStuff" onClick={() => {props.toggleComponent("showGlobalPosts")}}>PC Verse</div>
        </div>
    )
}

export default NavBar