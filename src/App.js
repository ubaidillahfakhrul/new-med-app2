import logo from "./logo.svg";
import "./App.css";
//import React from "react";
import { Routes, Route } from "react-router-dom";
import InstantConsultation from "./components/instant-consultation/InstantConsultation";

function App() {
  return (
    <div className="App">
      {/* <h1>Welcome to Our Booking App</h1>
      <InstantConsultation /> */}
      <Routes>
        <Route path="/instant-consultation" element={<InstantConsultation />} />
      </Routes>
    </div>
  );
}

export default App;
