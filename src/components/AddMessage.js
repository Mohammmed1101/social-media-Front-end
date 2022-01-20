import { useContext } from "react";
import { Row, Form, Button, Col, Modal, Alert } from "react-bootstrap";
import PostsContext from "../utils/PostsContext"



export default function AddMessage(props) {
    const { show, setShow, userProfile } = props
    const {sendMessage, errorSendMessage} = useContext(PostsContext)



    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Form onSubmit={e => sendMessage(e, userProfile._id)}>

                <Modal.Header closeButton>
                    <Modal.Title>Message</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Row>

                        {/* _________________________Alert error____________________________________ */}

                        {errorSendMessage ? <Alert variant="danger">{errorSendMessage}</Alert> : null}

                        <Col>
                            <Col className="text-center"> <img src={userProfile.avatar} width={100} className="rounded-circle" /></Col>
                            <Col className="text-center"> <h5>{userProfile.username}</h5></Col>
                        </Col>
                    </Row>
                    <Form.Group>
                        <Form.Label column md="6">
                            Message
                        </Form.Label>
                        <Form.Control as="textarea" name="message" rows={3} required />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
                    <Button variant="primary" type="submit" onClick={() => setShow(false)}>Send</Button>
                </Modal.Footer>

            </Form>
        </Modal>

    )
}

