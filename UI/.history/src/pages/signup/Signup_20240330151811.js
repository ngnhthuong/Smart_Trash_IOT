import React from "react";
import "./SignupStyles.css";
export default function Signup({ onLoginClick }) {
  return (
    <div className="main">
      <form className="login">
        <h1 className="login-title">Sign up</h1>
        <input className="input" type="text" placeholder="username" />
        <input className="input" type="password" placeholder="password" />
        <button className="button">Sign up</button>
        <p>
          Already have an account?
          <span>
            <a className="register-redirect" onClick={onLoginClick}>
              Login
            </a>
          </span>
        </p>
      </form>
    </div>
  );
}
