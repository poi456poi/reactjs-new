import axios from "./customize-axios";

const fetchAlluser = (page) => {
    return axios.get(`/api/users?page=${page}`);
}
const postCreateUser = (name, job) => {
    return axios.post(`/api/users`, { name, job })
}
const putUpdateUser = (name, job) => {
    return axios.put(`/api/users/`, { name, job })
}
const deleteUser = (id) => {
    return axios.delete(`/api/users/${id}`)
}
const LoginSer = (email, password) => {
    return axios.post(`/api/login`, { email, password })
}
const RegisterSer = (email, password) => {
    return axios.post(`/api/register`, { email, password })
}



export { fetchAlluser, postCreateUser, putUpdateUser, deleteUser, LoginSer, RegisterSer };
