import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box, Alert, CircularProgress } from "@mui/material";
import { Email as EmailIcon } from "@mui/icons-material";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  
  const handleReset = async () => {
    setLoading(true);
    setError("");
    setSuccess(false);

    // Simulating API call
    setTimeout(() => {
      setLoading(false);
      if (email === "test@example.com") {
        setSuccess(true);
      } else {
        setError("Email not found. Please try again.");
      }
    }, 2000);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box 
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: 3,
          p: 4,
          borderRadius: 3,
          bgcolor: "background.paper",
        }}
      >
        <EmailIcon color="traditional" sx={{ fontSize: 60, mb: 2 }} />
        <Typography variant="h4" sx={{ mb: 2 }}>Forgot Password</Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Enter your email to receive a password reset link.
        </Typography>

        <TextField
          label="Email Address"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          required
        />

        {loading ? (
          <CircularProgress sx={{ mt: 2 }} />
        ) : (
          <Button
            variant="contained"
            style={{ marginTop: "20px",  background: "linear-gradient(135deg, rgba(0,136,160,1), rgba(0,191,184,1))",
              color: "#fff", }}
            fullWidth
            onClick={handleReset}
            sx={{ mt: 2 }}
          >
            Send Reset Link
          </Button>
        )}

        {success && (
          <Alert severity="success" sx={{ mt: 3, width: "100%" }}>
            Password reset link sent successfully!
          </Alert>
        )}
        
        {error && (
          <Alert severity="error" sx={{ mt: 3, width: "100%" }}>
            {error}
          </Alert>
        )}
      </Box>
    </Container>
  );
};

export default ForgotPassword;
