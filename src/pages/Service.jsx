import React from "react";
import { Container, Typography, Grid, Card, CardContent, Box } from "@mui/material";
import { Phone, Email } from "@mui/icons-material";

const services = [
  { title: "Patient Management", description: "Manage patient records efficiently." },
  { title: "Doctor Scheduling", description: "Streamline doctor appointments and availability." },
  { title: "Billing System", description: "Automated billing and invoice generation." },
  { title: "Pharmacy Management", description: "Manage prescriptions and stock easily." },
];

const HomePage = () => {
  return (
    <Container maxWidth="lg">
      {/* Services Section */}
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold", mt: 4 }}>
        Our Services
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                boxShadow: 3,
                transition: "0.3s",
                "&:hover": { boxShadow: 6 },
                borderRadius: 2,
              }}
            >
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {service.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {service.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* About Us Section */}
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold", mt: 6 }}>
        About Us
      </Typography>
      <Typography variant="body1" align="center" paragraph>
        Our Hospital Management System is designed to enhance efficiency in healthcare facilities.
        We provide cutting-edge solutions for patient care, staff management, billing, and more.
      </Typography>
      <Typography variant="body1" align="center" fontWeight="bold">
        Our mission is to revolutionize healthcare administration through technology, ensuring seamless
        operations and improved patient experiences.
      </Typography>

      {/* Contact Us Section */}
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold", mt: 6 }}>
        Contact Us
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={4}>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Phone sx={{ color: "primary.main", mr: 1 }} />
            <Typography variant="body1">+9023562317</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Email sx={{ color: "primary.main", mr: 1 }} />
            <Typography variant="body1">nurturenest@gmail.com</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
