import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useLocation, NavLink } from "react-router-dom";
const Header = (props) => {
    
    return (<>
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">Son React Demo</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/" className="nav-link">Home</NavLink>
                        <NavLink to="/usermanager" className="nav-link">User Manager</NavLink>

                    </Nav>
                    <Nav>
                        <NavDropdown title="Setting" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/Login">Login</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.1">Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar></>)
}

export default Header;