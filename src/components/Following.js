import { useContext, useState } from "react";
import { Row, Form, Button, Col, Modal, Card } from "react-bootstrap";

import PostsContext from "../utils/PostsContext";

export default function Following(props) {
    const { show, setShow, profile } = props


    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Following</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ maxHeight: 300, overflowY: "auto", border: "1px sollid darkgray" }}>


                {profile?.following.map(followingUser => (
                    <Card className="mb-3 overflow" >
                        <Row className=" container d-flex justify-content-between my-3 align-items-center">
                            <Col className="d-flex flex-row"> <img src={followingUser.avatar} className="rounded-circle" width="55" ></img>
                                <Col className="d-flex flex-column ms-3">
                                    <span>{followingUser.firstName} {followingUser.lastName}</span>
                                    <Col><span className="fw-bold">@{followingUser.username}</span></Col>
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
