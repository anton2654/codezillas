import React from 'react';
import './userButton.css'
import { User } from 'lucide-react';
import { LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

const UserButton = () => {
    const [open, setOpen] = React.useState(false);

    // temp solution for sure
    const currentUser = true;

    return currentUser ? (
        <div className="user-button">
            <div onClick={() => setOpen((prev) => !(prev))}
                 className="user-button-img">
            </div>

            {open && (
                <div className="user-options">
                    <div>
                        <Link to="/profile" className={"profile-option"}> Профіль <User size={16} /> </Link>
                    </div>
                    <hr></hr>
                    <div className="log-out-option">Вийти <LogOut size={16} /></div>
                </div>
            )}
        </div>
    ) : (
        <div className="auth-buttons">
            <Link to="/login">
                <button className="login-button">Увійти</button>
            </Link>
            <Link to="/register">
                <button className="register-button">Зареєструватися</button>
            </Link>
        </div>
    );
};

export default UserButton;