import React, { useState } from "react";
import {
  Container, Typography, Card, CardContent, Button, Grid, TextField, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Chip
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { CheckCircle, Cancel, LocalShipping, Search } from "@mui/icons-material";

const EmergencyScreen = () => {
  const [open, setOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [ambulance, setAmbulance] = useState("");
  const [search, setSearch] = useState("");

  // State to hold emergency requests with assigned ambulances
  const [emergencyRequests, setEmergencyRequests] = useState([
    { id: 1, patient: "John Doe", contact: "123-456-7890", location: "Downtown", status: "Pending", ambulance: "" },
    { id: 2, patient: "Jane Smith", contact: "987-654-3210", location: "Uptown", status: "Assigned", ambulance: "Ambulance-01" },
    { id: 3, patient: "Mike Johnson", contact: "456-789-1230", location: "Midtown", status: "Completed", ambulance: "Ambulance-02" }
  ]);

  const ambulances = ["Ambulance-01", "Ambulance-02", "Ambulance-03"];

  // Open the dialog and store the selected request
  const handleAssign = (request) => {
    setSelectedRequest(request);
    setOpen(true);
  };

  // Assign the selected ambulance and update the table
  const handleConfirmAssign = () => {
    if (selectedRequest && ambulance) {
      const updatedRequests = emergencyRequests.map((req) =>
        req.id === selectedRequest.id
          ? { ...req, status: "Assigned", ambulance: ambulance }
          : req
      );
      setEmergencyRequests(updatedRequests);
    }
    setOpen(false);
    setAmbulance("");
  };

  // Filter logic for search
  const filteredRequests = emergencyRequests.filter((req) =>
    req.patient.toLowerCase().includes(search.toLowerCase())
  );

  // Function to render status with colored chips
  const getStatusChip = (status) => {
    const color = status === "Pending" ? "warning" : status === "Assigned" ? "primary" : "success";
    const icon = status === "Pending" ? <Cancel /> : status === "Assigned" ? <LocalShipping /> : <CheckCircle />;
    return <Chip icon={icon} label={status} color={color} />;
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        🚑 Emergency Contacts & Ambulance Requests
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Search by Patient"
                variant="outlined"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{ endAdornment: <Search /> }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <DataGrid
            rows={filteredRequests}
            columns={[
              { field: "id", headerName: "ID", width: 80 },
              { field: "patient", headerName: "Patient", width: 200 },
              { field: "contact", headerName: "Contact", width: 180 },
              { field: "location", headerName: "Location", width: 200 },
              {
                field: "status",
                headerName: "Status",
                width: 150,
                renderCell: (params) => getStatusChip(params.row.status)
              },
              {
                field: "ambulance",
                headerName: "Assigned Ambulance",
                width: 200,
                renderCell: (params) => (
                  <Typography variant="body1">
                    {params.row.ambulance ? params.row.ambulance : "Not Assigned"}
                  </Typography>
                )
              },
              {
                field: "actions",
                headerName: "Actions",
                width: 200,
                renderCell: (params) => (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAssign(params.row)}
                    disabled={params.row.status === "Assigned" || params.row.status === "Completed"}
                  >
                    {params.row.status === "Assigned" ? "Assigned" : "Assign Ambulance"}
                  </Button>
                )
              }
            ]}
            autoHeight
            hideFooter
          />
        </CardContent>
      </Card>

      {/* Dialog for Ambulance Assignment */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Assign Ambulance</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel>Select Ambulance</InputLabel>
            <Select value={ambulance} onChange={(e) => setAmbulance(e.target.value)}>
              {ambulances.map((amb) => (
                <MenuItem key={amb} value={amb}>
                  {amb}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">Cancel</Button>
          <Button onClick={handleConfirmAssign} color="primary" disabled={!ambulance}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default EmergencyScreen;

