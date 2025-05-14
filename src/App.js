import logo from "./logo.svg";
import "./App.css";
//import React from "react";
import { Routes, Route } from "react-router-dom";
import InstantConsultation from "./components/instant-consultation/InstantConsultation";
import FindDoctorSearch from "./components/FindDoctorSearch/FindDoctorSearch";

function App() {
  return (
    <div className="App">
      {/* <h1>Welcome to Our Booking App</h1>
      <InstantConsultation /> */}
      {/* <h1>Test: Find Doctor Search Component</h1> */}
      <FindDoctorSearch />
      {/* <Routes>
        <Route path="/instant-consultation" element={<InstantConsultation />} />
      </Routes> */}
    </div>
  );
}

export default App;
