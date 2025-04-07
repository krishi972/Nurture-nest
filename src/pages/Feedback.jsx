import React, { useState, useEffect } from "react";
import {
  Container, Typography, Card, CardContent, Button, Dialog, DialogTitle, DialogContent,
  DialogActions, Rating, TextField, Box
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Reply } from "@mui/icons-material";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/Firebase";

const FeedbackScreen = () => {
  const [open, setOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [response, setResponse] = useState("");
  const [feedbackData, setFeedbackData] = useState([]);

  const fetchFeedback = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "feedback"));
      const feedbackList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFeedbackData(feedbackList);
    } catch (err) {
      console.error("Error fetching feedback:", err);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  const handleRespond = (feedback) => {
    setSelectedFeedback(feedback);
    setResponse(feedback.response || ""); // Pre-fill if response already exists
    setOpen(true);
  };

  const handleSendResponse = async () => {
    try {
      const feedbackRef = doc(db, "feedback", selectedFeedback.id);
      await updateDoc(feedbackRef, {
        response,
      });

      setOpen(false);
      setResponse("");
      fetchFeedback(); // Refresh data
    } catch (error) {
      console.error("Error sending response:", error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        🏥 Patient Feedback & Responses
      </Typography>

      <Card>
        <CardContent>
          <DataGrid
            rows={feedbackData}
            columns={[
              { field: "id", headerName: "ID", width: 80 },
              { field: "name", headerName: "Patient", width: 200 },
              {
                field: "rating",
                headerName: "Rating",
                width: 150,
                renderCell: (params) => <Rating value={params.row.rating} readOnly />
              },
              { field: "comment", headerName: "Comment", width: 300 },
              {
                field: "response",
                headerName: "Response",
                width: 300,
                renderCell: (params) => (
                  params.row.response ? (
                    <Typography variant="body2">{params.row.response}</Typography>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No response yet
                    </Typography>
                  )
                )
              },
              {
                field: "actions",
                headerName: "Actions",
                width: 180,
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

      {/* Dialog to Respond */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Respond to Feedback</DialogTitle>
        <DialogContent>
          <TextField
            label="Your Response"
            fullWidth
            multiline
            rows={4}
            value={response}
            onChange={(e) => setResponse(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSendResponse} color="primary" disabled={!response}>
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default FeedbackScreen;
