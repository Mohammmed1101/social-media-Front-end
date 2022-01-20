import { Container, NavbarBrand , Navbar } from "react-bootstrap"
import { Link } from "react-router-dom"
import {AiFillHome} from "react-icons/ai"
export default function NavbarItem() {

  return (  


    <Navbar bg="primary" variant="dark" expand="lg">
    <Container>
      <Link to="/" className="navbar-brand me-auto"><AiFillHome/></Link>
    </Container>
      </Navbar>

  )
}