import React from "react";

export default function Login() {
  return (
    <form className="login">
      <h1 className="login-title">Login</h1>
      <input type="text" placeholder="username" />
      <input type="password" placeholder="password" />
      <button>Login</button>
      <p>
        No account?
        <span>
          <a className="register-redirect">Register</a>
        </span>
      </p>
    </form>
  );
}
