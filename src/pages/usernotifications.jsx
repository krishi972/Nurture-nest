import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  Badge
} from "@mui/material";
import { NotificationsActive, Done, AlarmOn } from "@mui/icons-material";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc
} from "firebase/firestore";
import { db } from "../config/Firebase";

const PatientNotificationScreen = () => {
  const [notifications, setNotifications] = useState([]);
  const [reminders, setReminders] = useState([]);

  const userName = "sarthak"; // Replace with the actual logged-in patient's name

  // Fetch notifications for the user
  useEffect(() => {
    const notifQuery = query(
      collection(db, "notifications"),
      where("recipientName", "==", userName)
    );

    const unsubscribe = onSnapshot(notifQuery, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setNotifications(data);
    });

    return () => unsubscribe();
  }, [userName]);

  // Fetch reminders
  useEffect(() => {
    const reminderQuery = query(collection(db, "reminders"));

    const unsubscribe = onSnapshot(reminderQuery, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setReminders(data);
    });

    return () => unsubscribe();
  }, []);

  // Mark a notification as read
  const markAsRead = async (id) => {
    try {
      const notifRef = doc(db, "notifications", id);
      await updateDoc(notifRef, { read: true });

      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    } catch (err) {
      console.error("Error updating notification:", err);
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        <Badge badgeContent={unreadCount} color="primary">
          <NotificationsActive />
        </Badge>{" "}
        Your Notifications
      </Typography>

      {/* Notifications List */}
      <Card sx={{ mt: 2, mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Admin Notifications
          </Typography>
          <List>
            {notifications.map((notif) => {
              const notifTime =
                notif.createdAt?.toDate?.() ||
                notif.timestamp?.toDate?.() ||
                null;

              return (
                <React.Fragment key={notif.id}>
                  <ListItem
                    sx={{
                      backgroundColor: notif.read ? "#f5f5f5" : "#e3f2fd",
                      borderRadius: 2,
                      mb: 1
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography fontWeight="bold">
                          {notif.type || "Admin"} Notification
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography variant="body2">
                            {notif.message}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {notifTime
                              ? notifTime.toLocaleString()
                              : "No timestamp"}
                          </Typography>
                        </>
                      }
                    />
                    {!notif.read && (
                      <IconButton edge="end" onClick={() => markAsRead(notif.id)}>
                        <Done />
                      </IconButton>
                    )}
                  </ListItem>
                  <Divider />
                </React.Fragment>
              );
            })}
          </List>
        </CardContent>
      </Card>

      {/* Reminders List */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            <AlarmOn sx={{ mr: 1 }} />
            Admin Reminders
          </Typography>
          <List>
            {reminders.map((reminder) => {
              const reminderTime =
                reminder.createdAt?.toDate?.() ||
                reminder.timestamp?.toDate?.() ||
                null;

              return (
                <React.Fragment key={reminder.id}>
                  <ListItem>
                    <ListItemText
                      primary={reminder.message}
                      secondary={
                        <Typography variant="caption" color="text.secondary">
                          {reminderTime
                            ? reminderTime.toLocaleString()
                            : "No timestamp"}
                        </Typography>
                      }
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              );
            })}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PatientNotificationScreen;
