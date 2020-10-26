import React, { useState } from "react";
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

import { useMutation, ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import Auth from "./utils/auth";
import { ADD_USER, LOGIN } from "./utils/mutations";

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem('id_token')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  },
  uri: '/graphql',
})

function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '' })
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async event => {
    event.preventDefault();
    try {
      const mutationResponse = await login({ variables: { email: formState.email, password: formState.password } })
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e)
    }
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

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
        <Form onSubmit={handleFormSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onChange={handleChange} type="email" placeholder="Enter email" name="email" />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onChange={handleChange} type="password" placeholder="Password" name="password" />
          </Form.Group>
          {
            error ? <div>
              <p className="error-text" >The provided credentials are incorrect</p>
            </div> : null
          }
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
function Signup(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async event => {
    event.preventDefault();
    console.log(formState.email);
    const mutationResponse = await addUser({
      variables: {
        email: formState.email, password: formState.password
      }
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

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
        <Form onSubmit={handleFormSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onChange={handleChange} type="email" placeholder="Enter email" name="email" />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onChange={handleChange} type="password" placeholder="Password" name="password" />
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

  if (Auth.loggedIn()) {
    return (
      <ApolloProvider client={client}>
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
                  <span href="/" onClick={() => Auth.logout()}>Logout</span>
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
      </ApolloProvider>
    );
  } else {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <Router>
            <Navbar sticky="top" bg="dark" variant="dark">
              <Link to="/">
                <Navbar.Brand>
                  Vroom
            </Navbar.Brand>
              </Link>
              <Navbar.Collapse className="justify-content-end">
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
      </ApolloProvider>
    );
  }
}
export default App;