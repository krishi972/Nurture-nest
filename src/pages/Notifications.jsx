import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Box,
} from "@mui/material";
import { db } from "../config/Firebase"; // adjust if your Firebase path is different
import { collection, getDocs, addDoc } from "firebase/firestore";

const Notifications = () => {
  const [patients, setPatients] = useState([]);
  const [recipientName, setRecipientName] = useState("All");
  const [message, setMessage] = useState("");
  const [reminderMessage, setReminderMessage] = useState("");

  // Fetch patients on component mount
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const patientList = querySnapshot.docs
          .map((doc) => doc.data())
          .filter((user) => user.name); // only those with a 'name' field
        setPatients(patientList);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);

  const handleSendNotification = async () => {
    if (!message) return alert("Please enter a message.");

    try {
      const timestamp = new Date();
      const notificationsRef = collection(db, "notifications");

      if (recipientName === "All") {
        // Send to all patients
        await Promise.all(
          patients.map((patient) =>
            addDoc(notificationsRef, {
              recipientName: patient.name,
              message,
              timestamp,
            })
          )
        );
      } else {
        // Send to selected patient
        await addDoc(notificationsRef, {
          recipientName,
          message,
          timestamp,
        });
      }

      alert("Notification sent successfully!");
      setMessage("");
      setRecipientName("All");
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  };

  const handleSetReminder = async () => {
    if (!reminderMessage) return alert("Please enter a reminder message.");

    try {
      const remindersRef = collection(db, "reminders");
      await addDoc(remindersRef, {
        message: reminderMessage,
        timestamp: new Date(),
      });
      alert("Reminder set successfully!");
      setReminderMessage("");
    } catch (error) {
      console.error("Error setting reminder:", error);
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        🔔 Notifications for Patients
      </Typography>

      <Box mb={4}>
        <Typography variant="h6">📢 Send Notification</Typography>

        <FormControl fullWidth margin="normal">
          <InputLabel>Patient Name</InputLabel>
          <Select
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            label="Patient Name"
          >
            <MenuItem value="All">All</MenuItem>
            {patients.map((patient, index) => (
              <MenuItem key={index} value={patient.name}>
                {patient.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          multiline
          rows={4}
          margin="normal"
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleSendNotification}
        >
          🚀 SEND NOTIFICATION
        </Button>
      </Box>

      <Box>
        <Typography variant="h6">⏰ Set Reminder</Typography>
        <TextField
          fullWidth
          label="Reminder Message"
          value={reminderMessage}
          onChange={(e) => setReminderMessage(e.target.value)}
          margin="normal"
        />
        <Button
          variant="contained"
          color="success"
          onClick={handleSetReminder}
        >
          ⏲️ SET REMINDER
        </Button>
      </Box>
    </Box>
  );
};

export default Notifications;
