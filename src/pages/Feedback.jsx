import React, { useState } from "react";
import {
  Container, Typography, Card, CardContent, Button, Grid, Dialog, DialogTitle, DialogContent, DialogActions, Rating, Chip, TextField
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Reply } from "@mui/icons-material";

const FeedbackScreen = () => {
  const [open, setOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [response, setResponse] = useState("");

  const feedbackData = [
    { id: 1, patient: "John Doe", rating: 4, comment: "Great service!", status: "Reviewed" },
    { id: 2, patient: "Jane Smith", rating: 2, comment: "Long wait time", status: "Pending" },
    { id: 3, patient: "Mike Johnson", rating: 5, comment: "Excellent doctors", status: "Reviewed" },
    { id: 4, patient: "Emma Brown", rating: 3, comment: "Average experience", status: "Pending" },
    { id: 5, patient: "Liam Wilson", rating: 1, comment: "Unfriendly staff", status: "Reviewed" },
    { id: 6, patient: "Olivia Martinez", rating: 5, comment: "Very helpful nurses", status: "Reviewed" },
    { id: 7, patient: "Noah Davis", rating: 4, comment: "Clean and professional", status: "Pending" },
    { id: 8, patient: "Sophia Lee", rating: 2, comment: "Long waiting hours", status: "Reviewed" },
    { id: 9, patient: "James Taylor", rating: 5, comment: "Top-notch treatment", status: "Reviewed" },
    { id: 10, patient: "Isabella White", rating: 3, comment: "Decent service", status: "Pending" }
  ];

  const handleRespond = (feedback) => {
    setSelectedFeedback(feedback);
    setOpen(true);
  };

  const handleSendResponse = () => {
    console.log(`Responded to ${selectedFeedback.patient}: ${response}`);
    setOpen(false);
    setResponse("");
  };

  const getStatusChip = (status) => {
    const color = status === "Pending" ? "warning" : "success";
    return <Chip label={status} color={color} />;
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        🏥 Patient Feedback & Reviews
      </Typography>

      <Card>
        <CardContent>
          <DataGrid
            rows={feedbackData}
            columns={[
              { field: "id", headerName: "ID", width: 80 },
              { field: "patient", headerName: "Patient", width: 200 },
              {
                field: "rating",
                headerName: "Rating",
                width: 150,
                renderCell: (params) => <Rating value={params.row.rating} readOnly />
              },
              { field: "comment", headerName: "Comment", width: 300 },
              {
                field: "status",
                headerName: "Status",
                width: 150,
                renderCell: (params) => getStatusChip(params.row.status)
              },
              {
                field: "actions",
                headerName: "Actions",
                width: 200,
                renderCell: (params) => (
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Reply />}
                    onClick={() => handleRespond(params.row)}
                  >
                    Respond
                  </Button>
                )
              }
            ]}
            autoHeight
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            hideFooterPagination
          />
        </CardContent>
      </Card>

      {/* Dialog for Responding to Feedback */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Respond to Feedback</DialogTitle>
        <DialogContent>
          <TextField
            label="Response"
            fullWidth
            multiline
            rows={4}
            value={response}
            onChange={(e) => setResponse(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">Cancel</Button>
          <Button onClick={handleSendResponse} color="primary" disabled={!response}>Send</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default FeedbackScreen;
