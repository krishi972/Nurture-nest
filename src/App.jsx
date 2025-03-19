import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import Signup from './pages/Signup';
// import Passrecovery from "./pages/passrecovery";
// import Appbar from './components/appbar';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// import Alogin from './pages/Alogin';
// import Reset from './pages/reset';
// import Appointment from './pages/Appointment'
// import Profile from './pages/Profile'
// import Ambulance from './pages/Ambulance'
// import Viewdoctors from './pages/Viewdoctors'
// import Service from './pages/Service'
// import Homepage from './pages/Homepage'
// import Labtest from './pages/L'
// import Login from "./pages/Login";
// import PasswordRecovery from "./pages/passrecovery";
// import Signup from "./pages/Signup";

import Scheduling from "./pages/Scheduling"
function App() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  return (
    <div>
    
            {/* <Login /> 
          <Signup />
          <Passrecovery />
          <Alogin/>  */} 
          <Scheduling/>
        
    </div>
  );
}

export default App;
