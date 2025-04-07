import React, { useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  TextField,
  Snackbar,
} from "@mui/material";
import { Send, Alarm } from "@mui/icons-material";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/Firebase";

const NotificationsScreen = () => {
  const [message, setMessage] = useState("");
  const [reminder, setReminder] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSendNotification = async () => {
    if (!message) {
      alert("Please enter a message!");
      return;
    }

    try {
      await addDoc(collection(db, "notifications"), {
        recipient: "patients",
        recipientName: recipientName || "All",
        message,
        status: "Sent",
        read: false,
        createdAt: serverTimestamp(),
      });

      setOpenSnackbar(true);
      setMessage("");
      setRecipientName("");
    } catch (err) {
      console.error("Error sending notification:", err);
      alert("Failed to send notification.");
    }
  };

  const handleSetReminder = async () => {
    if (!reminder) {
      alert("Please enter a reminder message!");
      return;
    }

    try {
      await addDoc(collection(db, "reminders"), {
        message: reminder,
        createdAt: serverTimestamp(),
      });

      setReminder("");
      alert("Reminder set successfully!");
    } catch (err) {
      console.error("Error setting reminder:", err);
      alert("Failed to set reminder.");
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        🔔 Notifications for Patients
      </Typography>

      <Grid container spacing={4}>
        {/* Notification Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                📢 Send Notification
              </Typography>

              <TextField
                label="Patient Name"
                fullWidth
                margin="normal"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
              />

              <TextField
                label="Message"
                multiline
                rows={4}
                fullWidth
                margin="normal"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              <Button
                variant="contained"
                color="primary"
                startIcon={<Send />}
                onClick={handleSendNotification}
                sx={{ mt: 2 }}
              >
                Send Notification
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Reminder Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                ⏰ Set Reminder
              </Typography>
              <TextField
                label="Reminder Message"
                fullWidth
                margin="normal"
                value={reminder}
                onChange={(e) => setReminder(e.target.value)}
              />

              <Button
                variant="contained"
                color="success"
                startIcon={<Alarm />}
                onClick={handleSetReminder}
                sx={{ mt: 2 }}
              >
                Set Reminder
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Notification sent successfully!"
      />
    </Container>
  );
};

export default NotificationsScreen;
