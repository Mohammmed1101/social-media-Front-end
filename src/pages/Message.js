
import { useContext, useState } from "react";
import { Card, Nav, Button, Col, Row } from "react-bootstrap";

import PostsContext from "../utils/PostsContext";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md"
import NavbarItem from "../components/Navbar";

export default function Message() {

  const { profile, favouriteMessage } = useContext(PostsContext)
  const [message, setMessage] = useState(null)




  return (



    <Row >


      <NavbarItem />



      <Col className="row d-flex justify-content-center mt-3">
        <Card className="col-md-10 p-2" style={{ border: "1px solid gray", borderRadius: "6px" }} >
          <Card.Header style={{ border: "1px solid gray", borderRadius: "6px" }}>
            <Nav >
              <Nav.Item >
                <Button className="nav-link ms-2" variant="light" style={{ color: "black", border: "1px solid gray" }}
                  onClick={() => setMessage("sent")}>Sent
                </Button>
              </Nav.Item>
              <Nav.Item>
                <Button className="nav-link ms-2" variant="light" style={{ color: "black", border: "1px solid gray" }}
                  onClick={() => setMessage("receive")} >Receive
                </Button>
              </Nav.Item>
              <Nav.Item>
                <Button className="nav-link ms-2" variant="light" style={{ color: "black", border: "1px solid gray" }}
                  onClick={() => setMessage("favourite")} >Favourite
                </Button>
              </Nav.Item>
            </Nav>
          </Card.Header>
          <Card.Body>
            {message === ("sent") ? (
              <Col>
                <Card.Title>Sent Message</Card.Title>
                {profile?.sent.map(senTmessage => (
                  <Card.Text style={{ fontSize: "large", height: "40px",border: "1px solid gray", borderRadius: "6px" , width: "fit-content" , blockSize: "fit-content" , margin : "15px" }}>
                   <Col className="container" >
                   {senTmessage.message}
                   </Col> 
                  </Card.Text>
                ))}
              </Col>
            )

              : message === ("receive") ? (
                <Col>
                  <Card.Title>Receive Message</Card.Title>
                  <Col>
                    {profile?.receive.map(recMessage => (
                      <Card.Text style={{ fontSize: "large", height: "60px",border: "1px solid gray", borderRadius: "6px" , width: "fit-content" , blockSize: "fit-content" , margin : "15px" }}>
                        <Col className="container">
                          {recMessage.message} <span className="d-flex  justify-content-end" style={{ fontSize: "25px" }}>
                            {profile?.favourite.find(favourite => favourite._id == recMessage._id) ? <MdFavorite style={{ color: "red" }} onClick={() => favouriteMessage(recMessage._id)} />
                              : <MdFavoriteBorder onClick={() => favouriteMessage(recMessage._id)} />
                            }
                          </span>
                        </Col>
                      </Card.Text>
                    ))}
                  </Col>

                </Col>
              )

                : message === ("favourite") ? (
                  <Col>
                    <Card.Title>Favourite Message</Card.Title>
                    {profile?.favourite.map(favMessage => (
                      <Card.Text style={{ fontSize: "large", height: "40px",border: "1px solid gray", borderRadius: "6px"  , width: "fit-content" , blockSize: "fit-content" , margin : "15px"  }}>
                       
                       <Col className="container">
                        {favMessage.message}
                       </Col>
                      </Card.Text>
                    ))}
                  </Col>
                ) : null
            }
          </Card.Body>
        </Card>


      </Col>

    </Row>


  );
}

