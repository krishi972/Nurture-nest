import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Box,
  Snackbar
} from "@mui/material";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  updateDoc,
  doc
} from "firebase/firestore";
import { db, storage } from "../config/Firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DescriptionIcon from "@mui/icons-material/Description";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const LabTestManagement = () => {
  const [labTests, setLabTests] = useState([]);
  const [uploadStates, setUploadStates] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const q = query(collection(db, "labTests"), orderBy("createdAt", "desc")); // Make sure createdAt exists
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
      setLabTests(data);
    });
    return () => unsubscribe();
  }, []);

  const handleFileChange = (event, testId) => {
    const file = event.target.files[0];
    console.log("Selected file for", testId, ":", file);
    setUploadStates((prev) => ({
      ...prev,
      [testId]: { ...prev[testId], file }
    }));
  };

  const handleUpload = async (testId) => {
    const uploadState = uploadStates[testId];
    if (!uploadState || !uploadState.file) {
      alert("Please select a file first.");
      return;
    }

    console.log("Starting upload for:", testId);
    console.log("File:", uploadState.file);

    setUploadStates((prev) => ({
      ...prev,
      [testId]: { ...prev[testId], uploading: true }
    }));

    const fileRef = ref(storage, `labReports/${testId}/${uploadState.file.name}`);

    try {
      await uploadBytes(fileRef, uploadState.file);
      console.log("✅ File uploaded to storage");

      const downloadURL = await getDownloadURL(fileRef);
      console.log("✅ Download URL:", downloadURL);

      await updateDoc(doc(db, "labTests", testId), { reportURL: downloadURL });
      console.log("✅ Firestore document updated");

      setSnackbarMessage("Report uploaded successfully!");
      setSnackbarOpen(true);
      setUploadStates((prev) => ({
        ...prev,
        [testId]: { file: null, uploading: false }
      }));
    } catch (error) {
      console.error("❌ Error uploading report:", error);
      setSnackbarMessage("Failed to upload report. Try again.");
      setSnackbarOpen(true);
      setUploadStates((prev) => ({
        ...prev,
        [testId]: { ...prev[testId], uploading: false }
      }));
    }
  };

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Typography
        variant="h3"
        fontWeight="bold"
        gutterBottom
        align="center"
        sx={{ color: "#0d47a1", mb: 4 }}
      >
        Lab Test Management
      </Typography>
      <Grid container spacing={4}>
        {labTests.map((test) => (
          <Grid item xs={12} md={6} key={test.id}>
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: 6,
                bgcolor: "#e3f2fd",
                transition: "transform 0.3s ease",
                "&:hover": { transform: "scale(1.02)" }
              }}
            >
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6" color="primary">
                    <strong>{test.name}</strong>
                  </Typography>
                  {test.reportURL ? (
                    <CheckCircleIcon color="success" />
                  ) : (
                    <DescriptionIcon color="disabled" />
                  )}
                </Box>
                <Typography sx={{ mt: 1 }}>
                  <strong>Test Type:</strong> {test.testType}
                </Typography>
                <Typography>
                  <strong>Date:</strong> {test.date}
                </Typography>
                <Typography>
                  <strong>Status:</strong> {test.status}
                </Typography>
                {test.reportURL ? (
                  <Button
                    variant="contained"
                    color="success"
                   
                    sx={{ mt: 2, fontWeight: "bold" }}
                  >
                    View Report
                  </Button>
                ) : (
                  <Box mt={2}>
                    <TextField
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFileChange(e, test.id)}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      startIcon={<CloudUploadIcon />}
                      onClick={() => handleUpload(test.id)}
                      disabled={uploadStates[test.id]?.uploading}
                      sx={{ mt: 2, fontWeight: "bold" }}
                    >
                      {uploadStates[test.id]?.uploading ? (
                        <CircularProgress size={24} />
                      ) : (
                        "Upload Report"
                      )}
                    </Button>
                   
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default LabTestManagement;
