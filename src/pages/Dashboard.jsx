import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Avatar,
} from '@mui/material';
import {
  People,
  LocalHospital,
  CalendarMonth,
  AttachMoney,
} from '@mui/icons-material';

const AdminDashboard = () => {
  return (
    <Box sx={{ p: 4, backgroundColor: '#f5f7fa', minHeight: '100vh' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Admin Dashboard
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" mb={4}>
        Overview of hospital performance and management
      </Typography>

      {/* Overview Cards */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2 }}>
            <CardContent>
              <Avatar sx={{ bgcolor: 'primary.main', mb: 2 }}>
                <People />
              </Avatar>
              <Typography variant="h6">Total Patients</Typography>
              <Typography variant="h5">1,245</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2 }}>
            <CardContent>
              <Avatar sx={{ bgcolor: 'success.main', mb: 2 }}>
                <LocalHospital />
              </Avatar>
              <Typography variant="h6">Total Doctors</Typography>
              <Typography variant="h5">128</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2 }}>
            <CardContent>
              <Avatar sx={{ bgcolor: 'info.main', mb: 2 }}>
                <CalendarMonth />
              </Avatar>
              <Typography variant="h6">Appointments</Typography>
              <Typography variant="h5">384</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2 }}>
            <CardContent>
              <Avatar sx={{ bgcolor: 'warning.main', mb: 2 }}>
                <AttachMoney />
              </Avatar>
              <Typography variant="h6">Monthly Revenue</Typography>
              <Typography variant="h5">$92,500</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Analytics Placeholder */}
      <Box mt={5}>
        <Typography variant="h5" gutterBottom>
          Recent Activity / Analytics
        </Typography>
        <Card sx={{ p: 3 }}>
          <Typography variant="body1" color="text.secondary">
            Analytics charts, patient visit trends, or system logs will be displayed here.
          </Typography>
        </Card>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
