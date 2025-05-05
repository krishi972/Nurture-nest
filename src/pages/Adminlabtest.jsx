import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  CircularProgress,
  MenuItem,
  Grid,
} from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../config/Firebase";

const AdminLabTestManagement = () => {
  const [labTests, setLabTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadingId, setUploadingId] = useState(null);

  useEffect(() => {
    const fetchAllLabTests = async () => {
      try {
        const snapshot = await getDocs(collection(db, "labTests"));
        const tests = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          file: null,
        }));
        setLabTests(tests);
      } catch (error) {
        console.error("Error fetching lab tests:", error);
        alert("Failed to fetch lab tests");
      } finally {
        setLoading(false);
      }
    };

    fetchAllLabTests();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await setDoc(
        doc(db, "labTests", id),
        { status: newStatus },
        { merge: true }
      );
      setLabTests((prev) =>
        prev.map((test) =>
          test.id === id ? { ...test, status: newStatus } : test
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    }
  };

  const handleFileChange = (e, id) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setLabTests((prev) =>
        prev.map((test) =>
          test.id === id ? { ...test, file: reader.result } : test
        )
      );

      // this is the Base64 string
    };

    console.log("Selected file:", file.type);
    if (
      file?.type === "image/jpeg" ||
      file?.type === "image/png" ||
      file?.type === "image/jpg"
    ) {
      reader.readAsDataURL(file); // reads the file and converts it to Base64
    } else {
      alert("Please select a valid PDF file");
    }
  };

 const handleUploadReport = async (test) => {
  if (!test.file) {
    alert("Please select an image file to upload");
    return;
  }

  setUploadingId(test.id);

  try {
    await setDoc(
      doc(db, "labTests", test.id),
      {
        reportBase64: test.file, // This is the Base64 string
      },
      { merge: true }
    );

    alert("Image report uploaded and saved to Firestore!");
  } catch (error) {
    console.error("Upload error:", error);
    alert("Failed to upload report");
  } finally {
    setUploadingId(null);
  }
};

  return (
    <Grid container spacing={3} sx={{ p: 3 }}>
      {labTests.map((test) => (
        <Grid item xs={12} md={6} key={test.id}>
          <Card>
            <CardContent>
              <Typography variant="h6">{test.name}</Typography>
              <Typography>
                <strong>Mobile:</strong> {test.mobile}
              </Typography>
              <Typography>
                <strong>Age:</strong> {test.age}
              </Typography>
              <Typography>
                <strong>Date:</strong> {test.date}
              </Typography>
              <Typography>
                <strong>Test Type:</strong> {test.testType}
              </Typography>

              <TextField
                label="Status"
                select
                value={test.status || ""}
                onChange={(e) => handleStatusChange(test.id, e.target.value)}
                fullWidth
                sx={{ my: 2 }}
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </TextField>

              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{ mb: 2 }}
                startIcon={<CloudUpload />}
              >
                Select PDF Report
                <input
                  type="file"
                  accept="application/pdf"
                  hidden
                  onChange={(e) => handleFileChange(e, test.id)}
                />
              </Button>

              {test.file && (
                <Typography sx={{ mb: 1 }}>
                  Selected File: <strong>{test.file.name}</strong>
                </Typography>
              )}

              <Button
                variant="contained"
                color="primary"
                onClick={() => handleUploadReport(test)}
                fullWidth
                disabled={uploadingId === test.id}
              >
                {uploadingId === test.id ? (
                  <CircularProgress size={24} />
                ) : (
                  "Upload Report"
                )}
              </Button>
              {test.reportBase64 && (
  <Button
    variant="outlined"
    color="secondary"
    fullWidth
    sx={{ mt: 2 }}
    onClick={() => {
      const newWindow = window.open();
      newWindow.document.write(`<img src="${test.reportBase64}" style="max-width:100%;"/>`);
      newWindow.document.title = "Lab Report";
    }}
  >
    View Report
  </Button>
)}

            
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default AdminLabTestManagement;
