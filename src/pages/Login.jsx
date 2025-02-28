import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    return (
        <div className="auth-form">

            <div className="logo-container">
                <img src="/logo.png" alt="Логотип" className="auth-logo" />
            </div>

            <input className="auth-input" placeholder="Email"/>
            <input className="auth-input" placeholder="Пароль" type="password"/>
            <a className="need-help-link" href="/help">Забули пароль?</a>
            <button className="primary-auth-button">Продовжити</button>

            <div className="or-container">
                <hr/>
                <span className="or-text">АБО</span>
                <hr/>
            </div>

            <button className="secondary-auth-button"
                    onClick={() => navigate("/register")}>Створити обліковий запис</button>
        </div>
    )
}

export default Login
