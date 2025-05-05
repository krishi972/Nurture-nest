import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Avatar,
  Box,
  Link,
} from "@mui/material";
import { Edit, Save } from "@mui/icons-material";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, auth, storage } from "../config/Firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const PatientProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [patient, setPatient] = useState(null);
  const [newRecord, setNewRecord] = useState("");
  const [patientId, setPatientId] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setPatientId(user.uid);
        const patientRef = doc(db, "patientProfiles", user.uid);
        const patientSnap = await getDoc(patientRef);
        if (patientSnap.exists()) {
          setPatient(patientSnap.data());
        } else {
          console.error("No patient profile found!");
        }
      } else {
        console.error("User not logged in.");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const addMedicalRecord = () => {
    if (newRecord.trim()) {
      setPatient({
        ...patient,
        medicalHistory: [...(patient?.medicalHistory || []), newRecord],
      });
      setNewRecord("");
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file || !patientId) return;

    const uniqueName = `${Date.now()}-${Math.floor(Math.random() * 10000)}-${
      file.name
    }`;
    const fileRef = ref(storage, `medicalReports/${patientId}/${uniqueName}`);

    try {
      await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(fileRef);

      const updatedReports = [
        ...(patient?.medicalReports || []),
        {
          name: file.name,
          url: downloadURL,
          storagePath: fileRef.fullPath,
        },
      ];

      setPatient({ ...patient, medicalReports: updatedReports });

      const patientRef = doc(db, "patientProfiles", patientId);
      await setDoc(
        patientRef,
        { medicalReports: updatedReports },
        { merge: true }
      );
    } catch (err) {
      console.error("Upload failed: ", err);
    }
  };

  const handleDeleteReport = async (index) => {
    const updatedReports = [...(patient?.medicalReports || [])];
    const deletedReport = updatedReports.splice(index, 1)[0];

    try {
      // Delete from storage
      if (deletedReport?.storagePath) {
        const reportRef = ref(storage, deletedReport.storagePath);
        await deleteObject(reportRef);
      }

      // Update Firestore
      const updatedPatient = { ...patient, medicalReports: updatedReports };
      setPatient(updatedPatient);

      const patientRef = doc(db, "patientProfiles", patientId);
      await setDoc(
        patientRef,
        { medicalReports: updatedReports },
        { merge: true }
      );

      console.log("Deleted successfully from Firestore and Storage");
    } catch (err) {
      console.error("Error deleting report: ", err);
    }
  };

  const saveProfileToFirestore = async () => {
    if (
      !patient?.name ||
      !patient?.age ||
      !patient?.gender ||
      !patient?.contact
    ) {
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

  const handleDownload = (urlstr) => {
    const link = document.createElement("a");
    link.href = urlstr;
    link.download = "image.png"; // You can change the file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleMedicalHistoryChange = (index, newValue) => {
    const updatedHistory = [...(patient?.medicalHistory || [])];
    updatedHistory[index] = newValue;
    setPatient({ ...patient, medicalHistory: updatedHistory });
  };
  
  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Card sx={{ borderRadius: 3, overflow: "hidden", boxShadow: 4 }}>
        <Box
          sx={{
            background: "linear-gradient(to right, #00796b, #00bfa5)",
            p: 3,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              width: 80,
              height: 80,
              bgcolor: "#fff",
              color: "#00796b",
              fontSize: 32,
              mr: 3,
            }}
          >
            {patient?.name?.[0]?.toUpperCase() || "P"}
          </Avatar>
          <Box>
            <Typography variant="h5" sx={{ color: "#fff", fontWeight: "bold" }}>
              {patient?.name || "Patient Name"}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "#e0f2f1" }}>
              {patient?.condition || "General Patient"}
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

          <Typography variant="h6" sx={{ mt: 4, fontWeight: "bold" }}>
            Medical History
          </Typography>
          <Box
            sx={{ backgroundColor: "#f0f0f0", p: 2, borderRadius: 2, mt: 1 }}
          >
            {patient?.medicalHistory?.map((record, index) => (
  <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
    {isEditing ? (
      <TextField
        fullWidth
        size="small"
        value={record}
        onChange={(e) => handleMedicalHistoryChange(index, e.target.value)}
        sx={{ mr: 2 }}
      />
    ) : (
      <Typography sx={{ flexGrow: 1 }}>{record}</Typography>
    )}

    {isEditing && (
      <>
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={() => handleDeleteMedicalHistory(index)}
          sx={{ ml: 1 }}
        >
          Delete
        </Button>
      </>
    )}
  </Box>
))}

          </Box>

          <Typography variant="h6" sx={{ mt: 4, fontWeight: "bold" }}>
            Medical Reports
          </Typography>
          <Box
            sx={{ backgroundColor: "#f0f0f0", p: 2, borderRadius: 2, mt: 1 }}
          >
            {patient?.medicalReports?.map((report, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 1,
                }}
              >
                {/* <Link href={report.url} target="_blank" rel="noopener noreferrer">
                  {report.name}
                </Link> */}
                {console.log(report)}
                <a
                  onClick={() => {
                    handleDownload(report.url);
                  }}
                  style={{
                    textDecoration: "none",
                    color: "#00796b",
                    fontWeight: "bold",
                    cursor: "pointer",
                    fontSize: "16px",
                  }}
                >
                  {report.name}
                </a>
                {isEditing && (
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleDeleteReport(index)}
                  >
                    Delete
                  </Button>
                )}
              </Box>
            ))}
            {isEditing && (
              <Box sx={{ mt: 2 }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                />
              </Box>
            )}
          </Box>

          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Button
              variant="contained"
              startIcon={isEditing ? <Save /> : <Edit />}
              onClick={
                isEditing ? saveProfileToFirestore : () => setIsEditing(true)
              }
              sx={{
                background: "linear-gradient(to right, #00796b, #00bfa5)",
                px: 4,
              }}
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
