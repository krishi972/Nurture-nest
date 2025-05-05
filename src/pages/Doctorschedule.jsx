import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Grid, MenuItem, Select, FormControl, InputLabel, Card, CardContent, Chip, Stack
} from '@mui/material';
import { db } from '../config/Firebase';
import { collection, getDocs } from 'firebase/firestore';

const DoctorScheduleView = () => {
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [schedules, setSchedules] = useState({});

  // Fetch all departments from doctors collection
  useEffect(() => {
    const fetchDepartments = async () => {
      const doctorsSnap = await getDocs(collection(db, 'doctors'));
      const deptSet = new Set();
      const allDoctors = [];

      doctorsSnap.forEach(doc => {
        const data = doc.data();
        deptSet.add(data.department);
        allDoctors.push({ id: doc.id, ...data });
      });

      setDepartments(Array.from(deptSet));
      setDoctors(allDoctors);
    };

    fetchDepartments();
  }, []);

  // Fetch schedules when a department is selected
  useEffect(() => {
    const fetchSchedules = async () => {
      const doctorSchedules = {};
      const schedulesSnap = await getDocs(collection(db, 'doctorSchedules'));
      schedulesSnap.forEach(doc => {
        doctorSchedules[doc.id] = doc.data();
      });
      setSchedules(doctorSchedules);
    };

    if (selectedDept) {
      fetchSchedules();
    }
  }, [selectedDept]);

  // Filter doctors by selected department
  const filteredDoctors = doctors.filter(doc => doc.department === selectedDept);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>View Doctor Schedule</Typography>

      <FormControl fullWidth sx={{ mb: 4 }}>
        <InputLabel>Select Department</InputLabel>
        <Select value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)} label="Select Department">
          {departments.map((dept, index) => (
            <MenuItem key={index} value={dept}>{dept}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Grid container spacing={3}>
        {filteredDoctors.map((doc) => {
          const schedule = schedules[doc.id];
          return (
            <Grid item xs={12} sm={6} md={4} key={doc.id}>
              <Card variant="outlined" sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Typography variant="h6">{doc.fullName}</Typography>
                  <Typography variant="body2" color="text.secondary">{doc.specialization}</Typography>

                  <Box mt={2}>
                    <Typography fontWeight="bold">Working Days:</Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      {schedule?.workingDays?.map(day => (
                        <Chip key={day} label={day} color="primary" variant="outlined" />
                      ))}
                    </Stack>
                  </Box>

                  <Box mt={2}>
                    <Typography fontWeight="bold">Time Slots:</Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      {schedule?.slots?.map((slot, i) => (
                        <Chip
                          key={i}
                          label={`${slot.start} - ${slot.end}`}
                          color="success"
                          variant="outlined"
                        />
                      ))}
                    </Stack>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default DoctorScheduleView;
