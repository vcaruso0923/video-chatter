import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Homepage from './Homepage';
import Dashboard from './Dashboard';
import Room from './Room';
function Login(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Login
          </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
function Signup(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Sign up
          </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Sign up
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
function App() {
  const [modalShowLogin, setModalShowLogin] = React.useState(false);
  const [modalShowSignup, setModalShowSignup] = React.useState(false);
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
              <span className="login" onClick={() => setModalShowLogin(true)}>Login</span>
            </Navbar.Text>
            <Login
              show={modalShowLogin}
              onHide={() => setModalShowLogin(false)}
            />
            <Navbar.Text>
              <span className="signup" onClick={() => setModalShowSignup(true)}>Signup</span>
            </Navbar.Text>
            <Signup
              show={modalShowSignup}
              onHide={() => setModalShowSignup(false)}
            />
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