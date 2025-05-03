
import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './LoginSignUp.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Login data:', formData);
  };

  return (
    <div className="login-container dark-theme">
      <form
        className="login-form"
        onSubmit={handleSubmit}
        data-aos="zoom-in"
        data-aos-delay="200"
      >
        <h2>Welcome to GreenBloom 🌿</h2>
        <p>Sign in to explore your herbal garden</p>

        <input
          type="email"
          name="email"
          placeholder="Email"
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

        <button type="submit">Login</button>

        <div className="form-footer">
          <p>Don't have an account? <a href="/signup">Sign Up</a></p>
        </div>
      </form>
    </div>
  );
};

export default Login;
