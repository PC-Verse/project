import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";
import Greet from './components/Greet'
import Button from './components/Button'
import Welcome from './components/Welcome'
import NavBar from './components/NavBar'
import AddPost from './components/AddPost'
import Post from './components/Post'


function App() {

  // const AddedElement = () => <div><input placeholder='text box' /></div>
  const [count, setCount] = useState(0)

  return (
    <div className="body">      
      {/* <header className="App-header"> */}
        <NavBar/>
        <button onClick={() => setCount(count + 1)}>Click me</button>
        { Array(count).fill(<Post title = "test posts" body = "Body is here"/>) }
        <AddPost/>



    </div>
  );
}

export default App;


        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        
        {/* <Greet name="Kevin">
          Child of Greet
        </Greet>
        <Welcome/> */}

        
          {/* <br/> */}
          {/* <Button name-="kevin"/> */}
          {/* <br/> */}
          {/* <Button name="benjamin"/> */}

        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      {/* </header> */}