import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Signup from './pages/Signup';
// import Passrecovery from "./pages/passrecovery";
// import Appbar from './components/appbar';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Alogin from "./pages/Alogin";
// import Reset from './pages/reset';
import Appointment from "./pages/Appointment";
import Profile from "./pages/Profile";
import Ambulance from "./pages/Ambulance";
import Viewdoctors from './pages/Viewdoctors'
import Service from "./pages/Service";
import Homepage from "./pages/Homepage";
import Labtest from "./pages/Labtest";

// import Login from "./pages/Login";
// import PasswordRecovery from "./pages/passrecovery";
// import Signup from "./pages/Signup";

import Scheduling from "./pages/Scheduling"
function App() {
  const [count, setCount] = useState(0);
  // const navigate = useNavigate();

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/Ambulance" Component={Ambulance}></Route>
          <Route path="/Appointment" Component={Appointment}></Route>
          <Route path="/Profile" Component={Profile}></Route>
          <Route path="/Alogin" Component={Alogin}></Route>
          <Route path="/Service" Component={Service}></Route>
          <Route path="/Labtest" Component={Labtest}></Route>
          <Route path="/Viewdoctors" Component={Viewdoctors}></Route>
          <Route path="/Homepage" Component={Homepage}></Route>
          
         
        </Routes>
        {/* <Ambulance/>
        <Appointment/>
        <Homepage/>
        <Profile/>
        <Alogin/>
        <Service/>
        <Labtest/> */}
       </BrowserRouter> 
      
    </div>
  );
}

export default App;
