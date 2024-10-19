import React from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

const Logout = ({ setLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement your logic for logging out, such as clearing authentication tokens, etc.
    setLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="logout-container">
      <div className="logout-box">
        <h1>Are you sure you want to logout?</h1>
        <button className="btn-logout" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Logout;
