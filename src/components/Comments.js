import { useContext, useEffect, useState } from "react";
import PostsContext from "../utils/PostsContext";
import BootstrapMenu from "bootstrap-menu";
import { Col } from "react-bootstrap";
import { VscEllipsis } from "react-icons/vsc";
import DeleteCommentModal from "./DeleteCommentModal"
import { useParams } from "react-router-dom";
export default function Comments(props) {

    const { commentPost, commentId, postId } = props

    const [commentDelShow, setCommentDelShow] = useState(false)

    useEffect(() => {
        const menu2 = new BootstrapMenu('#menu-posts1', {
            menuEvent: 'click', // default value, can be omitted
            // menuSource: 'element',
            menuPosition: 'belowLeft', // default value, can be omitted
            actions: [{
                name: 'Delete',
                onClick: () => setCommentDelShow(true)
            }]
        })

}, [])



return (
    <Col>

        <Col className="d-flex flex-row mb-2"><img src={commentPost?.owner.avatar}
            width="40" height="40" className="rounded-circle" />
            <Col className="d-flex flex-column ml-2"><span
                style={{ fontWeight: "600" }}>{commentPost?.owner.username}</span>
                <small style={{ fontSize: "15px" }}> {commentPost?.comment} </small>
                <span> <VscEllipsis id="menu-posts1" /> </span>

            </Col>
        </Col>
        <DeleteCommentModal show={commentDelShow} setShow={setCommentDelShow}
            postId={commentPost.poster} commentId={commentPost._id} />
    </Col>
)
}

