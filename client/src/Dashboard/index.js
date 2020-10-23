import React from 'react';
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
import Form from 'react-bootstrap/Form'

function CreateRoom(props) {
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
        <Form>
            <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Room Title</Form.Label>
                <Form.Control type="text" placeholder="Enter A Room Title" />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect2">
                <Form.Label>Select The Room's Participants</Form.Label>
                <Form.Control as="select" multiple>
                <option>bancboy@hotmail.com</option>
                <option>isotopian@yahoo.com</option>
                <option>godeke@hotmail.com</option>
                <option>ingolfke@live.com</option>
                <option>dieman@optonline.net</option>
                <option>dsowsy@outlook.com</option>
                </Form.Control>
                <span className="text-muted">Hold down the Ctrl (windows) or Command (Mac) button to select multiple friends.</span>
            </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={props.onHide}>Cancel</Button>
            <Button>Create</Button>
        </Modal.Footer>
        </Modal>
    );
}

function Dashboard() {
    const [modalShow, setModalShow] = React.useState(false);
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
                                <h2>Active Rooms&nbsp;
                                <>
                                <Button variant="outline-primary" size="sm" onClick={() => setModalShow(true)}>
                                    Create Room
                                </Button>

                                <CreateRoom
                                    show={modalShow}
                                    onHide={() => setModalShow(false)}
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
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                    <Container>
                        <Row>
                            <Col>
                            <h2>My Friends&nbsp;
                                 
                                <Button variant="outline-primary" size="sm">
                                    Invite Friend
                                </Button>
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