import React, { useState, useEffect } from "react";
import "./GiveReviews.css";

function PageReview() {
  const [appointments, setAppointments] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [reviews, setReviews] = useState({}); // review per doctorId

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("appointments") || "[]");

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
      <h2>Reviews</h2>
      {appointments.length === 0 ? (
        <p>No appointments yet.</p>
      ) : (
        <table className="review-table">
          <thead>
            <tr>
              <th>Serial Number</th>
              <th>Doctor Name</th>
              <th>Doctor Speciality</th>
              <th>Provide feedback</th>
              <th>Review Given</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((app, index) => {
              const isReviewed = !!reviews[app.doctorId];
              return (
                <tr key={app.doctorId}>
                  <td>{index + 1}</td>
                  <td>{app.doctorName}</td>
                  <td>{app.doctorSpeciality}</td>
                  <td>
                    <button
                      className="btn-review"
                      disabled={isReviewed}
                      onClick={() => handleGiveReviewClick(app)}
                    >
                      Click Here
                    </button>
                  </td>
                  <td>
                    {isReviewed && (
                      <div className="star-box">
                        {"★".repeat(reviews[app.doctorId].rating)}
                        {"☆".repeat(5 - reviews[app.doctorId].rating)}
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

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
    <div className="form-box">
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
        <button type="submit" className="btn-submit">
          Submit
        </button>
        <button type="button" onClick={onCancel} className="btn-cancel">
          Cancel
        </button>
      </form>
    </div>
  );
}

export default PageReview;
