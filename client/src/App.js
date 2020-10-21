import React from 'react';
import './App.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

// import the images for homepage
const laptops = require('./img/laptops-wave.png');
const devices = require('./img/devices.png');
const computers = require('./img/computers.png');

function App() {
  return (
    <div className="App">
    <Navbar sticky="top" bg="dark" variant="dark">
      <Navbar.Brand href="#home">
        Vroom
      </Navbar.Brand>
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          <span className="hide">Signed in as:</span> <a href="#login">Login</a>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
    <Container fluid className="greenBg">
      <Row className="center home-first">
        <Col>
          <h1>Free Video Conferencing</h1>
          <img alt='laptops' className="img-fluid" src={String(laptops)} />
          <br />
          <Button variant="primary">Start A Meeting</Button>{' '}
          <Button variant="primary">Join A Meeting</Button>{' '}

        </Col>
      </Row>
    </Container>
    <Container fluid className="greenBg2">
    <Container>
      <Row>
        <Col>
        <img alt='devices' className="img-fluid" src={String(devices)} />
        </Col>
        <Col>
        <h2>Device Agnostic</h2>
        <p>Lorem to ipsum the dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud .</p>
        </Col>
      </Row>
      </Container>
    </Container>
    <Container fluid className="greenBg">
    <Container>
      <Row>
        <Col>
        <h2>Device Agnostic</h2>
        <p>Lorem to ipsum the dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud .</p>
        </Col>
        <Col>
        <img alt='computers' className="img-fluid" src={String(computers)} />
        </Col>
      </Row>
      </Container>
    </Container>
    
    </div>
  );
}

export default App;
