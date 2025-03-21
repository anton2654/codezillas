import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
        setErrors(prev => ({ ...prev, [e.target.name]: "" }));
    };

    const validate = () => {
        const newErrors = {};
        if (!values.email) {
            newErrors.email = "Уведіть вашу адресу електронної пошти.";
        }

        if (!values.password) {
            newErrors.password = "Уведіть ваш пароль.";
        }
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validate();

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
        } else {
            setErrors({});
            console.log(values);
        }
    };

    return (
        <div className="auth-form">
            <div className="logo-container">
                <img src="/logo.png" alt="Логотип" className="auth-logo" />
            </div>

            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        className={`auth-input ${errors.email ? "input-error" : ""}`}
                        placeholder="Email"
                        name="email"
                        onChange={handleChange}
                        value={values.email}
                    />
                    {errors.email && <div className="auth-error">{errors.email}</div>}
                </div>

                <div>
                    <input
                        className={`auth-input ${errors.password ? "input-error" : ""}`}
                        placeholder="Пароль"
                        type="password"
                        name="password"
                        onChange={handleChange}
                        value={values.password}
                    />
                    {errors.password && <div className="auth-error">{errors.password}</div>}
                </div>

                <div className="need-help-link">
                    <a className="need-help-link" href="/help">Забули пароль?</a>
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
                onClick={() => navigate("/register")}>
                Створити обліковий запис
            </button>
        </div>
    );
}

export default Login;
