import React from "react";
import "./pass.css";

function Login() {
  return (
    <div>
      <div class="card">
      <div class="reset">
            <h1 class="head">Reset password</h1>
          <input type="text" placeholder="Enter new password"/>
          <input type="text" placeholder="confirm new password"/><br/>
          <button class="btn">Reset</button>
        </div>
      </div>
    </div>
  );
}
export default Login;
