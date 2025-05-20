import React, { useState } from "react";
import "./GiveReviews.css"; // optional for styling

function PageReview() {
  const [showForm, setShowForm] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    review: "",
    rating: 0,
  });

  const handleButtonClick = () => {
    setShowForm(true);
  };

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
      setSubmittedMessage(formData);
      setIsSubmitted(true);
      setShowForm(false); // close form
      setFormData({ name: "", review: "", rating: 0 });
    } else {
      setShowWarning(true);
    }
  };

  return (
    <div>
      <h2>Feedback Form</h2>

      {/* Button to open form (disabled after submit) */}
      <button onClick={handleButtonClick} disabled={isSubmitted}>
        {isSubmitted ? "Feedback Submitted" : "Click Here to Give Feedback"}
      </button>

      {/* Feedback Form */}
      {showForm && (
        <form onSubmit={handleSubmit}>
          <h3>Give Your Feedback</h3>
          {showWarning && (
            <p className="warning">
              Please fill out all fields and select a rating.
            </p>
          )}

          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="review">Review:</label>
            <textarea
              id="review"
              name="review"
              value={formData.review}
              onChange={handleChange}
            />
          </div>

          {/* Star Rating Selector */}
          <div>
            <label>Rating:</label>
            <div className="rating">
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
          </div>

          <button type="submit">Submit</button>
        </form>
      )}

      {/* Display submitted review in red-bordered box */}
      {submittedMessage && (
        <div
          style={{
            border: "2px solid red",
            padding: "10px",
            marginTop: "15px",
            borderRadius: "5px",
          }}
        >
          <h3>Submitted Review:</h3>
          <p>
            <strong>Name:</strong> {submittedMessage.name}
          </p>
          <p>
            <strong>Review:</strong> {submittedMessage.review}
          </p>
          <p>
            <strong>Rating:</strong> {submittedMessage.rating} / 5
          </p>
        </div>
      )}
    </div>
  );
}

export default PageReview;
