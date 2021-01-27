import logo from './logo.svg';
import './App.css';
import React, { Component, useEffect, useState } from "react";
import NavBar from './components/NavBar'
import AddPost from './components/AddPost'
import Post from './components/Post'
import UserPosts from './components/UserPosts'
import GlobalPosts from './components/GlobalPosts'

class App extends Component {

  // const AddedElement = () => <div><input placeholder='text box' /></div>

  constructor() {
    super();
    let date = new Date();
    this.state = {
      showAddPost: true,
      showUserPosts: true,  // set this to false later. testing purposes rn
      showGlobalPosts: false, // set this to true later
      posts:[<Post title="First Post" content="Hello there!" id={0} removePost={this.removePost} dateDay={date.toLocaleDateString()} dateTime={date.toLocaleTimeString()}/>],
      ids: [0],
      availableId: 0
    };
    this.toggleComponent = this.toggleComponent.bind(this);
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
        this.setState({showUserPosts: true})
        break
    }
  }

  render(){
  return (
    <div className="body">      
      {/* <header className="App-header"> */}



        <NavBar toggleComponent={this.toggleComponent}/>

        {this.state.showGlobalPosts && 
          <div>
          <GlobalPosts posts={this.state.posts}/>
          </div>
        }

        {this.state.showUserPosts && <div><UserPosts showAddPostBTN = {this.state.showGlobalPosts?false : true} showAddPost = {true} showPost= {this.state.showAddPost, this.state.posts}/></div>}

        
        {/* <button onClick={() => setCount(count + 1)}>Click me</button>
        { Array(count).fill(<Post title = {value} content = {content}/>) } */}
        {/* <AddPost/> */}



    </div>
  )}
}

export default App;