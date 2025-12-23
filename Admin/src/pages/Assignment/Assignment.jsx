import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Assignment.css';

export default function Assignment() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('list');
  const [formData, setFormData] = useState({
    course: '',
    topic: '',
    deadline: '',
    section: '',
    additional: ''
  });
  const [assignments, setAssignments] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/assignment/list`);
      setAssignments(res.data.message || []);
    } catch (err) {
      console.error("Error fetching assignments:", err);
      setAssignments([]);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/assignment/updateJIS12AKI09B/${editId}`, formData);
      } else {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/assignment/addJUI098QW12`, formData);
      }
      fetchAssignments();
      setMode('list');
      setFormData({ course: '', topic: '', deadline: '', section: '', additional: '' });
      setEditId(null);
    } catch (error) {
      console.error("Error saving assignment:", error);
    }
  };

  const handleEdit = (assignment) => {
    setFormData({
      course: assignment.course,
      topic: assignment.topic,
      deadline: assignment.deadline,
      section: assignment.section,
      additional: assignment.additional
    });
    setEditId(assignment._id);
    setMode('add');
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/assignment/deleteJUI1290LIOI12/${id}`);
      fetchAssignments();
    } catch (error) {
      console.error("Error deleting assignment:", error);
    }
  };

  return (
    <div className="assignment-container">
      <div className="assignment-header">
        <h1>{mode === 'list' ? 'Assignments' : (editId ? 'Edit Assignment' : 'Add Assignment')}</h1>
        <button 
          onClick={() => {
            setMode(mode === 'list' ? 'add' : 'list');
            setEditId(null);
            setFormData({ course: '', topic: '', deadline: '', section: '', additional: '' });
          }}
          className="toggle-button"
        >
          {mode === 'list' ? 'Add Assignment' : 'View Assignments'}
        </button>
      </div>

      {mode === 'add' ? (
        <form onSubmit={handleSubmit} className="assignment-form">
          <div className="form-group">
            <label>Course</label>
            <input
              type="text"
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Topic</label>
            <textarea
              type="text"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              required
              row={4}
              col={50}
            />
          </div>
          <div className="form-group">
            <label>Deadline (Optional)</label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              
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
          <div className="form-group">
            <label>Additional Info (Optional)</label>
            <textarea
              name="additional"
              value={formData.additional}
              onChange={handleChange}
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
                setFormData({ course: '', topic: '', deadline: '', section: '', additional: '' });
                setEditId(null);
              }}
              className="cancel-button"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="assignment-list">
          {assignments.length === 0 ? (
            <p className="no-assignments">No assignments available</p>
          ) : (
            <div className="assignment-cards">
              {assignments.map((assignment) => (
                <div key={assignment._id} className="assignment-card">
                  <div className="assignment-card-header">
                    <h3>{assignment.course}</h3>
                    <div className="assignment-actions">
                      <button onClick={() => handleEdit(assignment)}>Edit</button>
                      <button onClick={() => handleDelete(assignment._id)}>Delete</button>
                    </div>
                  </div>
                  <p className="assignment-section">Section: {assignment.section}</p>
                  <p className="assignment-deadline">Deadline: {new Date(assignment.deadline).toLocaleDateString()}</p>
                  {assignment.additional && <p className="assignment-additional">{assignment.additional}</p>}
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