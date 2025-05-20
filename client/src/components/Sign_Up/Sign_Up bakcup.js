import React, { useState } from 'react';

const SignUpPage = () => {
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, phone, email, password } = e.target.elements;
    let newErrors = {};

    if (!name.value.trim()) newErrors.name = 'Name is required.';
    if (!/^\d{10}$/.test(phone.value)) newErrors.phone = 'Phone number must be exactly 10 digits.';
    if (!/\S+@\S+\.\S+/.test(email.value)) newErrors.email = 'Email is invalid.';
    if (!password.value.trim()) newErrors.password = 'Password is required.';

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      alert("Sign up successful!");
      // lanjutkan pengiriman data...
    }
  };

  return (
    <div className="container" style={{ marginTop: '5%' }}>
      <div className="signup-grid">
        <div className="signup-text"><h1>Sign Up</h1></div>
        <div className="signup-text1" style={{ textAlign: 'left' }}>
          Already a member? <span><a href="../Login/Login.html" style={{ color: '#2190FF' }}>Login</a></span>
        </div>
        <div className="signup-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" id="name" className="form-control" placeholder="Enter your name" />
              {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input type="tel" name="phone" id="phone" className="form-control" placeholder="Enter your phone number" />
              {errors.phone && <p style={{ color: 'red' }}>{errors.phone}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" className="form-control" placeholder="Enter your email" />
              {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" className="form-control" placeholder="Enter your password" />
              {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
            </div>
            <div className="btn-group">
              <button type="submit" className="btn btn-primary">Submit</button>
              <button type="reset" className="btn btn-danger">Reset</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
