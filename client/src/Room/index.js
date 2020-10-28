import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
// import Button from 'react-bootstrap/Button';

// just for testing
const user = require('../img/user.png');

function Room() {

    return (
        <section className="room animated fadeIn">
            <Container>
                <Row>
                    <h2>Room Title</h2>
                </Row>
                <Row className="noPad">
                    <Card>
                        <Card.Header as="h6">email@email.com</Card.Header>
                        <Card.Body>
                            <Card.Text>
                            <img alt="video" className="video" src={String(user)} />
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Row>
             
            </Container>
        </section>
    );
}

export default Room;