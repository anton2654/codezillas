import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import Header from "../header/Header.jsx";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const nav = useNavigate();

    useEffect(() => {
        if (!loading && !user) {
            nav('/login');
        }
    }, [loading, user, nav]);

    if (loading) {
        return <Header/>
    }

    if (user) {
        return children;
    }
};

export default PrivateRoute;
