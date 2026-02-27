import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./OnlineClass.css";

export default function OnlineClass() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("list");
  const [classes, setClasses] = useState([]);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    course: "",
    date: "",
    time: "",
    section: "",
    link: "",
  });

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/onlineClass/list`
      );
      setClasses(res.data.message || []);
    } catch (err) {
      console.error("Error fetching online classes:", err);
      setClasses([]);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(
          `${import.meta.env.VITE_API_BASE_URL}/api/onlineClass/updateOnlineClass/${editId}`,
          formData
        );
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/onlineClass/addOnlineClass`,
          formData
        );
      }
      fetchClasses();
      setMode("list");
      setEditId(null);
      setFormData({ course: "", date: "", time: "", section: "", link: ""});
    } catch (error) {
      console.error("Error saving class:", error);
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditId(item._id);
    setMode("add");
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/onlineClass/deleteOnlineClass/${id}`
      );
      fetchClasses();
    } catch (error) {
      console.error("Error deleting class:", error);
    }
  };

  return (
    <div className="onlineclass-container">
      <div className="onlineclass-header">
        <h1>{mode === "list" ? "Online Classes" : editId ? "Edit Online Class" : "Add Online Class"}</h1>
        <button
          onClick={() => setMode(mode === "list" ? "add" : "list")}
          className="toggle-button"
        >
          {mode === "list" ? "Add Class" : "View Classes"}
        </button>
      </div>

      {mode === "add" ? (
        <form onSubmit={handleSubmit} className="onlineclass-form">
          <div className="form-group">
            <label>Course</label>
            <input name="course" value={formData.course} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Date</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Time</label>
            <input name="time" value={formData.time} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Section</label>
            <input name="section" value={formData.section} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Meeting Link</label>
            <input name="link" value={formData.link} onChange={handleChange} />
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-button">
              {editId ? "Update" : "Submit"}
            </button>
            <button type="button" className="cancel-button" onClick={() => setMode("list")}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="onlineclass-cards">
          {classes.length === 0 ? (
            <p className="no-items">No online classes available</p>
          ) : (
            classes.map((item) => (
              <div key={item._id} className="onlineclass-card">
                <div className="card-header">
                  <h3>{item.course}</h3>
                  <div>
                    <button onClick={() => handleEdit(item)}>Edit</button>
                    <button onClick={() => handleDelete(item._id)}>Delete</button>
                  </div>
                </div>
                <p><strong>Section:</strong> {item.section}</p>
                {item.date && <p>{new Date(item.date).toLocaleDateString()} {item.time}</p>}
                {item.link && <p><a href={item.link} target="_blank" rel="noopener noreferrer">Join Link</a></p>}
              </div>
            ))
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