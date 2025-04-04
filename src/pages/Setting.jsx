import React, { useState } from "react";
import {
  Container, Typography, Card, CardContent, TextField, Button, Grid, Switch, FormControlLabel, Select, MenuItem, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText, ListItemSecondaryAction
} from "@mui/material";
import { Delete, Add } from "@mui/icons-material";

const SettingsScreen = () => {
  const [hospitalDetails, setHospitalDetails] = useState({
    name: "CityCare Hospital",
    contact: "+1 123-456-7890",
    email: "contact@citycare.com",
    address: "123 Main Street, Downtown",
    logo: ""
  });

  const [workingDays, setWorkingDays] = useState([
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"
  ]);

  const [holidays, setHolidays] = useState([]);
  const [slotDuration, setSlotDuration] = useState(30);
  const [availability, setAvailability] = useState(true);
  const [openHolidayDialog, setOpenHolidayDialog] = useState(false);
  const [newHoliday, setNewHoliday] = useState("");

  // Handle form field changes
  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    setHospitalDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file upload
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setHospitalDetails((prev) => ({ ...prev, logo: URL.createObjectURL(file) }));
    }
  };

  // Add holiday
  const handleAddHoliday = () => {
    if (newHoliday && !holidays.includes(newHoliday)) {
      setHolidays((prev) => [...prev, newHoliday]);
      setNewHoliday("");
      setOpenHolidayDialog(false);
    }
  };

  // Remove holiday
  const handleRemoveHoliday = (index) => {
    setHolidays((prev) => prev.filter((_, i) => i !== index));
  };

  // Save settings (mock function)
  const handleSave = () => {
    console.log("Hospital Details:", hospitalDetails);
    console.log("Working Days:", workingDays);
    console.log("Holidays:", holidays);
    console.log("Slot Duration:", slotDuration);
    console.log("Availability:", availability);
    alert("Settings saved successfully!");
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        ⚙️ Hospital Settings and Configuration
      </Typography>

      {/* Hospital Details */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6">🏥 Hospital Details</Typography>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Hospital Name"
                name="name"
                value={hospitalDetails.name}
                onChange={handleDetailsChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Contact Number"
                name="contact"
                value={hospitalDetails.contact}
                onChange={handleDetailsChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                value={hospitalDetails.email}
                onChange={handleDetailsChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={hospitalDetails.address}
                onChange={handleDetailsChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant="contained" component="label" fullWidth>
                Upload Logo
                <input type="file" hidden onChange={handleLogoUpload} />
              </Button>
              {hospitalDetails.logo && (
                <img
                  src={hospitalDetails.logo}
                  alt="Hospital Logo"
                  style={{ width: 100, height: 100, marginTop: 10 }}
                />
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Working Hours */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6">⏰ Configure Working Hours and Holidays</Typography>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12}>
              <Typography>Working Days:</Typography>
              <Select
                multiple
                fullWidth
                value={workingDays}
                onChange={(e) => setWorkingDays(e.target.value)}
                variant="outlined"
              >
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                  <MenuItem key={day} value={day}>
                    {day}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            {/* Holiday List */}
            <Grid item xs={12}>
              <Typography mt={2}>Holidays:</Typography>
              <List>
                {holidays.map((holiday, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={holiday} />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" onClick={() => handleRemoveHoliday(index)}>
                        <Delete />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
              <Button variant="outlined" startIcon={<Add />} onClick={() => setOpenHolidayDialog(true)}>
                Add Holiday
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Appointment Slot Duration */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6">🕒 Appointment Slot Duration & Availability</Typography>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Slot Duration (minutes)"
                type="number"
                value={slotDuration}
                onChange={(e) => setSlotDuration(Number(e.target.value))}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={availability}
                    onChange={() => setAvailability(!availability)}
                  />
                }
                label="Appointment Availability"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Save Button */}
      <Button variant="contained" color="primary" onClick={handleSave} fullWidth>
        Save Settings
      </Button>

      {/* Holiday Dialog */}
      <Dialog open={openHolidayDialog} onClose={() => setOpenHolidayDialog(false)}>
        <DialogTitle>Add Holiday</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Holiday Name"
            value={newHoliday}
            onChange={(e) => setNewHoliday(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenHolidayDialog(false)} color="secondary">Cancel</Button>
          <Button onClick={handleAddHoliday} color="primary" disabled={!newHoliday}>Add</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SettingsScreen;
