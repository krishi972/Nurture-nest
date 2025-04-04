import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Signup from './pages/Signup';
// import Passrecovery from "./pages/passrecovery";
// import Appbar from './components/appbar';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dlogin from "./pages/Dlogin";
// import Reset from './pages/reset';
import Appointment from "./pages/Appointment";
import Profile from "./pages/Profile";
import Ambulance from "./pages/Ambulance";
import Viewdoctors from './pages/Viewdoctors'
import Service from "./pages/Service";
import Homepage from "./pages/Homepage";
import Labtest from "./pages/Labtest";
import Scheduling from "./pages/Scheduling"
import Dprofile from "./pages/Dprofile"
import Prescription from "./pages/Prescription"
import Adminamb from "./pages/Adminamb"
import Setting from "./pages/Setting"
import Feedback from "./pages/Feedback"
import Notifications from "./pages/Notifications"
import Department from "./pages/Department"
// import Usermanagement from "./pages/Usermanagement"
import Billing from "./pages/Billing"
import Analytics from "./pages/Analytics"
import Role from "./pages/Role"
import Adappointment from "./pages/Adappointment"
// import Patientdata from "./pages/Patientdata"
import Patientmanagement from "./pages/Patientmanagement"
import Dappointment from "./pages/Dappointment"
import Navbar from "./components/Navbar"
import userlogin from "./pages/userlogin"
import usersignup from "./pages/usersignup"
import Logout from "./pages/Logout"
import Dhomepage from "./pages/Dhomepage"
import Passrecovery from "./pages/passrecovery";
import Doctorsignup from "./pages/Doctorsignup"
import Adminhome from "./pages/Adminhome"
// import Signup from "./pages/Signup";


function App() {
  const [count, setCount] = useState(0);
  // const navigate = useNavigate();

  return (
    <div>
      <BrowserRouter>
      <Navbar />
      <br />
      <br />
      <br />
      
        <Routes>
          <Route path="/Ambulance" Component={Ambulance}></Route>
          <Route path="/Appointment" Component={Appointment}></Route>
          <Route path="/Profile" Component={Profile}></Route>
          <Route path="/Dlogin" Component={Dlogin}></Route>
          <Route path="/Service" Component={Service}></Route>
          <Route path="/Labtest" Component={Labtest}></Route>
          <Route path="/Viewdoctors" Component={Viewdoctors}></Route>
          <Route path="/Homepage" Component={Homepage}></Route>
          <Route path="/Scheduling" Component={Scheduling}></Route>
          <Route path="/D/Dprofile" Component={Dprofile}></Route>
          <Route path="/D/Prescription" Component={Prescription}></Route>
          <Route path="/Admin/Adminamb" Component={Adminamb}></Route>
          <Route path="/Admin/Setting" Component={Setting}></Route>
          <Route path="/Admin/Feedback" Component={Feedback}></Route>
          <Route path="/Admin/Notifications" Component={Notifications}></Route>
          <Route path="/Admin/Department" Component={Department}></Route>
          {/* <Route path="/Admin/Usermanagement" Component={Usermanagement}></Route> */}
          <Route path="/Billing" Component={Billing}></Route>
          <Route path="/Analytics" Component={Analytics}></Route>
          <Route path="/Admin/Role" Component={Role}></Route>
          <Route path="/Admin/Adappointment" Component={Adappointment}></Route>
          {/* <Route path="/Patientdata" Component={Patientdata}></Route> */}
          <Route path="/D/Patientmanagement" Component={Patientmanagement}></Route>
          <Route path="/D/Dappointment" Component={Dappointment}></Route>
          <Route path="/Navbar" Component={Navbar}></Route>
          <Route path="/userlogin" Component={userlogin}></Route>
          <Route path="/usersignup" Component={usersignup}></Route>
          <Route path="/Logout" Component={Logout}></Route>
          <Route path="/D/Logout" Component={Logout}></Route>
          <Route path="/passrecovery" Component={Passrecovery}></Route>
          <Route path="/Dhomepage" Component={Dhomepage}></Route>
          <Route path="/Doctorsignup" Component={Doctorsignup}></Route>
          <Route path="/Admin/Adminhome" Component={Adminhome}></Route>
          





          
          



          
         
        </Routes>
      
       </BrowserRouter> 
      
    </div>
  );
}

export default App;
