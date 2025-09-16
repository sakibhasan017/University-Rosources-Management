import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-container">
        <div className="footer-section about">
          <h3>ICT8 Vault</h3>
          <p>This platform is maintained by the students of our batch to provide all academic resources in one place.</p>
        </div>

        <div className="footer-section links">
          <h4>Useful Links</h4>
          <ul>
            <li><a href="https://www.facebook.com/groups/1072097740096634" target="_blank" rel="noopener noreferrer">📘 Facebook Group</a></li>
            <li><a href="https://ucam.bup.edu.bd" target="_blank" rel="noopener noreferrer">🧾 UCAM Login</a></li>
            <li><a href="https://bup.edu.bd" target="_blank" rel="noopener noreferrer">🌐 BUP Official Website</a></li>
          </ul>
        </div>

        <div className="footer-section maintainers">
          <h4>Maintained By</h4>
          <ul>
            <li><a href="https://www.facebook.com/GoldenBoySakibb" target="_blank" rel="noopener noreferrer">👨‍💻 Sakib</a></li>
            <li><a href="https://www.facebook.com/shihaful.islam.ornob" target="_blank" rel="noopener noreferrer">🧑‍💻 Ornob</a></li>
            <li><a href="https://www.facebook.com/sadat.rahin" target="_blank" rel="noopener noreferrer">👨‍💻 Rahin</a></li>
            <li><a href="https://www.facebook.com/hrudro10" target="_blank" rel="noopener noreferrer">🧑‍💻 Shahrukh</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} ICT8 Vault | All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
