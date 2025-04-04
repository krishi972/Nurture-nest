import React, { useState } from "react";
import {
  Container, Typography, Card, CardContent, Button, Grid, TextField, Select, MenuItem, Snackbar, Alert, FormControl, InputLabel
} from "@mui/material";
import { Send, ErrorOutline, Alarm } from "@mui/icons-material";

const NotificationsScreen = () => {
  const [notificationType, setNotificationType] = useState("");
  const [message, setMessage] = useState("");
  const [reminder, setReminder] = useState("");
  const [recipient, setRecipient] = useState("patients");
  const [recipientName, setRecipientName] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSendNotification = () => {
    console.log(`Sending ${notificationType} to ${recipient} (${recipientName}): ${message}`);
    setOpenSnackbar(true);
    setMessage("");
    setRecipientName("");
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        🔔 Notifications & Alerts
      </Typography>

      <Grid container spacing={4}>
        {/* Notification Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                📢 Send Bulk Notification
              </Typography>

              <FormControl fullWidth margin="normal">
                <InputLabel>Notification Type</InputLabel>
                <Select value={notificationType} onChange={(e) => setNotificationType(e.target.value)}>
                  <MenuItem value="SMS">SMS</MenuItem>
                  <MenuItem value="Email">Email</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth margin="normal">
                <InputLabel>Send To</InputLabel>
                <Select value={recipient} onChange={(e) => setRecipient(e.target.value)}>
                  <MenuItem value="patients">Patients</MenuItem>
                  <MenuItem value="doctors">Doctors</MenuItem>
                </Select>
              </FormControl>
              
              <TextField
                label="Patient/Doctor Name"
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

        {/* Alerts Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                ⚠️ System Alerts
              </Typography>
              <Typography variant="body1" color="error" gutterBottom>
                🚨 Server downtime detected. Immediate action required!
              </Typography>

              <Button
                variant="contained"
                color="secondary"
                startIcon={<ErrorOutline />}
                sx={{ mt: 2 }}
              >
                Trigger Alert
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Automated Reminders Section */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                ⏰ Automated Reminders
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
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Notification sent successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default NotificationsScreen;
