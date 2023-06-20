import Header from './components/Header';
import { Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppRoutes from './routes/AppRoutes';
import { handleRefreshRedux } from './redux/actions/userAction';
import './assets/App.scss'

function App() {
    const dispatch=useDispatch();
    useEffect(()=>{
      if(localStorage.getItem("token")){
        dispatch(handleRefreshRedux());
      }
    },[])
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
