import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./Login.css";
import Alogin from "./Alogin";
//import Form1 from "./Form1";
import Dlogin from "./Dlogin";
// import Setdata from "./setdata";

function App() {
  return (
    <div>
      <BrowserRouter>
        <div style={{ backgroundColor: "lightpink", width: 150, height: 25 }}>
          <div style={{ display: "flex" }}>
            <Link to={"/login"}>Login</Link>&nbsp;nbsp;
            <Link to={"/signup"}>Sign up</Link>
          </div>
        </div>
        <Routes>
          <Route path="/form" Component={Alogin}></Route>
          <Route path="/login" Component={Dlogin}></Route>
        </Routes>
      </BrowserRouter>
      <Setdata />
    </div>
  );
}
export default App;
