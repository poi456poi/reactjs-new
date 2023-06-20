import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { handleLoginRedux } from '../redux/actions/userAction';
import { useDispatch, useSelector } from "react-redux";

import '../assets/Login.scss';
const Login = (props) => {

    const dispatch = useDispatch();
    const navigate = useNavigate("/");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [IsShowpassword, setIsShowpassword] = useState(false);
    const isLoading = useSelector(state => state.user.isLoading);
    const account = useSelector(state => state.user.account);

    const handleLogin = async () => {
        if (!email || !password) {
            toast.error("email or password is blank");
            return;
        }
        dispatch(handleLoginRedux(email, password));

    }
    const handlekeypress = (event) => {
        if (event && event.key === "Enter") {
            handleLogin();
        }
    }
    useEffect(() => {
        if (account && account.auth === true) {
            navigate("/");
        }
    }, [account])
    return (<>
        <div className="login-container col-4">
            <div className="title">Login</div>
            <div className="text">Email or username</div>
            <input
                type="text"
                placeholder="Username or email..."
                value={email}
                onChange={(event) => setEmail(event.target.value)} />
            <div className='input-password'>
                <input type={IsShowpassword ? "text" : "password"}
                    placeholder="Password..."
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    onKeyDown={(event) => handlekeypress(event)} />
                <i onClick={() => setIsShowpassword(!IsShowpassword)} className={IsShowpassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}></i>
            </div>
            <button
                className={email && password ? "active" : ""}
                disabled={email && password ? false : true}
                onClick={() => handleLogin()}
            >{isLoading && <i className="fas fa-circle-notch fa-spin"></i>}&nbsp;Login</button>
        </div >
    </>)
}

export default Login;