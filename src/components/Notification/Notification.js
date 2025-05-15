import React, { useEffect, useState } from 'react';
import './Notification.css';
import Navbar from "../NavBar/Navbar";

const Notification = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);
  const [showNotification, setShowNotification] = useState(true); // New state

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('email');
    const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
    const storedAppointmentData = JSON.parse(localStorage.getItem(storedDoctorData?.name));

    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
    if (storedDoctorData) {
      setDoctorData(storedDoctorData);
    }
    if (storedAppointmentData) {
      setAppointmentData(storedAppointmentData);
    }
  }, []);

  // Simulasi pembatalan appointment (Anda bisa ganti ini dengan trigger sebenarnya)
  const cancelAppointment = () => {
    setShowNotification(false);
  };

  return (
    <div>
      <Navbar />
      {children}

      {isLoggedIn && appointmentData && showNotification && (
        <div className="notification-container">
          <h3>Appointment Details</h3>
          <p><strong>Patient:</strong> {username}</p>
          <p><strong>Doctor:</strong> {doctorData?.name}</p>
          <p><strong>Date:</strong> {appointmentData?.date}</p>
          <p><strong>Time:</strong> {appointmentData?.time}</p>
          <button onClick={cancelAppointment}>Cancel Appointment</button>
        </div>
      )}
    </div>
  );
};

export default Notification;
