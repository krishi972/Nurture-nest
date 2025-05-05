import React, { useState, useEffect } from 'react';
import {
  Box, TextField, Checkbox, FormControlLabel, Button, Typography, Grid, List, ListItem, IconButton
} from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';
import { db, auth } from "../config/Firebase"; // adjust path to your firebase config
import { doc, getDoc, setDoc } from 'firebase/firestore';

const workingDaysList = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const DoctorScheduleScreen = () => {
  const [doctorData, setDoctorData] = useState({});
  const [workingDays, setWorkingDays] = useState([]);
  const [startTime, setStartTime] = useState(dayjs());
  const [endTime, setEndTime] = useState(dayjs());
  const [slots, setSlots] = useState([]);

  const doctorId = auth.currentUser?.uid; // Ensure auth context is set

  useEffect(() => {
    const fetchDoctorDataAndSchedule = async () => {
      if (!doctorId) return;
  
      // Fetch doctor profile details
      const doctorRef = doc(db, 'doctors', doctorId);
      const doctorSnap = await getDoc(doctorRef);
      if (doctorSnap.exists()) {
        setDoctorData(doctorSnap.data());
      }
  
      // Fetch saved schedule (workingDays + slots)
      const scheduleRef = doc(db, 'doctorSchedules', doctorId);
      const scheduleSnap = await getDoc(scheduleRef);
      if (scheduleSnap.exists()) {
        const data = scheduleSnap.data();
        setWorkingDays(data.workingDays || []);
        setSlots(data.slots || []);
      }
    };
  
    fetchDoctorDataAndSchedule();
  }, [doctorId]);
  
  const handleDayChange = (day) => {
    setWorkingDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const addSlot = () => {
    if (startTime && endTime) {
      setSlots([...slots, {
        start: startTime.format('hh:mm A'),
        end: endTime.format('hh:mm A')
      }]);
    }
  };

  const removeSlot = (index) => {
    const updated = [...slots];
    updated.splice(index, 1);
    setSlots(updated);
  };

  const saveSchedule = async () => {
    if (!doctorId) return;

    const scheduleData = {
      doctorId,
      name: doctorData.fullName,
      specialization: doctorData.specialization,
      department: doctorData.department,
      workingDays,
      slots,
    };

    await setDoc(doc(db, 'doctorSchedules', doctorId), scheduleData);
    alert('Schedule saved!');
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>Doctor Appointment Scheduling</Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label="Name" value={doctorData.fullName || ''} fullWidth disabled />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField label="Specialization" value={doctorData.specialization || ''} fullWidth disabled />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField label="Department" value={doctorData.department || ''} fullWidth disabled />
          </Grid>
        </Grid>

        <Box sx={{ my: 2 }}>
          <Typography variant="h6">Working Days</Typography>
          <Box>
            {workingDaysList.map((day) => (
              <FormControlLabel
                key={day}
                control={<Checkbox checked={workingDays.includes(day)} onChange={() => handleDayChange(day)} />}
                label={day}
              />
            ))}
          </Box>
        </Box>

        <Box sx={{ my: 2 }}>
          <Typography variant="h6">Add Time Slot</Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={5}>
              <TimePicker label="Start Time" value={startTime} onChange={(newTime) => setStartTime(newTime)} />
            </Grid>
            <Grid item xs={5}>
              <TimePicker label="End Time" value={endTime} onChange={(newTime) => setEndTime(newTime)} />
            </Grid>
            <Grid item xs={2}>
              <Button onClick={addSlot} variant="contained">Add</Button>
            </Grid>
          </Grid>
        </Box>

        <Box>
          <Typography variant="h6">Time Slots</Typography>
          <List>
            {slots.map((slot, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <IconButton edge="end" onClick={() => removeSlot(index)}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                {slot.start} - {slot.end}
              </ListItem>
            ))}
          </List>
        </Box>

        <Button onClick={saveSchedule} variant="contained" sx={{ mt: 3 }}>
          Save Schedule
        </Button>
      </Box>
    </LocalizationProvider>
  );
};

export default DoctorScheduleScreen;
