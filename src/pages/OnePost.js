import { Button, Card, Col, Row } from "react-bootstrap";
import { FaEllipsisV, FaRegComment } from "react-icons/fa"
import { IoEllipsisHorizontal } from "react-icons/io"
import { AiOutlineHeart } from "react-icons/ai"
import { useContext, useEffect, useState } from "react";
import BootstrapMenu from "bootstrap-menu";
import PostsContext from "../utils/PostsContext";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import EditPostModal from "../components/EditPostModal";
import DeletePostModal from "../components/DeletePostModal";
import AddComment from "../components/AddComment";
import Comments from "../components/Comments"
import { MdFavorite, MdOutlineFavoriteBorder } from "react-icons/md"
import "./OnePost.css"
import NavbarItem from "../components/Navbar";


export default function OnePost() {

    const [editShow, setEditShow] = useState(false)
    const [deleteShow, setDeleteShow] = useState(false)
    const [postOne, setPostOne] = useState()
    const [errorOnePost, setErrorOnePost] = useState(null)
    const { deletePost, posts, profile, postLike } = useContext(PostsContext)
    const { postId } = useParams()


    const liked = postOne?.likes.find(like => like._id == profile?._id)

    console.log(liked)
    const getOnePost = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/posts/${postId}`)
            setPostOne(response.data)

        } catch (error) {
            if (error.response)
                setErrorOnePost(error.response.data)
            setPostOne(null)
        }
    }


    useEffect(() => {
        const menu1 = new BootstrapMenu('#menu-posts', {
            menuEvent: 'click', // default value, can be omitted
            // menuSource: 'element',
            menuPosition: 'belowLeft', // default value, can be omitted
            actions: [{
                name: 'Edit',
                onClick: () => setEditShow(true)
            }, {
                name: 'Delete',
                onClick: () => setDeleteShow(true)


            }]
        })
        getOnePost()

    }, [posts])
    if (postOne === null) return <h1>post not found</h1>

    return (
        <center>

            <NavbarItem />
            <Row className="container my-5" >
                <Col className="row d-flex align-items-center justify-content-center">
                    <Col className="col-md-6">
                        <Col className="card" >
                            <Col className="d-flex justify-content-between p-2 px-3">
                                <Col className="d-flex flex-row align-items-center">
                                    <Link to={`/profile/${postOne?.owner?.username}`} style={{ color: "black", textDecoration: "none" }}>
                                        <img src={postOne?.owner.avatar} width="50" height="50" className="rounded-circle" />
                                    </Link>
                                    <Col className="d-flex flex-column ml-2" >
                                        <Link to={`/profile/${postOne?.owner?.username}`} style={{ color: "black", textDecoration: "none" }}>
                                            <span className="font-weight-bold">{postOne?.owner.firstName} {postOne?.owner.lastName}</span>
                                        </Link>
                                    </Col>
                                    <Col className="d-flex flex-row me-10 mt-1" style={{ flexGrow: "revert" }}>

                                        <FaEllipsisV id="menu-posts" />

                                    </Col>
                                </Col>
                            </Col>
                            <hr />
                            <img src={postOne?.image} className="container img-fluid" />
                            <Col className="p-3" >
                                <p className="container text-justify" >{postOne?.description}</p>
                                <hr />
                                <Col className="d-flex justify-content-between align-items-center" >
                                    <Col className="d-flex flex-row icons d-flex align-tems-center" >
                                        {liked ? <MdFavorite className="ms-3" onClick={() => postLike(postOne?._id)}
                                            style={{ fontSize: "30px", color: "red" }} />
                                            : <MdOutlineFavoriteBorder
                                                className="ms-3" onClick={() => postLike(postOne?._id)} style={{ fontSize: "30px" }} />}
                                        <span className="m-auto">{postOne?.likes.length} Likes</span>
                                        <FaRegComment size="30px" /></Col>
                                    <Col className="d-flex flex-row muted-color" >

                                        <span className="m-auto">{postOne?.comments.length} comments</span>

                                    </Col>
                                </Col>
                                <hr />
                                <Col>
                                    {postOne?.comments.map(commentPost => (
                                        <Col>
                                            <Comments commentPost={commentPost} />
                                        </Col>

                                    ))}
                                </Col>
                                <AddComment postId={postId} />
                            </Col>
                        </Col>
                    </Col>
                </Col>
            </Row>

            <EditPostModal show={editShow} setShow={setEditShow} post={postOne} />
            <DeletePostModal show={deleteShow} setShow={setDeleteShow} postId={postId} />
        </center>
    )

}

