import React, { useState } from "react";

const AppointmentForm = ({ doctorName = "Dr. Denis Raj", doctorSpeciality = "Dentist", onSubmit }) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, phoneNumber, appointmentDate, timeSlot });
    setName("");
    setPhoneNumber("");
    setAppointmentDate("");
    setTimeSlot("");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>{doctorName}</h2>
      <p style={styles.subText}>{doctorSpeciality}</p>
      <p style={styles.experience}>24 years experience</p>
      <p style={styles.rating}>
        <strong>Ratings:</strong> ⭐⭐⭐⭐☆
      </p>

      <form onSubmit={handleFormSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label>Phone Number:</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label>Date of Appointment:</label>
          <input
            type="date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label>Book Time Slot:</label>
          <select
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            required
            style={styles.input}
          >
            <option value="">Select a time slot</option>
            <option value="09:00 AM">09:00 AM</option>
            <option value="10:00 AM">10:00 AM</option>
            <option value="11:00 AM">11:00 AM</option>
            <option value="12:00 PM">12:00 PM</option>
          </select>
        </div>

        <button type="submit" style={styles.button}>Book Now</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    width: "350px",
    margin: "0 auto",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#f8f8f8",
    textAlign: "center",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif"
  },
  heading: {
    margin: "10px 0 0 0"
  },
  subText: {
    margin: "5px 0",
    fontWeight: "bold"
  },
  experience: {
    margin: "5px 0",
    color: "#555"
  },
  rating: {
    margin: "10px 0",
    color: "#333"
  },
  form: {
    marginTop: "15px"
  },
  formGroup: {
    marginBottom: "15px",
    textAlign: "left"
  },
  input: {
    width: "100%",
    padding: "8px",
    marginTop: "5px",
    borderRadius: "4px",
    border: "1px solid #ccc"
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }
};

export default AppointmentForm;
