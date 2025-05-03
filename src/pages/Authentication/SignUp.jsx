import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './LoginSignUp.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log('Signup Data:', formData);
  };

  return (
    <div className="signup-wrapper">
      <form
        className="signup-form"
        onSubmit={handleSubmit}
        data-aos="flip-left"
        data-aos-easing="ease-out-cubic"
        data-aos-delay="300"
      >
        <h2>🌱 Join GreenBloom</h2>
        <p>Your herbal wellness journey starts here</p>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <button type="submit">Create Account</button>

        <div className="form-footer">
          <p>Already a member? <a href="/login">Login</a></p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
