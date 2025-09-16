import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Notify.css';

export default function Notify() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('list');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    section: ''
  });
  const [recipients, setRecipients] = useState([]);

  useEffect(() => {
    fetchRecipients();
  }, []);

  const fetchRecipients = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/notify/list`);
      setRecipients(res.data.message || []);
    } catch (err) {
      console.error("Error fetching recipients:", err);
      setRecipients([]);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/notify/add`, formData);
      fetchRecipients();
      setMode('list');
      setFormData({ name: '', email: '', section: '' });
    } catch (error) {
      console.error("Error saving recipient:", error);
      alert(error.response?.data?.message || "Error saving recipient");
    }
  };

  return (
    <div className="notify-container">
      <div className="notify-header">
        <h1>{mode === 'list' ? 'Reminder Recipients' : 'Add Recipient'}</h1>
        <button 
          onClick={() => {
            setMode(mode === 'list' ? 'add' : 'list');
            setFormData({ name: '', email: '', section: '' });
          }}
          className="toggle-button"
        >
          {mode === 'list' ? 'Add Recipient' : 'View Recipients'}
        </button>
      </div>

      {mode === 'add' ? (
        <form onSubmit={handleSubmit} className="notify-form">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Section</label>
            <input
              type="text"
              name="section"
              value={formData.section}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="submit-button">
              Submit
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('list');
                setFormData({ name: '', email: '', section: '' });
              }}
              className="cancel-button"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="recipient-list">
          {recipients.length === 0 ? (
            <p className="no-recipients">No recipients added yet</p>
          ) : (
            <div className="recipient-cards">
              {recipients.map((recipient) => (
                <div key={recipient._id} className="recipient-card">
                  <div className="recipient-info">
                    <h3>{recipient.name}</h3>
                    <p className="recipient-email">{recipient.email}</p>
                    <p className="recipient-section">Section: {recipient.section}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="bottom-actions">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
}