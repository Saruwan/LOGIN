import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css"; // ใช้ไฟล์ CSS ที่จะเพิ่มเพื่อทำให้สวยงาม

const Register = ({ setLoggedIn }) => {
  const navigate = useNavigate();
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const handleRegister = async () => {
    try {
      // Validate form data (add your validation logic here)
      if (!registerName || !registerEmail || !registerPassword) {
        alert("Please fill in all fields.");
        return;
      }
      // Prepare the data to be sent to the server
      const registrationData = {
        name: registerName,
        email: registerEmail,
        password: registerPassword,
      };
      // Make a POST request to your PHP API endpoint
      const response = await fetch("http://localhost/php-login/register.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });
      const data = await response.json();
      if (data.success) {
        // Registration successful
        setLoggedIn(true);

        // Navigate to a page after successful registration, e.g., MyPage
        navigate("/MyPage", { state: { userEmail: registerEmail } });
      } else {
        // Registration failed
        console.error("Registration failed:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="register-container-horizontal">
      <h1>Register</h1>
      <div className="form-horizontal">
        <div className="input-group">
          <label>Name:</label>
          <input
            type="text"
            placeholder="Name"
            value={registerName}
            onChange={(e) => setRegisterName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Email:</label>
          <input
            type="text"
            placeholder="Email"
            value={registerEmail}
            onChange={(e) => setRegisterEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input
            type="password"
            placeholder="Password"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
            required
          />
        </div>
        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
};

export default Register;
