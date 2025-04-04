import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Avatar,
  Typography,
  Grid,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { Delete, Phone, Email, LocationOn, CalendarToday } from "@mui/icons-material";

// Helper function to convert 24-hour time to 12-hour format with AM/PM
const formatTime = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  return `${formattedHours}:${minutes < 10 ? "0" : ""}${minutes} ${period}`;
};

const DoctorProfile = () => {
  const [tabValue, setTabValue] = useState(0);

  const [doctor, setDoctor] = useState({
    name: "Dr. Smit sharma",
    specialization: "Cardiologist",
    department: "Cardiology",
    phone: "9023765432",
    email: "smit.sharma@example.com",
    location: "India",
    avatar: "https://via.placeholder.com/150",
    schedule: [
      { id: 1, day: "Monday", time: "10:00 AM - 3:00 PM" },
      { id: 2, day: "Wednesday", time: "12:00 PM - 5:00 PM" },
    ],
  });

  const [addSlotOpen, setAddSlotOpen] = useState(false);
  const [newSlot, setNewSlot] = useState({ day: "", startTime: "", endTime: "" });

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // --- Add Slot Handlers ---
  const handleAddSlotClick = () => {
    setNewSlot({ day: "", startTime: "", endTime: "" });
    setAddSlotOpen(true);
  };

  const handleSlotChange = (e) => {
    const { name, value } = e.target;
    setNewSlot((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveSlot = () => {
    if (newSlot.day && newSlot.startTime && newSlot.endTime) {
      const formattedStartTime = formatTime(newSlot.startTime);
      const formattedEndTime = formatTime(newSlot.endTime);

      const newSlotEntry = {
        id: Date.now(),
        day: newSlot.day,
        time: `${formattedStartTime} - ${formattedEndTime}`,
      };
      setDoctor((prev) => ({
        ...prev,
        schedule: [...prev.schedule, newSlotEntry],
      }));
      setAddSlotOpen(false);
    }
  };

  const handleDeleteSlot = (id) => {
    setDoctor((prev) => ({
      ...prev,
      schedule: prev.schedule.filter((slot) => slot.id !== id),
    }));
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: "auto", p: 4 }}>
      {/* Doctor Info Card */}
      <Card sx={{ mb: 4, boxShadow: 3, borderRadius: 3 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} display="flex" justifyContent="center">
              <Avatar
                src={doctor.avatar}
                alt={doctor.name}
                sx={{ width: 180, height: 180 }}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h4">{doctor.name}</Typography>
              <Typography variant="h6" color="text.secondary">
                {doctor.specialization} - {doctor.department}
              </Typography>

              <Grid container spacing={2} mt={2}>
                <Grid item xs={6}>
                  <Typography>
                    <Phone sx={{ verticalAlign: "middle", mr: 1 }} />
                    {doctor.phone}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    <Email sx={{ verticalAlign: "middle", mr: 1 }} />
                    {doctor.email}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    <LocationOn sx={{ verticalAlign: "middle", mr: 1 }} />
                    {doctor.location}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>
                    <CalendarToday sx={{ verticalAlign: "middle", mr: 1 }} />
                    Available: {doctor.schedule.length} days/week
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabValue} onChange={handleChange}>
          <Tab label="Availability" />
        </Tabs>
      </Box>

      {/* Availability Tab */}
      {tabValue === 0 && (
        <Box sx={{ p: 3 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddSlotClick}
          >
            Add Slot
          </Button>

          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Day</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {doctor.schedule.map((slot) => (
                  <TableRow key={slot.id}>
                    <TableCell>{slot.day}</TableCell>
                    <TableCell>{slot.time}</TableCell>
                    <TableCell>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteSlot(slot.id)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {/* Add Slot Dialog */}
      <Dialog open={addSlotOpen} onClose={() => setAddSlotOpen(false)}>
        <DialogTitle>Add New Appointment Slot</DialogTitle>
        <DialogContent>
          <TextField
            select Day
            label="Day"
            name="day"
            fullWidth
            margin="normal"
            value={newSlot.day}
            onChange={handleSlotChange}
            SelectProps={{ native: true }}
          >
            <option value=""></option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </TextField>

          <TextField
            label="Start Time"
            type="time"
            name="startTime"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={newSlot.startTime}
            onChange={handleSlotChange}
          />

          <TextField
            label="End Time"
            type="time"
            name="endTime"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={newSlot.endTime}
            onChange={handleSlotChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSaveSlot} color="primary">
            Save
          </Button>
          <Button onClick={() => setAddSlotOpen(false)} color="error">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DoctorProfile;
