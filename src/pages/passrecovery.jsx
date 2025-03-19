import React from "react";
import { useNavigate } from "react-router-dom";

function PasswordRecovery() {
  const navigate = useNavigate();
  const handleSubmit = () => {
    alert("Password reset link sent!");
    navigate("/");  // Redirect to Login page after submission
  };
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Password Recovery</h1>
      <p>Please enter your email to reset your password.</p>
      <input type="email" placeholder="Enter your email" style={{ padding: "10px", margin: "10px", width: "300px" }} />
      <br />
      <button   onClick={handleSubmit} style={{ padding: "10px 20px", backgroundColor: "blue", color: "white", border: "none", cursor: "pointer" }}>
        Submit
      </button>
    </div>
  );
}

export default PasswordRecovery;
