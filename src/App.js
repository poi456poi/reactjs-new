import Header from './components/Header';
import { Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import AppRoutes from './routes/AppRoutes';
import './assets/App.scss'

function App() {

  return (
    <>
      <div className='app-container'>
        <Header />
        <Container>
          <AppRoutes />
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
