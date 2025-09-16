import React, { useState } from "react";
import "./Hero.css";
import bupPicture from "../../assets/bupPicture.jpg";

const Hero = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <section className="hero" style={{ backgroundImage: `url(${bupPicture})` }}>
      <div className="overlay">
        <h1 className="hero-title">
          Welcome to <span>ICT8 Vault</span>
        </h1>
        <div className="hero-dropdown">
          <button className="hero-button" onClick={toggleMenu}>
            Explore ↓
          </button>
          {menuOpen && (
            <ul className="hero-menu">
              <li>
                <a href="#notices">Notices</a>
              </li>
              <li>
                <a href="#exam">Exams and Assignments</a>
              </li>
              
              <li>
                <a href="#routine">Routine</a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
