import { useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import PostsContext from "../utils/PostsContext";

export default function DeleteComment(props) {
  const { deleteComment } = useContext(PostsContext)
  const { show, setShow, postId, commentId } = props
  return (

    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Comment</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure to delete this Comment ?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>
          Cancel
        </Button>
        <Button variant="danger" onClick={() => deleteComment(postId, commentId)}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

