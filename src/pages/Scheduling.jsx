import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Snackbar,
  Alert
} from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const DoctorAvailability = () => {
  const [doctorName, setDoctorName] = useState("");
  const [expertise, setExpertise] = useState("");
  const [department, setDepartment] = useState("");
  
  const [date, setDate] = useState(dayjs());
  const [startTime, setStartTime] = useState(dayjs());
  const [endTime, setEndTime] = useState(dayjs().add(1, "hour"));
  const [duration, setDuration] = useState(30);
  const [recurrence, setRecurrence] = useState("none");
  const [slots, setSlots] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleAddSlot = () => {
    if (startTime.isBefore(endTime) && doctorName && expertise && department) {
      const newSlot = {
        id: slots.length + 1,
        doctorName,
        expertise,
        department,
        date: date.format("YYYY-MM-DD"),
        startTime: startTime.format("HH:mm"),
        endTime: endTime.format("HH:mm"),
        duration: `${duration} min`,
        recurrence,
      };

      setSlots([...slots, newSlot]);
      setOpenSnackbar(true);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ p: 4, maxWidth: 1000, mx: "auto" }}>
        <Typography variant="h4" gutterBottom>
          Set Doctor Availability
        </Typography>

        {/* Doctor Details */}
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <TextField
            label="Doctor Name"
            fullWidth
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
          />
          <TextField
            label="Expertise"
            fullWidth
            value={expertise}
            onChange={(e) => setExpertise(e.target.value)}
          />
          <TextField
            label="Department"
            fullWidth
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
        </Box>

        {/* Availability Settings */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 4 }}>
          <DateTimePicker
            label="Select Date"
            value={date}
            onChange={(newDate) => setDate(newDate)}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />

          <Box sx={{ display: "flex", gap: 2 }}>
            <DateTimePicker
              label="Start Time"
              value={startTime}
              onChange={(newTime) => setStartTime(newTime)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />

            <DateTimePicker
              label="End Time"
              value={endTime}
              onChange={(newTime) => setEndTime(newTime)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Box>

          <FormControl fullWidth>
            <InputLabel>Duration (mins)</InputLabel>
            <Select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            >
              {[15, 30, 45, 60].map((value) => (
                <MenuItem key={value} value={value}>
                  {value} mins
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Recurrence</InputLabel>
            <Select
              value={recurrence}
              onChange={(e) => setRecurrence(e.target.value)}
            >
              <MenuItem value="none">None</MenuItem>
              <MenuItem value="daily">Daily</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            onClick={handleAddSlot}
            disabled={!doctorName || !expertise || !department || startTime.isAfter(endTime)}
          >
            Add Slot
          </Button>
        </Box>

        {/* Display Added Slots */}
        {slots.length > 0 && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Doctor</TableCell>
                  <TableCell>Expertise</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Start Time</TableCell>
                  <TableCell>End Time</TableCell>
                  <TableCell>Duration</TableCell>
                  <TableCell>Recurrence</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {slots.map((slot) => (
                  <TableRow key={slot.id}>
                    <TableCell>{slot.id}</TableCell>
                    <TableCell>{slot.doctorName}</TableCell>
                    <TableCell>{slot.expertise}</TableCell>
                    <TableCell>{slot.department}</TableCell>
                    <TableCell>{slot.date}</TableCell>
                    <TableCell>{slot.startTime}</TableCell>
                    <TableCell>{slot.endTime}</TableCell>
                    <TableCell>{slot.duration}</TableCell>
                    <TableCell>{slot.recurrence}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Snackbar Notification */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
        >
          <Alert onClose={() => setOpenSnackbar(false)} severity="success">
            Slot Added Successfully!
          </Alert>
        </Snackbar>
      </Box>
    </LocalizationProvider>
  );
};

export default DoctorAvailability;
