import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import './WeeklyUpdate.css';

export default function WeeklyView() {
  const [weeks, setWeeks] = useState([]);
  const [expandedWeek, setExpandedWeek] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeeks = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/weekly/list`);
        setWeeks(res.data.message);
      } catch (error) {
        console.error("Error fetching weeks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWeeks();
  }, []);

  const toggleWeek = (weekId) => {
    setExpandedWeek(expandedWeek === weekId ? null : weekId);
  };

  if (loading) {
    return (
      <div className="wk-loading-screen">
        <div className="wk-spinner"></div>
        <p className="wk-loading-text">Loading your weekly updates...</p>
      </div>
    );
  }

  return (
    <div className="wk-container">
      <header className="wk-header">
        <h1 className="wk-title">Weekly Progress Tracker</h1>
        <p className="wk-subtitle">Your journey, week by week</p>
      </header>

      <div className="wk-timeline">
        {weeks.length === 0 ? (
          <div className="wk-empty-state">
            <div className="wk-empty-icon">📅</div>
            <h3 className="wk-empty-title">No updates yet</h3>
            <p className="wk-empty-text">Check back later for weekly progress</p>
          </div>
        ) : (
          weeks.map((week) => (
            <div key={week._id} className={`wk-week-card ${expandedWeek === week._id ? 'wk-expanded' : ''}`}>
              <div 
                className="wk-week-header" 
                onClick={() => toggleWeek(week._id)}
              >
                <div className="wk-week-title">
                  <span className="wk-week-badge">Week {week.weekNumber}</span>
                
                </div>
                <div className="wk-week-toggle">
                  {expandedWeek === week._id ? (
                    <FiChevronUp className="wk-chevron" />
                  ) : (
                    <FiChevronDown className="wk-chevron" />
                  )}
                </div>
              </div>

              {expandedWeek === week._id && (
                <div className="wk-week-content">
                  {Object.keys(week.subjects || {}).length === 0 ? (
                    <div className="wk-no-subjects">
                      No subjects added for this week
                    </div>
                  ) : (
                    Object.entries(week.subjects).map(([subjectName, tasks]) => (
                      <div key={subjectName} className="wk-subject-card">
                        <h4 className="wk-subject-title">{subjectName}</h4>
                        <ul className="wk-task-list">
                          {tasks.length === 0 ? (
                            <li className="wk-no-tasks">No tasks completed</li>
                          ) : (
                            tasks.map((task, index) => (
                              <li key={index} className="wk-task-item">
                                <span className="wk-task-check">✓</span>
                                <span className="wk-task-text">{task}</span>
                              </li>
                            ))
                          )}
                        </ul>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}