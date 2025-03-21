import {useState} from "react";

const Register = () => {
    const [values, setValues] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
        setErrors(prev => ({ ...prev, [e.target.name]: "" }));
    };

    const validate = () => {
        const newErrors = {};
        if (!values.first_name) {
            newErrors.first_name = "Уведіть ваше ім'я.";
        }

        if (!values.last_name) {
            newErrors.last_name = "Уведіть ваше прізвище.";
        }

        if (!values.email) {
            newErrors.email = "Уведіть вашу адресу електронної пошти.";
        }

        if (!values.password) {
            newErrors.password = "Уведіть ваш пароль.";
        }

        if (!values.confirm_password) {
            newErrors.confirm_password = "Підтвердіть пароль.";
        }

        if (values.password !== values.confirm_password) {
            newErrors.confirm_password = "Пароль не збігається.";
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
                <img src="/logo.png" alt="Логотип" className="auth-logo"/>
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    className={`auth-input ${errors.email ? "input-error" : ""}`}
                    placeholder="Ім'я"
                    name="first_name"
                    onChange={handleChange}
                    value={values.first_name}
                />
                {errors.first_name && <div className="auth-error">{errors.first_name}</div>}

                <input
                    className={`auth-input ${errors.email ? "input-error" : ""}`}
                    placeholder="Прізвище"
                    name="last_name"
                    onChange={handleChange}
                    value={values.last_name}
                />
                {errors.last_name && <div className="auth-error">{errors.last_name}</div>}

                <input
                    className={`auth-input ${errors.email ? "input-error" : ""}`}
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                    value={values.email}
                />
                {errors.email && <div className="auth-error">{errors.email}</div>}

                <input
                    className={`auth-input ${errors.email ? "input-error" : ""}`}
                    placeholder="Пароль"
                    name="password"
                    onChange={handleChange}
                    value={values.password}
                />
                {errors.password && <div className="auth-error">{errors.password}</div>}

                <input
                    className={`auth-input ${errors.email ? "input-error" : ""}`}
                    placeholder="Підтвердіть пароль"
                    name="confirm_password"
                    onChange={handleChange}
                    value={values.confirm_password}
                />
                {errors.confirm_password && <div className="auth-error">{errors.confirm_password}</div>}
                <button type="submit" className="primary-auth-button">Продовжити</button>
            </form>

        </div>
    );
};

export default Register;