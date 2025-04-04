import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Snackbar,
  Alert
} from "@mui/material";

const LoginAndRoleManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, username: "admin", role: "Admin" },
    { id: 2, username: "receptionist", role: "Receptionist" },
  ]);

  const [newUser, setNewUser] = useState({ username: "", password: "", role: "Receptionist" });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddUser = () => {
    if (newUser.username && newUser.password) {
      setUsers([...users, { id: users.length + 1, ...newUser }]);
      setSnackbarMessage("User added successfully!");
      setOpenSnackbar(true);
      setNewUser({ username: "", password: "", role: "Receptionist" });
    } else {
      setSnackbarMessage("Please fill in all fields.");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        🔐 Login & Role Management
      </Typography>

      <Grid container spacing={4}>
        {/* Add New User Form */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Add New User</Typography>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={newUser.username}
                onChange={handleInputChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                name="password"
                value={newUser.password}
                onChange={handleInputChange}
                margin="normal"
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Role</InputLabel>
                <Select
                  name="role"
                  value={newUser.role}
                  onChange={handleInputChange}
                >
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="Receptionist">Receptionist</MenuItem>
                  <MenuItem value="Doctor">Doctor</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddUser}
                sx={{ mt: 2 }}
              >
                Add User
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* User List */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">User Roles</Typography>
              {users.map((user) => (
                <Typography key={user.id}>
                  {user.username} - {user.role}
                </Typography>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default LoginAndRoleManagement;
