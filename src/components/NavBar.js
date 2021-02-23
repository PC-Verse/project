import React, { useState } from 'react'
import '../App.css'
import Login from './Login'
import Logout from './Logout'
import BlueCube from '../images/BlueCube.svg'

const NavBar = (props) => {

    const [displayGoogleStuff, setDisplayGoogleStuff] = useState(false) // set a state called displayGoogleStuff, and create a function setDisplayGoogleStuff (similar to this.setState)


    return (
        <div id="NavBar">
            <div class="sidenav">
                
            </div>

            <button id="postButton" className="headerStuff" onClick={() => { props.toggleComponent("showUserPosts") }}>My Posts</button>
            <div id="swipeBtn" className="headerStuff" onClick={() => { props.toggleComponent("showSwipes") }}>Carousel Feature</div>

            <div id="logoName" className="headerStuff" onClick={() => { props.toggleComponent("showGlobalPosts") }}><div id="textForLogoName">PC Verse</div><img id="icon" src={BlueCube}/></div>
            <button onClick={() => setDisplayGoogleStuff(!displayGoogleStuff)}
                id="loginBtn"
                className="headerStuff">
                {props.loggedIn ? <div>Logged In</div> : <div>Not Signed In</div>}
            </button>
            {displayGoogleStuff &&
                <div className="dropdownContent">
                    {!props.loggedIn ? <Login loggedIn={props.loggedIn} setLoggedIn={(logged) => props.setLoggedIn(logged)} setName={(name) => props.setName(name)} setProfileObj={props.setProfileObj} />
                    : <Logout loggedIn={props.loggedIn} setLoggedIn={(logged) => props.setLoggedIn(logged)} />
                }
                </div>
            }

        </div>
    )
}

export default NavBar