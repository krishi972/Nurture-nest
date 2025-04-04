import React, { useState } from "react";
import { Button, Container, Typography, Grid, Modal, Box, TextField, Select, MenuItem, Card, CardContent, Snackbar } from "@mui/material";

const HomePage = () => {
  const [showConsultations, setShowConsultations] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [patientDetails, setPatientDetails] = useState({ name: "", age: "", mobile: "" });
  const [bookings, setBookings] = useState([]);
  const [toastOpen, setToastOpen] = useState(false);
  const [doctorInfo, setDoctorInfo] = useState(null);

  const doctors = [
    { id: 1, name: "Dr. Smit Sharma", specialty: "Cardiologist", price: "Rs.1000", slots: ["10:00 AM", "2:00 PM", "4:00 PM"] },
    { id: 2, name: "Dr. Seema Jain", specialty: "Dermatologist", price: "Rs.500", slots: ["11:00 AM", "3:00 PM", "5:00 PM"] },
    { id: 3, name: "Dr. Rakesh Gayakvad", specialty: "Neurologist", price: "Rs.800", slots: ["9:00 AM", "1:00 PM", "6:00 PM"] },
  ];

  const confirmBooking = () => {
    if (patientDetails.name && patientDetails.mobile && selectedDoctor && selectedTimeSlot) {
      const newBooking = {
        patientName: patientDetails.name,
        doctorName: selectedDoctor.name,
        specialty: selectedDoctor.specialty,
        timeSlot: selectedTimeSlot,
        price: selectedDoctor.price,
      };

      setBookings([...bookings, newBooking]);
      setToastOpen(true);
      setTimeout(() => setToastOpen(false), 2000);

      // Clear the form after booking
      setPatientDetails({ name: "", age: "", mobile: "" });
      setSelectedDoctor(null);
      setSelectedTimeSlot("");
      setDoctorInfo(null);
    }
  };

  const handleDoctorSelection = (doctor, slot) => {
    setSelectedDoctor(doctor);
    setSelectedTimeSlot(slot);
    setDoctorInfo({
      name: doctor.name,
      price: doctor.price
    });
  };

  return (
    <div className="home-container">
      <Container>
        <Typography variant="h2" textAlign="center" gutterBottom>
          Welcome to Nurture Nest
        </Typography>

        <Grid container justifyContent="center" style={{ marginTop: 20 }}>
          <Button variant="contained" color="primary" onClick={() => setShowConsultations(true)}>
            Video Consultations
          </Button>
        </Grid>
      </Container>

      <Modal open={showConsultations} onClose={() => setShowConsultations(false)}>
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
          <Typography variant="h5" gutterBottom>
            Available Video Consultations
          </Typography>

          {doctors.map((doctor) => (
            <Card key={doctor.id} style={{ marginBottom: "15px" }}>
              <CardContent>
                <Typography variant="h6">{doctor.name} - {doctor.specialty}</Typography>
                <Typography>Price: {doctor.price}</Typography>
                <Select
                  fullWidth
                  value={selectedDoctor?.id === doctor.id ? selectedTimeSlot : ""}
                  onChange={(e) => handleDoctorSelection(doctor, e.target.value)}
                  displayEmpty
                  style={{ marginTop: 10 }}
                >
                  <MenuItem value="" disabled>Select Time Slot</MenuItem>
                  {doctor.slots.map((slot, index) => (
                    <MenuItem key={index} value={slot}>{slot}</MenuItem>
                  ))}
                </Select>
              </CardContent>
            </Card>
          ))}

          {doctorInfo && (
            <Box sx={{ my: 3, p: 2, backgroundColor: "#f0f0f0", borderRadius: 2 }}>
              <Typography variant="h6">Selected Doctor: {doctorInfo.name}</Typography>
              <Typography>Charges: {doctorInfo.price}</Typography>
            </Box>
          )}

          <TextField
            fullWidth
            label="Patient Name"
            margin="normal"
            value={patientDetails.name}
            onChange={(e) => setPatientDetails({ ...patientDetails, name: e.target.value })}
          />
          <TextField
            fullWidth
            label="Mobile Number"
            margin="normal"
            value={patientDetails.mobile}
            onChange={(e) => setPatientDetails({ ...patientDetails, mobile: e.target.value })}
          />
          <Button
            variant="contained"
            color="success"
            fullWidth
            style={{ marginTop: 10 }}
            onClick={confirmBooking}
          >
            Confirm Booking
          </Button>
        </Box>
      </Modal>

      {/* Display Booked Appointments */}
      {bookings.length > 0 && (
        <Container style={{ marginTop: "30px" }}>
          <Typography variant="h4" textAlign="center" gutterBottom>
            Booked Appointments
          </Typography>
          <Grid container spacing={2}>
            {bookings.map((booking, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <Card style={{ background: "#f0f0f0", padding: "15px", boxShadow: "0 5px 15px rgba(0,0,0,0.2)" }}>
                  <CardContent>
                    <Typography variant="h6">Patient: {booking.patientName}</Typography>
                    <Typography>Doctor: {booking.doctorName}</Typography>
                    <Typography>Specialty: {booking.specialty}</Typography>
                    <Typography>Time: {booking.timeSlot}</Typography>
                    <Typography>Charges: {booking.price}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      )}

      <Snackbar
        open={toastOpen}
        autoHideDuration={3000}
        message="Appointment booked successfully!"
      />
    </div>
  );
};

export default HomePage;
