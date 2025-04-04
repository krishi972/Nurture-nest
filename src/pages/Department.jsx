import React, { useState, useEffect } from "react";
import {
  Container, Typography, Card, CardContent, Button, Grid, TextField, IconButton, Dialog,
  DialogTitle, DialogContent, DialogActions, Snackbar, Alert
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/Firebase"; // Ensure Firebase is configured

const DepartmentManagement = () => {
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [name, setName] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [schedule, setSchedule] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [departments, setDepartments] = useState([]);

  // Fetch Departments from Firestore
  const fetchDepartments = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "department"));
      const departmentData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDepartments(departmentData);
    } catch (err) {
      console.error("Error fetching departments:", err);
      setSnackbarMessage("Failed to load departments!");
      setOpenSnackbar(true);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleOpen = (department = null) => {
    setEditMode(!!department);
    setSelectedDepartment(department);
    setName(department?.name || "");
    setDoctors(department?.doctors || []);
    setSchedule(department?.schedule || "");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedDepartment(null);
    setName("");
    setDoctors([]);
    setSchedule("");
  };

  // Save or Update Department in Firestore
  const handleSave = async () => {
    if (!name.trim()) {
      setSnackbarMessage("Department name cannot be empty!");
      setOpenSnackbar(true);
      return;
    }

    try {
      if (editMode) {
        const deptRef = doc(db, "department", selectedDepartment.id);
        await updateDoc(deptRef, { name, doctors, schedule });
        setSnackbarMessage("Department updated successfully!");
      } else {
        await addDoc(collection(db, "department"), { name, doctors, schedule });
        setSnackbarMessage("Department added successfully!");
      }

      setOpenSnackbar(true);
      handleClose();
      fetchDepartments(); // Refresh the list
    } catch (error) {
      console.error("Error saving department:", error);
      setSnackbarMessage("Error saving department!");
      setOpenSnackbar(true);
    }
  };

  // Delete Department from Firestore
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "department", id));
      setSnackbarMessage("Department deleted successfully!");
      setOpenSnackbar(true);
      fetchDepartments(); // Refresh the list
    } catch (error) {
      console.error("Error deleting department:", error);
      setSnackbarMessage("Error deleting department!");
      setOpenSnackbar(true);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        🏥 Department Management
      </Typography>

      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={() => handleOpen()}
        sx={{ mb: 3 }}
      >
        Add Department
      </Button>

      <Grid container spacing={3}>
        {departments.map((dept) => (
          <Grid item xs={12} md={6} key={dept.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{dept.name}</Typography>
                <Typography variant="body2">Doctors: {dept.doctors.join(", ")}</Typography>
                <Typography variant="body2">Schedule: {dept.schedule}</Typography>
                <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
                  <IconButton color="primary" onClick={() => handleOpen(dept)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(dept.id)}>
                    <Delete />
                  </IconButton>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add/Edit Department Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>{editMode ? "Edit Department" : "Add Department"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Department Name"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            label="Doctors (comma-separated)"
            fullWidth
            margin="normal"
            value={doctors.join(", ")}
            onChange={(e) => setDoctors(e.target.value.split(",").map((d) => d.trim()))}
          />

          <TextField
            label="Schedule"
            fullWidth
            margin="normal"
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for Notifications */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default DepartmentManagement;
