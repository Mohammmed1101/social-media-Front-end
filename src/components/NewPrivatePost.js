import { useContext } from "react"
import { Col, FloatingLabel, Form, Row, Button } from "react-bootstrap"
import { BiImageAdd } from "react-icons/bi"
import PostsContext from "../utils/PostsContext"

export default function NewPrivatePost() {
 
    const { addPostPrivate } = useContext(PostsContext)
    return (

        <Row className="container ms-5 mb-3 mt-2" >
            <Col className="d-flex justify-content-center row" >
                <Col className="col-md-8" >
                    <Form onSubmit={addPostPrivate}>
                        <FloatingLabel controlId="floatingTextarea2" label="Add Post" style={{ marginLeft: "50px" }} >
                            <Form.Control
                                as="textarea"
                                placeholder="Leave a comment here"
                                style={{ height: '150px' }}
                                name="description"
                                required
                            />
                        </FloatingLabel>
                        <Col style={{ marginLeft: "50px" }}>
                            <Form.Control

                                placeholder="Add image"
                                style={{ height: '50px' }}
                                name="image"
                                type="url"
                             
                            />

                        </Col>

                        <Col >
                            <Col className="border bg-white" style={{ marginLeft: "50px" }}>
                                <Col className="d-flex flex-row justify-content-between border-top" >
                                    <Col className="d-flex flex-row">


                                      

                                    </Col>
                                    <Col >
                                        <Col className="align-items-center p-2 px-5 btn ">
                                            <Button variant="primary" type="submit" style={{ marginLeft: "140px" }}>
                                                publish
                                            </Button>

                                        </Col>
                                    </Col>
                                </Col>

                            </Col>
                        </Col>
                    </Form>
                </Col>
            </Col>
        </Row>



    )
}