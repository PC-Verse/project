// import logo from './logo.svg';
import './App.css';
import React, { Component, useEffect, useState } from "react";
import NavBar from './components/NavBar'
// import AddPost from './components/AddPost'
import Post from './components/Post'
import UserPosts from './components/UserPosts'
import GlobalPosts from './components/GlobalPosts'
import Swipe from './components/Swipe'

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
      globalPosts: [<Post title="First Post" imageList={[]} content="Hello there!" id={0} removePost={this.removePost} dateDay={date.toLocaleDateString()} dateTime={date.toLocaleTimeString()} isGlobalPost={true} name="Anonymous" />],
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
        familyName: "",
        givenName: "Anonymous",
        name: "Anonymous",
        googleId: -1,
        imageUrl: ""},
      items: []
    };
    this.toggleComponent = this.toggleComponent.bind(this);
    this.setState = this.setState.bind(this)
    this.setLoggedIn = this.setLoggedIn.bind(this);
    this.setName = this.setName.bind(this);

  }

  // componentDidMount = () => {
  //   firebase.initializeApp(firebaseConfig)
  //   let database = firebase.database()
  //   this.setState({
  //     database: firebase.database(),
  //   })
  // }

  // componentWillMount(){
  //   firebase.initializeApp(firebaseConfig)
  //   var ref = firebase.database().ref('userPosts');

  //   ref.on("value", (snapshot) => {
  //     const userItem = snapshot.dateDay;
  //     let items = Object.values(userItem);
  //     this.setState({ items: items });
  //   });
  // }


  // these references are functions
  dbRef = () => this.state.database.ref();
  dbGlobalPostsRef = () => this.state.database.ref('globalPosts')
  dbUserPostsRef = () => this.state.database.ref('userPosts')


  toggleComponent(name) {
    console.log(name);
    switch (name) {
      case "showAddPost":
        this.setState({ showPost: !this.state.showAddPost });
        this.setState({ showSwipes: false })
        break;
      case "showUserPosts":
        this.setState({ showUserPosts: true })
        this.setState({ showGlobalPosts: false })
        this.setState({ showSwipes: false })
        break
      case "showGlobalPosts":
        this.setState({ showGlobalPosts: true })
        this.setState({ showUserPosts: false }) // changed this to false, bc will be hiding the userPosts stuff
        this.setState({ showSwipes: false })
        break
      case "showSwipes":
          this.setState({ showSwipes: true })
          this.setState({ showUserPosts: false }) // changed this to false, bc will be hiding the userPosts stuff
          this.setState({ showGlobalPosts: false })
          break
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
  addGlobalPosts = (newPost) => {
    console.log("ran setGlobalPosts")
    let posts = this.state.globalPosts;
    posts.unshift(newPost);  // concatenate newPosts to front of posts
    this.setState({
      globalPosts: posts
    })
    // console.log(this.state.globalPosts)
  }

  render() {
    return (
      <div className="body">
        {/* <header className="App-header"> */}



        <NavBar toggleComponent={this.toggleComponent} loggedIn={this.state.loggedIn} setLoggedIn={(logged) => this.setLoggedIn(logged)} setName={(name) => this.setName(name)} setProfileObj={this.setProfileObj} />

        {this.state.showGlobalPosts &&
          <div>
            <GlobalPosts
              globalPosts={this.state.globalPosts}
              database={this.state.database}
              addGlobalPosts={this.addGlobalPosts}/>
            
          
          </div>
        }

        {this.state.showSwipes &&
          <div>
            <Swipe swipePosts={this.state.globalPosts} />
          </div>
        }

        {/* <div>{this.state.items}
            display here
        </div>  */}

        {/* {this.state.showUserPosts && <div><UserPosts showAddPostBTN = {this.state.showGlobalPosts?false : true} showAddPost = {true} showPost={this.state.showAddPost, this.state.posts} globalPosts={this.state.posts} globalIds={this.state.ids} globalSetState={this.setState}/></div>} */}
        {this.state.showUserPosts && <div><UserPosts
          globalPosts={this.state.globalPosts} globalIds={this.state.globalIds} globalSetState={this.setState} userIds={this.state.userIds} userPosts={this.state.userPosts} userImageLists={this.state.userImageLists} globalImageLists={this.state.globalImageLists} availableId={this.state.availableId} database={this.state.database} profileObj={this.state.profileObj} /></div>}

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