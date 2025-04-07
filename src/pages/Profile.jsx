import React, { useState, useEffect } from "react";
import { Container, Card, CardContent, Typography, TextField, Button, Grid, Avatar, Box, Link } from "@mui/material";
import { Edit, Save } from "@mui/icons-material";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../config/Firebase";

const PatientProfile = () => {
  const patientId = "QbqcMY7r2xfyBZ0lwnMY2aNo3sf2"; // Replace with actual auth ID
  const [isEditing, setIsEditing] = useState(false);
  const [patient, setPatient] = useState(null);
  const [newRecord, setNewRecord] = useState("");

  useEffect(() => {
    const fetchPatientProfile = async () => {
      try {
        const patientRef = doc(db, "patientProfiles", patientId);
        const patientSnap = await getDoc(patientRef);
        if (patientSnap.exists()) {
          setPatient(patientSnap.data());
        } else {
          console.error("No patient profile found!");
        }
      } catch (err) {
        console.error("Error fetching patient profile:", err);
      }
    };

    fetchPatientProfile();
  }, [patientId]);

  const handleChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const addMedicalRecord = () => {
    if (newRecord.trim()) {
      setPatient({ ...patient, medicalHistory: [...(patient?.medicalHistory || []), newRecord] });
      setNewRecord("");
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setPatient({
        ...patient,
        medicalReports: [...(patient?.medicalReports || []), { name: file.name, url: fileURL }]
      });
    }
  };

  const saveProfileToFirestore = async () => {
    if (!patient?.name || !patient?.age || !patient?.gender || !patient?.contact) {
      alert("Please fill in all required fields!");
      return;
    }

    try {
      const patientRef = doc(db, "patientProfiles", patientId);
      await setDoc(patientRef, patient, { merge: true });
      setIsEditing(false);
    } catch (err) {
      console.error("Error saving profile: ", err);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Card sx={{ borderRadius: 3, overflow: "hidden", boxShadow: 4 }}>
        <Box sx={{ background: "linear-gradient(to right, #00796b, #00bfa5)", p: 3, display: "flex", alignItems: "center" }}>
          <Avatar sx={{ width: 80, height: 80, bgcolor: "#fff", color: "#00796b", fontSize: 32, mr: 3 }}>
            {patient?.name?.[0]?.toUpperCase() || "P"}
          </Avatar>
          <Box>
            <Typography variant="h5" sx={{ color: "#fff", fontWeight: "bold" }}>
              {patient?.name || "Patient Name"}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "#e0f2f1" }}>
              {patient?.condition || "General Patient"} {/* optional */}
            </Typography>
          </Box>
        </Box>

        <CardContent>
          <Grid container spacing={3}>
            {["name", "email", "age", "gender", "contact"].map((field) => (
              <Grid item xs={12} sm={6} key={field}>
                <TextField
                  fullWidth
                  name={field}
                  label={field[0].toUpperCase() + field.slice(1)}
                  value={patient?.[field] || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </Grid>
            ))}
          </Grid>

          <Typography variant="h6" sx={{ mt: 4, fontWeight: "bold" }}>Medical History</Typography>
          <Box sx={{ backgroundColor: "#f0f0f0", p: 2, borderRadius: 2, mt: 1 }}>
            <ul>
              {patient?.medicalHistory?.map((record, index) => (
                <li key={index}>{record}</li>
              ))}
            </ul>
            {isEditing && (
              <>
                <TextField
                  fullWidth
                  size="small"
                  label="Add Medical History Record"
                  value={newRecord}
                  onChange={(e) => setNewRecord(e.target.value)}
                  sx={{ mt: 2 }}
                />
                <Button onClick={addMedicalRecord} sx={{ mt: 1, background: "#00bfa5", color: "#fff" }}>
                  Add Record
                </Button>
              </>
            )}
          </Box>

          <Typography variant="h6" sx={{ mt: 4, fontWeight: "bold" }}>Medical Reports</Typography>
          <Box sx={{ backgroundColor: "#f0f0f0", p: 2, borderRadius: 2, mt: 1 }}>
            <ul>
              {patient?.medicalReports?.map((report, index) => (
                <li key={index}>
                  <Link href={report.url} target="_blank" rel="noopener">{report.name}</Link>
                </li>
              ))}
            </ul>
            {isEditing && (
              <Box sx={{ mt: 2 }}>
                <input type="file" onChange={handleFileUpload} />
              </Box>
            )}
          </Box>

          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Button
              variant="contained"
              startIcon={isEditing ? <Save /> : <Edit />}
              onClick={isEditing ? saveProfileToFirestore : () => setIsEditing(true)}
              sx={{ background: "linear-gradient(to right, #00796b, #00bfa5)", px: 4 }}
            >
              {isEditing ? "Save Profile" : "Edit Profile"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default PatientProfile;
