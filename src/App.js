
import { Row } from 'react-bootstrap';
import Home from './components/Home'
import Header from './components/Header';
import TableUsers from './components/TableUser';
import Container from 'react-bootstrap/Container';
import Login from './components/Login';
import { ToastContainer, toast } from 'react-toastify';
import { Routes, Route, Link } from "react-router-dom";
import { useContext, useEffect } from 'react';
import { UserContext } from './context/UserContext';

import './components/App.scss'

function App() {
  const { user, loginContext } = useContext(UserContext);
  console.log(user);

  useEffect(() => {
    if (localStorage.getItem(`token`)) {
      loginContext(localStorage.getItem(`email`), localStorage.getItem(`token`))
    }
  }, [])
  return (
    <>
      <div className='app-container'>
        <Header />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/usermanager" element={<TableUsers />} />
            <Route path="/Login" element={<Login />} />
          </Routes >
        </Container>
      </div>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
