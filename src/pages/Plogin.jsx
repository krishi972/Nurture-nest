import React from "react";
import "./login.css"
function Login(){
    return(
        <div>
            <div class="card">
        

        <div class=" username">
            <h1 class="head">Login</h1>
            <input type="text" placeholder=" Patient username"/>
        </div>
        <div class="password">
            <input type="text" placeholder="password"/>
        </div>
        <div class="forgot">forget the password?</div>
        <div class="button"></div>
        <button class="login-btn">login</button>
        <br/>
        <div class="sign up">not a member?<span>sign up</span></div>
        </div>
        </div>
    )
}
export default Login;