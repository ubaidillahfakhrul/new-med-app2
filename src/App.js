import logo from "./logo.svg";
import "./App.css";
import InstantConsultation from "./components/BookingConsultation";

function App() {
  return (
    <div className="App">
      <h1>Welcome to Our Booking App</h1>
      <InstantConsultation />
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
