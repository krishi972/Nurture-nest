import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  CircularProgress,
  Avatar,
  Stack,
} from "@mui/material";
import { auth, db } from "../config/Firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Edit, Save, Cancel } from "@mui/icons-material";

const DoctorProfile = () => {
  const doctorId = "pMZbLlra2mfUNIt5evqdRTQ1xNU2"
  const [doctorData, setDoctorData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchDoctorData = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const docRef = doc(db, "doctors", doctorId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setDoctorData(docSnap.data());
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching doctor data:", error);
    }
  };

  useEffect(() => {
    fetchDoctorData();
  }, []);

  const handleChange = (e) => {
    setDoctorData({ ...doctorData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const docRef = doc(db, "doctors", user.uid);
      await updateDoc(docRef, doctorData);

      setEditMode(false);
      alert("✅ Profile updated successfully.");
    } catch (err) {
      console.error("❌ Error updating profile:", err);
      alert("Failed to update profile: " + err.message);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: 4,
        minHeight: "100vh",
        background: "linear-gradient(to right, #e0f7fa, #f1f8e9)",
      }}
    >
      <Card
        sx={{
          maxWidth: 900,
          margin: "auto",
          boxShadow: 10,
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            background: "linear-gradient(to right, #00838f, #00695c)",
            color: "white",
            py: 4,
            px: 3,
            display: "flex",
            alignItems: "center",
            gap: 3,
          }}
        >
          <Avatar
            sx={{
              width: 100,
              height: 100,
              fontSize: 40,
              bgcolor: "#ffffff33",
              border: "2px solid white",
            }}
          >
            {doctorData?.fullName?.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="h4" fontWeight={600}>
              Dr. {doctorData?.fullName}
            </Typography>
            <Typography variant="subtitle1">
              {doctorData?.specialization} | {doctorData?.department}
            </Typography>
          </Box>
        </Box>

        <CardContent sx={{ p: 4 }}>
          <Grid container spacing={3}>
            {[
              { label: "Full Name", name: "fullName" },
              { label: "Email", name: "email" },
              { label: "Mobile Number", name: "mobile" },
              { label: "Age", name: "age" },
              { label: "Gender", name: "gender" },
              { label: "License Number", name: "licenseNumber" },
              { label: "Specialization", name: "specialization" },
              { label: "Department", name: "department" },
            ].map((field) => (
              <Grid item xs={12} sm={6} key={field.name}>
                <TextField
                  label={field.label}
                  name={field.name}
                  value={doctorData?.[field.name] || ""}
                  onChange={handleChange}
                  fullWidth
                  InputProps={{ readOnly: !editMode }}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root.Mui-disabled': {
                      backgroundColor: "#f4f4f4",
                    },
                  }}
                />
              </Grid>
            ))}
          </Grid>

          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            mt={5}
            flexWrap="wrap"
          >
            {!editMode ? (
              <Button
                variant="contained"
                size="large"
                startIcon={<Edit />}
                onClick={() => setEditMode(true)}
                sx={{
                  background: "linear-gradient(to right, #00838f, #00695c)",
                  color: "#fff",
                }}
              >
                Edit Profile
              </Button>
            ) : (
              <>
                <Button
                  variant="contained"
                  color="success"
                  size="large"
                  startIcon={<Save />}
                  onClick={handleSave}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  size="large"
                  startIcon={<Cancel />}
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </Button>
              </>
            )}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DoctorProfile;
