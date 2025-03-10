const Register = () => {
    return (
        <div className="auth-form">

            <div className="logo-container">
                <img src="/logo.png" alt="Логотип" className="auth-logo"/>
            </div>

            <input className="auth-input" placeholder="Ім'я"/>
            <input className="auth-input" placeholder="Прізвище"/>
            <input className="auth-input" placeholder="Email"/>
            <input className="auth-input" placeholder="Пароль" type="password"/>
            <input className="auth-input" placeholder="Підтвердіть пароль" type="password"/>

            <div className="auth-checkbox-container">
                <input type="checkbox" id="terms" className="auth-checkbox"/>
                <label htmlFor="terms">
                    Я підтверджую, що ознайомився(-лася) з
                    <a href="/terms" target="_blank"> Умовами користування </a>
                    та
                    <a href="/privacy-policy" target="_blank"> Політикою конфіденційності </a>
                    і погоджуюсь із ними.
                </label>
            </div>


            <button className="primary-auth-button">Продовжити</button>
        </div>
    );
};

export default Register;