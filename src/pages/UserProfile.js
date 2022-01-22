import axios from "axios"
import { Link, useParams } from "react-router-dom"
import { useContext, useEffect, useRef, useState } from "react"
import { Col, Container, Row, Img, Button, Card, Modal } from "react-bootstrap"
import Message from "../components/AddMessage"
import PostsContext from "../utils/PostsContext"
import FollowingModal from "../components/Following"
import FollowersModal from "../components/Followers"
import FriendsModal from "../components/FriendsModal"
import Skeleton from "../components/Skeleton"
import Navbar from "../components/Navbar"




export default function UserProfile() {
  const [show, setShow] = useState(false)
  const [followingModal, setFollowingModal] = useState(false)
  const [followersModal, setFollowersModal] = useState(false)
  const [friendsModal, setFriendsModal] = useState(false)

  const { getFollow, getUnFollow, profile, follow, unFollow, getRequest } = useContext(PostsContext)

  const { username } = useParams()
  const [userProfile, setUserProfile] = useState(null)
  const [notfounderror, setnotfounderror] = useState(null)

  const getProSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/auth/profile/${username}`)
      setUserProfile(response.data)
    } catch (error) {
      if (error.response)
        setnotfounderror(error.response.data)
    }
  }

  useEffect(() => {
    getProSearch()
  }, [profile])

  if (notfounderror) return (
    <center>
      <Skeleton />

      <Modal
        centered
        show={true}
        backdrop="static"
        keyboard={false}
      >

        <Modal.Body>
          {notfounderror}
        </Modal.Body>

      </Modal>
    </center>


  )
  if (!userProfile) return <h1 style={{ display: "flex", justifyContent: "center" }}>Loading...</h1>
  if (!profile) return <h1 style={{ display: "flex", justifyContent: "center" }}>Loading...</h1>
  const userFound = userProfile.followers.find(follower => follower._id === profile._id)
  console.log(userProfile)
  return (

    <center>

      <Navbar />
      <Row className='container mt-3'>
        <Col className='row d-flex  justify-content-center'>
          <Col className="col-md-10">
            <Col className="card  py-4">
              <Col className="text-center"> <img src={userProfile.avatar} width="100" height="95" className="rounded-circle" /></Col>
              <Col className="text-center mt-3">
                <br />
                <h4 className="mt-2 mb-0">{userProfile.firstName} {userProfile.lastName}</h4>
                <br />
                <span className="text-info">@{userProfile.username}</span>
                <Col className="px-4 mt-1 row text-center">
                  <Col className="col-lg-4 col-md-3 m-t-20">
                    {userFound ? <Button className="mt-10 btn btn-primary btn-md " onClick={() => getUnFollow(userProfile._id)} >Unfollow</Button> :
                      <Button className="mt-10 btn btn-primary btn-md " onClick={() => getFollow(userProfile._id)} >Follow</Button>
                    }
                  </Col>
                  <Col className="col-lg-4 col-md-3 m-t-20">
                    {userProfile.friends.find(friend => friend._id == profile?._id) ?
                      <Link to={`/direct-message/${userProfile._id}`}>
                        <Button className="mt-10 btn btn-primary btn-md">Direct Message</Button>
                      </Link>
                      : userProfile.request.find(request => request.sender_id == profile?._id) ?
                        <Button disabled onClick={() => getRequest(userProfile._id)} >Request</Button>
                        : <Button className="mt-10 btn btn-primary btn-md"
                          onClick={() => getRequest(userProfile._id)} >Request</Button>
                    }
                  </Col >
                  <Col className="col-lg-4 col-md-3 m-t-20">
                    <Button className="mt-10 btn btn-primary btn-md " onClick={() => setShow(true)} >Message</Button>
                  </Col>
                </Col>
                <br />
                <Col className="row text-center m-t-20">
                  <Col className="col-lg-4 col-md-6 m-t-20">

                    <button type="button" className="btn btn-link" style={{ textDecoration: "none", color: "black" }} onClick={() => setFollowersModal(true)}>
                      <h3 className="m-b-0 font-light">{userProfile.followers?.length}</h3>
                      <small>Followers</small>
                    </button>

                  </Col>
                  <Col className="col-lg-4 col-md-6 m-t-20">

                    <button type="button" className="btn btn-link" style={{ textDecoration: "none", color: "black" }} onClick={() => setFriendsModal(true)}>
                      <h3 className="m-b-0 font-light">{userProfile.friends?.length}</h3>
                      <small>Friends</small>
                    </button>

                  </Col>
                  <Col className="col-lg-4 col-md-6 m-t-20">
                    <button type="button" className="btn btn-link" style={{ textDecoration: "none", color: "black" }} onClick={() => setFollowingModal(true)}>

                      <h3 className="m-b-0 font-light">{userProfile.following?.length}</h3>
                      <small>Following</small>
                    </button>
                  </Col>
                </Col>
              </Col>
              <Col>
                <Col>
                  <h1 className="mt-5">Posts</h1>

                </Col>
                {userProfile?.posts.map(userPost => (
                  <Link to={`/one-post/${userPost._id}`} style={{ color: "black", textDecoration: "none" }}>
                    <Card style={{ width: '50em' }}>
                      <Card.Body>
                        <Card.Text>
                          {userPost.description}
                        </Card.Text>
                      </Card.Body>
                      <center>
                        <Card.Img variant="bottom" src={userPost.image} style={{ width: "50%", height: "50%", borderRadius: "8px" }} />
                      </center>
                      <br />
                    </Card>
                  </Link>
                ))}
              </Col>

            </Col>
          </Col>
        </Col>
      </Row>
      <Message show={show} setShow={setShow} userProfile={userProfile}></Message>
      <FollowingModal show={followingModal} setShow={setFollowingModal} profile={userProfile}></FollowingModal>
      <FollowersModal show={followersModal} setShow={setFollowersModal} profile={userProfile}></FollowersModal>
      <FriendsModal show={friendsModal} setShow={setFriendsModal} profile={userProfile}></FriendsModal>

    </center>



  )
}