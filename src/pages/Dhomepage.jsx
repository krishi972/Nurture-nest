import React, { useState } from "react";
import {
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Modal,
  Box,
  TextField,
  MenuItem,
  Select,
  Snackbar,
} from "@mui/material";
import {
  LocalHospital,
  Biotech,
  AccessTime,
  MonetizationOn,
  DateRange,
} from "@mui/icons-material";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
} from "@mui/material";
import {
  Menu,
  Home,
  VideoCall,
  People,
  Event,
  ContactMail,
} from "@mui/icons-material";

const HomePage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showConsultations, setShowConsultations] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [patientDetails, setPatientDetails] = useState({
    name: "",
    age: "",
    mobile: "",
  });
 
  const toggleDrawer = (state) => () => setDrawerOpen(state);
 

 

  return (
    <>
      <IconButton
        onClick={toggleDrawer(true)}
        style={{ position: "absolute", top: 20, left: 20, color: "black" }}
      >
        <Menu fontSize="large" />
      </IconButton>

      {/* <AppDrawer open={drawerOpen} toggleDrawer={toggleDrawer} /> */}

      <div
        style={{
          backgroundImage: "url(/demo.jpg)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top center",
          minHeight: "98vh",
          width: "99vw",
          padding: "",
        }}
      >
        <Container>
          <Typography
            variant="h2"
            color="black"
            textAlign="center"
            gutterBottom
          >
            <br />
            Welcome to Nurture Nest !!
          </Typography>
          <Grid
            container
            spacing={3}
            justifyContent="center"
            style={{ marginTop: 20 }}
          >
           
            <Container>
              <Typography
                variant="h4"
                textAlign="center"
                marginTop={10}
                gutterBottom
              >
                Why Choose Us?
              </Typography>
              <Grid
                container
                spacing={3}
                justifyContent="center"
                style={{ marginTop: 20 }}
              >
                {[
                  {
                    title: "Experienced Doctors",
                    description:
                      "Our team consists of highly qualified and experienced doctors dedicated to providing top-quality care.",
                    icon: (
                      <LocalHospital
                        fontSize="large"
                        style={{ color: "#007bff" }}
                      />
                    ),
                  },
                  {
                    title: "Advanced Technology",
                    description:
                      "We utilize state-of-the-art technology to ensure accurate diagnoses and effective treatments.",
                    icon: (
                      <Biotech fontSize="large" style={{ color: "#28a745" }} />
                    ),
                  },
                  {
                    title: "24/7 Emergency Service",
                    description:
                      "Our emergency department is open 24/7 to provide immediate and critical care whenever you need it.",
                    icon: (
                      <AccessTime
                        fontSize="large"
                        style={{ color: "#ffc107" }}
                      />
                    ),
                  },
                  {
                    title: "Affordable Treatment Plans",
                    description:
                      "We offer cost-effective healthcare plans tailored to meet the needs of every patient.",
                    icon: (
                      <MonetizationOn
                        fontSize="large"
                        style={{ color: "#dc3545" }}
                      />
                    ),
                  },
                ].map((item, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Card
                      style={{
                        background: "linear-gradient(135deg, #ffffff, #f8f9fa)",
                        height: "250px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "15px",
                        boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
                        transition: "transform 0.3s ease-in-out",
                        textAlign: "center",
                        padding: "20px",
                        ":hover": { transform: "scale(1.05)" },
                      }}
                    >
                      <CardContent>
                        {item.icon}
                        <Typography
                          variant="h6"
                          style={{
                            marginTop: 15,
                            fontWeight: "bold",
                            color: "#343a40",
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          style={{ marginTop: 10, color: "#6c757d" }}
                        >
                          {item.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Grid>
        </Container>

       
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 600,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
           
              </Box>
            
           
                
               
               
               
                          
          
        

        
          
         
              
      </div>
    </>
  );
};

export default HomePage;
