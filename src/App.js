import React from 'react';
import './App.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function App() {
  return (
    <div className="App">
    <Navbar sticky="top" bg="dark" variant="dark">
      <Navbar.Brand href="#home">
        VROOM
      </Navbar.Brand>
      <Navbar.Collapse className="justify-content-end">
    <Navbar.Text>
      <span className="hide">Signed in as:</span> <a href="#login">Login</a>
    </Navbar.Text>
  </Navbar.Collapse>
    </Navbar>
    </div>
  );
}

export default App;
