import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Link,
  Input,
  Select,
} from "@mui/material";

const labTests = ["Blood Test", "X-Ray", "MRI", "CT Scan", "Urine Test"];

const LabTestScreen = () => {
  const [role, setRole] = useState("Patient"); // Role state to differentiate users
  const [patientName, setPatientName] = useState("");
  const [selectedTest, setSelectedTest] = useState("");
  const [tests, setTests] = useState([]);

  const bookTest = () => {
    if (patientName && selectedTest) {
      setTests((prevTests) => [
        ...prevTests,
        { id: prevTests.length + 1, name: patientName, test: selectedTest, result: "Pending", report: "-", reportFile: null },
      ]);
      setPatientName("");
      setSelectedTest("");
    }
  };

  const uploadReport = (id, file) => {
    const fileURL = URL.createObjectURL(file);
    setTests((prevTests) =>
      prevTests.map((test) =>
        test.id === id
          ? { ...test, result: "Completed", report: `Report for ${test.test} is available.`, reportFile: fileURL }
          : test
      )
    );
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>Lab Test Booking</Typography>
      <Select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        fullWidth
        style={{ marginBottom: "20px" }}
      >
        <MenuItem value="Patient">Patient</MenuItem>
        <MenuItem value="Lab Technician">Lab Technician</MenuItem>
      </Select>
      
      {role === "Patient" && (
        <>
          <TextField
            fullWidth
            label="Patient Name"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            select
            label="Select Test"
            value={selectedTest}
            onChange={(e) => setSelectedTest(e.target.value)}
            margin="normal"
          >
            {labTests.map((test) => (
              <MenuItem key={test} value={test}>
                {test}
              </MenuItem>
            ))}
          </TextField>
          <Button variant="contained" color="primary" onClick={bookTest} fullWidth>
            Book Test
          </Button>
        </>
      )}

      <Typography variant="h5" style={{ marginTop: "20px" }}>
        Test Results
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Patient Name</TableCell>
              <TableCell>Test</TableCell>
              <TableCell>Result</TableCell>
              <TableCell>Report</TableCell>
              {role === "Lab Technician" && <TableCell>Action</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {tests.map((test) => (
              <TableRow key={test.id}>
                <TableCell>{test.id}</TableCell>
                <TableCell>{test.name}</TableCell>
                <TableCell>{test.test}</TableCell>
                <TableCell>{test.result}</TableCell>
                <TableCell>
                  {test.result === "Completed" && test.reportFile ? (
                    <Link href={test.reportFile} target="_blank" rel="noopener" download={`Report_${test.id}.pdf`}>
                      View Report
                    </Link>
                  ) : (
                    test.report
                  )}
                </TableCell>
                {role === "Lab Technician" && (
                  <TableCell>
                    {test.result === "Pending" && (
                      <Input
                        type="file"
                        onChange={(e) => uploadReport(test.id, e.target.files[0])}
                        accept="application/pdf"
                      />
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default LabTestScreen;
