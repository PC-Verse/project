import logo from './logo.svg';
import './App.css';
import React, { Component, useEffect, useState } from "react";
import NavBar from './components/NavBar'
import AddPost from './components/AddPost'
import Post from './components/Post'
import UserPosts from './components/UserPosts'
import GlobalPosts from './components/GlobalPosts'
import Login from './components/Login'
import Logout from './components/Logout'


class App extends Component {

  // const AddedElement = () => <div><input placeholder='text box' /></div>

  constructor() {
    super();
    let date = new Date();
    this.state = {
      showAddPost: true,
      showUserPosts: false,  // set this to false later. testing purposes rn
      showGlobalPosts: true, // set this to true later
      globalPosts:[<Post title="First Post" content="Hello there!" id={0} removePost={this.removePost} dateDay={date.toLocaleDateString()} dateTime={date.toLocaleTimeString()} isGlobalPost={true}/>],
      globalIds: [0],
      userPosts: [],
      userIds: [],
      availableId: -1,
      loggedIn: false,
      name: ""
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
        break;
      case "showUserPosts":
        this.setState({showUserPosts: true})
        this.setState({showGlobalPosts: false})
        break
      case "showGlobalPosts":
        this.setState({showGlobalPosts: true})
        this.setState({showUserPosts: false}) // changed this to false, bc will be hiding the userPosts stuff
        break
    }
  }

  setLoggedIn(logged){
    this.setState({
      loggedIn : logged
    })
  }
  setName(name){
    this.setState({
      name : name
    })
}

  render(){
  return (
    <div className="body">      
      {/* <header className="App-header"> */}



        <NavBar toggleComponent={this.toggleComponent}/>

        {this.state.showGlobalPosts && 
          <div>
          <GlobalPosts globalPosts={this.state.globalPosts}/>
          </div>
        }

        {/* {this.state.showUserPosts && <div><UserPosts showAddPostBTN = {this.state.showGlobalPosts?false : true} showAddPost = {true} showPost={this.state.showAddPost, this.state.posts} globalPosts={this.state.posts} globalIds={this.state.ids} globalSetState={this.setState}/></div>} */}
        {this.state.showUserPosts && <div><UserPosts 
            globalPosts={this.state.globalPosts} globalIds={this.state.globalIds} globalSetState={this.setState} userIds={this.state.userIds} userPosts={this.state.userPosts} availableId={this.state.availableId}/></div>}
        
        {/* <button onClick={() => setCount(count + 1)}>Click me</button>
        { Array(count).fill(<Post title = {value} content = {content}/>) } */}
        {/* <AddPost/> */}
        <div style={{}}>
        <Login loggedIn={this.state.loggedIn} setLoggedIn = {(logged) => this.setLoggedIn(logged)} setName={(name) => this.setName(name)}/>
        {this.state.loggedIn ? <p>Hello {this.state.name}</p>: <p>Not logged in</p> }
        <Logout loggedIn={this.state.loggedIn} setLoggedIn = {(logged) => this.setLoggedIn(logged)}/>
      </div>



    </div>
  )}
}

export default App;