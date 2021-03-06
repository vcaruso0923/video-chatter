import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card' 
import Button from 'react-bootstrap/Button';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { Typeahead } from 'react-bootstrap-typeahead'; // ES2015
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import { useMutation, useQuery } from '@apollo/react-hooks';
import {CREATE_ROOM, ADD_FRIEND} from '../utils/mutations'
import { QUERY_ME, QUERY_USERS } from '../utils/queries'
import { v1 as uuid } from "uuid";

const cam = require('../img/cam.png');

function CreateRoom(props) {
    const [roomName, setRoomName] = useState('');
    const handleChange = event => {
        if (event.target.value.length <= 280) {
            setRoomName(event.target.value);
        }
    };
    const handleFormSubmit = async event => {
        // event.preventDefault();
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
            <Button onClick={props.onHide} type="submit">Create</Button>
            <Button onClick={props.onHide} className="cancel">Cancel</Button>
            </Form>
        </Modal.Body>
        </Modal>
    );
}

function Invite(props) {
    const [addFriend] = useMutation(ADD_FRIEND);
    const [singleSelections, setSingleSelections] = useState([]);
    const [friendEmail, setFriendEmail] = useState('');
    const [invalidEmail, setInvalidEmail] = useState('');
    const [friendAdded, setFriendAdded] = useState('');
    const handleChange = event => {
        if (event.target.value.length <= 280) {
            setFriendEmail(event.target.value);
        }
    };

    const { loading, data } = useQuery(QUERY_USERS);
    //the following code is to create a typeAhead array. Does not work currently.
    // if (loading) return ('Loading...')
    // const typeaheadArray = []
    // data.users.map(friend => (
    //     typeaheadArray.push(friend.email)
    // ))
    // console.log(typeaheadArray)

    const handleClick = async () => {
        var locatedFriend = data.users.filter(function(user) {
            return user.email === friendEmail
        });
        try {
        await addFriend({
            variables: { id: locatedFriend[0]._id }
        });
        setFriendAdded('Friend Added!')
        setTimeout(function() {document.location.reload()}, 1000);
        } catch (error) {
            setInvalidEmail('Invalid Email!')
        }
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
            Send An Invite
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Enter Email Address</Form.Label>
                <Form.Control onChange={handleChange} name="friendEmail" type="email" placeholder="Enter Invitee's Email" />
                {/* <Typeahead 
                    id="friend selector"
                    onChange={handleChange, setSingleSelections} 
                    name="friendEmail" 
                    type="email" 
                    options={typeaheadArray}
                    placeholder="Enter Invitee's Email" 
                    selected={singleSelections} 
                /> */}
            </Form.Group>
            {
                <div>
                    <p style={{color: "red"}} className="error-text" >{invalidEmail}</p>
                </div>
            }
            {
                <div>
                    <p style={{color: "green"}} className="error-text" >{friendAdded}</p>
                </div>
            }
            <Button onClick={handleClick}>Add Friend</Button>
            <Button onClick={props.onHide} className="cancel">Cancel</Button>
            </Form>
            </Modal.Body>
        </Modal>
    );
}

function Dashboard() {
    const [modalShow1, setModalShowCreateRoom] = React.useState(false);
    const [modalShow2, setModalShowInvite] = React.useState(false);

    const { loading, data } = useQuery( QUERY_ME );
    if (loading) return 'Loading...'

    const user = data?.me || {};
    const userRoomsArray = user.rooms
    const friendsArray = user.friends
    // console.log(friendsArray)

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
                                {/* map users own rooms */}
                                {userRoomsArray && userRoomsArray.map(room => (
                                    <Card key={room.roomid} style={{ width: 'auto' }}>
                                        <Card.Body>
                                            <Card.Title>{room.roomName} <img alt='video camera' className="img-fluid" src={String(cam)} /></Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">{user.friends.length.toString()} Invited</Card.Subtitle>
                                    
                                    {/* able to see other participants:
                                            <Card.Text>
                                    need to filter and map first three friends
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
                                    need to filter and map all friends but the first 3
                                                    lndale@yahoo.com, magusnet@icloud.com, tpedersen@gmail.com
                                                    </Tooltip>
                                                }
                                                >
                                                <a><strong>3 More</strong></a>
                                                </OverlayTrigger>
                                            ))}
                                            </>
                                            </Card.Text> */}

                                        {/* replace below link with deployed URL */}
                                            <Card.Link href={"https://salty-lowlands-76602.herokuapp.com/room/" + room.roomid}>Enter Room</Card.Link>
                                        </Card.Body>
                                    </Card>
                                ))}
                            </Col>
                        </Row>
                    </Container>

                    <Container>
                        <Row>
                            <Col>
                                <h2>My Friend's Rooms&nbsp;
                                </h2>
                                <hr />
                                {/* map user's friend's then map over each friend's rooms array rooms */}
                                {friendsArray && friendsArray.map(user => (
                                    user.rooms.map(rooms => (
                                        <Card key={rooms._id} style={{ width: '14em' }}>
                                            <Card.Body>
                                                <Card.Title>{rooms.roomName}</Card.Title>
                                                <Card.Subtitle className="mb-2 ">{user.email + `'s room`}</Card.Subtitle>
                                                <Card.Subtitle className="mb-2 text-muted">{user.friends.length.toString()} Invited</Card.Subtitle>
                                                
                                                {/* <Card.Text>
                                        need to filter and map first three friends
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
                                        need to filter and map all friends but the first 3
                                                        lndale@yahoo.com, magusnet@icloud.com, tpedersen@gmail.com
                                                        </Tooltip>
                                                    }
                                                    >
                                                    <a><strong>3 More</strong></a>
                                                    </OverlayTrigger>
                                                ))}
                                                </>
                                                </Card.Text> */}

                                        {/* replace below link with deployed URL */}
                                                <Card.Link href={"https://salty-lowlands-76602.herokuapp.com/room/" + rooms.roomid}>Enter Room</Card.Link>
                                            </Card.Body>
                                        </Card>
                                    ))
                                ))}
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
                                    </tr>
                                </thead>
                                <tbody>
                                {friendsArray && friendsArray.map(friend => (
                                    <tr key={friend._id}>
                                    <td>{friend.email}</td>
                                    </tr>
                                ))}
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