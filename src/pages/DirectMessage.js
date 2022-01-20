import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import { AiOutlineSearch } from "react-icons/ai"
import { Link, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import Navbar from "../components/Navbar"
import PostsContext from "../utils/PostsContext"
import "./DirectMessage.css"
export default function DirectMessage() {
    const { receiveId } = useParams()
    const [messages, setMessages] = useState([])
    const { profile } = useContext(PostsContext)



    const getDM = async () => {
      
            const response = await axios.get(`http://localhost:5000/api/conversation/profile/${receiveId}/directMessage`, {
                headers: {
                    Authorization: localStorage.tokenSocial
                },
            })
            setMessages(response.data)
          
        
    }

    useEffect(() => {
        getDM()
    }, [receiveId])

    const postDM = async e => {
        e.preventDefault()
        try {
            const form = e.target

            const messageBody = {
                message: form.elements.message.value
            }
            form.reset()
            await axios.post(`http://localhost:5000/api/conversation/profile/${receiveId}/directMessage`, messageBody, {
                headers: {
                    Authorization: localStorage.tokenSocial
                },
            })
            getDM()
        } catch (error) {
            if (error.response) toast.error(error.response.data)
            else console.log(error)
        }
    }

    if (!profile) return <h1>loading...</h1>

    const friend = profile.friends.find(friend => friend._id == receiveId)
    console.log(friend)
    return (


        <center>

            <Navbar />

            <Row style={{ backgroundColor: "white" }}>
                <Col className="container py-5">

                    <Col className="row ">
                        <Col classname="col-md-12">
                            <Col className="card" id="chat3" style={{ borderRadius: "15px" }}>
                                <Col className="card-body">
                                    <Col className="row">
                                        <Col className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0">
                                            <Col className="p-2">

                                                <Col style={{ position: "relative", height: "650px", overflowY: "auto" }}>
                                                    <ul className="list unstyled mb-0">
                                                        {profile.friends.map(friend => (

                                                            <li className="border-bottom" style={{ listStyle: "none", overflowX: "hidden" }}>
                                                                <Link to={`/direct-message/${friend._id}`} style={{ color: "black", textDecoration: "none" }}>
                                                                    <Row className="d-flex justify-content-between">

                                                                        <Col className="d-flex flex-row" md="2">
                                                                            <img src={friend.avatar} className="rounded-circle" width="60" height="55" />
                                                                        </Col>
                                                                        <Col className="pt-1 m-auto">
                                                                            <span >{friend.firstName} {friend.lastName}</span>
                                                                          
                                                                        </Col>

                                                                    </Row>

                                                                </Link>
                                                            </li>

                                                        ))}
                                                    </ul>
                                                </Col>
                                            </Col>
                                        </Col>





                                        {friend ?

                                            <Col className="col-md-6 col-lg-7 col-xl-8" >
                                                <Link to={`/profile/${friend.username}`} style={{ color: "black", textDecoration: "none" }}>

                                                    <Col className="pt-3 pe-3" >

                                                        <Col className="d-flex flex-row justify-content-start ">
                                                            <img src={friend.avatar} className="rounded-circle " width="60" height="55" />
                                                            <span className="mb-0 ms-3 pt-3">{friend.firstName} {friend.lastName}</span>


                                                        </Col>

                                                    </Col>
                                                </Link>
                                                <hr/>
                                                {/* {friend ? */}
                                                <ul style={{ listStyle: "none", position: "relative", height: "450px", overflowY: "auto" }}>

                                                    {messages.map(message => (

                                                        <>
                                                            {message.sender_id == profile._id ? (
                                                                <li >                                              {/* my message */}
                                                                    <Col className="d-flex flex-row justify-content-start">
                                                                        <img src={profile.avatar} width="35" height="35" className="rounded-circle" />
                                                                        <Col>
                                                                            <p className="small p-2 ms-3 mb-1 rounded-3" style={{ backgroundColor: "#f5f6f7" ,   textAlign: "left" }}>{message.message}</p>
                                                                            <p className="small ms-3 mb-3 rounded-3 text-muted float-end ">{(new Date(message.Date)).toDateString()} {(new Date(message.Date)).toLocaleTimeString()} </p>

                                                                        </Col>
                                                                    </Col>
                                                                </li>
                                                            ) : (
                                                                <li>
                                                                    {/* other message */}

                                                                    <Col className="d-flex flex-row justify-content-end">
                                                                        <Col>
                                                                            <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary" style={{textAlign: "left"}}>
                                                                                {message.message}
                                                                            </p>
                                                                            <p className="small p-2 me-3 mb-1 rounded-3 text-muted"> {(new Date(message.Date)).toDateString()} {(new Date(message.Date)).toLocaleTimeString()}</p>
                                                                        </Col>
                                                                        <img src={friend.avatar} width="35" height="35" className="rounded-circle" />
                                                                    </Col>
                                                                </li>
                                                            )}
                                                        </>


                                                    ))}
                                                </ul>




                                                {/* input message  */}
                                                <Row>
                                                    <Col  className="text-muted d-flex justify-content-center align-items-center pe-3 pt-3 mt-2">
                                                        <Form onSubmit={postDM} style={{width : "100%"}}>

                                                            <input type="textarea" name="message" className="form-control-lg" id="exampleFormControlInput2" placeholder="Type message" style={{width : "90%" }} />
                                                            <Button type="submit">Send</Button>
                                                        </Form>
                                                    </Col>
                                                </Row>



                                            </Col> : null}







                                    </Col>

                                </Col>
                            </Col>
                        </Col>
                    </Col>
                </Col>





            </Row>

        </center>

    )
}

