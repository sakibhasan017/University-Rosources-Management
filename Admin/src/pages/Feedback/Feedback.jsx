import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Feedback.css';

export default function Feedback() {
  const navigate = useNavigate();
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/feedback/list`);
      setFeedbackList(res.data.message || []);
    } catch (err) {
      console.error("Error fetching feedback:", err);
      setFeedbackList([]);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/feedback/delete/${id}`);
      fetchFeedback();
    } catch (error) {
      console.error("Error deleting feedback:", error);
    }
  };

  return (
    <div className="feedback-container">
      <div className="feedback-header">
        <h1>Feedback</h1>
      </div>

      <div className="feedback-list">
        {feedbackList.length === 0 ? (
          <p className="no-feedback">No feedback available</p>
        ) : (
          <div className="feedback-cards">
            {feedbackList.map((feedback) => (
              <div key={feedback._id} className="feedback-card">
                <div className="feedback-content">
                  {feedback.name && <h3>{feedback.name}</h3>}
                  {feedback.email && <p className="feedback-email">{feedback.email}</p>}
                  <p className="feedback-message">{feedback.message}</p>
                
                </div>
                <div className="feedback-actions">
                  <button onClick={() => handleDelete(feedback._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bottom-actions">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
}