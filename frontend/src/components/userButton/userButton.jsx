import React, { useContext, useState } from "react";
import "./userButton.css";
import { User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";

const UserButton = () => {
    const [open, setOpen] = useState(false);
    const { user, logout } = useContext(AuthContext);

    return user ? (
      <div className="user-button">
        <div
          onClick={() => setOpen((prev) => !prev)}
          className="user-button-img"
        >
          {user.profile_picture ? (
            <img
              src={user.profile_picture}
              alt="Profile"
              className="profile-pic"
            />
          ) : (
            <div className="user-icon-wrapper">
              <User size={24} color="#62636C" />
            </div>
          )}
        </div>

        {open && (
          <div className="user-options">
            <div>
              <Link to="/profile" className="profile-option">
                Профіль <User size={16} />
              </Link>
            </div>
            <hr />
            <div className="log-out-option" onClick={logout}>
              Вийти <LogOut size={16} />
            </div>
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