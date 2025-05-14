import React from "react";
import DoctorCard from "./components/DoctorCard/DoctorCard";

function App() {
  const doctors = [
    {
      name: "Dr. Aisha Rahman",
      speciality: "Cardiologist",
      experience: 12,
      ratings: 4.9,
    },
    {
      name: "Dr. Budi Santoso",
      speciality: "Dermatologist",
      experience: 8,
      ratings: 4.6,
    },
    {
      name: "Dr. Clara Wijaya",
      speciality: "ENT Specialist",
      experience: 10,
      ratings: 4.8,
    },
  ];

  return (
    <div
      className="App"
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {doctors.map((doc, index) => (
        <DoctorCard key={index} {...doc} />
      ))}
    </div>
  );
}

export default App;
