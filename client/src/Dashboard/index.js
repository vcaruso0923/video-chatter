import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card' 
import Button from 'react-bootstrap/Button';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useMutation, useQuery } from '@apollo/react-hooks';
import {CREATE_ROOM} from '../utils/mutations'
import { QUERY_ME } from '../utils/queries'
import { v1 as uuid } from "uuid";

function CreateRoom(props) {
    const [roomName, setRoomName] = useState('');
    const handleChange = event => {
        if (event.target.value.length <= 280) {
            setRoomName(event.target.value);
        }
    };
    const handleFormSubmit = async event => {
        event.preventDefault();
        const roomid = uuid();
        try {
            // add thought to database
            await createRoom({
                variables: { roomName, roomid }
            });
            // clear form value
            setRoomName('');
        } catch (e) {
            console.error(e);
        }
    };



    const [createRoom] = useMutation(CREATE_ROOM);
    return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            Create A Room
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Room Title</Form.Label>
                <Form.Control onChange={handleChange} type="text" placeholder="Enter A Room Title" name="roomName"/>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect2">
            </Form.Group>
            <Button onClick={props.onHide}>Cancel</Button>
            <Button type="submit">Create</Button>
            </Form>
        </Modal.Body>
        </Modal>
    );
}

function Invite(props) {
    return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            Send An Invite
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Enter Email Address</Form.Label>
                <Form.Control type="email" placeholder="Enter Invitee's Email" />
            </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={props.onHide}>Cancel</Button>
            <Button>Invite</Button>
        </Modal.Footer>
        </Modal>
    );
}

function Dashboard() {
    const [modalShow1, setModalShowCreateRoom] = React.useState(false);
    const [modalShow2, setModalShowInvite] = React.useState(false);

    const { loading, data } = useQuery( QUERY_ME );

    const user = data?.me || {};

    console.log(user)

    return (    
        <section className="dashboard animated fadeIn">
            
            <Container fluid>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
                <Col sm={3}>
                <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                    <Nav.Link eventKey="first">Rooms</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                    <Nav.Link eventKey="second">My Friends</Nav.Link>
                    </Nav.Item>
                </Nav>
                </Col>
                <Col sm={9}>
                <Tab.Content>
                    <Tab.Pane eventKey="first">
                    <Container>
                        <Row>
                            <Col>
                                <h2>My Rooms&nbsp;
                                <>
                                <Button variant="outline-primary" size="sm" onClick={() => setModalShowCreateRoom(true)}>
                                    Create Room
                                </Button>

                                <CreateRoom
                                    show={modalShow1}
                                    onHide={() => setModalShowCreateRoom(false)}
                                />
                                
                                </> 
                                </h2>
                                <hr />
                                <Card style={{ width: '14em' }}>
                                <Card.Body>
                                    <Card.Title>Room Title</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">6 Participants</Card.Subtitle>
                                    <Card.Text>
                                    augusto@yahoo.ca<br />
                                    bwcarty@att.net<br />
                                    dprice@msn.com<br />
                                    <>
                                    {['top'].map((placement) => (
                                        <OverlayTrigger
                                        key={placement}
                                        placement={placement}
                                        overlay={
                                            <Tooltip id={`tooltip-${placement}`}>
                                            lndale@yahoo.com, magusnet@icloud.com, tpedersen@gmail.com
                                            </Tooltip>
                                        }
                                        >
                                        <a><strong>3 More</strong></a>
                                        </OverlayTrigger>
                                    ))}
                                    </>
                                    </Card.Text>
                                    <Card.Link href="room">Enter Room</Card.Link>
                                </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                    <Container>
                        <Row>
                            <Col>
                                <h2>My Friends Rooms&nbsp;

                                </h2>
                                <hr />
                                <Card style={{ width: '14em' }}>
                                <Card.Body>
                                    <Card.Title>Room Title</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">6 Participants</Card.Subtitle>
                                    <Card.Text>
                                    augusto@yahoo.ca<br />
                                    bwcarty@att.net<br />
                                    dprice@msn.com<br />
                                    <>
                                    {['top'].map((placement) => (
                                        <OverlayTrigger
                                        key={placement}
                                        placement={placement}
                                        overlay={
                                            <Tooltip id={`tooltip-${placement}`}>
                                            lndale@yahoo.com, magusnet@icloud.com, tpedersen@gmail.com
                                            </Tooltip>
                                        }
                                        >
                                        <a><strong>3 More</strong></a>
                                        </OverlayTrigger>
                                    ))}
                                    </>
                                    </Card.Text>
                                    <Card.Link href="room">Enter Room</Card.Link>
                                </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                    <Container>
                        <Row>
                            <Col>
                                <h2>My Friends&nbsp;
                                    
                                <Button variant="outline-primary" size="sm" onClick={() => setModalShowInvite(true)}>
                                        Invite A Friend
                                </Button>
                                <Invite
                                    show={modalShow2}
                                    onHide={() => setModalShowInvite(false)}
                                />
                                </h2>
                                <hr />
                                <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                    <th>Username</th>
                                    <th>Online</th>
                                    <th>In Room</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <td>augusto@yahoo.ca</td>
                                    <td><Badge variant="success">Yes</Badge>{' '}</td>
                                    <td><a href="#">Room Title</a></td>
                                    </tr>
                                    <tr>
                                    <td>bwcarty@att.net</td>
                                    <td><Badge variant="success">Yes</Badge>{' '}</td>
                                    <td><a href="#">Room Title</a></td>
                                    </tr>
                                    <tr>
                                    <td>charty@aol.net</td>
                                    <td><Badge variant="danger">No</Badge>{' '}</td>
                                    <td><span class="text-muted">N/A</span></td>
                                    </tr>
                                </tbody>
                                </Table>
                            
                            </Col>
                        </Row>
                    </Container>
                    </Tab.Pane>
                </Tab.Content>
                </Col>
            </Row>
            </Tab.Container>
            </Container>
        </section>
    );
}

export default Dashboard;