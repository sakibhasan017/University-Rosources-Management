import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Calendar.css';

export default function Calendar() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('list');
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    section: ''
  });
  const [events, setEvents] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/calendar/list`);
      const data = res.data.message || [];
      const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setEvents(sorted);
    } catch (err) {
      console.error("Error fetching calendar events:", err);
      setEvents([]);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/calendar/updateJUNI12R34JH56OR/${editId}`, formData);
      } else {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/calendar/addJUNI19R09JH12OR`, formData);
      }
      fetchEvents();
      setMode('list');
      setFormData({ title: '', date: '', section: '' });
      setEditId(null);
    } catch (error) {
      console.error("Error saving calendar event:", error);
    }
  };

  const handleEdit = (event) => {
    setFormData({
      title: event.title,
      date: event.date,
      section: event.section
    });
    setEditId(event._id);
    setMode('add');
  };

  const handleDelete = async (id, title) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the event "${title}"?`);
    if (!confirmDelete) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/calendar/deleteJUNI09R23JH87OR/${id}`);
      fetchEvents();
    } catch (error) {
      console.error("Error deleting calendar event:", error);
    }
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h1>{mode === 'list' ? 'Calendar Events' : (editId ? 'Edit Event' : 'Add Event')}</h1>
        <button 
          onClick={() => {
            setMode(mode === 'list' ? 'add' : 'list');
            setEditId(null);
            setFormData({ title: '', date: '', section: '' });
          }}
          className="toggle-button"
        >
          {mode === 'list' ? 'Add Event' : 'View Events'}
        </button>
      </div>

      {mode === 'add' ? (
        <form onSubmit={handleSubmit} className="calendar-form">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
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
              {editId ? 'Update' : 'Submit'}
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('list');
                setFormData({ title: '', date: '', section: '' });
                setEditId(null);
              }}
              className="cancel-button"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="calendar-list">
          {events.length === 0 ? (
            <p className="no-events">No calendar events</p>
          ) : (
            <div className="event-cards">
              {events.map((event) => (
                <div key={event._id} className="event-card">
                  <div className="event-card-header">
                    <h3>{event.title}</h3>
                    <div className="event-actions">
                      <button onClick={() => handleEdit(event)}>Edit</button>
                      <button onClick={() => handleDelete(event._id, event.title)}>Delete</button>
                    </div>
                  </div>
                  <p className="event-section">Section: {event.section}</p>
                  <p className="event-date">Date: {new Date(event.date).toLocaleDateString()}</p>
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
