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
import Room from './Room';


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar sticky="top" bg="dark" variant="dark">
          <Link to="/">
            <Navbar.Brand>
              Vroom
            </Navbar.Brand>
          </Link>
          <Navbar.Collapse className="justify-content-end">
            <Link to="/dashboard">
              <Navbar.Text>
                <span>Dashboard</span>
              </Navbar.Text>
            </Link>
            <Navbar.Text>
              <span className="login">Login</span>
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/room">
            <Room />
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
