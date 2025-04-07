import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  Button,
  Grid,
  Paper,
  Snackbar,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../config/Firebase"; // Ensure Firebase is configured

const LabTestBooking = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    mobile: "",
    testType: "",
    date: "",
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [bookings, setBookings] = useState([]);

  const testOptions = [
    "Blood Test",
    "Urine Test",
    "X-Ray",
    "MRI",
    "COVID-19 Test",
  ];

  // Fetch bookings from Firestore in real-time
  useEffect(() => {
    const q = query(collection(db, "labTests"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const bookingsData = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
      setBookings(bookingsData);
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.age ||
      !formData.mobile ||
      !formData.testType ||
      !formData.date
    ) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await addDoc(collection(db, "labTests"), {
        name: formData.name,
        age: parseInt(formData.age, 10),
        mobile: formData.mobile,
        testType: formData.testType,
        date: formData.date,
        createdAt: serverTimestamp(),
      });

      setOpenSnackbar(true);
      setFormData({
        name: "",
        age: "",
        mobile: "",
        testType: "",
        date: "",
      });
    } catch (error) {
      console.error("Error booking lab test:", error);
      alert("Failed to book lab test. Please try again.");
    }
  };

  const handleCancelBooking = async (id) => {
    try {
      await deleteDoc(doc(db, "labTests", id));
      // onSnapshot listener will update the local state automatically
    } catch (error) {
      console.error("Error cancelling booking:", error);
      alert("Failed to cancel booking. Please try again.");
    }
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: "4rem" }}>
      <Grid container spacing={4}>
        {/* Lab Test Booking Form */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: "2rem" }}>
            <Typography variant="h4" align="center" gutterBottom>
              Book a Lab Test
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Age"
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Mobile Number"
                    name="mobile"
                    type="tel"
                    value={formData.mobile}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    select
                    label="Select Test Type"
                    name="testType"
                    value={formData.testType}
                    onChange={handleChange}
                    fullWidth
                    required
                  >
                    {testOptions.map((test, idx) => (
                      <MenuItem key={idx} value={test}>
                        {test}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Preferred Date"
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    Book Test
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={() => setOpenSnackbar(false)}
            message="Lab test booked successfully!"
          />
        </Grid>

        {/* Booked Lab Test Details */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" align="center" gutterBottom>
            Booked Lab Test Details
          </Typography>
          {bookings.length > 0 ? (
            <Grid container spacing={2}>
              {bookings.map((booking) => (
                <Grid item xs={12} key={booking.id}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle1">
                        <strong>Name:</strong> {booking.name}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Age:</strong> {booking.age}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Mobile:</strong> {booking.mobile}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Test Type:</strong> {booking.testType}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Date:</strong> {booking.date}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleCancelBooking(booking.id)}
                      >
                        Cancel Booking
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography align="center">No lab test bookings yet.</Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default LabTestBooking;
