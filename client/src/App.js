import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Navbar from 'react-bootstrap/Navbar';
import Homepage from './Homepage';
import Dashboard from './Dashboard';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar sticky="top" bg="dark" variant="dark">
          <Link to="/">
            <Navbar.Brand href="#home">
              Vroom
            </Navbar.Brand>
          </Link>

          <Link to="/dashboard">
            <Navbar.Text>
              Dashboard
            </Navbar.Text>
          </Link>

      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          <span className="hide">Signed in as:</span> <a href="#login">Login</a>
        </Navbar.Text>
      </Navbar.Collapse>
        </Navbar>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/">
            <Homepage />
          </Route>
        </Switch>
      </Router >

    </div >
  );
}

export default App;
