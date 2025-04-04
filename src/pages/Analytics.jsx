import React, { useState, useEffect, useRef } from "react";
import {
  Container, Typography, Card, CardContent, Button, Grid, Select, MenuItem, FormControl, InputLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from "@mui/material";
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'; 
import { Download } from "@mui/icons-material";
import html2pdf from 'html2pdf.js';

const ReportsAnalyticsScreen = () => {
  const [reportType, setReportType] = useState("daily");

  // References to each chart canvas
  const patientChartRef = useRef(null);
  const financialChartRef = useRef(null);
  const doctorChartRef = useRef(null);

  const patientVisitData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [{
      label: "Patient Visits",
      data: [30, 45, 60, 50, 40, 70, 90],
      backgroundColor: "#42a5f5"
    }]
  };

  const financialData = {
    labels: ["Revenue", "Expenses"],
    datasets: [{
      data: [120000, 45000],
      backgroundColor: ["#4caf50", "#f44336"]
    }]
  };

  const doctorPerformanceData = {
    labels: ["Dr. Smith", "Dr. Lee", "Dr. Brown", "Dr. Taylor"],
    datasets: [{
      label: "Patients Treated",
      data: [85, 90, 75, 60],
      backgroundColor: "#ff9800"
    }]
  };

  const downloadReport = () => {
    const element = document.getElementById("report-content");
    html2pdf().from(element).save(`Report_${reportType}.pdf`);
  };

  // Cleanup charts before rendering new ones
  useEffect(() => {
    const destroyChart = (chartRef) => {
      if (chartRef.current && chartRef.current.chartInstance) {
        chartRef.current.chartInstance.destroy();
      }
    };

    // Clean up existing charts to avoid canvas reuse errors
    destroyChart(patientChartRef);
    destroyChart(financialChartRef);
    destroyChart(doctorChartRef);
  }, [reportType]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>📊 Reports & Analytics</Typography>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Report Type</InputLabel>
        <Select value={reportType} onChange={(e) => setReportType(e.target.value)}>
          <MenuItem value="daily">Daily</MenuItem>
          <MenuItem value="weekly">Weekly</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
        </Select>
      </FormControl>

      <div id="report-content">
        <Grid container spacing={4}>
          {/* Patient Visits */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Patient Visit Reports</Typography>
                <Bar ref={patientChartRef} data={patientVisitData} />
              </CardContent>
            </Card>
          </Grid>

          {/* Financial Reports */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Financial Reports</Typography>
                <Pie ref={financialChartRef} data={financialData} />
              </CardContent>
            </Card>
          </Grid>

          {/* Doctor Performance */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6">Doctor Performance Reports</Typography>
                <Line ref={doctorChartRef} data={doctorPerformanceData} />
              </CardContent>
            </Card>
          </Grid>

          {/* Detailed Table */}
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Doctor</TableCell>
                    <TableCell>Patients Treated</TableCell>
                    <TableCell>Revenue Generated</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Dr. Smith</TableCell>
                    <TableCell>85</TableCell>
                    <TableCell>$25,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Dr. Lee</TableCell>
                    <TableCell>90</TableCell>
                    <TableCell>$30,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Dr. Brown</TableCell>
                    <TableCell>75</TableCell>
                    <TableCell>$20,000</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </div>

      <Button
        variant="contained"
        startIcon={<Download />}
        onClick={downloadReport}
        sx={{ mt: 3 }}
      >
        Download Report
      </Button>
    </Container>
  );
};

export default ReportsAnalyticsScreen;
