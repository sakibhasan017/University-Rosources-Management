import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

const Hero = () => {
  //const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        //setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="hero">
      <div className="hero-bg circle-1"></div>
      <div className="hero-bg circle-2"></div>

      <div className="hero-container">
        {/* ================= LEFT ================= */}

        <div className="hero-left">
          <div className="hero-badge">Department of ICT • BUP</div>

          <h1 className="hero-title">
            Welcome to <span>ICT8 Vault</span>
          </h1>

          <p className="hero-subtitle">
            Your centralized academic platform for the ICT 8th Batch. Access
            notices, assignments, lab reports, online class materials, routines
            - all from one place.
          </p>

          <div className="feature-grid">
            <a href="#notices" className="feature-item128">
              <span>📢</span>
              <span>Notices</span>
            </a>

            <a href="#exam" className="feature-item128">
              <span>📝</span>
              <span>Assignments</span>
            </a>

            <a href="#report" className="feature-item128">
              <span>🧪</span>
              <span>Lab Reports</span>
            </a>

            <a href="#routine" className="feature-item128">
              <span>📅</span>
              <span>Class Routine</span>
            </a>
          </div>

          <div className="hero-buttons" ref={dropdownRef}>
            
              <Link to="/profile-card" className="explore-btn128">
                🚀 Build your identity
              </Link>
            
          </div>
        </div>

        {/* ================= RIGHT ================= */}

        <div className="hero-right">
          <div className="alert-card">
            <div className="alert-icon">🔔</div>

            <h2>Stay Notified</h2>

            <p>
              Receive email notifications for important exam updates, assignment
              deadlines, and other academic notices.
            </p>

            <div className="notify-info">
              <strong>📧 Want Email Notifications?</strong>

              <p>
                To receive notifications, click the <b>Wanna Notify</b> button in
                the
                <b> Calendar </b> section below and submit your name and email.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
