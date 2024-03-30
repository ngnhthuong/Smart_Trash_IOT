import React from "react";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./SignupStyles.css";

export default function Signup({ onLoginClick }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  async function signup(ev) {
    ev.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/buildings/signup",
        {
          username,
          password,
        }
      );
      if (response.status === 201) {
        alert("Registration successful");
        navigate("/");
      }
    } catch (error) {
      console.error("User already exists", error);
      alert("User already exists");
    }
  }

  return (
    <div className="main">
      <form className="login" onSubmit={signup}>
        <h1 className="login-title">Sign up</h1>
        <input
          className="input"
          type="text"
          placeholder="username"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
        />
        <input
          className="input"
          type="password"
          placeholder="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button className="button">Sign up</button>
        <div>
          <p>
            Already have an account?
            <span>
              <a className="register-redirect" onClick={onLoginClick}>
                Login
              </a>
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}
