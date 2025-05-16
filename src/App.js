import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import InstantConsultation from "./components/BookingConsultation";
import Landing_Page from "./components/Landing_Page/LandingPage";
import SignUpPage from "./components/Sign_Up/Sign_Up";
import LoginPage from "./components/Login/Login";
import Notification from "./components/Notification/Notification";
import GiveReviews from "./components/ReviewForm/ReviewForm";
import PageReview from "./components/ReviewForm/GiveReviews";

function App() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const name = sessionStorage.getItem("name");
    if (name) setUserName(name);
  }, []);

  return (
    <div className="App">
      <h1>Welcome to Our Booking App</h1>
      <Notification>
        <Routes>
          <Route path="/" element={<Landing_Page />} />
          <Route
            path="/sign_up"
            element={<SignUpPage setUserName={setUserName} />}
          />
          <Route
            path="/login"
            element={<LoginPage setUserName={setUserName} />}
          />
          <Route
            path="/instant-consultation"
            element={
              sessionStorage.getItem("email") ? (
                <InstantConsultation />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/reviews" element={<PageReview />} />
        </Routes>
      </Notification>
    </div>
  );
}

export default App;
