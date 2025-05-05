import React from 'react';
import { Box, Typography, Grid, Container, Fade } from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const DoctorHomePage = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url('/demo.jpg')`, // Make sure 'doctor.jpg' is in public folder
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
      {/* Overlay for clarity */}
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

      {/* Main Content */}
      <Box sx={{ zIndex: 2, width: '100%', maxWidth: '1100px', py: 6 }}>
        <Fade in timeout={800}>
          <Container>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 'bold',
                color: '#1976d2',
                mb: 4,
                textAlign: 'center',
              }}
            >
              Welcome, Doctor
            </Typography>

            <Typography
              variant="body1"
              sx={{ textAlign: 'center', mb: 5, fontSize: '1.1rem', color: '#444' }}
            >
              Manage your schedule, consult patients, and provide care efficiently — all in one place.
            </Typography>

            <Grid container spacing={4}>
              {[
                {
                  icon: <EventAvailableIcon sx={{ fontSize: 36 }} />,
                  title: 'Appointments',
                  desc: 'View, accept, or manage patient appointments. Stay organized with real-time scheduling.',
                },
                {
                  icon: <PeopleIcon sx={{ fontSize: 36 }} />,
                  title: 'Patient Data',
                  desc: 'Access complete patient medical histories, previous visits, and ongoing treatments.',
                },
                {
                  icon: <AssignmentIcon sx={{ fontSize: 36 }} />,
                  title: 'Prescriptions',
                  desc: 'Create and manage prescriptions quickly. Ensure patients get accurate medication.',
                },
                {
                  icon: <AccountCircleIcon sx={{ fontSize: 36 }} />,
                  title: 'My Profile',
                  desc: 'Update your professional details, manage availability, and edit your preferences.',
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
                      <Typography variant="body2" sx={{ color: '#555' }}>
                        {item.desc}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>

            <Typography
              variant="h6"
              sx={{
                mt: 6,
                textAlign: 'center',
                color: 'success.main',
                fontWeight: 500,
              }}
            >
              Deliver excellence in care. We support you every step of the way.
            </Typography>
          </Container>
        </Fade>
      </Box>
    </Box>
  );
};

export default DoctorHomePage;
