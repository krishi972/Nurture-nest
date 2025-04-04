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
    { text: "Homepage", path: "/Homepage" },
    { text: "Appointment booking", path: "/Appointment" },
    { text: "View Doctors", path: "/Viewdoctors"},
    { text: "Labtest", path:"/Labtest"},
    { text: "My Profile", path:"/Profile"},    
    { text: "Emergency contact & Ambulance request", path: "/Ambulance" },
    { text: "About us", path: "/Service" },
    { text: "Log out", path: "/Logout" },
  ];

  // Navigation items for Admin(Admin)
  const AdminNavItems = [
    { text: "Home", path:"/Admin/Adminhome"},
    { text: "Department", path: "/Admin/Department" },
    { text: "Appointment management", path: "/Admin/Adappointment" },
    { text: "Ambulance allocation", path: "/Admin/Adminamb" },
    { text: "Feedback", path: "/Admin/Feedback" },
    { text: "Notifications", path: "/Admin/Notifications" },
    // { text: "Role", path: "/Admin/Role" },
    { text: "Setting", path: "/Admin/Setting" },
  ];
  //Navigation items for Doctor
  const DNavItems = [
    { text: "Home", path:"/Dhomepage"},
    { text: "appointment", path: "/D/Dappointment" },
    { text: "Prescription", path: "/D/Prescription" },
    { text: "Patient Management", path: "/D/Patientmanagement" },
    { text: "My profile", path: "/D/Dprofile" },
    { text: "Log out", path: "/D/Logout" },
  ];
// Determine which navigation items to use based on the route
const isAdmin = location.pathname.startsWith("/Admin");   // Check for Admin route
const isD = location.pathname.startsWith("/D");           // Check for Doctor route

const navItems = isAdmin 
  ? AdminNavItems 
  : isD 
    ? DNavItems 
    : userNavItems;        // Select the correct nav items based on the route

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <AppBar position="absolute" sx={{  background: "linear-gradient(135deg, rgba(0,136,160,1), rgba(0,191,184,1))",
      color: "#fff", }}>
      <Toolbar>
        {/* Menu Button for Opening Drawer */}
        <IconButton color="inherit" onClick={toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>

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

        {/* Login Button */}
        <Button 
          color="inherit" 
          sx={{ marginLeft: "auto" }} 
          onClick={() => navigate( "/Userlogin")}
        >
          Patient Login
        </Button>
        {/* doctor login */}
        {/* <Button 
          color="inherit" 
          sx={{ marginLeft: "auto" }} 
          onClick={() => navigate( "/Dlogin")}
        >
           Doctor Login
        </Button> */}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;