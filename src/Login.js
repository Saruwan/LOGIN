import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

export default function Login({ setLoggedIn }) {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    fetch("http://localhost/php-login/login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: loginEmail,
        password: loginPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setLoggedIn(true);
          navigate("/MyPage", { state: { userEmail: loginEmail } });
        } else {
          alert("Login failed. Check your credentials.");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <div className="input-group">
          <span className="input-icon">👤</span>
          <input
            type="text"
            placeholder="Username"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <span className="input-icon">🔒</span>
          <input
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            required
          />
        </div>
        <div className="button-group">
          <button type="submit" className="btn-login">Sign in</button>
          <button type="button" className="btn-register">Register</button>
        </div>
        <div className="options">
          <label>
            <input type="checkbox" /> Remember me
          </label>
          <a href="#">Forgot password?</a>
        </div>
      </form>
    </div>
  );
}
