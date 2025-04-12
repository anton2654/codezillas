import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const nav = useNavigate();

    useEffect(() => {
        if (!loading && !user) {
            nav('/login');
        }
    }, [loading, user, nav]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (user) {
        return children;
    }
};

export default PrivateRoute;
