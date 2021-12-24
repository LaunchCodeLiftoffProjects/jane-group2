import logo from './logo.svg';
import './App.css';
import React, {
   useState
} from 'react';

function App() {
  const [ msg, setMsg ] = useState("Loading...");

  useState(() => {
    fetch('/api/test')
        .then(response => response.text())
        .then(message => {
            setMsg(message);
        });
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload. {msg}
        </p>
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
