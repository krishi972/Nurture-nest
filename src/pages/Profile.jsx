import React, { useState } from "react";
import { Container, Card, CardContent, Typography, TextField, Button, Grid, Avatar, Box, Link } from "@mui/material";
import { Edit, Save } from "@mui/icons-material";

const PatientProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [patient, setPatient] = useState({
    name: "",
    age: "",
    gender: "",
    contact: "",
    address: "",
    medicalHistory: [],
    medicalReports: []
  });

  const [newRecord, setNewRecord] = useState("");

  const handleChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const addMedicalRecord = () => {
    if (newRecord.trim()) {
      setPatient({ ...patient, medicalHistory: [...patient.medicalHistory, newRecord] });
      setNewRecord("");
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setPatient({ ...patient, medicalReports: [...patient.medicalReports, { name: file.name, url: fileURL }] });
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, p: 2 }}>
      <Card sx={{ p: 3, boxShadow: 5, borderRadius: 3, backgroundColor: "#f9f9f9", border: "3px solid #1976d2" }}>
        <CardContent>
          <Typography variant="h4" align="center" sx={{ fontWeight: "bold", color: "primary.main", mb: 3 }}>
            Patient Profile
          </Typography>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} sm={3} sx={{ display: "flex", justifyContent: "center" }}>
              <Avatar sx={{ width: 100, height: 100, bgcolor: "primary.main", fontSize: 36 }}>
                {patient.name ? patient.name[0] : "P"}
              </Avatar>
            </Grid>
            <Grid item xs={12} sm={9}>
              {isEditing ? (
                <>
                  <TextField name="name" value={patient.name} onChange={handleChange} fullWidth label="Name" variant="outlined" sx={{ mb: 2 }} />
                  <TextField name="age" value={patient.age} onChange={handleChange} fullWidth label="Age" variant="outlined" sx={{ mb: 2 }} />
                  <TextField name="gender" value={patient.gender} onChange={handleChange} fullWidth label="Gender" variant="outlined" sx={{ mb: 2 }} />
                  <TextField name="contact" value={patient.contact} onChange={handleChange} fullWidth label="Contact" variant="outlined" sx={{ mb: 2 }} />
                  <TextField name="address" value={patient.address} onChange={handleChange} fullWidth label="Address" variant="outlined" sx={{ mb: 2 }} />
                </>
              ) : (
                <>
                  <Typography variant="h6">Name: {patient.name}</Typography>
                  <Typography variant="body1">Age: {patient.age}</Typography>
                  <Typography variant="body1">Gender: {patient.gender}</Typography>
                  <Typography variant="body1">Contact: {patient.contact}</Typography>
                  <Typography variant="body1">Address: {patient.address}</Typography>
                </>
              )}
            </Grid>
          </Grid>
          <Typography variant="h6" sx={{ mt: 3, fontWeight: "bold", color: "primary.main" }}>Medical History</Typography>
          <Box sx={{ backgroundColor: "#fff", p: 2, borderRadius: 2, boxShadow: 1, border: "2px solid #1976d2" }}>
            <ul>
              {patient.medicalHistory.map((record, index) => (
                <li key={index}>{record}</li>
              ))}
            </ul>
            {isEditing && (
              <>
                <input type="file" onChange={handleFileUpload} style={{ marginTop: "10px" }} />
                <TextField
                  fullWidth
                  size="small"
                  label="Add Medical History Record"
                  value={newRecord}
                  onChange={(e) => setNewRecord(e.target.value)}
                  sx={{ mt: 2 }}
                />
                <Button variant="contained" sx={{ mt: 2 }} onClick={addMedicalRecord}>
                  Add Record
                </Button>
              </>
            )}
          </Box>
          <Typography variant="h6" sx={{ mt: 3, fontWeight: "bold", color: "primary.main" }}>Medical Reports</Typography>
          <Box sx={{ backgroundColor: "#fff", p: 2, borderRadius: 2, boxShadow: 1, border: "2px solid #1976d2" }}>
            <ul>
              {patient.medicalReports.map((report, index) => (
                <li key={index}>
                  <Link href={report.url} target="_blank" rel="noopener noreferrer">{report.name}</Link>
                </li>
              ))}
            </ul>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            {isEditing ? (
              <Button
                variant="contained"
                startIcon={<Save />}
                sx={{ mt: 2, px: 4 }}
                onClick={() => setIsEditing(false)}
              >
                Save Profile
              </Button>
            ) : (
              <Button
                variant="contained"
                startIcon={<Edit />}
                sx={{ mt: 2, px: 4 }}
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default PatientProfile;
