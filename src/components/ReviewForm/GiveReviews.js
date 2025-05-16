import React, { useState, useEffect } from "react";
import "./GiveReviews.css";

function PageReview() {
  const [appointments, setAppointments] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [reviews, setReviews] = useState({}); // review per doctorId

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("appointments") || "[]");

    // Contoh data harus punya doctorId di appointment
    // Simulasi jika data tidak ada doctorId, tambahkan default id untuk testing
    const confirmed = stored
      .filter((app) => app.status === "confirmed")
      .map((app, idx) => ({
        ...app,
        doctorId: app.doctorId || idx + 1,
      }));

    setAppointments(confirmed);
  }, []);

  const handleGiveReviewClick = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleCancelReview = () => {
    setSelectedDoctor(null);
  };

  const handleSubmitReview = (doctorId, reviewData) => {
    setReviews((prev) => ({
      ...prev,
      [doctorId]: reviewData,
    }));
    setSelectedDoctor(null);
  };

  return (
    <div>
      <h2>Give Feedback</h2>

      {appointments.length === 0 ? (
        <p>No appointments yet.</p>
      ) : (
        <ul>
          {appointments.map((app) => (
            <li key={app.doctorId}>
              {app.doctorName} ({app.doctorSpeciality}) - {app.appointmentDate}{" "}
              {app.timeSlot}{" "}
              <button onClick={() => handleGiveReviewClick(app)}>
                Give Review
              </button>
              {/* Tampilkan review jika sudah ada */}
              {reviews[app.doctorId] && (
                <div style={{ marginTop: "5px", fontStyle: "italic" }}>
                  <strong>Your Review:</strong> {reviews[app.doctorId].review}{" "}
                  <br />
                  <strong>Rating:</strong>{" "}
                  {"★".repeat(reviews[app.doctorId].rating) +
                    "☆".repeat(5 - reviews[app.doctorId].rating)}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* Form review muncul kalau sudah klik give review */}
      {selectedDoctor && (
        <ReviewForm
          doctor={selectedDoctor}
          onSubmit={(data) => handleSubmitReview(selectedDoctor.doctorId, data)}
          onCancel={handleCancelReview}
        />
      )}
    </div>
  );
}

function ReviewForm({ doctor, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    review: "",
    rating: 0,
  });
  const [showWarning, setShowWarning] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRatingClick = (star) => {
    setFormData({ ...formData, rating: star });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.review && formData.rating > 0) {
      setShowWarning(false);
      onSubmit(formData);
    } else {
      setShowWarning(true);
    }
  };

  return (
    <div
      style={{ marginTop: "20px", padding: "15px", border: "1px solid #ccc" }}
    >
      <h3>Give Review for {doctor.doctorName}</h3>

      {showWarning && (
        <p style={{ color: "red" }}>
          Please fill all fields and select a rating.
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <br />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Review:</label>
          <br />
          <textarea
            name="review"
            value={formData.review}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Rating:</label>
          <br />
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              style={{
                fontSize: "24px",
                cursor: "pointer",
                color: star <= formData.rating ? "#FFD700" : "#ccc",
              }}
              onClick={() => handleRatingClick(star)}
            >
              ★
            </span>
          ))}
        </div>

        <button type="submit" style={{ marginTop: "10px" }}>
          Submit
        </button>
        <button
          type="button"
          onClick={onCancel}
          style={{ marginLeft: "10px", marginTop: "10px" }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default PageReview;
