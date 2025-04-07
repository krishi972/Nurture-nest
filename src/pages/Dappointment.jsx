import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
} from "@mui/material";
import { collection, getDocs, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/Firebase"; // Ensure Firebase is configured

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "appointments")); // ✅ Fetching from correct collection

      if (querySnapshot.empty) {
        console.error("❌ No documents found in appointments collection!");
        return;
      }

      const appointmentData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAppointments(appointmentData);
    } catch (err) {
      console.error("❌ Error fetching appointments:", err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      if (!id) {
        console.error("❌ Invalid Firestore Document ID:", id);
        return;
      }

      const appointmentRef = doc(db, "appointments", id); // ✅ Use the same collection name here
      const docSnap = await getDoc(appointmentRef);

      if (!docSnap.exists()) {
        console.error(`❌ Firestore Document Not Found - ID: ${id}`);
        return;
      }

      await updateDoc(appointmentRef, { status: newStatus }); // ✅ Update status correctly

      console.log("✅ Firestore Updated Successfully!");

      setAppointments((prevAppointments) =>
        prevAppointments.map((app) =>
          app.id === id ? { ...app, status: newStatus } : app
        )
      );
    } catch (err) {
      console.error("❌ Firestore Update Error:", err);
    }
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>Doctor Appointments</Typography>

      {appointments.length === 0 ? (
        <Typography color="error">No appointments available</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Patient</b></TableCell>
                <TableCell><b>Reason</b></TableCell>
                <TableCell><b>Date</b></TableCell>
                <TableCell><b>Time</b></TableCell>
                <TableCell><b>Status</b></TableCell>
                <TableCell><b>Actions</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((app) => {
                const status = app.status?.toLowerCase() || "unknown";

                return (
                  <TableRow key={app.id}>
                    <TableCell>{app.patient || "N/A"}</TableCell>
                    <TableCell>{app.reason || "N/A"}</TableCell>
                    <TableCell>{app.date || "N/A"}</TableCell>
                    <TableCell>{app.time || "N/A"}</TableCell>
                    <TableCell>
                      <Chip
                        label={app.status || "Unknown"}
                        color={status === "pending" ? "warning" : status === "accepted" ? "success" : "error"}
                      />
                    </TableCell>
                    <TableCell>
                      {status === "pending" ? (
                        <>
                          <Button
                            variant="contained"
                            color="success"
                            size="small"
                            onClick={() => handleStatusChange(app.id, "accepted")}
                            sx={{ mr: 1 }}
                          >
                            Accept
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={() => handleStatusChange(app.id, "cancelled")}
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <Typography variant="body2" color="textSecondary">
                          No Actions
                        </Typography>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default DoctorAppointments;
