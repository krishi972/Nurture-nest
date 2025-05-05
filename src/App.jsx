import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Signup from './pages/Signup';
// import Passrecovery from "./pages/passrecovery";
// import Appbar from './components/appbar';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// import Reset from './pages/reset';
import Appointment from "./pages/Appointment";
import Profile from "./pages/Profile";
import Ambulance from "./pages/Ambulance";
import Viewdoctors from "./pages/Viewdoctors";
import Service from "./pages/Service";
import Homepage from "./pages/Homepage";
import Labtest from "./pages/Labtest";
import Scheduling from "./pages/Scheduling";
import Dprofile from "./pages/Dprofile";
import Prescription from "./pages/Prescription";
import Adminamb from "./pages/Adminamb";
import Setting from "./pages/Setting";
import Feedback from "./pages/Feedback";
import Notifications from "./pages/Notifications";
import Department from "./pages/Department";
// 
import Adappointment from "./pages/Adappointment";
import Doctorschedule from "./pages/Doctorschedule"
import Patientmanagement from "./pages/Patientmanagement";
import Dappointment from "./pages/Dappointment";
import Navbar from "./components/Navbar";
import userlogin from "./pages/userlogin";
import usersignup from "./pages/usersignup";
import Logout from "./pages/Logout";
import Passrecovery from "./pages/passrecovery";
import Doctorsignup from "./pages/Doctorsignup";
import usernotifications from "./pages/usernotifications";
import userfeedback from "./pages/userfeedback";
import Adminlabtest from "./pages/Adminlabtest";
import Doctorlogin from "./pages/Doctorlogin";
import Adminsignup from "./pages/Adminsignup";
import Adminlogin from "./pages/Adminlogin";
import Adminprofile from "./pages/Adminprofile";
import patientprescription from "./pages/patientprescription";
import patienthome from "./pages/patienthome";
import Doctorhome from "./pages/Doctorhome";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./privateroute";

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
          <Route element={<PrivateRoute />}>
            <Route path="/user/Ambulance" Component={Ambulance}></Route>
            <Route path="/user/Appointment" Component={Appointment}></Route>
            <Route path="/user/Profile" Component={Profile}></Route>
            <Route path="/user/Service" Component={Service}></Route>
            <Route path="/user/Labtest" Component={Labtest}></Route>
            <Route path="/user/Viewdoctors" Component={Viewdoctors}></Route>
            <Route path="/D/Dprofile" Component={Dprofile}></Route>
            <Route path="/D/Prescription" Component={Prescription}></Route>
            <Route path="/Admin/Adminamb" Component={Adminamb}></Route>
            <Route path="/Admin/Feedback" Component={Feedback}></Route>
            <Route
              path="/Admin/Notifications"
              Component={Notifications}
            ></Route>
            <Route path="/Admin/Department" Component={Department}></Route>
            <Route path="/Admin/Adminlabtest" Component={Adminlabtest}></Route>
            <Route
              path="/Admin/Adappointment"
              Component={Adappointment}
            ></Route>
            <Route
              path="/D/Patientmanagement"
              Component={Patientmanagement}
            ></Route>
            <Route path="/D/Dappointment" Component={Dappointment}></Route>
            <Route
              path="/user/usernotifications"
              Component={usernotifications}
            ></Route>
            <Route path="/user/userfeedback" Component={userfeedback}></Route>
            <Route path="/Admin/Adminprofile" Component={Adminprofile}></Route>
            <Route
              path="/user/patientprescription"
              Component={patientprescription}
            ></Route>
            <Route path="/user/patienthome" Component={patienthome}></Route>
            <Route path="/D/Doctorhome" Component={Doctorhome}></Route>
            <Route path="/Admin/Dashboard" Component={Dashboard}></Route>
            <Route path="/D/Scheduling" Component={Scheduling}></Route>
            <Route path="/user/Doctorschedule" Component={Doctorschedule}></Route>
          </Route>

          <Route path="/Homepage" Component={Homepage}></Route>
         
          <Route path="/D/Doctorlogin" Component={Doctorlogin}></Route>
          <Route path="/D/Doctorsignup" Component={Doctorsignup}></Route>
          <Route path="/Navbar" Component={Navbar}></Route>
          <Route path="/user/userlogin" Component={userlogin}></Route>
          <Route path="/user/usersignup" Component={usersignup}></Route>
          <Route path="/Logout" Component={Logout}></Route>
          {/* <Route path="/Admin/Logout" Component={Logout}></Route> */}
          <Route path="/passrecovery" Component={Passrecovery}></Route>
          {/* <Route path="/Dhomepage" Component={Dhomepage}></Route> */}
          <Route path="/Doctorsignup" Component={Doctorsignup}></Route>
          {/* <Route path="/Admin/Adminhome" Component={Adminhome}></Route> */}

          <Route path="/Admin/Adminsignup" Component={Adminsignup}></Route>
          <Route path="/Admin/Adminlogin" Component={Adminlogin}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
