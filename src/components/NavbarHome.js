import { Container, NavbarBrand, Navbar, Form, Button, FormControl, Row, Col, OverlayTrigger, Popover, Card, Overlay } from "react-bootstrap"
import { Link } from "react-router-dom"
import { AiFillHome, AiOutlineUserAdd, AiOutlineUserDelete } from "react-icons/ai"
import { FaUserCircle, FaUserClock } from "react-icons/fa"
import { ImCheckmark2 } from "react-icons/im"
import { BsBookmarkX, BsFileEarmarkCheck, BsSearch } from "react-icons/bs"
import { useContext, useState } from "react"
import PostsContext from "../utils/PostsContext"


export default function NavbarHome(props) {

  const { usernameSearch, getRequest, getRequestAccept, getRequestReject, profile } = useContext(PostsContext)



  // const receive = request.receive_id?.find(r => r == r._id)
  const popover = (
    <Popover id="popover-basic" >

      <Popover.Header as="h3">Request</Popover.Header>
      <Popover.Body>
        {profile?.request.map(requestP => (
      
          < Card className = "mb-1" >
          <Row className="container d flex justify-content-between my-3 align-items-center">

            <Col className="d-flex flex-row">


              <img src={requestP.response_id.avatar} className="rounded-circle h-4" width="40" />
            </Col>
            <Col className="d-flex flex-column ms-1">
              <span>{requestP.response_id.firstName} {requestP.response_id.lastName}</span>
              @{requestP.response_id.username}

            </Col>
            <Col className="d-flex flex-row justify-content-between">

              <Button variant="outline-success" className="btn btn-link" style={{ textDecoration: "none", color: "black" }} onClick={() => getRequestAccept(requestP._id)}>
                <BsFileEarmarkCheck style={{ color: "gray" }} />
              </Button>
              <br />
              <Button variant="outline-danger" className="btn btn-link" style={{ textDecoration: "none", color: "black" }} onClick={() => getRequestReject(requestP._id)}>
                <BsBookmarkX style={{ color: "gray" }} />
              </Button>
            </Col>


          </Row>
          </Card>
        ))}
    </Popover.Body>

    </Popover >
  );


  return (


    <Navbar sticky="top" bg="primary" variant="dark" expand="lg">

      <Container>
        {/* Home */}

        <Link to="/" className="navbar-brand d-flex align-items-center me-auto"><AiFillHome /></Link>

        <OverlayTrigger trigger="click" placement="bottom" overlay={popover} containerPadding={20}>
          <Button><FaUserClock /></Button>
        </OverlayTrigger>

        {/* search */}
        <Form className="d-flex align-items-center m-auto" style={{ width: "60%", height: "40px" }} onSubmit={usernameSearch}>
          <FormControl
            type="search"
            placeholder="Search by username..."
            name="userNameSearch"
            aria-label="Search"
            spellCheck="false"
            style={{ borderRadius: "30px" }}
          />
          <Button className="btn btn-link" style={{ textDecoration: "none", color: "white" }} ><BsSearch /></Button>
        </Form>


        {/* profile */}
        <Link to="/profile">
          <FaUserCircle style={{ color: "white", textDecoration: "none", fontSize: '25px' }} />
        </Link>



        {/* <Button onClick={handleOverlay}> <FaUserClock /></Button> */}


      </Container>
    </Navbar>
  )
}

