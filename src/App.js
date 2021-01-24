import logo from './logo.svg';
import './App.css';
import React, { Component, useEffect, useState } from "react";
import NavBar from './components/NavBar'
import AddPost from './components/AddPost'
import Post from './components/Post'
import Posts from './components/Posts'


class App extends Component {

  // const AddedElement = () => <div><input placeholder='text box' /></div>

  constructor() {
    super();
    this.state = {
      showPost: true
    };
    this.hideComponent = this.hideComponent.bind(this);
  }
  hideComponent(name) {
    console.log(name);
    switch (name) {
      case "showPost":
        this.setState({ showPost: !this.state.showPost });
        break;
    }
  }

  

  render(){
  return (
    <div className="body">      
      {/* <header className="App-header"> */}



        <NavBar/>

        <Posts showPost= {this.state.showPost}/>
        
        {/* <button onClick={() => setCount(count + 1)}>Click me</button>
        { Array(count).fill(<Post title = {value} content = {content}/>) } */}
        {/* <AddPost/> */}



    </div>
  )}
}

export default App;