import React, { useState, useRef, useEffect } from "react";
import bupImage from "../../assets/us.jpg";
import "./Hero.css";

const Hero = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <section className="hero">
      <div className="hero-container">
        {/* Image Section */}
        <div className="hero-image-section">
          <img 
            src={bupImage} 
            alt="ICT Department Group" 
            className="group-photo"
          />
          <div className="photo-overlay"></div>
        </div>

        {/* Content Section */}
        <div className="hero-content-section">
          <div className="content-card">
            <div className="header-section">
              <div className="department-badge">Department of ICT</div>
              <h1 className="main-title">
                Welcome to <span className="highlight-text">ICT8 Vault</span>
              </h1>
              <p className="subtitle">
                Your centralized academic resource platform for seamless learning
              </p>
              
            </div>

            <div className="action-area" ref={dropdownRef}>
              <button 
                className="explore-button" 
                onClick={toggleMenu}
                aria-expanded={menuOpen}
              >
                <span>Explore Resources</span>
                <svg 
                  className={`dropdown-icon ${menuOpen ? 'open' : ''}`} 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24"
                >
                  <path d="M7 10l5 5 5-5z" fill="currentColor"/>
                </svg>
              </button>
              
              <div className={`dropdown-menu ${menuOpen ? 'visible' : ''}`}>
                <a href="#notices" className="menu-item">
                  <div className="menu-icon">📢</div>
                  <div className="menu-content">
                    <div className="menu-title">Notices & Announcements</div>
                    <div className="menu-desc">Official notices and updates</div>
                  </div>
                </a>
                <a href="#exam" className="menu-item">
                  <div className="menu-icon">📚</div>
                  <div className="menu-content">
                    <div className="menu-title">Exams & Assignments</div>
                    <div className="menu-desc">All academic materials</div>
                  </div>
                </a>
                <a href="#routine" className="menu-item">
                  <div className="menu-icon">📅</div>
                  <div className="menu-content">
                    <div className="menu-title">Class Routine</div>
                    <div className="menu-desc">Updated schedule</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;