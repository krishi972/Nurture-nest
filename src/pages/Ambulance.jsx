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
} from "@mui/material";
import { Add, LocalHospital } from "@mui/icons-material";
import { collection, addDoc, serverTimestamp, onSnapshot } from "firebase/firestore";
import { db } from "../config/Firebase";

const EmergencyContactAmbulance = () => {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: "", phone: "" });
  const [ambulanceRequest, setAmbulanceRequest] = useState({
    name: "",
    contact: "",
    location: "",
    reason: "",
  });
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
    const { name, contact, location, reason } = ambulanceRequest;

    if (name && contact && location && reason) {
      setRequestStatus("Pending...");
      try {
        const docRef = await addDoc(collection(db, "ambulanceRequests"), {
          userId: "user-12345", // Replace with dynamic user ID
          patient: name, // Store name as 'patient'
          contact,
          location,
          reason,
          status: "Pending",
          createdAt: serverTimestamp(),
        });
        console.log("Ambulance request added with ID: ", docRef.id);
        setRequestStatus("Ambulance Request Submitted");
        setAmbulanceRequest({ name: "", contact: "", location: "", reason: "" });
      } catch (err) {
        console.error("Error submitting ambulance request: ", err);
        setRequestStatus("Failed to Submit Ambulance Request");
      }
    } else {
      setRequestStatus("Please fill all fields");
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 4,
        p: 3,
        border: "5px solid #1976d2",
        borderRadius: 3,
        boxShadow: 5,
        backgroundColor: "#fff",
      }}
    >
      <Typography variant="h4" align="center" sx={{ fontWeight: "bold", mb: 3 }}>
        Emergency Contact & Ambulance Request
      </Typography>

      {/* Emergency Contacts Section */}
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        Emergency Contacts
      </Typography>
      <Box
        sx={{
          p: 2,
          borderRadius: 2,
          boxShadow: 1,
          border: "2px solid #1976d2",
          mb: 3,
        }}
      >
        <List>
          {contacts.map((contact, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={contact.name}
                secondary={`Phone: ${contact.phone}`}
              />
            </ListItem>
          ))}
        </List>
        <Grid container spacing={2} alignItems="center" sx={{ mt: 2 }}>
          <Grid item xs={5}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={newContact.name}
              onChange={handleContactChange}
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              value={newContact.phone}
              onChange={handleContactChange}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              variant="contained"
              style={{
                background: "linear-gradient(135deg, rgba(0,136,160,1), rgba(0,191,184,1))",
                color: "#fff",
                transition: "0.3s",
              }}
              onClick={addContactTODB}
              startIcon={<Add />}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Ambulance Request Section */}
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        Request Ambulance
      </Typography>
      <Box
        sx={{
          p: 2,
          borderRadius: 2,
          boxShadow: 1,
          border: "2px solid #1976d2",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Patient Name"
              value={ambulanceRequest.name}
              onChange={(e) =>
                setAmbulanceRequest({ ...ambulanceRequest, name: e.target.value })
              }
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Contact Number"
              value={ambulanceRequest.contact}
              onChange={(e) =>
                setAmbulanceRequest({ ...ambulanceRequest, contact: e.target.value })
              }
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>
        <TextField
          fullWidth
          label="Location"
          value={ambulanceRequest.location}
          onChange={(e) =>
            setAmbulanceRequest({ ...ambulanceRequest, location: e.target.value })
          }
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Reason"
          value={ambulanceRequest.reason}
          onChange={(e) =>
            setAmbulanceRequest({ ...ambulanceRequest, reason: e.target.value })
          }
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          sx={{
            backgroundColor: "red",
            color: "white",
            '&:hover': { backgroundColor: "darkred" },
          }}
          fullWidth
          onClick={handleAmbulancechange}
          startIcon={<LocalHospital />}
        >
          Request Ambulance
        </Button>
        {requestStatus && (
          <Typography
            variant="body1"
            align="center"
            sx={{
              mt: 2,
              fontWeight: "bold",
              color:
                requestStatus.includes("Submitted") || requestStatus.includes("Accepted")
                  ? "green"
                  : "red",
            }}
          >
            {requestStatus}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default EmergencyContactAmbulance;
