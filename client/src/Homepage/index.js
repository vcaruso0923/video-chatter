import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

// import the images for homepage
const laptops = require('../img/laptops-wave.png');
const devices = require('../img/devices.png');
const computers = require('../img/computers.png');

function Homepage() {

    return (
        <section className="homepage animated fadeIn">
            <Container fluid className="greenBg">
                <Row className="center home-first">
                    <Col>
                        <h1>Free Video Conferencing</h1>
                        <br />
                        <img alt='laptops' className="img-fluid animated  jello" src={String(laptops)} />
                        <br />
                        <Button variant="primary">Get Started</Button>{' '}
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
                            <p>Vroom is compatible on all devices, desktop, mobile and tablet. Vroom’s backend utilizes modern web-based technologies such as <a href="https://webrtc.org/">webRTC</a> and <a href="https://socket.io">socket.io</a> for realtime communication over the internet. Vroom’s responsive front end will look great on any device, without the user needing to download a native application.</p>
                        </Col>
                    </Row>
                </Container>
            </Container>
            <Container fluid className="greenBg">
                <Container>
                    <Row>
                        <Col>
                            <h2>Host Large Or Small Meetings</h2>
                            <p>The Vroom dashboard allows you to control your Vroom experience. Vroom allows you to add your colleagues and friends to the platform. Create rooms and invite your contacts as attendees.  You will also be notified in your Vroom dashboard  when your friends create a room, so you can always stay in touch.</p>
                        </Col>
                        <Col>
                            <img alt='computers' className="img-fluid" src={String(computers)} />
                        </Col>
                    </Row>
                </Container>
            </Container>
        </section>
    );
}

export default Homepage;