import { useContext, useState } from "react";
import { Row, Form, Button, Col, Modal, Card } from "react-bootstrap";

import PostsContext from "../utils/PostsContext";

export default function Followers(props) {
    const { show, setShow, profile } = props



    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Followers</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ maxHeight: 300, overflowY: "auto", border: "0.5px sollid darkgray" }} >
                {profile?.followers.map(followersUser => (
                    <Card className="mb-3">
                        <Row className=" container d flex justify-content-between my-3 align-items-center">
                            <Col className="d-flex flex-row"> <img src={followersUser.avatar} className="rounded-circle" width="55" ></img>
                                <Col className="d-flex flex-column ms-3">
                                    <span>{followersUser.firstName} {followersUser.lastName}</span>
                                    <Col><span className="fw-bold">@{followersUser.username}</span></Col>
                                </Col>
                            </Col>
                          
                        </Row>
                    </Card>
                ))}
                <br />
            </Modal.Body>

            <Modal.Footer />
        </Modal>

    )
}

