import '../components/Login.scss';
import { useState } from 'react';
import { LoginSer } from '../service/userService';
import { toast } from 'react-toastify';
const Login = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [IsShowpassword, setIsShowpassword] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            toast.error("email or password is blank");
            return;
        }
        let res = await LoginSer(email, password);
        if (res && res.token) {
            localStorage.setItem("token", res.token)
        }

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
            >Login</button>
        </div >
    </>)
}

export default Login;