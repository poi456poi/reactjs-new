import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleLogoutRedux } from '../redux/actions/userAction';
import "../assets/Header.scss"
const Header = (props) => {

    const user = useSelector(state => state.user.account);
    const dispatch = useDispatch();
    const navigate = useNavigate("");

    const handleLogout = () => {
        dispatch(handleLogoutRedux());
        // logout();
        // navigate("/");
    }

    const handleLogin = () => {
        navigate("/Login")
    }
    const handleRegister = () => {
        navigate("/Register")
    }
    useEffect(() => {
        if (user && user === false) {
            navigate("/");
        }
    }, [user])

    return (<>
        <Navbar className="headertop col-6 " bg="light" expand="lg">
            <Container>
                <i className="logo fa-brands fa-react"></i>
                <Navbar.Brand href="/"><h4>React Demo</h4></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {(user && user.auth || window.location.pathname === '/' || window.location.pathname === '/Register') &&
                        <>
                            <Nav className="me-auto">
                                <NavLink to="/" className="nav-link">Home</NavLink>
                                <NavLink to="/usermanager" className="nav-link">User Manager</NavLink>

                            </Nav>
                            <Nav>
                                {(user && user.email) && <p className='nav-link'>Welcome {user.email} </p>}
                                <NavDropdown title="Setting" id="basic-nav-dropdown" className='setting-dropdown' >
                                    {user && !user.auth
                                        ? <><NavDropdown.Item onClick={() => handleLogin()}>Login</NavDropdown.Item>
                                            <NavDropdown.Item onClick={() => handleRegister()}>Register</NavDropdown.Item></>
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