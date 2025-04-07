import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Add, Delete } from "@mui/icons-material";
import { collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "../config/Firebase";

const DoctorPrescription = () => {
  const [patient, setPatient] = useState({ id: "", name: "" });
  const [patients, setPatients] = useState([]); // State to store fetched patients
  const [medications, setMedications] = useState([{ id: 1, name: "", dosage: "", frequency: "", duration: "" }]);
  const [notes, setNotes] = useState("");
  const [prescriptions, setPrescriptions] = useState([]);

  
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "patientlist"));
        const patientData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: data.id || doc.id,  // Use Firestore document ID if `id` is missing
            name: data.name || "Unknown",
          };
        });
        console.log("Fetched Patients:", patientData); // Debugging
        setPatients(patientData);
      } catch (err) {
        console.error("Error fetching patients:", err);
      }
    };
  
    fetchPatients();
  }, []);
  
  

  // Fetch prescriptions from Firestore
  // useEffect(() => {
  //   const fetchPrescriptions = async () => {
  //     try {
  //       const querySnapshot = await getDocs(collection(db, "prescriptions"));
  //       const prescriptionData = querySnapshot.docs.map(doc => ({
  //         id: doc.id,
  //         ...doc.data(),
  //         date: doc.data().date ? doc.data().date.toDate().toLocaleString() : "N/A",
  //       }));
  //       setPrescriptions(prescriptionData);
  //     } catch (err) {
  //       console.error("Error fetching prescriptions:", err);
  //     }
  //   };

  //   fetchPrescriptions();
  // }, []);
  const fetchPrescriptions = async () => {
    try {
      const prescriptionsRef = collection(db, "prescriptions");
      const querySnapshot = await getDocs(prescriptionsRef);
  
      const prescriptionData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date ? doc.data().date.toDate().toLocaleString() : "N/A",
      }));
  
      console.log("All Prescriptions:", prescriptionData);
      setPrescriptions(prescriptionData);
    } catch (err) {
      console.error("Error fetching prescriptions:", err);
    }
  };
  
  // Run the function when the component mounts
  useEffect(() => {
    fetchPrescriptions();
  }, []);
  

  const handlePatientChange = (event) => {
    const selectedPatient = patients.find(p => p.id === event.target.value);
    setPatient(selectedPatient || { id: "", name: "" });
  };

  const handleMedicationChange = (index, field, value) => {
    const updatedMedications = [...medications];
    updatedMedications[index][field] = value;
    setMedications(updatedMedications);
  };

  const handleAddMedication = () => {
    setMedications([...medications, { id: Date.now(), name: "", dosage: "", frequency: "", duration: "" }]);
  };

  const handleDeleteMedication = (id) => {
    setMedications(medications.filter(med => med.id !== id));
  };

  const handleClear = () => {
    setPatient({ id: "", name: "" });
    setMedications([{ id: 1, name: "", dosage: "", frequency: "", duration: "" }]);
    setNotes("");
  };

  const handleSavePrescription = async () => {
    if (!patient.id || medications.some(med => !med.name || !med.dosage || !med.frequency || !med.duration)) {
      alert("Please fill all the required fields.");
      return;
    }

    const newPrescription = {
      patientId: patient.id,
      patientName: patient.name,
      medications,
      notes,
      date: serverTimestamp(),
    };

    try {
      const docRef = await addDoc(collection(db, "prescriptions"), newPrescription);
      setPrescriptions([...prescriptions, { ...newPrescription, id: docRef.id, date: new Date().toLocaleString() }]); 
      handleClear();
      alert("Prescription saved successfully!");
    } catch (err) {
      console.error("Error saving prescription:", err);
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: "auto", p: 4 }}>
      <Card sx={{ boxShadow: 3, borderRadius: 3, mb: 4 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            E Prescription
          </Typography>

          {/* <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Select Patient</InputLabel>
            <Select value={patient.id} onChange={handlePatientChange}>
              <MenuItem value="">Select Patient</MenuItem>
              {patients.map(p => (
                <MenuItem key={p.id} value={p.id}>
                  {p.name} (ID: {p.id})
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}
          <FormControl fullWidth sx={{ mb: 3 }}>
  <InputLabel>Select Patient</InputLabel>
  <Select value={patient.id} onChange={handlePatientChange}>
    <MenuItem value="">Select Patient</MenuItem>
    {patients.map((p) => (
      <MenuItem key={p.id} value={p.id}>
        {p.name} (ID: {p.id})
      </MenuItem>
    ))}
  </Select>
</FormControl>


          <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
            Medications
          </Typography>

          {medications.map((med, index) => (
            <Box key={med.id} display="flex" gap={2} alignItems="center" sx={{ mb: 2 }}>
              <TextField fullWidth label="Medication" value={med.name} onChange={(e) => handleMedicationChange(index, "name", e.target.value)} />
              <TextField fullWidth label="Dosage" value={med.dosage} onChange={(e) => handleMedicationChange(index, "dosage", e.target.value)} />
              <TextField fullWidth label="Frequency" value={med.frequency} onChange={(e) => handleMedicationChange(index, "frequency", e.target.value)} />
              <TextField fullWidth label="Duration" value={med.duration} onChange={(e) => handleMedicationChange(index, "duration", e.target.value)} />
              <IconButton color="error" onClick={() => handleDeleteMedication(med.id)}>
                <Delete />
              </IconButton>
            </Box>
          ))}

          <Button variant="outlined" color="primary" onClick={handleAddMedication} startIcon={<Add />} sx={{ mb: 3 }}>
            Add Medication
          </Button>

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Additional Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Enter any additional notes or instructions"
            sx={{ mb: 3 }}
          />

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button fullWidth variant="contained" color="primary" onClick={handleSavePrescription}>
                Save Prescription
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button fullWidth variant="outlined" color="secondary" onClick={handleClear}>
                Clear
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Display Prescriptions in Accordions */}
      <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Saved Prescriptions
          </Typography>
          {prescriptions.map((prescription) => (
            <Accordion key={prescription.id} sx={{ mb: 2 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>
                  {prescription.patientName} - {prescription.date}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="h6">Medications:</Typography>
                <List>
                  {prescription.medications.map((med, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={`${med.name} - ${med.dosage}`}
                        secondary={`Frequency: ${med.frequency}, Duration: ${med.duration}`}
                      />
                    </ListItem>
                  ))}
                </List>
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Notes:
                </Typography>
                <Typography>{prescription.notes || "No additional notes."}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
};

export default DoctorPrescription;