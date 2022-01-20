import { useContext, useState } from "react";
import { Row, Form, Button, Col, Modal, Card } from "react-bootstrap";

import PostsContext from "../utils/PostsContext";

export default function Friends(props) {
    const { show, setShow, profile } = props


    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Friends</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ maxHeight: 300, overflowY: "auto", border: "1px solid darkgray" }}>


                {profile?.friends.map(friendsUser => (
                    <Card className="mb-3 overflow" >
                        <Row className=" container d-flex justify-content-between my-3 align-items-center">
                            <Col className="d-flex flex-row"> <img src={friendsUser.avatar} className="rounded-circle" width="55" ></img>
                                <Col className="d-flex flex-column ms-3">
                                    <span>{friendsUser.firstName} {friendsUser.lastName}</span>
                                    <Col><span className="fw-bold">@{friendsUser.username}</span></Col>
                                </Col>
                            </Col>
                            {/* <Col> <Button className="btn btn-sm ml-5">Follow</Button> </Col> */}
                        </Row>
                    </Card>
                ))}
                <br />

            </Modal.Body>

            <Modal.Footer />

        </Modal>

    )
}
