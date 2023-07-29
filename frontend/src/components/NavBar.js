import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const NavBar = () => {

  const name = "Gymkhana Elections";

  return (
    <Navbar expand="md">
      <Container fluid>
        <LinkContainer to="/"><Navbar.Brand className="namelogo">{name}</Navbar.Brand></LinkContainer>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="ms-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <LinkContainer to="/"><Nav.Link className="navbar-link">Home</Nav.Link></LinkContainer>
            <LinkContainer to="/Register"><Nav.Link className="navbar-link">Register</Nav.Link></LinkContainer>
            <LinkContainer to="/Results"><Nav.Link className="navbar-link">Result</Nav.Link></LinkContainer>
            <LinkContainer to="/contact"><Nav.Link className="navbar-link">Contact</Nav.Link></LinkContainer>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar;