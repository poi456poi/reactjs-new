import { Routes, Route, Link } from "react-router-dom";
import Home from '../components/Home';
import TableUsers from '../components/TableUser';
import Login from '../components/Login';
import PrivateRoutes from "./PrivateRoutes";
import Register from "../components/Register";
import NotFound from "../components/Register";

const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/usermanager" element={
                    <PrivateRoutes>
                        <TableUsers />
                    </PrivateRoutes>
                }></Route>
                <Route path="*" element={<NotFound />} />
            </Routes >

        </>
    )
}

export default AppRoutes;