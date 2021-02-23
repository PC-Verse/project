// import logo from './logo.svg';
import './App.css';
import React, { Component, useEffect, useState } from "react";
import NavBar from './components/NavBar'
// import AddPost from './components/AddPost'
import Post from './components/Post'
import UserPosts from './components/UserPosts'
import GlobalPosts from './components/GlobalPosts'
import Swipe from './components/Swipe'
import Discussion from './components/Discussion'

// import Login from './components/Login'
// import Logout from './components/Logout'
import firebaseConfig from './firebase' // import firebase.js which has config stuff for firebase
import "firebase/database"
import firebase from "firebase/app"
import database from './firebase'



class App extends Component {

  // const AddedElement = () => <div><input placeholder='text box' /></div>

  constructor() {
    super();
    let date = new Date();
    this.state = {
      showAddPost: true,      // not used anymore
      showUserPosts: false,  // set this to false later. testing purposes rn
      showGlobalPosts: true,
      showSwipes: false, // set this to true later
      showDiscussion:false,
      globalPosts: [],
      globalIds: [0],
      // globalImageLists: [],
      userPosts: [],
      //userImageLists: [],
      userIds: [],
      availableId: 0,
      loggedIn: false,
      name: "",
      database: database,
      // dbRef: null,
      // dbGlobalPosts: null,
      // dbUserPostsRef: null,
      profileObj: {
        email: 'username@ucsb.edu',
        familyName: "Anonymous",
        givenName: "Anonymous",
        name: "Anonymous",
        googleId: -1,
        imageUrl: ""},
      items: [],
      postObj : null,
      postKey : -1,
      community: 'Global'
    };
    this.toggleComponent = this.toggleComponent.bind(this);
    this.setState = this.setState.bind(this)
    this.setLoggedIn = this.setLoggedIn.bind(this);
    this.setName = this.setName.bind(this);

  }

  toggleComponent(name) {
    console.log(name);
    switch (name) {
      case "showAddPost":
        this.setState({ showPost: !this.state.showAddPost });
        this.setState({ showSwipes: false })
        this.setState({ showDiscussion: false })
        break;
      case "showUserPosts":
        this.setState({ showUserPosts: true })
        this.setState({ showGlobalPosts: false })
        this.setState({ showSwipes: false })
        this.setState({ showDiscussion: false })
        break
      case "showGlobalPosts":
        this.setState({ showGlobalPosts: true })
        this.setState({ showUserPosts: false }) // changed this to false, bc will be hiding the userPosts stuff
        this.setState({ showSwipes: false })
        this.setState({ showDiscussion: false })
        break
      case "showSwipes":
          this.setState({ showSwipes: true })
          this.setState({ showUserPosts: false }) // changed this to false, bc will be hiding the userPosts stuff
          this.setState({ showGlobalPosts: false })
          this.setState({ showDiscussion: false })
          break
      case "showDiscussion":
          this.setState({ showPost: false });
          this.setState({ showSwipes: false })
          this.setState({ showGlobalPosts: false })
          this.setState({ showUserPosts: false })
          this.setState({ showDiscussion: true })
          break;
    }
  }

  setLoggedIn(logged) {
    this.setState({
      loggedIn: logged
    })
  }
  setName(name) {
    this.setState({
      name: name
    })
  }
  setProfileObj = (email, familyName, givenName, name, googleId, imageUrl) => {
    let newProfileObj = {
      email: email,
      familyName: familyName,
      givenName: givenName,
      name: name,
      googleId: googleId,
      imageUrl: imageUrl}
    this.setState({
      profileObj : newProfileObj
    })
  }
  addGlobalPost = (newPost) => {
    // console.log("ran setGlobalPosts")
    let posts = this.state.globalPosts;
    posts.unshift(newPost);  // concatenate newPosts to front of posts
    this.setState({
      globalPosts: posts
    })
    // console.log(this.state.globalPosts)
  }
  addUserPost = (newPost) => {
    let posts = this.state.userPosts;
    posts.unshift(newPost);
    this.setState({
      userPosts : posts
    })
  }
  setPostObj = (newPostObj) => {
    this.setState({
      postObj: newPostObj
    })
  }
  setPostKey = (postKey) => {
    this.setState({
      postKey: postKey
    })
  }
  switchCommunity = (name) => {
    // console.log("ran setGlobalPosts")
    this.toggleComponent("showUserPosts");

    this.setState({
      community: name
    })

    this.toggleComponent("showGlobalPosts");

    // this.componentDidMount();
    // console.log(this.state.globalPosts)
}

