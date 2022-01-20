import { useContext } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import PostsContext from "../utils/PostsContext"


export default function EditProfile(props) {
    const { show, setShow } = props
    const { editProfile, profile } = useContext(PostsContext)



    return (


        <Modal show={show} onHide={() => setShow(false)} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Form onSubmit={e => {
                editProfile(e, profile._id)
                setShow(false)
            }}>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Avatar</Form.Label>
                        <Form.Control type="url" name="avatar" defaultValue={profile.avatar} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" name="firstName" defaultValue={profile.firstName} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" name="lastName" defaultValue={profile.lastName} />
                    </Form.Group>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit">
                        Edit Profile
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal >

    )
}





