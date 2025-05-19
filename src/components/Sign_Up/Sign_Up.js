import React, { useState } from "react";
import "./Sign_Up.css";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config.js";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showerr, setShowerr] = useState("");
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();

    // Validasi nomor telepon: hanya 10 digit angka
    if (!/^\d{10}$/.test(phone)) {
      setShowerr("Phone number must be exactly 10 digits.");
      return;
    }

    // Validasi password minimal 6 karakter (opsional)
    if (password.length < 8) {
      setShowerr("Password must be at least 8 characters.");
      return;
    }

    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, phone }),
    });

    //const json = await response.json();
    //Debug Log
    console.log("Status:", response.status);

    const text = await response.text();
    console.log("Raw response text:", text);

    let json = {};
    try {
      json = JSON.parse(text);
      console.log("Response JSON:", json); //for log tracing
    } catch (err) {
      console.error("JSON parse error:", err);
      setShowerr("Failed get response from server. Please try again.");
      return;
    }

    if (json.authtoken) {
      sessionStorage.setItem("auth-token", json.authtoken);
      sessionStorage.setItem("name", name);
      sessionStorage.setItem("phone", phone);
      sessionStorage.setItem("email", email);
      navigate("/");
      window.location.reload();
    } else {
      //setShowerr(json.error || (json.errors && json.errors[0].msg));
      // Jika error dalam bentuk array
      if (Array.isArray(json.errors)) {
        setShowerr(json.errors.map((err) => err.msg).join(", "));
      } else if (typeof json.error === "string") {
        setShowerr(json.error);
      } else {
        setShowerr("An unknown error occurred.");
      }
    }
  };

  return (
    <div className="signup-container" style={styles.page}>
      <div style={styles.formBox}>
        <h2 style={styles.title}>Create Your Account</h2>
        <form onSubmit={register}>
          <div style={styles.formGroup}>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label>Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          {showerr && <div style={styles.error}>{showerr}</div>}

          <button type="submit" style={styles.button}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f1f5f9",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  formBox: {
    background: "#ffffff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "400px",
  },
  title: {
    marginBottom: "20px",
    textAlign: "center",
    color: "#333",
  },
  formGroup: {
    marginBottom: "15px",
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "10px",
  },
  error: {
    color: "red",
    marginTop: "10px",
    fontSize: "14px",
  },
};

export default SignUpPage;
