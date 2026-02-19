import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaChevronDown, FaChevronUp } from "react-icons/fa";
import axios from "axios";
import "./Weekly.css";

export default function WeeklyUpdates() {
  const navigate = useNavigate();
  const [weeks, setWeeks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmAction, setConfirmAction] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [expandedWeek, setExpandedWeek] = useState(null);
  const [taskModal, setTaskModal] = useState({
    open: false,
    weekId: null,
    subjectName: null,
    taskIndex: null,
    text: ''
  });

  useEffect(() => {
    fetchWeeks();
  }, []);

  const fetchWeeks = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/weekly/list`
      );
      setWeeks(res.data.message);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching weeks:", error);
      setLoading(false);
    }
  };

  const addWeek = async () => {
    try {
      const weekNumber =
        weeks.length > 0 ? Math.max(...weeks.map((w) => w.weekNumber)) + 1 : 1;
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/weekly/add`, {
        weekNumber,
        subjects: {},
      });
      fetchWeeks();
    } catch (error) {
      console.error("Error adding week:", error);
    }
  };

  const addSubject = async (weekId) => {
    const subjectName = prompt("Enter subject name:");
    if (!subjectName) return;
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/weekly/${weekId}/add-subject`,
        { subjectName }
      );
      fetchWeeks();
    } catch (error) {
      console.error("Error adding subject:", error);
    }
  };

  const deleteSubject = (weekId, subjectName) => {
    setConfirmMessage(`Are you sure you want to delete ${subjectName}?`);
    setConfirmAction(() => async () => {
      try {
        await axios.delete(
          `${import.meta.env.VITE_API_BASE_URL}/api/weekly/${weekId}/delete-subject`,
          { data: { subjectName } }
        );
        fetchWeeks();
      } catch (error) {
        console.error("Error deleting subject:", error);
      }
    });
  };

  const addTask = (weekId, subjectName) => {
    setTaskModal({
      open: true,
      weekId,
      subjectName,
      taskIndex: null,
      text: ''
    });
  };

  const editTask = (weekId, subjectName, taskIndex) => {
    const week = weeks.find((w) => w._id === weekId);
    const currentTasks = week.subjects[subjectName] || [];
    setTaskModal({
      open: true,
      weekId,
      subjectName,
      taskIndex,
      text: currentTasks[taskIndex]
    });
  };

  const handleSaveTask = async () => {
    const { weekId, subjectName, taskIndex, text } = taskModal;
    if (!text.trim()) return;

    try {
      const week = weeks.find((w) => w._id === weekId);
      let updatedTasks;
      if (taskIndex !== null) {
        updatedTasks = [...week.subjects[subjectName]];
        updatedTasks[taskIndex] = text;
      } else {
        updatedTasks = [...(week.subjects[subjectName] || []), text];
      }

      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/weekly/${weekId}/update-subject`,
        { subjectName, tasks: updatedTasks }
      );
      fetchWeeks();
      setTaskModal({ open: false, weekId: null, subjectName: null, taskIndex: null, text: '' });
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const deleteTask = (weekId, subjectName, taskIndex) => {
    setConfirmMessage("Are you sure you want to delete this task?");
    setConfirmAction(() => async () => {
      try {
        const week = weeks.find((w) => w._id === weekId);
        const currentTasks = week.subjects[subjectName] || [];
        const updatedTasks = currentTasks.filter((_, i) => i !== taskIndex);

        await axios.put(
          `${import.meta.env.VITE_API_BASE_URL}/api/weekly/${weekId}/update-subject`,
          { subjectName, tasks: updatedTasks }
        );
        fetchWeeks();
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    });
  };

  const deleteWeek = (weekId) => {
    setConfirmMessage("Are you sure you want to delete this week?");
    setConfirmAction(() => async () => {
      try {
        await axios.delete(
          `${import.meta.env.VITE_API_BASE_URL}/api/weekly/${weekId}/delete`
        );
        fetchWeeks();
      } catch (error) {
        console.error("Error deleting week:", error);
      }
    });
  };

  if (loading) return <div className="loading">Loading weeks...</div>;

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
              <div
                className="week-header dropdown-toggle"
                onClick={() =>
                  setExpandedWeek(expandedWeek === week._id ? null : week._id)
                }
              >
                <h2>Week {week.weekNumber}</h2>
                {expandedWeek === week._id ? <FaChevronUp /> : <FaChevronDown />}
              </div>

              {expandedWeek === week._id && (
                <div className="week-content">
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
                                    onClick={() =>
                                      editTask(week._id, subjectName, taskIndex)
                                    }
                                    className="edit-btn"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() =>
                                      deleteTask(week._id, subjectName, taskIndex)
                                    }
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

      {confirmAction && (
        <div className="confirm-overlay">
          <div className="confirm-box">
            <p>{confirmMessage}</p>
            <div className="confirm-buttons">
              <button
                className="confirm-yes"
                onClick={() => {
                  confirmAction();
                  setConfirmAction(null);
                }}
              >
                Yes
              </button>
              <button
                className="confirm-no"
                onClick={() => setConfirmAction(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {taskModal.open && (
        <div className="task-modal-overlay" onClick={() => setTaskModal({...taskModal, open: false})}>
          <div className="task-modal" onClick={(e) => e.stopPropagation()}>
            <h3>{taskModal.taskIndex !== null ? 'Edit Task' : 'Add Task'}</h3>
            <textarea
              value={taskModal.text}
              onChange={(e) => setTaskModal({...taskModal, text: e.target.value})}
              rows={5}
              placeholder="Enter task details... (Enter for new line)"
              autoFocus
            />
            <div className="task-modal-buttons">
              <button onClick={handleSaveTask} className="save-btn">Save</button>
              <button onClick={() => setTaskModal({...taskModal, open: false})} className="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}