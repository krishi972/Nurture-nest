import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Container,
} from "@mui/material";
import { ExitToApp } from "@mui/icons-material";
import { auth } from "../config/Firebase";

const Logout = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Open confirmation dialog
  const handleOpen = () => {
    setOpen(true);
  };

  // Close dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Logout process
  const handleLogout = async () => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        console.log(`Logged out from: ${currentUser.email}`);
      } else {
        console.log("No user was logged in.");
      }

      localStorage.removeItem("authToken");
      sessionStorage.clear();
      await auth.signOut();
      navigate("/userlogin");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 10 }}>
      <Box sx={{ p: 4, bgcolor: "#fff", borderRadius: 2, boxShadow: 3 }}>
        <ExitToApp sx={{ fontSize: 60, color: "red" }} />
        <Typography variant="h5" fontWeight="bold" sx={{ mt: 2 }}>
          Are you sure you want to logout?
        </Typography>
        <Typography variant="body1" sx={{ mt: 1, color: "gray" }}>
          You will be redirected to the login page.
        </Typography>

        <Button
          variant="contained"
          color="error"
          sx={{
            mt: 3,
            width: "100%",
            background:
              "linear-gradient(135deg, rgba(0,136,160,1), rgba(0,191,184,1))",
            color: "#fff",
          }}
          onClick={handleOpen}
        >
          Logout
        </Button>
      </Box>

      {/* Confirmation Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to log out?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{
              background:
                "linear-gradient(135deg, rgba(0,136,160,1), rgba(0,191,184,1))",
              color: "#fff",
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleLogout} color="error" variant="contained">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Logout;
