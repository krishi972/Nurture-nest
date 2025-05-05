import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Drawer, List, ListItemButton, ListItemText, IconButton, Divider, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Navigation items for Users
  const userNavItems = [
    { text: "Home", path: "/user/patienthome" },
    { text: "Appointment booking", path: "/user/Appointment" },
    
    { text: "View doctor schedule", path: "/user/Doctorschedule" },
    { text: "View Doctors", path: "/user/Viewdoctors"},
    { text: "Labtest", path:"/user/Labtest"},
    { text: "E-prescription", path:"/user/patientprescription"},
    { text: "My Profile", path:"/user/Profile"},    
    { text: "Emergency contact & Ambulance request", path: "/user/Ambulance" },
    { text: "Feedback", path: "/user/userfeedback" },
    { text: "Notifications", path:"/user/usernotifications" },
    { text: "About us", path: "/user/Service" },
    

    
    
  ];

  // Navigation items for Admin(Admin)
  const AdminNavItems = [
    { text: "Dashboard", path: "/Admin/Dashboard" },
    { text: "Department", path: "/Admin/Department" },
    { text: "Appointment management", path: "/Admin/Adappointment" },
    { text: "Lab test management", path:"/Admin/Adminlabtest" },
    { text: "Ambulance allocation", path: "/Admin/Adminamb" },
    { text: "Feedback", path: "/Admin/Feedback" },
    { text: "Notifications", path: "/Admin/Notifications" },
    
    
    { text: "My profile", path: "/Admin/Adminprofile" },
   
    
  ];
  //Navigation items for Doctor
  const DNavItems = [
    { text: "Home", path:"/D/Doctorhome" },
    { text: "appointment", path: "/D/Dappointment" },
    { text: "Prescription", path: "/D/Prescription" },
    { text: "Patient Management", path: "/D/Patientmanagement" },
    { text: "My profile", path: "/D/Dprofile" },
    { text: "Schedule", path: "/D/Scheduling" },

   
  ];
// Determine which navigation items to use based on the route
const isAdmin = location.pathname.startsWith("/Admin");
const isD = location.pathname.startsWith("/D");
const isUser = location.pathname.startsWith("/user"); // Add this

const navItems = isAdmin 
  ? AdminNavItems 
  : isD 
    ? DNavItems 
    : isUser 
      ? userNavItems 
      : []; // empty if path doesn't match

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setDrawerOpen(open);
  };
   // 🔘 Navigate to Logout Route
   const handleLogout = () => {
    navigate("/Logout");
  };

  return (
    <AppBar position="absolute" sx={{  background: "linear-gradient(135deg, rgba(0,136,160,1), rgba(0,191,184,1))",
      color: "#fff", }}>
      <Toolbar>
        {/* Menu Button for Opening Drawer */}
        {localStorage.getItem("token") ? (

          <IconButton color="inherit" onClick={toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>
        ):null}

        {/* Side Drawer */}
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
          <Box sx={{ width: 250,  background: "linear-gradient(135deg, rgba(0,136,160,1), rgba(0,191,184,1))",
                  color: "#fff", height: "100%" }} role="presentation">
            <List>
              {/* Close Drawer Button */}
              <ListItemButton onClick={toggleDrawer(false)}>
                <ArrowBackIcon />
                <ListItemText primary="" sx={{ marginLeft: 2 }} />
              </ListItemButton>
              <Divider />

              {/* Dynamic Navigation List */}
              {navItems.map((item, index) => (
                <ListItemButton
                  key={index}
                  onClick={() => {
                    navigate(item.path);
                    setDrawerOpen(false); // Close drawer after navigation
                  }}
                >
                  <ListItemText primary={item.text} />
                </ListItemButton>
              ))}
            </List>
          </Box>
        </Drawer>

        {/* Logo & Title */}
        <Typography variant="h6" sx={{ flexGrow: 1, color: "#FFF", marginLeft: 2 }}>
          Nurture Nest
        </Typography>

       {/* 🔘 Logout Button */}
       {localStorage.getItem("token") && (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;