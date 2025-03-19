import React, { useState } from "react";
import { TextField, MenuItem, Select, FormControl, InputLabel, Card, CardContent, Typography, Grid, Box } from "@mui/material";

const doctors = [
    { id: 1, name: "Dr. Smit sharma", specialization: "Cardiologist",department: "Cardiology", contact: "9854362178" },
    { id: 2, name: "Dr. Nisha raval", specialization: "Cardiologist", department: "Cardiology",contact: "9098564312" },
    { id: 3, name: "Dr. Mohak bhargva", specialization: "Cardiologist",department: "Cardiology", contact: "9854362178" },
    
    { id: 4, name: "Dr. Rakesh patel", specialization: "Dermatologist",department: "Dermatology", contact: "7023876541" },
    { id: 5, name: "Dr. Seema jain", specialization: "Dermatologist", department: "Dermatology",contact: "9043287651" },
    { id: 6, name: "Dr. Arvind shah", specialization: "Dermatologist",department: "Dermatology", contact: "6353678854" },
    
    { id: 7, name: "Dr. Dhaval gandhi", specialization: "Pediatrician", department: "pediatrics",contact: "9421678432" },
    { id: 8, name: "Dr. Naresh trehan", specialization: "Pediatrician", department: "pediatrics",contact: "6398762341" },
    { id: 9, name: "Dr. Subhash gupta", specialization: "pediatrician",department: "pediatrics", contact: "6398074312" },
    
    { id: 10, name: "Dr. Asha jain", specialization: "Neurologist", department: "Neurology",contact: "9875213456" },
    { id: 11, name: "Dr. mahi jha", specialization: "Neurologist",department: "Neurology", contact: "9012897536" },
    { id: 12, name: "Dr. Akshar patel", specialization: "Neurologist", department: "Neurology",contact: "7038651296" },
];


const ViewDoctors = () => {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");

  const departments = [...new Set(doctors.map((doc) => doc.department))];
  
  const filteredDoctors = doctors.filter((doctor) => {
    return (
      doctor.name.replace(/\s+/g, "").toLowerCase().includes(search.replace(/\s+/g, "").toLowerCase()) &&
      (department ? doctor.department === department : true)
    );
  });

  return (
    <Box sx={{ padding: 4, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Typography variant="h4" sx={{ marginBottom: 3, textAlign: "center", color: "#1976d2", fontWeight: "bold" }}>View Doctors</Typography>
      <Box sx={{ display: "flex", gap: 2, marginBottom: 3 }}>
        <TextField
          label="Search by Name"
          variant="outlined"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FormControl fullWidth>
          <InputLabel>Department</InputLabel>
          <Select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {departments.map((dept) => (
              <MenuItem key={dept} value={dept}>{dept}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Grid container spacing={3}>
        {filteredDoctors.map((doctor) => (
          <Grid item xs={12} sm={6} md={4} key={doctor.id}>
            <Card sx={{ borderRadius: 2, boxShadow: 3, transition: "0.3s", '&:hover': { boxShadow: 6 } }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>{doctor.name}</Typography>
                <Typography variant="body2" sx={{ color: "#555" }}>Specialization: <strong>{doctor.specialization}</strong></Typography>
                <Typography variant="body2" sx={{ color: "#555" }}>Department: {doctor.department}</Typography>
                <Typography variant="body2" sx={{ color: "#1976d2", fontWeight: "bold" }}>Contact: {doctor.contact}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ViewDoctors;
