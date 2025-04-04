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

  // ✅ Fetch Appointments from Firestore
  const fetchAppointments = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "patientreason"));

      if (querySnapshot.empty) {
        console.error("❌ No documents found in patientreason collection!");
        return;
      }

      const appointmentData = querySnapshot.docs.map((doc) => {
        console.log(`🔥 Found Firestore Document - ID: ${doc.id}, Data:`, doc.data());
        return {
          id: doc.id, // ✅ Ensure Firestore document ID is stored correctly
          ...doc.data(),
        };
      });

      setAppointments(appointmentData);
    } catch (err) {
      console.error("❌ Error fetching appointments:", err);
    }
  };

  // 🔄 Fetch appointments when component mounts
  useEffect(() => {
    fetchAppointments();
  }, []);

  // ✅ Update Appointment Status in Firestore
  const handleStatusChange = async (id, newStatus) => {
    try {
      if (!id) {
        console.error("❌ Invalid Firestore Document ID:", id);
        return;
      }

      console.log(`🟢 Updating Firestore Document - ID: ${id}, New Status: ${newStatus}`);

      // ✅ Ensure Firestore document exists before updating
      const appointmentRef = doc(db, "patientreason", id);
      const docSnap = await getDoc(appointmentRef);

      if (!docSnap.exists()) {
        console.error(`❌ Firestore Document Not Found - ID: ${id}`);
        return;
      }

      await updateDoc(appointmentRef, { status: newStatus });

      console.log("✅ Firestore Updated Successfully!");

      // ✅ Update UI immediately
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
                const status = app.status?.toLowerCase() || "unknown"; // Ensure status is always lowercase

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
