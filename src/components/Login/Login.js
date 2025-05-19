// Following code has been commented with appropriate comments for your reference.
import React, { useState, useEffect } from "react";
// Apply CSS according to your design theme or the CSS provided in week 2 lab 2
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../config";

const LoginPage = () => {
  // State variables for email and password
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (sessionStorage.getItem("auth-token")) {
      navigate("/");
    }
  }, []);

  const login = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Email and password need Filled.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      let json = {};
      try {
        json = await res.json();
      } catch (err) {
        console.error("JSON parse error:", err);
        alert("Login failed: No response from server.");
        return;
      }
      if (json.authtoken) {
        sessionStorage.setItem("auth-token", json.authtoken);
        sessionStorage.setItem("email", email);
        navigate("/");
        window.location.reload();
      } else {
        if (Array.isArray(json.errors)) {
          alert(json.errors.map((err) => err.msg).join(", "));
        } else if (json.error) {
          alert(json.error);
        } else {
          alert("Login failed. Please check your email and password.");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed: No response from server.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="container">
        <div className="login-grid">
          <div className="login-text">
            <h2>Login</h2>
          </div>
          <div className="login-text">
            Are you a new member?{" "}
            <span>
              <Link to="/signup" style={{ color: "#2190FF" }}>
                Sign Up Here
              </Link>
            </span>
          </div>
          <br />
          <div className="login-form">
            <form onSubmit={login}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter your email"
                  aria-describedby="helpId"
                />
              </div>

              <label htmlFor="password">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
                aria-describedby="helpId"
              />

              <div className="btn-group">
                <button
                  type="submit"
                  className="btn btn-primary mb-2 mr-1 waves-effect waves-light"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
