import React from "react";

export default function Login() {
  return (
    <form className="login" onSubmit={login}>
      <h1 className="login-title">Login</h1>
      <input
        type="text"
        placeholder="username"
        //   value={username}
        //   onChange={(ev) => setUsername(ev.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        //   value={password}
        //   onChange={(ev) => setPassword(ev.target.value)}
      />
      <button>Login</button>
      <p>
        No account?
        <span>
          <a className="register-redirect" onClick={onRegisterClick}>
            Register
          </a>
        </span>
      </p>
    </form>
  );
}
