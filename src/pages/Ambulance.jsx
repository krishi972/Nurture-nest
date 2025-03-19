import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
} from "@mui/material";
import { Add, LocalHospital } from "@mui/icons-material";

const EmergencyContactAmbulance = () => {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: "", phone: "" });
  const [ambulanceRequest, setAmbulanceRequest] = useState({ location: "", reason: "" });
  const [requestStatus, setRequestStatus] = useState("");

  const handleContactChange = (e) => {
    setNewContact({ ...newContact, [e.target.name]: e.target.value });
  };

  const addContact = () => {
    if (newContact.name && newContact.phone) {
      setContacts([...contacts, newContact]);
      setNewContact({ name: "", phone: "" });
    }
  };

  const handleAmbulanceRequest = () => {
    setRequestStatus("Pending...");
    setTimeout(() => {
      const isAccepted = Math.random() > 0.5; // Simulating response
      setRequestStatus(isAccepted ? "Ambulance Request Accepted" : "Ambulance Request Rejected");
    }, 2000);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, p: 3, border: "5px solid #1976d2", borderRadius: 3, boxShadow: 5, backgroundColor: "#fff" }}>
      <Typography variant="h4" align="center" sx={{ fontWeight: "bold", color: "red", mb: 3 }}>
        Emergency Contact & Ambulance Request
      </Typography>
      
      {/* Emergency Contacts Section */}
      <Typography variant="h6" sx={{ fontWeight: "bold", color: "primary.main" }}>Emergency Contacts</Typography>
      <Box sx={{ p: 2, borderRadius: 2, boxShadow: 1, border: "2px solid #1976d2", mb: 3 }}>
        <List>
          {contacts.map((contact, index) => (
            <ListItem key={index}>
              <ListItemText primary={contact.name} secondary={`Phone: ${contact.phone}`} />
            </ListItem>
          ))}
        </List>
        <Grid container spacing={2} alignItems="center" sx={{ mt: 2 }}>
          <Grid item xs={5}>
            <TextField fullWidth label="Name" name="name" value={newContact.name} onChange={handleContactChange} />
          </Grid>
          <Grid item xs={5}>
            <TextField fullWidth label="Phone Number" name="phone" value={newContact.phone} onChange={handleContactChange} />
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" color="primary" onClick={addContact} startIcon={<Add />}>Add</Button>
          </Grid>
        </Grid>
      </Box>
      
      {/* Ambulance Request Section */}
      <Typography variant="h6" sx={{ fontWeight: "bold", color: "primary.main" }}>Request Ambulance</Typography>
      <Box sx={{ p: 2, borderRadius: 2, boxShadow: 1, border: "2px solid #1976d2" }}>
        <TextField fullWidth label="Location" value={ambulanceRequest.location} onChange={(e) => setAmbulanceRequest({ ...ambulanceRequest, location: e.target.value })} sx={{ mb: 2 }} />
        <TextField fullWidth label="Reason" value={ambulanceRequest.reason} onChange={(e) => setAmbulanceRequest({ ...ambulanceRequest, reason: e.target.value })} sx={{ mb: 2 }} />
        <Button variant="contained" sx={{ backgroundColor: "red", color: "white", '&:hover': { backgroundColor: "darkred" } }} fullWidth onClick={handleAmbulanceRequest} startIcon={<LocalHospital />}>Request Ambulance</Button>
        {requestStatus && (
          <Typography variant="body1" align="center" sx={{ mt: 2, fontWeight: "bold", color: requestStatus.includes("Accepted") ? "green" : "red" }}>
            {requestStatus}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default EmergencyContactAmbulance;
