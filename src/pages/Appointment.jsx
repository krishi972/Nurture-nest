import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/Firebase";



const AppointmentBooking = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    department: "",
    doctor: "",
    date: "",
    time: "",
  });
  const [appointments, setAppointments] = useState([]);

  const departments = ["Cardiology", "Dermatology", "Neurology", "Orthopedics"];
  const doctors = {
    Cardiology: ["Dr. Smit Sharma", "Dr. Sakshi Gohel"],
    Dermatology: ["Dr. Seema Jain", "Dr. Aprna Joshi"],
    Neurology: ["Dr. Rakesh Gayakvad", "Dr. Rohini Patel"],
    Orthopedics: ["Dr. Anand Birla", "Dr. Mahima Birla"],
  };

  const formatTime = (time) => {
    if (!time) return "";
    const [hour, minute] = time.split(":");
    const hourInt = parseInt(hour, 10);
    const ampm = hourInt >= 12 ? "PM" : "AM";
    const formattedHour = hourInt % 12 || 12;
    return `${formattedHour}:${minute} ${ampm}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "age") {
      const ageValue = value.replace(/[^0-9]/g, "");
      if (ageValue === "" || (parseInt(ageValue) >= 1 && parseInt(ageValue) <= 100)) {
        setFormData({ ...formData, [name]: ageValue });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Save appointment data to Firestore
      const docRef = await addDoc(collection(db, "appointments"), {
        ...formData,
        age: parseInt(formData.age), // Ensure age is stored as a number
        createdAt: serverTimestamp(), // Add a timestamp
      });

      console.log("Appointment added with ID:", docRef.id); // Log the document ID
      console.log("Appointment data:", formData); // Log the appointment data

      // Update local state
      setAppointments([...appointments, formData]);
      setFormData({
        name: "",
        email: "",
        phone: "",
        age: "",
        department: "",
        doctor: "",
        date: "",
        time: "",
      });
    } catch (err) {
      console.error("Error adding appointment:", err);
    }
  };

  const handleCancel = (index) => {
    setAppointments(appointments.filter((_, i) => i !== index));
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: "2rem" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} style={{ padding: "2rem", height: "100%" }}>
            <Typography variant="h5" gutterBottom>
              Book an Appointment
            </Typography>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
              <TextField label="Full Name" name="name" value={formData.name} onChange={handleChange} required margin="normal" />
              <TextField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} required margin="normal" />
              <TextField label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} required margin="normal" />
              <TextField label="Age" type="text" name="age" value={formData.age} onChange={handleChange} required margin="normal" inputProps={{ maxLength: 3 }} />
              <FormControl margin="normal" required>
                <InputLabel>Department</InputLabel>
                <Select name="department" value={formData.department} onChange={handleChange}>
                  {departments.map((dept) => (
                    <MenuItem key={dept} value={dept}>
                      {dept}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl margin="normal" required disabled={!formData.department}>
                <InputLabel>Doctor</InputLabel>
                <Select name="doctor" value={formData.doctor} onChange={handleChange}>
                  {formData.department && doctors[formData.department]?.map((doc) => (
                    <MenuItem key={doc} value={doc}>
                      {doc}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField label="Date" type="date" name="date" value={formData.date} onChange={handleChange} required margin="normal" InputLabelProps={{ shrink: true }} />
              <TextField label="Time" type="time" name="time" value={formData.time} onChange={handleChange} required margin="normal" InputLabelProps={{ shrink: true }} />

              {/* Buttons with Custom Colors */}
              <Button
                type="submit"
                variant="contained"
                style={{
                  marginTop: "1rem",
                  background: "linear-gradient(135deg, rgba(0,136,160,1), rgba(0,191,184,1))",
                  color: "#fff",
                  transition: "0.3s",
                }}
                onMouseOver={(e) => e.target.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.3)"}
                onMouseOut={(e) => e.target.style.boxShadow = "none"}
              >
                Book Appointment
              </Button>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          {appointments.map((appointment, index) => (
            <Card key={index} elevation={3} style={{ padding: "1.5rem", marginBottom: "1rem" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Appointment Details
                </Typography>
                <Typography><strong>Name:</strong> {appointment.name}</Typography>
                <Typography><strong>Email:</strong> {appointment.email}</Typography>
                <Typography><strong>Phone:</strong> {appointment.phone}</Typography>
                <Typography><strong>Age:</strong> {appointment.age}</Typography>
                <Typography><strong>Department:</strong> {appointment.department}</Typography>
                <Typography><strong>Doctor:</strong> {appointment.doctor}</Typography>
                <Typography><strong>Date:</strong> {appointment.date}</Typography>
                <Typography><strong>Time:</strong> {formatTime(appointment.time)}</Typography>

                {/* Cancel Button with Custom Colors */}
                <Button
                  variant="contained"
                  style={{
                    marginTop: "1rem",
                    background: "linear-gradient(135deg, rgba(0,136,160,1), rgba(0,191,184,1))",
                    color: "#fff",
                    transition: "0.3s",
                  }}
                  onMouseOver={(e) => e.target.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.3)"}
                  onMouseOut={(e) => e.target.style.boxShadow = "none"}
                  onClick={() => handleCancel(index)}
                >
                  Cancel Appointment
                </Button>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default AppointmentBooking;
