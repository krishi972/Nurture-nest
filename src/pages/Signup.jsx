import React,{useState} from "react";
import "./signup.css"
function Signup(){
    let [patient, setpatient] = useState([]);
    const handlepatient = (event) => {
        let arr = patient; 
        if (arr.includes(event.target.value)) {
          arr.splice(arr.indexof(event.target.value), 1)
        }
        else {
          arr.push(event.target.value)
        }
        setpatient(arr)
      }
    return(
        <div>
            <div class="card">
        

        <div class=" username">
            <h1 class="head">Sign up</h1>
            <input type="text" placeholder=" Enter username"/>
        </div>
        <div class="password">
            <input type="text" placeholder=" Create password"/>
        </div>
        <div class="email">
        <input type="text" placeholder="E-mail address"/></div>
        <br/>
        <input type="checkbox" name="patient" value={"Remember me"} onChange={handlepatient}></input>
        <div class="Remember">Remember me</div><br/><br/>
        <div class="button"></div>
        <button class="btn">Sign up</button>
        <br/>
        </div>
        </div>
    )
}
export default Signup;