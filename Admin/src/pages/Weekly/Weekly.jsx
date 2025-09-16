import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import axios from 'axios';
import './Weekly.css';

export default function WeeklyUpdates() {
  const navigate = useNavigate();
  const [weeks, setWeeks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWeeks();
  }, []);

  const fetchWeeks = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/weekly/list`);
      setWeeks(res.data.message);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching weeks:", error);
      setLoading(false);
    }
  };

  const addWeek = async () => {
    try {
      const weekNumber = weeks.length > 0 ? Math.max(...weeks.map(w => w.weekNumber)) + 1 : 1;
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/weekly/add`, { 
        weekNumber,
        subjects: {} 
      });
      fetchWeeks(); 
    } catch (error) {
      console.error("Error adding week:", error);
    }
  };

  const addTask = async (weekId, subjectName) => {
    const taskName = prompt("Enter task name:");
    if (!taskName) return;

    try {
      const week = weeks.find(w => w._id === weekId);
      const currentTasks = week.subjects[subjectName] || [];
      const updatedTasks = [...currentTasks, taskName];
      
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/weekly/${weekId}/update-subject`, {
        subjectName,
        tasks: updatedTasks
      });
      fetchWeeks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const editTask = async (weekId, subjectName, taskIndex) => {
    const week = weeks.find(w => w._id === weekId);
    const currentTasks = week.subjects[subjectName] || [];
    const newTask = prompt("Edit task:", currentTasks[taskIndex]);
    if (newTask === null) return;

    try {
      const updatedTasks = [...currentTasks];
      updatedTasks[taskIndex] = newTask;
      
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/weekly/${weekId}/update-subject`, {
        subjectName,
        tasks: updatedTasks
      });
      fetchWeeks();
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  const deleteTask = async (weekId, subjectName, taskIndex) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      const week = weeks.find(w => w._id === weekId);
      const currentTasks = week.subjects[subjectName] || [];
      const updatedTasks = currentTasks.filter((_, index) => index !== taskIndex);
      
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/weekly/${weekId}/update-subject`, {
        subjectName,
        tasks: updatedTasks
      });
      fetchWeeks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const addSubject = async (weekId) => {
    const subjectName = prompt("Enter subject name:");
    if (!subjectName) return;

    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/weekly/${weekId}/add-subject`, { 
        subjectName 
      });
      fetchWeeks();
    } catch (error) {
      console.error("Error adding subject:", error);
    }
  };

  const deleteSubject = async (weekId, subjectName) => {
    if (!window.confirm(`Are you sure you want to delete ${subjectName}?`)) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/weekly/${weekId}/delete-subject`, {
        data: { subjectName }
      });
      fetchWeeks();
    } catch (error) {
      console.error("Error deleting subject:", error);
    }
  };

  const deleteWeek = async (weekId) => {
    if (!window.confirm("Are you sure you want to delete this week?")) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/weekly/${weekId}/delete`);
      fetchWeeks();
    } catch (error) {
      console.error("Error deleting week:", error);
    }
  };

  if (loading) {
    return <div className="loading">Loading weeks...</div>;
  }

  return (
    <div className="weekly-container">
      <div className="weekly-header">
        <h1>Weekly Updates</h1>
        <button className="add-week-btn" onClick={addWeek}>
          <FaPlus /> Add Week
        </button>
      </div>

      <div className="weeks-list">
        {weeks.length === 0 ? (
          <p className="no-weeks">No weeks added yet</p>
        ) : (
          weeks.map((week) => (
            <div key={week._id} className="week-card">
              <div className="week-header">
                <h2>Week {week.weekNumber}</h2>
                <div className="week-actions">
                  <button 
                    className="add-subject-btn"
                    onClick={() => addSubject(week._id)}
                  >
                    <FaPlus /> Add Subject
                  </button>
                  <button 
                    className="delete-week-btn"
                    onClick={() => deleteWeek(week._id)}
                  >
                    Delete Week
                  </button>
                </div>
              </div>
              
              {Object.keys(week.subjects || {}).length === 0 ? (
                <p className="no-subjects">No subjects for this week</p>
              ) : (
                Object.entries(week.subjects).map(([subjectName, tasks]) => (
                  <div key={subjectName} className="subject-card">
                    <div className="subject-header">
                      <h3>{subjectName}</h3>
                      <div className="subject-actions">
                        <button
                          className="add-task-btn"
                          onClick={() => addTask(week._id, subjectName)}
                        >
                          <FaPlus /> Add Task
                        </button>
                        <button
                          className="delete-subject-btn"
                          onClick={() => deleteSubject(week._id, subjectName)}
                        >
                          Delete Subject
                        </button>
                      </div>
                    </div>
                    
                    {tasks.length === 0 ? (
                      <p className="no-tasks">No tasks for this subject</p>
                    ) : (
                      <ul className="task-list">
                        {tasks.map((task, taskIndex) => (
                          <li key={taskIndex} className="task-item">
                            <span>{task}</span>
                            <div className="task-actions">
                              <button
                                onClick={() => editTask(week._id, subjectName, taskIndex)}
                                className="edit-btn"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => deleteTask(week._id, subjectName, taskIndex)}
                                className="delete-btn"
                              >
                                Delete
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))
              )}
            </div>
          ))
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