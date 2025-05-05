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
} from "@mui/material";
import {
  LocalHospital,
  Biotech,
  AccessTime,
  MonetizationOn,
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
        navigate("/userlogin");
        break;
      case "doctor":
        navigate("/Doctorlogin");
        break;
      case "admin":
        navigate("/Adminlogin");
        break;
      default:
        break;
    }
  };

  return (
    <>
      {/* Transparent App Bar - No Logo */}
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
          <Typography variant="h3" align="center" gutterBottom sx={{ color: "#000", fontWeight: 700 }}>
            Welcome to Nurture Nest
          </Typography>
          <Typography variant="h6" align="center" sx={{ color: "#444", mb: 5 }}>
            Your digital companion for better health.
          </Typography>

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
                    textAlign: "center",
                    p: 3,
                    borderRadius: 4,
                    boxShadow: 3,
                    backgroundColor: "rgba(255, 255, 255, 0.85)",
                    backdropFilter: "blur(5px)",
                    transition: "0.3s",
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
                    <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
                      {item.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Why Choose Us Section */}
      <Container sx={{ mt: 8, mb: 6 }}>
        <Typography variant="h4" align="center" fontWeight={600} gutterBottom>
          Why Choose Us?
        </Typography>
        <Grid container spacing={4} justifyContent="center" mt={2}>
          {[
            {
              title: "Experienced Doctors",
              desc: "Highly qualified and experienced healthcare professionals.",
              icon: <LocalHospital sx={{ fontSize: 40, color: "#1976d2" }} />,
            },
            {
              title: "Advanced Technology",
              desc: "Using cutting-edge tools for accurate diagnoses.",
              icon: <Biotech sx={{ fontSize: 40, color: "#388e3c" }} />,
            },
            {
              title: "24/7 Emergency",
              desc: "Round-the-clock emergency care and support.",
              icon: <AccessTime sx={{ fontSize: 40, color: "#fbc02d" }} />,
            },
            {
              title: "Affordable Pricing",
              desc: "Reasonable treatment plans for all patients.",
              icon: <MonetizationOn sx={{ fontSize: 40, color: "#d32f2f" }} />,
            },
          ].map((item, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Card
                sx={{
                  p: 3,
                  borderRadius: 4,
                  textAlign: "center",
                  boxShadow: 2,
                  transition: "0.3s",
                  "&:hover": { boxShadow: 5 },
                }}
              >
                <div style={{ marginBottom: 15 }}>{item.icon}</div>
                <Typography variant="h6" fontWeight={600}>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  {item.desc}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default HomePage;
