import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../config/Firebase";

const PatientPrescription = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [patientId, setPatientId] = useState("");
  const [patientName, setPatientName] = useState("");

  const fetchPrescriptionsForPatient = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.warn("No authenticated user found.");
        return;
      }

      // Get patient profile
      const snapshot = await getDocs(collection(db, "patientProfiles"));
      const profileDoc = snapshot.docs.find(
        (doc) => doc.data().email === user.email
      );

      if (!profileDoc) {
        console.warn("Patient profile not found.");
        return;
      }

      const patientData = profileDoc.data();
      const currentPatientId = patientData.patientId;
      const currentPatientName = patientData.name;

      setPatientId(currentPatientId);
      setPatientName(currentPatientName);

      // Get prescriptions for that patient ID
      const prescriptionsSnapshot = await getDocs(collection(db, "prescriptions"));
      const prescriptionsData = prescriptionsSnapshot.docs
        .map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            date: data.date?.toDate().toLocaleString() || "No date",
          };
        })
        .filter((prescription) => prescription.patientId === currentPatientId);

      setPrescriptions(prescriptionsData);
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
    }
  };

  useEffect(() => {
    fetchPrescriptionsForPatient();
  }, []);

  return (
    <Box sx={{ maxWidth: 1000, margin: "auto", p: 4 }}>
      <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            My Prescriptions
          </Typography>

          {patientName && (
            <>
              <Typography variant="subtitle1">
                <strong>Patient Name:</strong> {patientName}
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                <strong>Patient ID:</strong> {patientId}
              </Typography>
            </>
          )}

          {prescriptions.length === 0 ? (
            <Typography variant="body1">No prescriptions available.</Typography>
          ) : (
            prescriptions.map((prescription) => (
              <Accordion key={prescription.id} sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>{prescription.date}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="h6">Medications:</Typography>
                  <List>
                    {prescription.medications.map((med, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={`${med.name} - ${med.dosage}`}
                          secondary={`Frequency: ${med.frequency}, Duration: ${med.duration}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    Notes:
                  </Typography>
                  <Typography>
                    {prescription.notes || "No additional notes."}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default PatientPrescription;
