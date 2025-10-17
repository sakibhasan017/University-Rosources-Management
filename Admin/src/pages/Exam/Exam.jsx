import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Exam.css';

export default function Exam() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('list');
  const [formData, setFormData] = useState({
    course: '',
    topic: '',
    date: '',
    time: '',
    section: '',
    examType: '',
    additional: ''
  });
  const [exams, setExams] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/exam/list`);
      setExams(res.data.message || []);
    } catch (err) {
      console.error("Error fetching exams:", err);
      setExams([]);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/exam/updateJUIQ183JDM2/${editId}`, formData);
      } else {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/exam/addJUIFJJD128OI`, formData);
      }
      fetchExams();
      setMode('list');
      setFormData({ 
        course: '', 
        topic: '', 
        date: '', 
        time: '', 
        section: '', 
        examType: '', 
        additional: '' 
      });
      setEditId(null);
    } catch (error) {
      console.error("Error saving exam:", error);
    }
  };

  const handleEdit = (exam) => {
    setFormData({
      course: exam.course,
      topic: exam.topic,
      date: exam.date,
      time: exam.time,
      section: exam.section,
      examType: exam.examType,
      additional: exam.additional
    });
    setEditId(exam._id);
    setMode('add');
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/exam/deleteJUIQ23uiQW1/${id}`);
      fetchExams();
    } catch (error) {
      console.error("Error deleting exam:", error);
    }
  };

  return (
    <div className="exam-container">
      <div className="exam-header">
        <h1>{mode === 'list' ? 'Exams' : (editId ? 'Edit Exam' : 'Add Exam')}</h1>
        <button 
          onClick={() => {
            setMode(mode === 'list' ? 'add' : 'list');
            setEditId(null);
            setFormData({ 
              course: '', 
              topic: '', 
              date: '', 
              time: '', 
              section: '', 
              examType: '', 
              additional: '' 
            });
          }}
          className="toggle-button"
        >
          {mode === 'list' ? 'Add Exam' : 'View Exams'}
        </button>
      </div>

      {mode === 'add' ? (
        <form onSubmit={handleSubmit} className="exam-form">
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
            <input
              type="text"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Date (Optional)</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              
            />
          </div>
          <div className="form-group">
            <label>Time (HH:MM) (Optional)</label>
            <input
              type="text"
              name="time"
              value={formData.time}
              onChange={handleChange}
              placeholder="e.g., 14:30"
              
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
            <label>Exam Type (Optional)</label>
            <input
              type="text"
              name="examType"
              value={formData.examType}
              onChange={handleChange}
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
                setFormData({ 
                  course: '', 
                  topic: '', 
                  date: '', 
                  time: '', 
                  section: '', 
                  examType: '', 
                  additional: '' 
                });
                setEditId(null);
              }}
              className="cancel-button"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="exam-list">
          {exams.length === 0 ? (
            <p className="no-exams">No exams scheduled</p>
          ) : (
            <div className="exam-cards">
              {exams.map((exam) => (
                <div key={exam._id} className="exam-card">
                  <div className="exam-card-header">
                    <h3>{exam.course}</h3>
                    <div className="exam-actions">
                      <button onClick={() => handleEdit(exam)}>Edit</button>
                      <button onClick={() => handleDelete(exam._id)}>Delete</button>
                    </div>
                  </div>
                  <p className="exam-section">Section: {exam.section}</p>
                  <p className="exam-date-time">
                    {new Date(exam.date).toLocaleDateString()} at {exam.time}
                  </p>
                  {exam.examType && <p className="exam-type">Type: {exam.examType}</p>}
                  {exam.additional && <p className="exam-additional">{exam.additional}</p>}
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