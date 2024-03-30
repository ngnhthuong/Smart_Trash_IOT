import React from "react";
import { useState } from "react";
import "./LoginStyles.css";
export default function Login({ onSignupClick }) {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <div className="main">
      <form className="login">
        <h1 className="login-title">Login</h1>
        <input className="input" type="text" placeholder="username" />
        <input className="input" type="password" placeholder="password" />
        <button className="button">Login</button>
        <p>
          No account?
          <span>
            <a className="register-redirect" onClick={onSignupClick}>
              Register
            </a>
          </span>
        </p>
      </form>
    </div>
  );
}
