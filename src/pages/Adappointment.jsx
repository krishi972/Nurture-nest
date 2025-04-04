import React, { useState, useEffect } from "react";
import {
  Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogTitle
} from "@mui/material";
import { Check, Close } from "@mui/icons-material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import { collection, getDocs, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/Firebase"; // Ensure Firebase is configured

const AppointmentManagementScreen = () => {
  const [appointments, setAppointments] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [rescheduleDialog, setRescheduleDialog] = useState({ open: false, id: null, newDate: null, newTime: null });

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "appointments"));
        const appointmentData = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Firestore document ID
          ...doc.data(),
        }));
        setAppointments(appointmentData);
      } catch (err) {
        console.error("Error fetching appointments:", err);
      }
    };

    fetchAppointments();
  }, []);

  const handleSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const openRescheduleDialog = (id) => {
    setRescheduleDialog({ open: true, id, newDate: null, newTime: null });
  };

  const handleReschedule = () => {
    setAppointments(appointments.map((appt) =>
      appt.id === rescheduleDialog.id
        ? { ...appt, date: dayjs(rescheduleDialog.newDate).format("YYYY-MM-DD"), time: dayjs(rescheduleDialog.newTime).format("hh:mm A"), status: "Rescheduled" }
        : appt
    ));
    setRescheduleDialog({ open: false, id: null, newDate: null, newTime: null });
    handleSnackbar("Appointment rescheduled successfully", "info");
  };

  const handleApprove = async (id) => {
    try {
      const appointmentRef = doc(db, "appointments", id); // Reference to the Firestore document
      await updateDoc(appointmentRef, {
        status: "Approved", // Update the status field to "Approved"
        updatedAt: serverTimestamp(), // Update the timestamp
      });

      // Update local state
      setAppointments((prev) =>
        prev.map((appt) => (appt.id === id ? { ...appt, status: "Approved" } : appt))
      );
      handleSnackbar("Appointment approved", "success");
    } catch (err) {
      console.error("Error approving appointment:", err);
      handleSnackbar("Failed to approve appointment", "error");
    }
  };

  const handleReject = async (id) => {
    try {
      const appointmentRef = doc(db, "appointments", id); // Reference to the Firestore document
      await updateDoc(appointmentRef, {
        status: "Rejected", // Update the status field to "Rejected"
        updatedAt: serverTimestamp(), // Update the timestamp
      });

      // Update local state
      setAppointments((prev) =>
        prev.map((appt) => (appt.id === id ? { ...appt, status: "Rejected" } : appt))
      );
      handleSnackbar("Appointment rejected", "error");
    } catch (err) {
      console.error("Error rejecting appointment:", err);
      handleSnackbar("Failed to reject appointment", "error");
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>📅 Appointment Management</Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Patient</TableCell>
                <TableCell>Doctor</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((appt) => (
                <TableRow key={appt.id}>
                  <TableCell>{appt.patient}</TableCell>
                  <TableCell>{appt.doctor}</TableCell>
                  <TableCell>{appt.date}</TableCell>
                  <TableCell>{appt.time}</TableCell>
                  <TableCell>{appt.status}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="info" onClick={() => openRescheduleDialog(appt.id)} sx={{ mr: 1 }}>Reschedule</Button>
                    <Button variant="contained" color="success" startIcon={<Check />} onClick={() => handleApprove(appt.id)} sx={{ mr: 1 }}>Approve</Button>
                    <Button variant="contained" color="error" startIcon={<Close />} onClick={() => handleReject(appt.id)}>Reject</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Reschedule Dialog */}
        <Dialog open={rescheduleDialog.open} onClose={() => setRescheduleDialog({ open: false, id: null, newDate: null, newTime: null })}>
          <DialogTitle>Reschedule Appointment</DialogTitle>
          <DialogContent>
            <DatePicker
              label="New Date"
              value={rescheduleDialog.newDate}
              onChange={(newDate) => setRescheduleDialog({ ...rescheduleDialog, newDate })}
              disablePast
              views={["year", "month", "day"]}
              openTo="day"
              fullWidth
              sx={{ mt: 2, width: "100%" }}
            />
            <TimePicker
              label="New Time"
              value={rescheduleDialog.newTime}
              onChange={(newTime) => setRescheduleDialog({ ...rescheduleDialog, newTime })}
              fullWidth
              sx={{ mt: 2, width: "100%" }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setRescheduleDialog({ open: false, id: null, newDate: null, newTime: null })} color="secondary">Cancel</Button>
            <Button onClick={handleReschedule} color="primary" variant="contained" disabled={!rescheduleDialog.newDate || !rescheduleDialog.newTime}>Confirm</Button>
          </DialogActions>
        </Dialog>

        <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </LocalizationProvider>
  );
};

export default AppointmentManagementScreen;
