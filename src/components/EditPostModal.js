import { useContext, useState } from "react"
import { Button, Col, Form, Modal, Row } from "react-bootstrap"
import PostsContext from "../utils/PostsContext"

export default function EditPostModal(props) {
  const { show, setShow, post } = props
  const { confirmEditPost } = useContext(PostsContext)
  if (!post) return null
  return (
    <Modal show={show} onHide={() => setShow(true)}>
      <Form className="mt-5" onSubmit={e => {
        confirmEditPost(e, post._id)
        setShow(false)
      }}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column md="3">

              Description
            </Form.Label>
            <Col md="8">
              <Form.Control as="textarea" name="description" defaultValue={post.description} required />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column md="3">
              Image
            </Form.Label>
            <Col md="8">
              <Form.Control type="url" name="image" defaultValue={post.image}  />
            </Col>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="success" type="submit" >
            Edit Post
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

