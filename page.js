"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./signup.module.css";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const router = useRouter(); 
  
  useEffect(() => {
    // Apply body CSS when component mounts
    document.body.style.backgroundImage = "url('/images/binary_rain.png')";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center center";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundSize = "cover";

    // Cleanup function to reset body styles when component unmounts
    return () => {
      document.body.style.backgroundImage = "";
      document.body.style.backgroundRepeat = "";
      document.body.style.backgroundPosition = "";
      document.body.style.backgroundAttachment = "";
      document.body.style.backgroundSize = "";
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message); // Success message
        router.push('/signin');
      } else {
        alert(result.message); // Error message
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while signing up. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formBox}>
        <img src="/images/cheetcode_logo.png" alt="Logo" className={styles.logo} />
        <h2 className={styles.brandName}>CheetCode</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <div className={styles.inputField}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                required
                onChange={handleChange}
                value={formData.username}
              />
            </div>
            <div className={styles.inputField}>
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                onChange={handleChange}
                value={formData.password}
              />
            </div>
            <div className={styles.inputField}>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                required
                onChange={handleChange}
                value={formData.confirmPassword}
              />
            </div>
            <div className={styles.inputField}>
              <input
                type="email"
                name="email"
                placeholder="E-mail address"
                required
                onChange={handleChange}
                value={formData.email}
              />
            </div>
          </div>
          <button type="submit" className={styles.button}>Sign Up</button>
        </form>

        <div className={styles.extraOptions}>
          <p>Have an account? <a href="/signin">Sign In</a></p>
          <p>or you can sign in with</p>
          <div className={styles.socialLogin}>
            {/* Google Icon */}
            <a href="#" aria-label="Sign in with Google" className={styles.iconCircle}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="30px" height="30px">
                <path fill="#4285F4" d="M45.09 24.67c0-1.45-.12-2.84-.35-4.2H24v8.4h11.88c-.51 2.79-2.04 5.15-4.35 6.75v5.6h7.03c4.11-3.78 6.53-9.35 6.53-16.55z"></path>
                <path fill="#34A853" d="M24 48c5.9 0 10.84-1.96 14.45-5.33l-7.03-5.6c-1.95 1.31-4.44 2.1-7.42 2.1-5.7 0-10.51-3.86-12.24-9.06H3.58v5.71C7.16 43.8 14.83 48 24 48z"></path>
                <path fill="#FBBC05" d="M11.76 28.17c-.51-1.5-.81-3.1-.81-4.76s.3-3.26.81-4.76V13.94H3.58c-1.75 3.47-2.75 7.39-2.75 11.47s1 7.99 2.75 11.47l8.18-6.71z"></path>
                <path fill="#EA4335" d="M24 9.53c3.22 0 6.1 1.1 8.38 3.26l6.3-6.3C34.84 2.6 29.9 0 24 0 14.83 0 7.16 4.2 3.58 10.29l8.18 6.71C13.49 12.39 18.3 9.53 24 9.53z"></path>
              </svg>
            </a>
            {/* GitHub Icon */}
            <a href="#" aria-label="Sign in with GitHub" className={styles.iconCircle}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30px" height="30px">
                <path fill="#000000" d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.21.68-.47v-1.7c-2.78.6-3.37-1.2-3.37-1.2-.45-1.16-1.1-1.47-1.1-1.47-.89-.61.07-.6.07-.6 1.04.07 1.58 1.07 1.58 1.07.9 1.55 2.36 1.1 2.94.84.09-.66.36-1.1.65-1.36-2.23-.25-4.57-1.12-4.57-4.97 0-1.1.4-2 .1-2.7 0 0 .81-.25 2.63.99A9.17 9.17 0 0 1 12 6.5c.82 0 1.63.11 2.4.32 1.82-1.24 2.63-.99 2.63-.99.5 1.4.1 2.7.1 2.7.65.71 1.04 1.61 1.04 2.71 0 3.88-2.34 4.72-4.57 4.97.36.31.68.93.68 1.89v2.84c0 .27.18.58.68.47 4-1.32 6.84-5.07 6.84-9.49C22 6.48 17.52 2 12 2z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
