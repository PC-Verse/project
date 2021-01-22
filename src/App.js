import logo from './logo.svg';
import './App.css';
import Greet from './components/Greet'
import Button from './components/Button'
import Welcome from './components/Welcome'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <Greet name="Kevin">
          Child of Greet
        </Greet>
        <Welcome/>

        
          {/* <br/> */}
          <Button name="kevin"/>
          {/* <br/> */}
          <Button name="benjamin"/>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
