import { useContext } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { MdFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { Link } from "react-router-dom";
import PostsContext from "../utils/PostsContext";
import AddComment from "./AddComment";



export default function AllPrivatePosts() {
    const { privatePosts, postLike, profile } = useContext(PostsContext)


    return (



        <center>
            <Row className="container mt-3" >
                <Col className="row d-flex align-items-center justify-content-center">
                    <Col className="col-md-6 ">
                        {privatePosts?.map(post => {
                            const comment = post?.comments?.length > 0 ? post.comments[post.comments.length - 1] : null
                            const liked = post?.likes.find(like => like._id == profile?._id)
                            return (
                                <Col className="card mb-3" >
                                    <Col className="d-flex justify-content-between p-2 px-3">
                                        <Link to={`/profile/${post.owner?.username}`} style={{ color: "black", textDecoration: "none" }}>
                                            <Col className="d-flex flex-row align-items-center">

                                                <img src={post.owner?.avatar} width="50" height="50" className="rounded-circle" />

                                                <Col className="d-flex flex-column" >
                                                    <span className="font-weight-bold  ms-3">{post.owner?.firstName} {post.owner?.lastName}</span>
                                                    <Col>
                                                        <span className=" ms-1" style={{ color: "gray" }}>@{post.owner?.username}</span>
                                                    </Col>
                                                </Col>
                                                <Col className="d-flex flex-row me-10 mt-1" style={{ flexGrow: "revert" }}>
                                                </Col>

                                            </Col>
                                        </Link>
                                    </Col>
                                    <hr />
                                    <Col>
                                        <Link to={`/one-post/${post._id}`} style={{ color: "black", textDecoration: "none" }}>
                                            <img src={post?.image} className="container" />
                                            <Col className="p-3" >
                                                <p className="container text-justify" >{post?.description}</p>
                                                <br />
                                            </Col>
                                        </Link>
                                        <hr />
                                        <Col className="d-flex justify-content-between align-items-center" >
                                            <Col className="d-flex flex-row icons d-flex align-tems-center" >

                                                {liked ?
                                                    <MdFavorite className="ms-3" onClick={() => postLike(post._id)} style={{ fontSize: "30px", color: "red" }} /> :
                                                    <MdOutlineFavoriteBorder onClick={() => postLike(post._id)} style={{ fontSize: "30px" }} />
                                                }
                                                <span className="m-auto">{post.likes?.length} Likes</span>
                                                <Link to={`/one-post/${post._id}`} style={{ color: "black", textDecoration: "none" }}>
                                                    <FaRegComment size="30px" />
                                                </Link>
                                            </Col>
                                            <Col className="d-flex flex-row muted-color" >

                                                <span className="m-auto">{post.comments?.length} comments</span>
                                            </Col>
                                        </Col>
                                        <hr />
                                        <br />

                                        <Col>
                                            {comment ?
                                                <Col className="d-flex flex-row mb-2"><img src={comment?.owner?.avatar} width="40" height="40" className="rounded-circle" />
                                                    <Col className="d-flex flex-column ml-2"><span style={{ fontWeight: "600" }}>{comment?.owner?.username}</span>
                                                        <small style={{ fontSize: "15px" }}> {comment?.comment}</small>

                                                    </Col>
                                                </Col>
                                                : null}
                                        </Col>
                                        <AddComment postId={post._id} />


                                    </Col>
                                </Col>
                            )
                        })}
                    </Col>
                </Col>
            </Row >

        </center >)
}

