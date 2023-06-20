import { toast } from 'react-toastify';
import { LoginSer } from '../../service/userService';




export const FETCH_USER_LOGIN = "FETCH_USER_LOGIN";
export const FETCH_USER_ERROR = "FETCH_USER_ERROR";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";

export const USER_LOGOUT = "USER_LOGOUT";


export const handleLoginRedux = (email, password) => {
    return async (dispatch, getstate) => {
        dispatch({ type: FETCH_USER_LOGIN });
        let res = await LoginSer(email.trim(), password);
        if (res && res.token) {
            localStorage.setItem('token', res.token);
            localStorage.setItem('email', res.email);
            dispatch({
                type: FETCH_USER_SUCCESS,
                data: { email: email.trim(), token: res.token }
            })

        } else {
            //error
            if (res && res.status === 400) {
                toast.error(res.data.error)
            }
            dispatch({
                type: FETCH_USER_ERROR,
            })
        }
    }
}

export const handleLogoutRedux = () => {
    return (dispatch, getstate) => {
        dispatch({
            type: USER_LOGOUT
        })
    }
}