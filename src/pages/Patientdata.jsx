import React, { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Collapse,
  TextField,
  Button,
  Card,
  CardContent
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const PatientDataViewer = () => {
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(null);

  const patients = [
    {
      id: 1,
      name: 'John Doe',
      age: 45,
      gender: 'Male',
      contact: '123-456-7890',
      medicalHistory: [
        { date: '2024-10-01', diagnosis: 'Hypertension', treatment: 'Medication A' },
        { date: '2025-01-15', diagnosis: 'Diabetes', treatment: 'Insulin Therapy' }
      ]
    },
    {
      id: 2,
      name: 'Jane Smith',
      age: 32,
      gender: 'Female',
      contact: '987-654-3210',
      medicalHistory: [
        { date: '2024-11-12', diagnosis: 'Asthma', treatment: 'Inhaler Therapy' }
      ]
    }
  ];

  const handleExpandClick = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Patient Data Viewer</Typography>
      <TextField
        label="Search by Name"
        variant="outlined"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 3 }}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPatients.map((patient) => (
              <React.Fragment key={patient.id}>
                <TableRow>
                  <TableCell>{patient.id}</TableCell>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.age}</TableCell>
                  <TableCell>{patient.gender}</TableCell>
                  <TableCell>{patient.contact}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleExpandClick(patient.id)}>
                      {expanded === patient.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={6} style={{ padding: 0 }}>
                    <Collapse in={expanded === patient.id} timeout="auto" unmountOnExit>
                      <Card sx={{ m: 2 }}>
                        <CardContent>
                          <Typography variant="h6">Medical History</Typography>
                          {patient.medicalHistory.map((history, index) => (
                            <Box key={index} sx={{ mb: 1 }}>
                              <Typography>
                                <strong>Date:</strong> {history.date}
                              </Typography>
                              <Typography>
                                <strong>Diagnosis:</strong> {history.diagnosis}
                              </Typography>
                              <Typography>
                                <strong>Treatment:</strong> {history.treatment}
                              </Typography>
                            </Box>
                          ))}
                        </CardContent>
                      </Card>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PatientDataViewer;
