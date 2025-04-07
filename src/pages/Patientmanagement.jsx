import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/Firebase";

const PatientManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "patientProfiles"));
        const patientData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          console.log("Fetched Firestore Data:", data); // ✅ Debugging

          return {
            id: doc.id,
            name: data.name || "Unknown",
            age: data.age ? data.age.toString() : "Not Available",
            gender: data.gender || "Not Available",
            contact: data["mobile num"] || data.mobileNum || data.contact || "Not Available",
            medicalHistory: Array.isArray(data["medicalHistory"]) ? data["medicalHistory"] : [],
            medicalReports: Array.isArray(data["medicalReports"]) ? data["medicalReports"] : [],
          };
        });

        console.log("Processed Patients:", patientData); // ✅ Debugging
        setPatients(patientData);
      } catch (err) {
        console.error("Error fetching patients:", err);
      }
    };

    fetchPatients();
  }, []);

  const handleOpenDialog = (patient) => {
    if (!patient) {
      console.error("Error: No patient data found!");
      return;
    }
    console.log("Selected Patient:", patient);
    setSelectedPatient(patient);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPatient(null);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Patient Management
      </Typography>
      <TextField
        label="Search Patients"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Grid container spacing={3}>
        {patients.length > 0 ? (
          patients
            .filter((patient) =>
              patient.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((patient) => (
              <Grid item xs={12} sm={6} md={4} key={patient.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{patient.name}</Typography>
                    <Typography>Contact: {patient.contact}</Typography>
                    <Typography>Age: {patient.age}</Typography>
                    <Typography>Gender: {patient.gender}</Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={() => handleOpenDialog(patient)}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
        ) : (
          <Typography>No patients found</Typography>
        )}
      </Grid>

      {/* ✅ View Details Dialog */}
      {selectedPatient && (
        <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="md">
          <DialogTitle>Patient Profile</DialogTitle>
          <DialogContent>
            <Typography variant="h6">Name: {selectedPatient.name}</Typography>
            <Typography>Contact: {selectedPatient.contact}</Typography>
            <Typography>Age: {selectedPatient.age}</Typography>
            <Typography>Gender: {selectedPatient.gender}</Typography>

            {/* ✅ Medical History */}
            <Typography variant="h6" sx={{ mt: 2 }}>Medical History:</Typography>
            {selectedPatient.medicalHistory.length > 0 ? (
              <Card sx={{ mt: 2 }}>
                <CardContent>
                  {selectedPatient.medicalHistory.map((entry, index) => (
                    <Typography key={index} style={{ margin: "5px 0" }}>
                      - {entry}
                    </Typography>
                  ))}
                </CardContent>
              </Card>
            ) : (
              <Typography>No medical history available</Typography>
            )}

            {/* ✅ Medical Reports */}
            <Typography variant="h6" sx={{ mt: 2 }}>Medical Reports:</Typography>
            {selectedPatient.medicalReports.length > 0 ? (
              <Card sx={{ mt: 2 }}>
                <CardContent>
                  {selectedPatient.medicalReports.map((report, index) => (
                    <Typography key={index} style={{ margin: "5px 0", color: "blue", cursor: "pointer" }}>
                      <a href={report.url} target="_blank" rel="noopener noreferrer">{report.name}</a>
                    </Typography>
                  ))}
                </CardContent>
              </Card>
            ) : (
              <Typography>No medical reports available</Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="secondary">Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
};

export default PatientManagement;
