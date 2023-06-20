import { Routes, Route, Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../assets/Message.scss";
import { useSelector } from "react-redux";

const PrivateRoutes = (props) => {
    const user = useSelector(state => state.user.account);
    const navigate = useNavigate("/");
    if (user && !user.auth) {
        return <>
            <div className="mess">
                You Don't Have Permission To Access!&nbsp;
                <a className="lb-login" onClick={() => navigate("/Register")}>Sign Up</a>&nbsp;or
                <a className="lb-login" onClick={() => navigate("/Login")}>&nbsp;Login</a>&nbsp;
                to Continue
            </div>


        </>

    }

    return (
        <>
            {props.children}
        </>
    )

}

export default PrivateRoutes;