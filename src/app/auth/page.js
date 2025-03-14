"use client";
import { useState } from "react";
import styles from "@/styles/AuthForm.module.css";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear errors on change
  };

  // Validate inputs
  const validate = () => {
    let newErrors = {};
    if (!formData.username && !isLogin) newErrors.username = "Username is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Register user
  const registerUser = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if email is already registered
    const existingUser = users.find((user) => user.email === formData.email);
    if (existingUser) {
      setMessage("Email already registered! Please login.");
      return;
    }

    // Save new user
    const newUser = { username: formData.username, email: formData.email, password: formData.password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    setMessage("Registration successful! Please log in.");
    setIsLogin(true); // Switch to login mode
  };

  // Login user
  const loginUser = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Find user by email & password
    const user = users.find((user) => user.email === formData.email && user.password === formData.password);

    if (!user) {
      setMessage("Invalid email or password. Please try again.");
      return;
    }

    // Save session
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    setMessage("Login successful!");

    // Show popup for 3 seconds
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");

    if (!validate()) return;

    if (isLogin) {
      loginUser();
    } else {
      registerUser();
    }
  };

  return (
    <div className={`${styles.authContainer} ${isLogin ? styles.loginMode : styles.registerMode}`}>
      <div className={styles.authBox}>
        <div className={styles.welcomeSection}>
          <h2>{isLogin ? "Hello, Welcome!" : "Welcome Back!"}</h2>
          <p>{isLogin ? "Don't have an account?" : "Already have an account?"}</p>
        </div>

        <div className={styles.formSection}>
          <h2>{isLogin ? "Login" : "Registration"}</h2>
          {message && <p className={styles.message}>{message}</p>}
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <input
                  className={styles.inputField}
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
                {errors.username && <p className={styles.error}>{errors.username}</p>}
              </>
            )}

            <input
              className={styles.inputField}
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}

            <input
              className={styles.inputField}
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <p className={styles.error}>{errors.password}</p>}

            <button className={styles.primaryButton} type="submit">
              {isLogin ? "Login" : "Register"}
            </button>
          </form>
        </div>
      </div>

      <div className={styles.switchButtons}>
        <button className={`${styles.switchButton} ${isLogin ? styles.active : ""}`} onClick={() => setIsLogin(true)}>
          Login
        </button>
        <button className={`${styles.switchButton} ${!isLogin ? styles.active : ""}`} onClick={() => setIsLogin(false)}>
          Register
        </button>
      </div>

      {/* Centered Popup after Login */}
      {showPopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h3>🎉 Login Successful!</h3>
            <p>Welcome back, {formData.email}!</p>
          </div>
        </div>
      )}
    </div>
  );
}
