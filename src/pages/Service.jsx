import React from "react";
import { Container, Typography, Grid, Card, CardContent, Box } from "@mui/material";
import { Phone, Email, Person, Schedule, Receipt, Description } from "@mui/icons-material";
import "./Service.css";

const services = [
  { 
    title: "Patient Management", 
    description: "Manage patient records efficiently.", 
    icon: <Person className="service-icon" /> 
  },
  { 
    title: "Doctor Scheduling", 
    description: "Streamline doctor appointments and availability.", 
    icon: <Schedule className="service-icon" /> 
  },
  { 
    title: "Billing System", 
    description: "Automated billing and invoice generation.", 
    icon: <Receipt className="service-icon" /> 
  },
  { 
    title: "E-prescription", 
    description: "Give E-prescription, that is convenient to the patient", 
    icon: <Description className="service-icon" /> 
  },
];

const Service = () => { 
  return (
    <div className="full-screen"> 
      <Container maxWidth="lg" className="content-container">
        {/* Services Section */}
        <Typography variant="h4" align="center" gutterBottom className="section-title">
          Our Services
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card className="service-card">
                <CardContent className="service-content">
                  {service.icon}
                  <Typography variant="h6" className="card-title">
                    {service.title}
                  </Typography>
                  <Typography variant="body2" className="card-description">
                    {service.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* About Us Section */}
        <Typography variant="h4" align="center" gutterBottom className="section-title" style={{ marginTop: '50px' }}>
          About Us
        </Typography>
        <Typography variant="body1" align="center" paragraph className="about-text">
          Our Hospital Management System is designed to enhance efficiency in healthcare facilities.
          We provide cutting-edge solutions for patient care, staff management, billing, and more.
        </Typography>
        <Typography variant="body1" align="center" fontWeight="bold" className="about-text">
          Our mission is to revolutionize healthcare administration through technology, ensuring seamless
          operations and improved patient experiences.
        </Typography>

        {/* Contact Us Section */}
        <Typography variant="h4" align="center" gutterBottom className="section-title" style={{ marginTop: '50px' }}>
          Contact Us
        </Typography>
        <Grid container spacing={2} justifyContent="center" className="contact-section">
          <Grid item xs={12} sm={4}>
            <Box display="flex" alignItems="center" justifyContent="center">
              <Phone className="contact-icon" />
              <Typography variant="body1">+9023562317</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box display="flex" alignItems="center" justifyContent="center">
              <Email className="contact-icon" />
              <Typography variant="body1">nurturenest@gmail.com</Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Service;
