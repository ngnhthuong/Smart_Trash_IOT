import React from "react";
import { useState } from "react";
import "./LoginStyles.css";
import Signup from "../signup/Signup";
export default function Login({ onSignupClick }) {
  const [showLogin, setShowLogin] = useState(true);

  const handleSignupClick = () => {
    setShowLogin(false);
  };

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  return (
    <div className="main">
      {showLogin ? (
        <form className="login">
          <h1 className="login-title">Login</h1>
          <input className="input" type="text" placeholder="username" />
          <input className="input" type="password" placeholder="password" />
          <button className="button">Login</button>
          <p>
            No account?
            <span>
              <a className="register-redirect" onClick={handleSignupClick}>
                Register
              </a>
            </span>
          </p>
        </form>
      ) : (
        <Signup onLoginClick={handleLoginClick} />
      )}
    </div>
  );
}
