import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Callout from "../components/callout/callout.jsx"; // Вкажіть правильний шлях

const Register = () => {
    const navigate = useNavigate();
    const { register } = useContext(AuthContext);

    const [values, setValues] = useState({
        first_name: "",
        last_name: "",
        username: "",
        password: "",
        confirm_password: "",
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
        if (!values.first_name) {
            newErrors.first_name = "Уведіть ваше ім'я.";
        }
        if (!values.last_name) {
            newErrors.last_name = "Уведіть ваше прізвище.";
        }
        if (!values.username) {
            newErrors.username = "Уведіть ваш логін.";
        }
        if (!values.password) {
            newErrors.password = "Уведіть ваш пароль.";
        }
        if (!values.confirm_password) {
            newErrors.confirm_password = "Підтвердіть пароль.";
        }
        if (values.password && values.confirm_password && values.password !== values.confirm_password) {
            newErrors.confirm_password = "Пароль не збігається.";
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
            try {
                const { confirm_password, ...userInfo } = values; // Exclude confirm_password
                await register(userInfo);
                navigate("/");
            } catch (error) {
                console.error("Registration error:", error);
                if (typeof error === 'object' && error !== null) {
                    if (error.username) {
                        setGeneralError(Array.isArray(error.username)
                            ? error.username.join(" ")
                            : error.username);
                    } else {
                        setGeneralError(error.message || "Щось пішло не так!");
                    }
                } else {
                    setGeneralError(error.toString());
                }
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
                <input
                    className={`auth-input ${errors.first_name ? "input-error" : ""}`}
                    placeholder="Ім'я"
                    name="first_name"
                    onChange={handleChange}
                    value={values.first_name}
                />
                {errors.first_name && <div className="auth-error">{errors.first_name}</div>}

                <input
                    className={`auth-input ${errors.last_name ? "input-error" : ""}`}
                    placeholder="Прізвище"
                    name="last_name"
                    onChange={handleChange}
                    value={values.last_name}
                />
                {errors.last_name && <div className="auth-error">{errors.last_name}</div>}

                <input
                    className={`auth-input ${errors.username ? "input-error" : ""}`}
                    placeholder="Логін"
                    name="username"
                    onChange={handleChange}
                    value={values.username}
                />
                {errors.username && <div className="auth-error">{errors.username}</div>}

                <input
                    className={`auth-input ${errors.password ? "input-error" : ""}`}
                    placeholder="Пароль"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={values.password}
                />
                {errors.password && <div className="auth-error">{errors.password}</div>}

                <input
                    className={`auth-input ${errors.confirm_password ? "input-error" : ""}`}
                    placeholder="Підтвердіть пароль"
                    type="password"
                    name="confirm_password"
                    onChange={handleChange}
                    value={values.confirm_password}
                />
                {errors.confirm_password && (
                    <div className="auth-error">{errors.confirm_password}</div>
                )}

                <button type="submit" className="primary-auth-button">
                    Продовжити
                </button>
            </form>
        </div>
    );
};

export default Register;
