import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Rating,
  Snackbar,
  Alert,
  Box,
  Divider,
} from "@mui/material";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../config/Firebase";

const PatientFeedback = () => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [feedbackList, setFeedbackList] = useState([]);

  // Fetch all feedback in real-time
  useEffect(() => {
    const feedbackRef = collection(db, "feedback");
    const q = query(feedbackRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const feedbackData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFeedbackList(feedbackData);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async () => {
    if (!name || !rating || !comment) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await addDoc(collection(db, "feedback"), {
        name,
        rating,
        comment,
        createdAt: serverTimestamp(),
      });

      setOpenSnackbar(true);
      setName("");
      setRating(0);
      setComment("");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Error submitting feedback. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        📝 Patient Feedback
      </Typography>

      {/* Feedback Form */}
      <Card elevation={3}>
        <CardContent>
          <TextField
            label="Your Name"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Box sx={{ mt: 2, mb: 2 }}>
            <Typography component="legend">Your Rating</Typography>
            <Rating
              name="patient-rating"
              value={rating}
              onChange={(e, newValue) => setRating(newValue)}
              size="large"
            />
          </Box>

          <TextField
            label="Your Feedback"
            multiline
            rows={4}
            fullWidth
            margin="normal"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
            sx={{ mt: 2 }}
          >
            Submit Feedback
          </Button>
        </CardContent>
      </Card>

      {/* All Submitted Feedback */}
      <Box mt={5}>
        <Typography variant="h6" gutterBottom>
          💬 All Feedback
        </Typography>

        {feedbackList.map((fb) => (
          <Card key={fb.id} variant="outlined" sx={{ mb: 2 }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle2" fontWeight="bold">
                  {fb.name}
                </Typography>
                <Rating value={fb.rating} readOnly size="small" />
              </Box>

              <Typography variant="body1" mt={1}>
                <strong>Feedback:</strong> {fb.comment}
              </Typography>

              <Divider sx={{ my: 1 }} />

              <Typography variant="body2" color="text.secondary">
                <strong>Admin Response:</strong>{" "}
                {fb.response ? (
                  <span style={{ color: "#1976d2" }}>{fb.response}</span>
                ) : (
                  "Awaiting response..."
                )}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          severity="success"
          sx={{ width: "100%" }}
          onClose={() => setOpenSnackbar(false)}
        >
          Feedback submitted successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default PatientFeedback;
