import React from "react";
import {
  AppBar,
  Toolbar,
  Container,
  Card,
  CardContent,
  Grid,
  Box,
  Typography,
  Button,
} from "@mui/material";
import {
  Person,
  AdminPanelSettings,
  MedicalInformation,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleLoginClick = (role) => {
    switch (role) {
      case "patient":
        navigate("/user/userlogin");
        break;
      case "doctor":
        navigate("/D/Doctorlogin");
        break;
      case "admin":
        navigate("/Admin/Adminlogin");
        break;
      default:
        break;
    }
  };

  return (
    <>
      {/* Transparent App Bar */}
      <AppBar position="absolute" style={{ background: "transparent", boxShadow: "none" }}>
        <Toolbar />
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: "url(/demo.jpg)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "80px",
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{ color: "#000", fontWeight: 700 }}
          >
            Welcome to Nurture Nest
          </Typography>
          <Typography
            variant="h6"
            align="center"
            sx={{ color: "#444", mb: 3, px: { xs: 2, sm: 10 } }}
          >
            Nurture Nest is your all-in-one hospital management platform that connects patients,
            doctors, and administrators. Book appointments, access medical records, and manage
            operations — all from one place.
          </Typography>

          <Box textAlign="center" sx={{ mb: 6 }}>
            {/* <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={() => handleLoginClick("patient")}
              sx={{ borderRadius: 3, px: 5, py: 1.5 }}
            >
              Get Started
            </Button> */}
          </Box>

          {/* Login Options */}
          <Grid container spacing={4} justifyContent="center">
            {[ 
              {
                title: "Patient",
                desc: "Access your appointments, prescriptions and reports.",
                icon: <Person sx={{ fontSize: 40, color: "#1976d2" }} />,
                role: "patient",
              },
              {
                title: "Doctor",
                desc: "Manage appointments and patient records.",
                icon: <MedicalInformation sx={{ fontSize: 40, color: "#388e3c" }} />,
                role: "doctor",
              },
              {
                title: "Admin",
                desc: "Monitor departments and hospital analytics.",
                icon: <AdminPanelSettings sx={{ fontSize: 40, color: "#d32f2f" }} />,
                role: "admin",
              },
            ].map((item, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Card
                  sx={{
                    height: "250px", // Fixed height for all cards
                    textAlign: "center",
                    p: 3,
                    borderRadius: 4,
                    boxShadow: 3,
                    backgroundColor: "rgba(255, 255, 255, 0.85)",
                    backdropFilter: "blur(5px)",
                    transition: "0.3s",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    "&:hover": { transform: "translateY(-5px)" },
                    cursor: "pointer",
                  }}
                  onClick={() => handleLoginClick(item.role)}
                >
                  <CardContent>
                    {item.icon}
                    <Typography variant="h6" sx={{ mt: 2, fontWeight: 600 }}>
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ mt: 1, color: "text.secondary" }}
                    >
                      {item.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default HomePage;
