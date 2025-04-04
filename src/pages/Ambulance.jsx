import React, { useState, useEffect } from "react";
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
import { collection, addDoc, serverTimestamp, onSnapshot } from "firebase/firestore";
import { db } from "../config/Firebase";

const EmergencyContactAmbulance = () => {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: "", phone: "" });
  const [ambulanceRequest, setAmbulanceRequest] = useState({ location: "", reason: "" });
  const [requestStatus, setRequestStatus] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "emergencyContacts"), (snapshot) => {
      const fetchedContacts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setContacts(fetchedContacts);
    });

    return () => unsubscribe();
  }, []);

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
  const addContactTODB = async () => {
    if (newContact.name && newContact.phone) {
      try {
        await addDoc(collection(db, "emergencyContacts"), {
          userId: "user-12345", // Replace with dynamic user ID
          name: newContact.name,
          phone: newContact.phone,
          createdAt: serverTimestamp(),
        });
        setNewContact({ name: "", phone: "" });
      } catch (err) {
        console.error("Error adding contact: ", err);
      }
    }
  };
  const handleAmbulancechange = async () => {
    if (ambulanceRequest.location && ambulanceRequest.reason) {
      setRequestStatus("Pending...");
      try {
        const docRef = await addDoc(collection(db, "ambulanceRequests"), {
          userId: "user-12345", // Replace with dynamic user ID
          location: ambulanceRequest.location,
          reason: ambulanceRequest.reason,
          status: "Pending",
          createdAt: serverTimestamp(),
        });
        console.log("Ambulance request added with ID: ", docRef.id);
        setRequestStatus("Ambulance Request Submitted");
      } catch (err) {
        console.error("Error submitting ambulance request: ", err);
        setRequestStatus("Failed to Submit Ambulance Request");
      }
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, p: 3, border: "5px solid #1976d2", borderRadius: 3, boxShadow: 5, backgroundColor: "#fff" }}>
      <Typography variant="h4" align="center" sx={{ fontWeight: "bold", color: "traditional", mb: 3 }}>
        Emergency Contact & Ambulance Request
      </Typography>
      
      {/* Emergency Contacts Section */}
      <Typography variant="h6" sx={{ fontWeight: "bold", color: "traditional" }}>Emergency Contacts</Typography>
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
            <Button variant="contained" style={{
                  
                  background: "linear-gradient(135deg, rgba(0,136,160,1), rgba(0,191,184,1))",
                  color: "#fff",
                  transition: "0.3s",
                }} onClick={addContactTODB} startIcon={<Add />}>Add</Button>
          </Grid>
        </Grid>
      </Box>
      
      {/* Ambulance Request Section */}
      <Typography variant="h6" sx={{ fontWeight: "bold", color: "traditional" }}>Request Ambulance</Typography>
      <Box sx={{ p: 2, borderRadius: 2, boxShadow: 1, border: "2px solid #1976d2" }}>
        <TextField fullWidth label="Location" value={ambulanceRequest.location} onChange={(e) => setAmbulanceRequest({ ...ambulanceRequest, location: e.target.value })} sx={{ mb: 2 }} />
        <TextField fullWidth label="Reason" value={ambulanceRequest.reason} onChange={(e) => setAmbulanceRequest({ ...ambulanceRequest, reason: e.target.value })} sx={{ mb: 2 }} />
        <Button variant="contained" sx={{ backgroundColor: "red", color: "white", '&:hover': { backgroundColor: "darkred" } }} fullWidth onClick={handleAmbulancechange} startIcon={<LocalHospital />}>Request Ambulance</Button>
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
