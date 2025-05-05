import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  Link,
} from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/Firebase"; // Make sure this path is correct

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("✅ Logged in as:", userCredential.user.email);
  
      // Save role to localStorage (optional, helps Navbar know the role)
      const token = await userCredential.user.getIdToken();
      localStorage.setItem("token", token);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("useruid", userCredential.user.uid);
  
      // Redirect to /user page to show App Drawer
      navigate("/user/patienthome");
    } catch (error) {
      console.error("❌ Login error:", error);
      alert("Login failed: " + error.message);
    }
  };
  

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={3}
        style={{ padding: "30px", marginTop: "100px", borderRadius: "10px" }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Patient Login
        </Typography>
        <TextField
          fullWidth
          label="Email Address"
          type="email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          style={{ marginTop: "10px" }}
        >
          
        </Grid>
        <Button
          variant="contained"
          fullWidth
          onClick={handleLogin}
          style={{
            marginTop: "20px",
            background:
              "linear-gradient(135deg, rgba(0,136,160,1), rgba(0,191,184,1))",
            color: "#fff",
          }}
        >
          Login
        </Button>
        <Typography align="center" style={{ marginTop: "15px" }}>
          Don't have an account?
          <Button color="primary" onClick={() => navigate("/user/usersignup")}>
            <u>Sign Up</u>
          </Button>
        </Typography>
      </Paper>
    </Container>
  );
}

export default Login;
