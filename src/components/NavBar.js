import React, { useState } from 'react'
import '../App.css'
import Login from './Login'
import Logout from './Logout'
import tinder from '../images/tinder.svg'
import user from '../images/user.png'

import BlueCube from '../images/BlueCube.svg'

const NavBar = (props) => {

    const [displayGoogleStuff, setDisplayGoogleStuff] = useState(false) // set a state called displayGoogleStuff, and create a function setDisplayGoogleStuff (similar to this.setState)


    return (
        <div id="NavBar">


            <button id="postButton" className="headerStuff" onClick={() => { props.toggleComponent("showUserPosts") }}><img id="userBtn" src={user} alt="Posts"/></button>

            <div id="swipeBtn" className="headerStuff" onClick={() => { props.toggleComponent("showSwipes") }}><img id="icon2" src={tinder} alt="Carousel Feature"/></div>
            {/* <button id="swipeBtn" onClick={() => { props.toggleComponent("showSwipes") }} ><img src={tinder} class="showSwipes"/></button> */}

            <div id="logoName" className="headerStuff" onClick={() => { props.toggleComponent("showGlobalPosts") }}><div id="textForLogoName">PC-Verse</div><img id="icon" src={BlueCube} alt="logo"/></div>
            <button onClick={() => setDisplayGoogleStuff(!displayGoogleStuff)}
                id="loginBtn"
                className="headerStuff">
                {/* {props.loggedIn ? <div>Logged In</div> : <div>Sign In</div>} */}
                {props.loggedIn ? <img src={props.profileObj.imageUrl} id="profilePic" alt="Signed In"/> : <div>Sign In</div>}
            </button>
            {displayGoogleStuff &&
                <div className="dropdownContent">
                    {!props.loggedIn ? <Login updateIntereactedPosts={props.updateIntereactedPosts} loggedIn={props.loggedIn} setLoggedIn={props.setLoggedIn} setName={props.setName} setProfileObj={props.setProfileObj} toggleComponent={props.toggleComponent}/>
                        : <Logout loggedIn={props.loggedIn} setLoggedIn={props.setLoggedIn} setName={props.setName} setProfileObj={props.setProfileObj} toggleComponent={props.toggleComponent}/>
                    }
                </div>
            }

        </div>
    )
}

export default NavBar