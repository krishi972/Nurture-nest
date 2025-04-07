import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Grid,
  Box,
  Button,
  Avatar,
} from "@mui/material";
import { auth, db } from "../config/Firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Edit } from "@mui/icons-material";
import { onAuthStateChanged } from "firebase/auth";


const AdminProfile = () => {
  const [adminData, setAdminData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    role: "",
    employeeId: "",
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "admins", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setAdminData({ uid: user.uid, ...docSnap.data() });
        }
      }
    });
  
    return () => unsubscribe(); // Cleanup listener
  }, []);
  

  const handleChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await updateDoc(doc(db, "admins", adminData.uid), {
        fullName: adminData.fullName,
        email: adminData.email,
        mobile: adminData.mobile,
        role: adminData.role,
        employeeId: adminData.employeeId,
      });
      alert("✅ Profile updated successfully!");
      setEditMode(false);
    } catch (error) {
      console.error("❌ Update error:", error);
      alert("Update failed: " + error.message);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Box
        sx={{
          background: "linear-gradient(to right, #00796b, #0097a7)",
          color: "#fff",
          p: 4,
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: 3,
        }}
      >
        <Avatar sx={{ width: 80, height: 80, bgcolor: "#004d40", mb: 2 }}>
          {adminData.fullName?.charAt(0).toUpperCase()}
        </Avatar>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {adminData.fullName}
        </Typography>
        <Typography variant="subtitle1">{adminData.role}</Typography>
      </Box>

      <Box
        sx={{
          backgroundColor: "#fff",
          mt: -3,
          borderRadius: 3,
          p: 4,
          boxShadow: 3,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Full Name"
              name="fullName"
              value={adminData.fullName}
              onChange={handleChange}
              fullWidth
              disabled={!editMode}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Email"
              name="email"
              value={adminData.email}
              onChange={handleChange}
              fullWidth
              disabled={!editMode}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Mobile Number"
              name="mobile"
              value={adminData.mobile}
              onChange={handleChange}
              fullWidth
              disabled={!editMode}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Role"
              name="role"
              value={adminData.role}
              onChange={handleChange}
              fullWidth
              disabled={!editMode}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Employee ID"
              name="employeeId"
              value={adminData.employeeId}
              onChange={handleChange}
              fullWidth
              disabled={!editMode}
            />
          </Grid>
        </Grid>

        <Box mt={4} display="flex" justifyContent="center">
          {editMode ? (
            <Button
              variant="contained"
              onClick={handleUpdate}
              startIcon={<Edit />}
              sx={{
                background:
                  "linear-gradient(135deg, rgba(0,136,160,1), rgba(0,191,184,1))",
                color: "#fff",
                px: 4,
                borderRadius: "30px",
              }}
            >
              Save Profile
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={() => setEditMode(true)}
              startIcon={<Edit />}
              sx={{
                background: "#009688",
                color: "#fff",
                px: 4,
                borderRadius: "30px",
              }}
            >
              Edit Profile
            </Button>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default AdminProfile;
