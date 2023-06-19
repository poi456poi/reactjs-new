import '../components/Login.scss';
import { useState, useContext } from 'react';
import { LoginSer } from '../service/userService';
import { toast } from 'react-toastify';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {

    const { loginContext } = useContext(UserContext);
    const navigate = useNavigate("/");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [IsShowpassword, setIsShowpassword] = useState(false);
    const [loadingData, setloadingData] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            toast.error("email or password is blank");
            return;
        }
        setloadingData(true);
        let res = await LoginSer(email, password);
        console.log(res);
        if (res && res.token) {
            loginContext(email, res.token);
            toast.success("Welcome");
            navigate("/");
        } else {
            //error
            if (res && res.status === 400) {
                toast.error(res.data.error)
            }
        }
        setloadingData(false);

    }
    return (<>
        <div className="login-container col-4">
            <div className="title">Login</div>
            <div className="text">UserName or Email</div>
            <input
                type="text"
                placeholder="Username or email..."
                value={email}
                onChange={(event) => setEmail(event.target.value)} />
            <div className='input-password'>
                <input type={IsShowpassword ? "text" : "password"}
                    placeholder="Password..."
                    value={password}
                    onChange={(event) => setPassword(event.target.value)} />
                <i onClick={() => setIsShowpassword(!IsShowpassword)} className={IsShowpassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}></i>
            </div>
            <button
                className={email && password ? "active" : ""}
                disabled={email && password ? false : true}
                onClick={() => handleLogin()}
            >{loadingData && <i className="fas fa-circle-notch fa-spin"></i>}&nbsp;Login</button>
        </div >
    </>)
}

export default Login;