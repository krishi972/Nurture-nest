import React from 'react';
import { Box, Typography, Grid, Container, Fade } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ScienceIcon from '@mui/icons-material/Science';
import MedicationIcon from '@mui/icons-material/Medication';
import FeedbackIcon from '@mui/icons-material/Feedback';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

const PatientHomePage = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url('/demo.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
      {/* Dark overlay for readability */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(3px)',
          zIndex: 1,
        }}
      />

      {/* Content Section */}
      <Box
        sx={{
          zIndex: 2,
          width: '100%',
          maxWidth: '1200px',
          py: 6,
        }}
      >
        <Fade in timeout={800}>
          <Container>
            <Typography
              variant="h3"
              sx={{ fontWeight: 'bold', color: '#1976d2', mb: 3, textAlign: 'center' }}
            >
              Your Health, Your Portal
            </Typography>

            <Typography
              variant="body1"
              sx={{ fontSize: '1.1rem', mb: 5, textAlign: 'center', color: '#333' }}
            >
              Manage your health with ease using our patient-centered platform. Access care anytime,
              anywhere.
            </Typography>

            <Grid container spacing={4}>
              {[
                {
                  icon: <CalendarMonthIcon sx={{ fontSize: 35 }} />,
                  title: 'Appointment Booking',
                  desc: 'Schedule appointments and track your visit status in real-time.',
                },
                {
                  icon: <ScienceIcon sx={{ fontSize: 35 }} />,
                  title: 'Lab Test Booking',
                  desc: 'Book lab tests and download your medical reports easily.',
                },
                {
                  icon: <MedicationIcon sx={{ fontSize: 35 }} />,
                  title: 'Prescription Summary',
                  desc: 'Review and manage prescriptions from your doctor.',
                },
                {
                  icon: <FeedbackIcon sx={{ fontSize: 35 }} />,
                  title: 'Feedback & Suggestions',
                  desc: 'Share feedback and raise complaints to improve our services.',
                },
                {
                  icon: <LocalHospitalIcon sx={{ fontSize: 35 }} />,
                  title: 'Ambulance Request',
                  desc: 'Request ambulance support during medical emergencies.',
                },
                {
                  icon: <NotificationsActiveIcon sx={{ fontSize: 35 }} />,
                  title: 'Notifications & Alerts',
                  desc: 'Get appointment updates, test results, and reminders.',
                },
              ].map((item, i) => (
                <Grid item xs={12} sm={6} key={i}>
                  <Box display="flex" alignItems="flex-start">
                    <Box color="primary.main" mr={2}>
                      {item.icon}
                    </Box>
                    <Box>
                      <Typography variant="h6" fontWeight="bold">
                        {item.title}
                      </Typography>
                      <Typography variant="body2">{item.desc}</Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>

            <Typography
              variant="h6"
              sx={{ mt: 6, textAlign: 'center', color: 'green', fontWeight: 500 }}
            >
              Empowering your health journey — anytime, anywhere.
            </Typography>
          </Container>
        </Fade>
      </Box>
    </Box>
  );
};

export default PatientHomePage;
