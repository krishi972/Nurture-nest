import React, { useState } from "react";
import {
  Container, Typography, Card, CardContent, Button, Grid, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert
} from "@mui/material";
import { Download, Email } from "@mui/icons-material";
import html2pdf from "html2pdf.js";

const BillingPaymentsScreen = () => {
  const [invoices, setInvoices] = useState([
    { id: 1, patient: "John Doe", amount: 500, status: "Paid", date: "2025-03-10" },
    { id: 2, patient: "Jane Smith", amount: 300, status: "Pending", date: "2025-03-12" }
  ]);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSnackbar = (message) => {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const downloadReceipt = (invoice) => {
    const element = document.createElement("div");
    element.innerHTML = `
      <h1>Hospital Invoice Receipt</h1>
      <p>Invoice ID: ${invoice.id}</p>
      <p>Patient: ${invoice.patient}</p>
      <p>Amount: $${invoice.amount}</p>
      <p>Status: ${invoice.status}</p>
      <p>Date: ${invoice.date}</p>
    `;

    html2pdf().from(element).save(`Invoice_${invoice.id}.pdf`);
    handleSnackbar("Receipt downloaded successfully.");
  };

  const sendReceiptToPatient = (invoice) => {
    handleSnackbar(`Receipt sent to ${invoice.patient}.`);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>💳 Billing & Payments</Typography>

      <Grid container spacing={4}>
        {invoices.map((invoice) => (
          <Grid item xs={12} md={6} key={invoice.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">Invoice #{invoice.id}</Typography>
                <Typography>Patient: {invoice.patient}</Typography>
                <Typography>Amount: ${invoice.amount}</Typography>
                <Typography>Status: {invoice.status}</Typography>
                <Typography>Date: {invoice.date}</Typography>
                <Button
                  variant="contained"
                  startIcon={<Download />}
                  onClick={() => downloadReceipt(invoice)}
                  sx={{ mt: 1, mr: 1 }}
                >
                  Download Receipt
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Email />}
                  onClick={() => sendReceiptToPatient(invoice)}
                  sx={{ mt: 1 }}
                >
                  Send to Patient
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default BillingPaymentsScreen;
