import axios from "./customize-axios";


const fetchAlluser = (page) => {
    return axios.get(`/api/users?page=${page}`);
}
const postCreateUser = (name, job) => {
    return axios.post("/api/users", { name, job })
}
export { fetchAlluser,postCreateUser };