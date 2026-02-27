import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Report.css";

export default function Report() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("list");
  const [reports, setReports] = useState([]);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    course: "",
    topic: "",
    date: "",
    section: "",
    additional: ""
  });

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/report/list`
      );
      setReports(res.data.message || []);
    } catch (err) {
      console.error("Error fetching reports:", err);
      setReports([]);
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
          `${import.meta.env.VITE_API_BASE_URL}/api/report/updateReport/${editId}`,
          formData
        );
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/report/addReport`,
          formData
        );
      }
      fetchReports();
      setMode("list");
      setEditId(null);
      setFormData({ course: "", topic: "", date: "", section: "", additional: "" });
    } catch (error) {
      console.error("Error saving report:", error);
    }
  };

  const handleEdit = (report) => {
    setFormData(report);
    setEditId(report._id);
    setMode("add");
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/report/deleteReport/${id}`
      );
      fetchReports();
    } catch (error) {
      console.error("Error deleting report:", error);
    }
  };

  return (
    <div className="report-container">
      <div className="report-header">
        <h1>{mode === "list" ? "Lab Reports" : editId ? "Edit Report" : "Add Report"}</h1>
        <button
          onClick={() => {
            setMode(mode === "list" ? "add" : "list");
            setEditId(null);
            setFormData({ course: "", topic: "", date: "", section: "", additional: "" });
          }}
          className="toggle-button"
        >
          {mode === "list" ? "Add Report" : "View Reports"}
        </button>
      </div>

      {mode === "add" ? (
        <form onSubmit={handleSubmit} className="report-form">
          <div className="form-group">
            <label>Course</label>
            <input name="course" value={formData.course} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Topic</label>
            <textarea name="topic" value={formData.topic} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Date (Optional)</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Section</label>
            <input name="section" value={formData.section} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Additional Info (Optional)</label>
            <textarea name="additional" value={formData.additional} onChange={handleChange} />
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-button">
              {editId ? "Update" : "Submit"}
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={() => setMode("list")}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="report-cards">
          {reports.length === 0 ? (
            <p className="no-items">No reports available</p>
          ) : (
            reports.map((report) => (
              <div key={report._id} className="report-card">
                <div className="card-header">
                  <h3>{report.course}</h3>
                  <div>
                    <button onClick={() => handleEdit(report)}>Edit</button>
                    <button onClick={() => handleDelete(report._id)}>Delete</button>
                  </div>
                </div>
                <p><strong>Section:</strong> {report.section}</p>
                {report.date && <p><strong>Date:</strong> {new Date(report.date).toLocaleDateString()}</p>}
                <p>{report.topic}</p>
                {report.additional && <p className="additional">{report.additional}</p>}
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