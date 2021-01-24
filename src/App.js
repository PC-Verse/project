import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";
import NavBar from './components/NavBar'
import AddPost from './components/AddPost'
import Post from './components/Post'
import Posts from './components/Posts'


function App() {

  // const AddedElement = () => <div><input placeholder='text box' /></div>
  const [count, setCount] = useState(0)
  const [value, setValue] = useState("Initial");
  const [content, setContent] = useState("Bodyy here");


  return (
    <div className="body">      
      {/* <header className="App-header"> */}
        <NavBar/>
        <Posts/>
        
        {/* <button onClick={() => setCount(count + 1)}>Click me</button>
        { Array(count).fill(<Post title = {value} content = {content}/>) } */}
        {/* <AddPost/> */}



    </div>
  );
}

export default App;