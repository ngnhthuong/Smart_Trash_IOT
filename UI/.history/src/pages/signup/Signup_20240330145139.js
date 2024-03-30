import React from "react";
import "./SignupStyles.css";
export default function Signup() {
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
            <a className="register-redirect">Sign up</a>
          </span>
        </p>
      </form>
    </div>
  );
}
