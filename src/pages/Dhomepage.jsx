import React, { useState } from "react";
import {
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Modal,
  Box,
  TextField,
  MenuItem,
  Select,
  Snackbar,
} from "@mui/material";
import {
  LocalHospital,
  Biotech,
  AccessTime,
  MonetizationOn,
  DateRange,
} from "@mui/icons-material";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
} from "@mui/material";
import {
  Menu,
  Home,
  VideoCall,
  People,
  Event,
  ContactMail,
} from "@mui/icons-material";

const HomePage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showConsultations, setShowConsultations] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [patientDetails, setPatientDetails] = useState({
    name: "",
    age: "",
    mobile: "",
  });
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [toastOpen, setToastOpen] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [paymentStatus, setPaymentStatus] = useState(null);

  const doctors = [
    {
      name: "Dr. Smit Sharma",
      specialty: "Cardiologist",
      price: "Rs.1000",
      slots: ["10:00 AM", "2:00 PM", "4:00 PM"],
    },
    {
      name: "Dr. Sakshi gohel",
      specialty: "Cardiologist",
      price: "Rs.1000",
      slots: ["10:00 AM", "2:00 PM", "4:00 PM"],
    },
    {
      name: "Dr. Seema Jain",
      specialty: "Dermatologist",
      price: "Rs.500",
      slots: ["11:00 AM", "3:00 PM", "5:00 PM"],
    },
    {
      name: "Dr. Aprna joshi",
      specialty: "Dermatologist",
      price: "Rs.500",
      slots: ["11:00 AM", "3:00 PM", "5:00 PM"],
    },
    {
      name: "Dr. Rakesh Gayakvad",
      specialty: "Neurologist",
      price: "Rs.800",
      slots: ["9:00 AM", "1:00 PM", "6:00 PM"],
    },
    {
      name: "Dr. Rohini patel",
      specialty: "Neurologist",
      price: "Rs.800",
      slots: ["9:00 AM", "1:00 PM", "6:00 PM"],
    },
    {
      name: "Dr. Anand Birla",
      specialty: "Orthopedic",
      price: "Rs.700",
      slots: ["9:00 AM", "1:00 PM", "6:00 PM"],
    },
    {
      name: "Dr. Mahima Birla",
      specialty: "Orthopedic",
      price: "Rs.700",
      slots: ["9:00 AM", "1:00 PM", "6:00 PM"],
    },
  ];
  const toggleDrawer = (state) => () => setDrawerOpen(state);
  const confirmBooking = () => {
    if (
      patientDetails.name &&
      patientDetails.age &&
      patientDetails.mobile &&
      selectedDoctor &&
      selectedTimeSlot
    ) {
      setBookingConfirmed(true);
      setToastOpen(true);
      setTimeout(() => {
        setToastOpen(false);
        setShowConsultations(false);
      }, 2000);
    }
  };

  const handlePayment = () => {
    if (
      paymentMethod &&
      cardDetails.cardNumber &&
      cardDetails.expiryDate &&
      cardDetails.cvv
    ) {
      setPaymentStatus("Payment Successful");
    } else {
      setPaymentStatus("Payment Failed");
    }
    setTimeout(() => setPaymentStatus(null), 3000);
  };

  return (
    <>
      <IconButton
        onClick={toggleDrawer(true)}
        style={{ position: "absolute", top: 20, left: 20, color: "black" }}
      >
        <Menu fontSize="large" />
      </IconButton>

      {/* <AppDrawer open={drawerOpen} toggleDrawer={toggleDrawer} /> */}

      <div
        style={{
          backgroundImage: "url(/demo.jpg)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top center",
          minHeight: "98vh",
          width: "99vw",
          padding: "",
        }}
      >
        <Container>
          <Typography
            variant="h2"
            color="black"
            textAlign="center"
            gutterBottom
          >
            <br />
            Welcome to Nurture Nest !!
          </Typography>
          <Grid
            container
            spacing={3}
            justifyContent="center"
            style={{ marginTop: 20 }}
          >
            <Button
              variant="contained"
              color="primary"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0,136,160,1), rgba(0,191,184,1))",
                color: "#fff",
                transition: "0.3s",
              }}
              onClick={() => setShowConsultations(true)}
            >
              Video Consultations
            </Button>

            <Container>
              <Typography
                variant="h4"
                textAlign="center"
                marginTop={10}
                gutterBottom
              >
                Why Choose Us?
              </Typography>
              <Grid
                container
                spacing={3}
                justifyContent="center"
                style={{ marginTop: 20 }}
              >
                {[
                  {
                    title: "Experienced Doctors",
                    description:
                      "Our team consists of highly qualified and experienced doctors dedicated to providing top-quality care.",
                    icon: (
                      <LocalHospital
                        fontSize="large"
                        style={{ color: "#007bff" }}
                      />
                    ),
                  },
                  {
                    title: "Advanced Technology",
                    description:
                      "We utilize state-of-the-art technology to ensure accurate diagnoses and effective treatments.",
                    icon: (
                      <Biotech fontSize="large" style={{ color: "#28a745" }} />
                    ),
                  },
                  {
                    title: "24/7 Emergency Service",
                    description:
                      "Our emergency department is open 24/7 to provide immediate and critical care whenever you need it.",
                    icon: (
                      <AccessTime
                        fontSize="large"
                        style={{ color: "#ffc107" }}
                      />
                    ),
                  },
                  {
                    title: "Affordable Treatment Plans",
                    description:
                      "We offer cost-effective healthcare plans tailored to meet the needs of every patient.",
                    icon: (
                      <MonetizationOn
                        fontSize="large"
                        style={{ color: "#dc3545" }}
                      />
                    ),
                  },
                ].map((item, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Card
                      style={{
                        background: "linear-gradient(135deg, #ffffff, #f8f9fa)",
                        height: "250px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "15px",
                        boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
                        transition: "transform 0.3s ease-in-out",
                        textAlign: "center",
                        padding: "20px",
                        ":hover": { transform: "scale(1.05)" },
                      }}
                    >
                      <CardContent>
                        {item.icon}
                        <Typography
                          variant="h6"
                          style={{
                            marginTop: 15,
                            fontWeight: "bold",
                            color: "#343a40",
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          style={{ marginTop: 10, color: "#6c757d" }}
                        >
                          {item.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Grid>
        </Container>

        <Modal
          open={showConsultations}
          onClose={() => setShowConsultations(false)}
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 600,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <Typography variant="h5" gutterBottom>
              Available Video Consultations
            </Typography>
            {doctors.map((doctor, index) => (
              <Box
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <Typography>
                  {doctor.name} - {doctor.specialty} ({doctor.price})
                </Typography>
                <Button
                  variant="contained"
                  style={{
                    
                    background: "linear-gradient(135deg, rgba(0,136,160,1), rgba(0,191,184,1))",
                    color: "#fff",
                    transition: "0.3s",
                  }}
                  onClick={() => setSelectedDoctor(doctor)}
                >
                  Book Now
                </Button>
              </Box>
            ))}
            {selectedDoctor && (
              <Box marginTop={2}>
                <TextField
                  fullWidth
                  label="Patient Name"
                  margin="normal"
                  value={patientDetails.name}
                  onChange={(e) =>
                    setPatientDetails({
                      ...patientDetails,
                      name: e.target.value,
                    })
                  }
                />
                <TextField
                  fullWidth
                  label="Age"
                  margin="normal"
                  value={patientDetails.age}
                  onChange={(e) =>
                    setPatientDetails({
                      ...patientDetails,
                      age: e.target.value,
                    })
                  }
                />
                <TextField
                  fullWidth
                  label="Mobile Number"
                  margin="normal"
                  value={patientDetails.mobile}
                  onChange={(e) =>
                    setPatientDetails({
                      ...patientDetails,
                      mobile: e.target.value,
                    })
                  }
                />
                <Select
                  fullWidth
                  value={selectedTimeSlot}
                  onChange={(e) => setSelectedTimeSlot(e.target.value)}
                  displayEmpty
                  style={{ marginTop: 10 }}
                >
                  <MenuItem value="" disabled>
                    Select Time Slot
                  </MenuItem>
                  {selectedDoctor.slots.map((slot, index) => (
                    <MenuItem key={index} value={slot}>
                      {slot}
                    </MenuItem>
                  ))}
                </Select>
                <Button
                  type="submit"
                  variant="contained"
                 
                  fullWidth style={{marginTop:10}}
                  
                  onClick={confirmBooking}
                >
                  Confirm Booking
                </Button>
                <Snackbar
                  open={toastOpen}
                  autoHideDuration={2000}
                  message="Booking Successfully Confirmed!"
                  anchorOrigin={{ vertical: "center", horizontal: "center" }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={{ marginTop: 10 }}
                  onClick={() => setShowPaymentForm(true)}
                >
                  Pay Now
                </Button>
              </Box>
            )}
          </Box>
        </Modal>

        <Modal open={showPaymentForm} onClose={() => setShowPaymentForm(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <Select
              fullWidth
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              displayEmpty
            >
              <MenuItem value="" disabled>
                Select Payment Method
              </MenuItem>
              <MenuItem value="Credit Card">Credit Card</MenuItem>
              <MenuItem value="Debit Card">Debit Card</MenuItem>
              <MenuItem value="Net Banking">Net Banking</MenuItem>
            </Select>

            {paymentMethod && (
              <>
                <TextField
                  fullWidth
                  label="Card Number"
                  margin="normal"
                  value={cardDetails.cardNumber}
                  onChange={(e) =>
                    setCardDetails({
                      ...cardDetails,
                      cardNumber: e.target.value,
                    })
                  }
                />
                <TextField
                  fullWidth
                  label="Expiry Date"
                  margin="normal"
                  value={cardDetails.expiryDate}
                  onChange={(e) =>
                    setCardDetails({
                      ...cardDetails,
                      expiryDate: e.target.value,
                    })
                  }
                />
                <TextField
                  fullWidth
                  label="CVV"
                  margin="normal"
                  type="password"
                  value={cardDetails.cvv}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, cvv: e.target.value })
                  }
                />
                <Button
                  variant="contained"
                  color="success"
                  fullWidth
                  onClick={handlePayment}
                  disabled={
                    !cardDetails.cardNumber ||
                    !cardDetails.expiryDate ||
                    !cardDetails.cvv
                  }
                >
                  Confirm Payment
                </Button>

                {paymentStatus && (
                  <Typography
                    variant="h6"
                    textAlign="center"
                    style={{ marginTop: 10 }}
                  >
                    {paymentStatus}
                  </Typography>
                )}
              </>
            )}
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default HomePage;
