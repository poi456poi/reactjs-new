import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
const Header = (props) => {

    const { user, logout } = useContext(UserContext);
    const navigate = useNavigate("");

    const handleLogout = () => {
        logout();
        navigate("/");
    }

    const handleLogin = () => {
        navigate("/Login")
    }

    return (<>
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">Son React Demo</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {(user && user.auth || window.location.pathname === '/') &&
                        <>
                            <Nav className="me-auto">
                                <NavLink to="/" className="nav-link">Home</NavLink>
                                <NavLink to="/usermanager" className="nav-link">User Manager</NavLink>

                            </Nav>
                            <Nav>
                                <NavDropdown title="Setting" id="basic-nav-dropdown">
                                    {user && user.auth === false
                                        ? <NavDropdown.Item onClick={() => handleLogin()}>Login</NavDropdown.Item>
                                        : <NavDropdown.Item onClick={() => handleLogout()}>Logout</NavDropdown.Item>
                                    }
                                </NavDropdown>
                            </Nav>
                        </>
                    }

                </Navbar.Collapse>
            </Container>
        </Navbar></>)
}

export default Header;