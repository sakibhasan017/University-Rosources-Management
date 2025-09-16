import React, { useState } from "react";
import axios from "axios";
import './Feedback.css'

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/feedback/add`,
        formData
      );
      if (res.status === 200) {
        setStatus("✅ Feedback sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (err) {
      setStatus("❌ Failed to send feedback. Try again.");
    }
  };

  return (
    <div className="feedback-container">
      <form className="feedback-card" onSubmit={handleSubmit}>
        <h1>💬 We Value Your Feedback</h1>

        <input
          type="text"
          name="name"
          placeholder="Your Name (Optional)"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email (Optional)"
          value={formData.email}
          onChange={handleChange}
        />

        <textarea
          name="message"
          placeholder="Your Feedback..."
          rows="5"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit">Send Feedback</button>
        {status && <p className="status">{status}</p>}
      </form>
    </div>
  );
};

export default Feedback;
