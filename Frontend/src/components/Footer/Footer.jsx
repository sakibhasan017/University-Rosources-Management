import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-container">
        <div className="footer-section about">
          <h3>ICT8 Vault</h3>
          <p>
            This platform is maintained by the students of our batch to provide
            all academic resources in one place.
          </p>
        </div>

        <div className="footer-section links">
          <h4>Useful Links</h4>
          <ul>
            <li>
              <a
                href="https://www.facebook.com/groups/1072097740096634"
                target="_blank"
                rel="noopener noreferrer"
              >
                📘 Facebook Group
              </a>
            </li>
            <li>
              <a
                href="https://ucam.bup.edu.bd"
                target="_blank"
                rel="noopener noreferrer"
              >
                🧾 UCAM Login
              </a>
            </li>
            <li>
              <a
                href="https://bup.edu.bd"
                target="_blank"
                rel="noopener noreferrer"
              >
                🌐 BUP Official Website
              </a>
            </li>
          </ul>
        </div>
      
        <div className="footer-section contributors-link">
          <h4>Our Team</h4>
          <p>ICT8 Vault is for everyone — a community-driven platform where anyone can contribute, share resources, and help make learning easier for everyone.</p>
          {/* <Link to="/contributors" className="contributors-btn">
            👨‍👩‍👧‍👦 View Contributors
          </Link> */}
        </div>
      </div>
    
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} ICT8 Vault | All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
