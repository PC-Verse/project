import React from 'react'
import '../App.css'
import AddPost from './AddPost'

const NavBar = (props) => {
    return (
        <div id="NavBar">
            {/* <button id="postButton" className="headerStuff" onClick={<AddPost/>}>Post</button> */}
            <div id="logoName" className="headerStuff">PC Verse</div>
        </div>
    )
}

export default NavBar