import React, { useState } from "react";
import {
  Container, Typography, Card, CardContent, Button, Grid, TextField, Select, MenuItem, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel
} from "@mui/material";
import { Edit, Delete, Add, Visibility } from "@mui/icons-material";

const UserManagementScreen = () => {
  const [openDoctorDialog, setOpenDoctorDialog] = useState(false);
  const [openPatientDialog, setOpenPatientDialog] = useState(false);
  const [openStaffDialog, setOpenStaffDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const [doctors, setDoctors] = useState([
    { id: 1, name: "Dr. John Smith", department: "Cardiology", schedule: "Mon-Fri 9am-5pm" },
    { id: 2, name: "Dr. Alice Brown", department: "Neurology", schedule: "Tue-Thu 10am-4pm" }
  ]);

  const [patients, setPatients] = useState([
    { id: 1, name: "Mike Johnson", history: "Diabetes, Hypertension" },
    { id: 2, name: "Lisa Green", history: "Asthma, Allergy" }
  ]);

  const [staff, setStaff] = useState([
    { id: 1, name: "Nancy White", role: "Nurse" },
    { id: 2, name: "David Black", role: "Receptionist" }
  ]);

  const handleSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleAddDoctor = () => setOpenDoctorDialog(true);
  const handleAddPatient = () => setOpenPatientDialog(true);
  const handleAddStaff = () => setOpenStaffDialog(true);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>👥 User Management</Typography>

      <Grid container spacing={4}>
        {/* Doctors Section */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6">🩺 Manage Doctors</Typography>
              {doctors.map((doc) => (
                <div key={doc.id} style={{ marginBottom: "10px" }}>
                  <Typography><strong>{doc.name}</strong> - {doc.department}</Typography>
                  <Typography>Schedule: {doc.schedule}</Typography>
                  <Button startIcon={<Edit />} onClick={() => setSelectedDoctor(doc)}>Edit</Button>
                  <Button startIcon={<Delete />} color="error">Delete</Button>
                </div>
              ))}
              <Button variant="contained" startIcon={<Add />} onClick={handleAddDoctor}>
                Add Doctor
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Patients Section */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6">🩻 Manage Patients</Typography>
              {patients.map((patient) => (
                <div key={patient.id} style={{ marginBottom: "10px" }}>
                  <Typography><strong>{patient.name}</strong></Typography>
                  <Typography>History: {patient.history}</Typography>
                  <Button startIcon={<Visibility />}>View</Button>
                  <Button startIcon={<Delete />} color="error">Delete</Button>
                </div>
              ))}
              <Button variant="contained" startIcon={<Add />} onClick={handleAddPatient}>
                Add Patient
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Staff Section */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6">👩‍⚕️ Manage Staff</Typography>
              {staff.map((member) => (
                <div key={member.id} style={{ marginBottom: "10px" }}>
                  <Typography><strong>{member.name}</strong> - {member.role}</Typography>
                  <Button startIcon={<Edit />} onClick={() => setSelectedStaff(member)}>Edit</Button>
                  <Button startIcon={<Delete />} color="error">Remove</Button>
                </div>
              ))}
              <Button variant="contained" startIcon={<Add />} onClick={handleAddStaff}>
                Add Staff
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Action completed successfully!
        </Alert>
      </Snackbar>

      {/* Dialogs for Adding Entities */}
      <Dialog open={openDoctorDialog} onClose={() => setOpenDoctorDialog(false)}>
        <DialogTitle>Add Doctor</DialogTitle>
        <DialogContent>
          <TextField label="Name" fullWidth margin="normal" />
          <TextField label="Department" fullWidth margin="normal" />
          <TextField label="Schedule" fullWidth margin="normal" />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDoctorDialog(false)}>Cancel</Button>
          <Button onClick={handleSnackbar} color="primary">Add</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openPatientDialog} onClose={() => setOpenPatientDialog(false)}>
        <DialogTitle>Add Patient</DialogTitle>
        <DialogContent>
          <TextField label="Name" fullWidth margin="normal" />
          <TextField label="Medical History" fullWidth margin="normal" />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPatientDialog(false)}>Cancel</Button>
          <Button onClick={handleSnackbar} color="primary">Add</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openStaffDialog} onClose={() => setOpenStaffDialog(false)}>
        <DialogTitle>Add Staff</DialogTitle>
        <DialogContent>
          <TextField label="Name" fullWidth margin="normal" />
          <TextField label="Role" fullWidth margin="normal" />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenStaffDialog(false)}>Cancel</Button>
          <Button onClick={handleSnackbar} color="primary">Add</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserManagementScreen;
