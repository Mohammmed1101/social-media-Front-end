import { useContext } from "react";
import { Button, Col, Form } from "react-bootstrap";
import PostsContext from "../utils/PostsContext";

export default function AddComment(props) {
    const { addComment, posts } = useContext(PostsContext)
    const { postId } = props


    return (
        <Col>
            <Form onSubmit={e => addComment(e, postId)}>
                <Col className="d-flex flex col">
                    <Form.Control type="text" name="comment" placeholder="New Comment..." />
                    <Button className=" ms-3" type="submit" >share</Button>
                </Col>
            </Form>
        </Col>

    )
}