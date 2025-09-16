import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">Maintanence Options</h1>
      <div className="options-grid">
        <Link to="/notice" className="option-card">
          <div className="option-icon">📢</div>
          <div className="option-title">Notice</div>
        </Link>
        <Link to="/calendar" className="option-card">
          <div className="option-icon">📅</div>
          <div className="option-title">Calendar</div>
        </Link>
        <Link to="/exam" className="option-card">
          <div className="option-icon">📝</div>
          <div className="option-title">Exam</div>
        </Link>
        <Link to="/assignment" className="option-card">
          <div className="option-icon">📚</div>
          <div className="option-title">Assignment</div>
        </Link>
        <Link to="/feedback" className="option-card">
          <div className="option-icon">💬</div>
          <div className="option-title">Feedback</div>
        </Link>
        <Link to="/notify" className="option-card">
          <div className="option-icon">🔔</div>
          <div className="option-title">Notify</div>
        </Link>
        <Link to="/weekly" className="option-card">
  <div className="option-icon">📆</div>
  <div className="option-title">Weekly Updates</div>
</Link>

      </div>
    </div>
  );
}