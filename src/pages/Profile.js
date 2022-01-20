import { useContext, useState } from "react"
import { Col, Container, Row, Button, Card, Tabs, Tab } from "react-bootstrap"
import PostsContext from "../utils/PostsContext"
import FollowingModal from "../components/Following"
import FollowersModal from "../components/Followers"
import Navbar from "../components/Navbar"
import FriendsModal from "../components/FriendsModal"
import EditProfile from "../components/EditProfile"
import { Link } from "react-router-dom"



export default function Profile() {
  const { profile } = useContext(PostsContext)
  const [followingModal, setFollowingModal] = useState(false)
  const [followersModal, setFollowersModal] = useState(false)
  const [editProf, setEditProf] = useState(false)
  const [friendsModal, setFriendsModal] = useState(false)
  if (!profile) return <h1>Loading...</h1>
  return (


    <center>
      <Navbar />
      <Row className='container'>
        <Col className='row d-flex  justify-content-center '>
          <Col className="col-md-10">
            <Col className="card  py-4">
              <Col className="text-center"> <img src={profile.avatar} width="100" height="90" className="rounded-circle" /></Col>
              <Col className="text-center mt-3">
                <br />
                <h4 className="mt-2 mb-0">{profile.firstName} {profile.lastName}</h4>
                <br />
                <Col >
                <Button  variant="outline-dark" onClick={() => setEditProf(true)}>Edit Profile</Button>
                </Col>
                <span className="text-info">@{profile.username}</span>
                <Col className="row text-center m-t-20">
                  <Col className="row text-center m-t-20">
                    <Col className="col-lg-4 col-md-6 m-t-20">

                      <button type="button" className="btn btn-link" style={{ textDecoration: "none", color: "black" }} onClick={() => setFollowersModal(true)}>
                        <h3 className="m-b-0 font-light">{profile.followers?.length}</h3>
                        <small>Followers</small>
                      </button>

                    </Col>



                    <Col className="col-lg-4 col-md-6 m-t-20">

                    <button type="button" className="btn btn-link" style={{ textDecoration: "none", color: "black" }} onClick={() => setFriendsModal(true)}>
                      <h3 className="m-b-0 font-light">{profile.friends?.length}</h3>
                      <small>Friends</small>
                    </button>

                  </Col>
                    <Col className="col-lg-4 col-md-6 m-t-20">
                      <button type="button" className="btn btn-link" style={{ textDecoration: "none", color: "black" }} onClick={() => setFollowingModal(true)}>

                        <h3 className="m-b-0 font-light">{profile.following?.length}</h3>
                        <small>Following</small>
                      </button>
                    </Col>
                  </Col>
                </Col>
              </Col>
            </Col>
            <Col>
         


              <br />
              {/* posts */}
              <Col>

                <h1 className="mt-5">Posts</h1>
              </Col>
            
              {profile?.posts.map(myPosts => (
                <Link to={`/one-post/${myPosts._id}`} style={{ color: "black", textDecoration: "none" }}>
                <Card style={{ width: '50em' }}>
                  <Card.Body>
                    <Card.Text>
                      {myPosts.description}
                    </Card.Text>
                  </Card.Body>
                  <center>
                    <Card.Img variant="bottom" src={myPosts.image} style={{ width: "50%", height: "50%", borderRadius: "8px" }} />
                  </center>
                  <br />
                </Card>
                </Link>
))}



            </Col>
          </Col>
        </Col>
      </Row>
      <FollowingModal show={followingModal} setShow={setFollowingModal} profile={profile}></FollowingModal>
      <FollowersModal show={followersModal} setShow={setFollowersModal} profile={profile}></FollowersModal>
      <FriendsModal show={friendsModal} setShow={setFriendsModal} profile={profile}></FriendsModal>
      <EditProfile show={editProf} setShow={setEditProf} profile={profile._id} />
    </center>
  )
}