  render() {
    return (
      <div className="body">
        {/* <header className="App-header"> */}


        <NavBar toggleComponent={this.toggleComponent} loggedIn={this.state.loggedIn} setLoggedIn={(logged) => this.setLoggedIn(logged)} setName={(name) => this.setName(name)} setProfileObj={this.setProfileObj} />

        {this.state.showGlobalPosts &&
          <div>

                <div className = "card">
                     <h>Which Community would you like to View?</h>
                        <button onClick = {() => this.switchCommunity("Apple")}>Apple</button>
                        <button onClick = {() => this.switchCommunity("Nvidia")}> Nvidia</button>
                        <button onClick = {() => this.switchCommunity("AMD")}>AMD</button>
                        <button onClick = {() => this.switchCommunity("Microsoft")} >Microsoft</button>
                        <button onClick = {() => this.switchCommunity("Global")} >Global</button>
                </div>
            <GlobalPosts
              toggleComponent = {this.toggleComponent}
              // globalPosts={this.state.globalPosts}
              community = {this.state.community}
              database={this.state.database}
              // addGlobalPost={this.addGlobalPost}
              profileObj={this.state.profileObj}
              setPostObj={this.setPostObj}
              setPostKey={this.setPostKey}/>          
          </div>
        }

        {this.state.showSwipes &&
          <div>
            <Swipe swipePosts={this.state.globalPosts} />
          </div>
        }

        {this.state.showDiscussion &&
          <div>

            <Discussion postObj={this.state.postObj}
            postKey={this.state.postKey}
            profileObj={this.state.profileObj}/>
          </div>
        }

        {/* <div>{this.state.items}
            display here
        </div>  */}

        {/* {this.state.showUserPosts && <div><UserPosts showAddPostBTN = {this.state.showGlobalPosts?false : true} showAddPost = {true} showPost={this.state.showAddPost, this.state.posts} globalPosts={this.state.posts} globalIds={this.state.ids} globalSetState={this.setState}/></div>} */}
        {this.state.showUserPosts &&
          <div>
            <UserPosts
              toggleComponent = {this.toggleComponent}
              // globalPosts={this.state.globalPosts}
              // globalIds={this.state.globalIds}
              // globalSetState={this.setState}
              // userIds={this.state.userIds}
              userPosts={this.state.userPosts}
              addUserPost={this.addUserPost}
              // userImageLists={this.state.userImageLists}
              // globalImageLists={this.state.globalImageLists}
              // availableId={this.state.availableId}
              database={this.state.database}
              profileObj={this.state.profileObj}
              setPostObj={this.setPostObj}/>
          </div>
        }

        {/* <button onClick={() => setCount(count + 1)}>Click me</button>
        { Array(count).fill(<Post title = {value} content = {content}/>) } */}
        {/* <AddPost/> */}

        {/* <div style={{}}>
        <Login loggedIn={this.state.loggedIn} setLoggedIn = {(logged) => this.setLoggedIn(logged)} setName={(name) => this.setName(name)}/>
        {this.state.loggedIn ? <p>Hello {this.state.name}</p>: <p>Not logged in</p> }
        <Logout loggedIn={this.state.loggedIn} setLoggedIn = {(logged) => this.setLoggedIn(logged)}/> */}
        {/* </div> */}



      </div>
    )
  }
}

export default App;