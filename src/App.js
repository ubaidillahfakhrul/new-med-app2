import logo from "./logo.svg";
import "./App.css";
// Import necessary modules from React library
import React, { useState, useEffect } from "react";
// Import components for routing from react-router-dom library
import { Routes, Route } from "react-router-dom";
import InstantConsultation from "./components/BookingConsultation";
import Navbar from "./components/NavBar/Navbar";
import Landing_Page from "./components/Landing_Page/LandingPage";
import SignUpPage from "./components/Sign_Up/Sign_Up";
import LoginPage from "./components/Login/Login";

function App() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const name = sessionStorage.getItem("name");
    if (name) setUserName(name);
  }, []);

  return (
    <div className="App">
      <h1>Welcome to Our Booking App</h1>
      {/* Display the Navbar component */}
      <Navbar />
      {/* Set up the Routes for different pages */}
      <Routes>
        {/* Define individual Route components for different pages */}
        <Route path="/" element={<Landing_Page />} />{" "}
        <Route
          path="/sign_up"
          element={<SignUpPage setUserName={setUserName} />}
        />
        <Route
          path="/login"
          element={<LoginPage setUserName={setUserName} />}
        />
      </Routes>
      {/* <InstantConsultation /> */}
      {/* <h1>Test: Find Doctor Search Component</h1> */}
      {/* <FindDoctorSearch />
      <DoctorCard /> */}
      {/* <Routes>
        <Route path="/instant-consultation" element={<InstantConsultation />} />
      </Routes> */}
    </div>
  );
}

export default App;
