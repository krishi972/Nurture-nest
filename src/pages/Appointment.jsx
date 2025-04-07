import React, { useState, useEffect } from "react";
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
import {
  collection,
  doc,
  setDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../config/Firebase";

const AppointmentBooking = () => {
  const [formData, setFormData] = useState({
    patient: "",
    phone: "",
    age: "",
    department: "",
    doctor: "",
    date: "",
    time: "",
    reason: "", // added field
  });

  const [appointments, setAppointments] = useState([]);

  const departments = ["Cardiology", "Dermatology", "Neurology", "Orthopedics"];
  const doctors = {
    Cardiology: ["Dr. Smit Sharma", "Dr. Sakshi Gohel"],
    Dermatology: ["Dr. Seema Jain", "Dr. Aprna Joshi"],
    Neurology: ["Dr. Rakesh Gayakvad", "Dr. Rohini Patel"],
    Orthopedics: ["Dr. Anand Birla", "Dr. Mahima Birla"],
  };

  useEffect(() => {
    const q = query(collection(db, "appointments"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), appointmentId: doc.id }));
      setAppointments(data);
    });
    return () => unsubscribe();
  }, []);

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
      const newDocRef = doc(collection(db, "appointments"));
      const appointmentData = {
        ...formData,
        age: parseInt(formData.age),
        status: "Pending",
        createdAt: serverTimestamp(),
        appointmentId: newDocRef.id,
      };

      await setDoc(newDocRef, appointmentData);

      setFormData({
        patient: "",
        phone: "",
        age: "",
        department: "",
        doctor: "",
        date: "",
        time: "",
        reason: "",
      });
    } catch (err) {
      console.error("Error adding appointment:", err);
    }
  };

  const handleCancel = async (appointmentId) => {
    try {
      await deleteDoc(doc(db, "appointments", appointmentId));
      setAppointments((prev) =>
        prev.filter((appointment) => appointment.appointmentId !== appointmentId)
      );
      console.log("Appointment successfully cancelled and removed.");
    } catch (err) {
      console.error("Error cancelling appointment:", err);
    }
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
              <TextField label="Patient Name" name="patient" value={formData.patient} onChange={handleChange} required margin="normal" />
              <TextField label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} required margin="normal" />
              <TextField label="Age" type="text" name="age" value={formData.age} onChange={handleChange} required margin="normal" inputProps={{ maxLength: 3 }} />
              <FormControl margin="normal" required>
                <InputLabel>Department</InputLabel>
                <Select name="department" value={formData.department} onChange={handleChange}>
                  {departments.map((dept) => (
                    <MenuItem key={dept} value={dept}>{dept}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl margin="normal" required disabled={!formData.department}>
                <InputLabel>Doctor</InputLabel>
                <Select name="doctor" value={formData.doctor} onChange={handleChange}>
                  {formData.department &&
                    doctors[formData.department]?.map((doc) => (
                      <MenuItem key={doc} value={doc}>{doc}</MenuItem>
                    ))}
                </Select>
              </FormControl>
              <TextField label="Date" type="date" name="date" value={formData.date} onChange={handleChange} required margin="normal" InputLabelProps={{ shrink: true }} />
              <TextField label="Time" type="time" name="time" value={formData.time} onChange={handleChange} required margin="normal" InputLabelProps={{ shrink: true }} />
              <TextField
                label="Reason for Appointment"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                required
                margin="normal"
                multiline
                rows={3}
              />
              <Button
                type="submit"
                variant="contained"
                style={{ marginTop: "1rem", background: "linear-gradient(135deg, rgba(0,136,160,1), rgba(0,191,184,1))", color: "#fff" }}
              >
                Book Appointment
              </Button>
            </form>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          {appointments.map((appointment) => (
            <Card key={appointment.appointmentId} elevation={3} style={{ padding: "1.5rem", marginBottom: "1rem" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Appointment Details
                </Typography>
                <Typography><strong>ID:</strong> {appointment.appointmentId}</Typography>
                <Typography><strong>Patient:</strong> {appointment.patient}</Typography>
                <Typography><strong>Phone:</strong> {appointment.phone}</Typography>
                <Typography><strong>Age:</strong> {appointment.age}</Typography>
                <Typography><strong>Department:</strong> {appointment.department}</Typography>
                <Typography><strong>Doctor:</strong> {appointment.doctor}</Typography>
                <Typography><strong>Date:</strong> {appointment.date}</Typography>
                <Typography><strong>Time:</strong> {formatTime(appointment.time)}</Typography>
                <Typography><strong>Reason:</strong> {appointment.reason}</Typography>
                <Typography>
                  <strong>Status:</strong>{" "}
                  <span style={{ color: appointment.status === "approved" ? "green" : appointment.status === "rejected" ? "red" : "#ff9800" }}>
                    {appointment.status ? appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1) : "Pending"}
                  </span>
                </Typography>
                <Button
                  variant="contained"
                  style={{
                    marginTop: "1rem",
                    background: "linear-gradient(135deg, rgba(0,136,160,1), rgba(0,191,184,1))",
                    color: "#fff",
                  }}
                  onClick={() => handleCancel(appointment.appointmentId)}
                >
                  Cancel
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
