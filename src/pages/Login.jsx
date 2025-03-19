import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import "./login.css";

function Login() {
  const [activeTab, setActiveTab] = useState("admin");
  const navigate = useNavigate();  // Initialize navigation

  const handleForgotPassword = () => {
    navigate("/password-recovery");  // Navigate to the recovery page
  };

  return (
    <div className="login-container">
      <div className="button-group">
        <button 
          className={activeTab === "admin" ? "active" : ""} 
          onClick={() => setActiveTab("admin")}
        >
          Admin
        </button>
        <button 
          className={activeTab === "doctor" ? "active" : ""} 
          onClick={() => setActiveTab("doctor")}
        >
          Doctor
        </button>
        <button 
          className={activeTab === "patient" ? "active" : ""} 
          onClick={() => setActiveTab("patient")}
        >
          Patient
        </button>
      </div>

      {["admin", "doctor", "patient"].map((role) => (
        activeTab === role && (
          <div key={role} className="card">
            <h1 className="head">{`${role.charAt(0).toUpperCase() + role.slice(1)} Login`}</h1>
            <input type="text" placeholder={`${role} username`} className="input-field" />
            <input type="password" placeholder="Password" className="input-field" />
            
            <div className="forgot" onClick={handleForgotPassword} style={{ cursor: "pointer", color: "blue" }}>
              Forgot the password?
            </div>

            <button className="login-btn">Login</button>
            <div className="signup">Not a member? <span>Sign up</span></div>
          </div>
        )
      ))}
    </div>
  );
}

export default Login;
