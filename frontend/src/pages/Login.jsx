import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Callout from "../components/callout/callout.jsx"; // Adjust the path as needed

function Login() {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext); // Removed setAccessToken

    const [values, setValues] = useState({
        username: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState("");

    const handleChange = (e) => {
        setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
        setGeneralError("");
    };

    const validate = () => {
        const newErrors = {};
        if (!values.username) {
            newErrors.username = "Уведіть логін.";
        }
        if (!values.password) {
            newErrors.password = "Уведіть ваш пароль.";
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validate();

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
        } else {
            setErrors({});
            setGeneralError("");
            try {
                await login(values);
                navigate("/");
            } catch (error) {
                const errorMessage =
                    typeof error === "string"
                        ? error
                        : error?.message || "Неправильний логін або пароль.";
                setGeneralError(errorMessage);
                console.error("Caught login error in component:", error);
            }
        }
    };

    const handleLogoClick = () => {
        navigate("/");
    };

    return (
        <div className="auth-form">
            <div className="logo-container">
                <img
                    src="/logo.png"
                    alt="Логотип"
                    className="auth-logo"
                    onClick={handleLogoClick}
                    style={{ cursor: "pointer" }}
                />
            </div>

            {generalError && (
                <div className="general-error">
                    <Callout>{generalError}</Callout>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        className={`auth-input ${errors.username ? "input-error" : ""
                            }`}
                        placeholder="Логін"
                        name="username"
                        onChange={handleChange}
                        value={values.username}
                        aria-invalid={!!errors.username}
                        aria-describedby={
                            errors.username ? "username-error" : undefined
                        }
                    />
                    {errors.username && (
                        <div id="username-error" className="auth-error">
                            {errors.username}
                        </div>
                    )}
                </div>

                <div>
                    <input
                        className={`auth-input ${errors.password ? "input-error" : ""
                            }`}
                        placeholder="Пароль"
                        type="password"
                        name="password"
                        onChange={handleChange}
                        value={values.password}
                        aria-invalid={!!errors.password}
                        aria-describedby={
                            errors.password ? "password-error" : undefined
                        }
                    />
                    {errors.password && (
                        <div id="password-error" className="auth-error">
                            {errors.password}
                        </div>
                    )}
                </div>

                <button type="submit" className="primary-auth-button">
                    Продовжити
                </button>
            </form>

            <div className="or-container">
                <hr />
                <span className="or-text">АБО</span>
                <hr />
            </div>

            <button
                className="secondary-auth-button"
                onClick={() => navigate("/register")}
            >
                Створити обліковий запис
            </button>
        </div>
    );
}

export default Login;
