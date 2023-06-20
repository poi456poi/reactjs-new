import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { RegisterSer } from "../service/userService"
import { toast } from 'react-toastify';


const Register = (props) => {
    const navigate = useNavigate("/");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [IsShowpassword, setIsShowpassword] = useState(false);
    const [loadingData, setloadingData] = useState(false);


    const handleRegister = async () => {
        if (!email || !password) {
            toast.error("email or password is blank");
            return;
        }
        setloadingData(true);
        let res = await RegisterSer(email, password);
        console.log(res);
        if (res && res.token) {
            toast.success("Success");
            navigate("/");
        }
        setloadingData(false);
    }
    return (
        <>
            <div className="login-container col-4">
                <div className="title">Sign Up</div>
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
                    onClick={() => handleRegister()}
                >{loadingData && <i className="fas fa-circle-notch fa-spin"></i>}&nbsp;Sign Up</button>
            </div >
        </>
    )
}

export default Register;