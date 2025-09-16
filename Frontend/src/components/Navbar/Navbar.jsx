import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import courses from '../../data/courses.js';
import BupIcon from '../../assets/bup-icon.png'

const { teachers, courseData } = courses;

const createShortForm = (name) => {
  const excludeWords = ['and', 'of', 'the', 'for', 'in', 'to', 'with', '&', '(', ')'];
  return name
    .split(' ')
    .filter(word => !excludeWords.includes(word.toLowerCase()))
    .map(word => word[0]?.toUpperCase() || '')
    .join('');
};

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isLatestSemesterOpen, setIsLatestSemesterOpen] = useState(false);
  const [openSemester, setOpenSemester] = useState(null);
  const dropdownRef = useRef(null);
  const latestSemesterRef = useRef(null);
  const timeoutRef = useRef(null);

  const semesters = Object.keys(courseData).map(sem => ({
    name: `Semester ${sem.replace('semester', '')}`,
    value: sem,
    number: parseInt(sem.replace('semester', ''))
  }));
  
  const latestSemester = semesters.reduce((max, semester) => 
    semester.number > max.number ? semester : max
  );

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSemester = (semesterValue) => {
    setOpenSemester(openSemester === semesterValue ? null : semesterValue);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
          latestSemesterRef.current && !latestSemesterRef.current.contains(event.target)) {
        closeAll();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      clearTimeout(timeoutRef.current);
    };
  }, []);

  const closeAll = () => {
    setIsResourcesOpen(false);
    setIsLatestSemesterOpen(false);
    setOpenSemester(null);
  };

  const handleMouseLeave = (ref, closeFn) => {
    timeoutRef.current = setTimeout(() => {
      if (ref.current && !ref.current.matches(':hover')) {
        closeFn();
      }
    }, 100);
  };

  const handleResourcesClick = (e) => {
    if (e.target.classList.contains('dropdown-icon')) {
      e.preventDefault();
      setIsResourcesOpen(!isResourcesOpen);
    } else {
      closeAll();
      navigate('/resources');
    }
  };
  
  return (
    <nav className="navbar">
      <button className="hamburger-menu" onClick={toggleMobileMenu}>
        ☰
      </button>

      <div className={`menu-container ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="logo">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
          <img 
            src={BupIcon} 
            alt="BUP Logo" 
            className="logo-icon" 
          />
          ICT8 VAULT
        </Link>
        </div>

        <ul className="menu">
          <li><Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link></li>
          <li 
            className="dropdown" 
            ref={latestSemesterRef}
            onMouseLeave={() => handleMouseLeave(latestSemesterRef, () => setIsLatestSemesterOpen(false))}
          >
            <div 
              onClick={() => {
                setIsLatestSemesterOpen(!isLatestSemesterOpen);
                
              }}
              onMouseEnter={() => {
                clearTimeout(timeoutRef.current);
                setIsLatestSemesterOpen(true);
              }}
              className="dropdown-btn"
            >
              {latestSemester.name} <span className="dropdown-icon">{isLatestSemesterOpen ? '▲' : '▼'}</span>
            </div>
            
            {isLatestSemesterOpen && (
              <div 
                className="dropdown-content"
                onMouseEnter={() => clearTimeout(timeoutRef.current)}
              >
                {courseData[latestSemester.value].map(course => (
                  <Link 
                    key={course.code}
                    to={`/resources/${course.code}`}
                    className="course-item"
                    onClick={() => {
                      closeAll();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {course.code} - {createShortForm(course.name)}
                  </Link>
                ))}
              </div>
            )}
          </li>
          <li><Link to="/general-resources" onClick={() => setIsMobileMenuOpen(false)}>General Resources</Link></li>
          <li 
            className="dropdown" 
            ref={dropdownRef}
            onMouseLeave={() => handleMouseLeave(dropdownRef, () => setIsResourcesOpen(false))}
          >
            <div 
  className="dropdown-btn"
  onMouseEnter={() => {
    clearTimeout(timeoutRef.current);
    setIsResourcesOpen(true);
  }}
>
  <span 
    className="resources-link" 
    onClick={() => {
      closeAll();
      navigate('/resources');
      setIsMobileMenuOpen(false);
    }}
  >
    Materials
  </span>
  <span 
    className="dropdown-icon"
    onClick={(e) => {
      e.stopPropagation();
      setIsResourcesOpen(!isResourcesOpen);
    }}
  >
    {isResourcesOpen ? '▲' : '▼'}
  </span>
</div>

            
            {isResourcesOpen && (
              <div 
                className="dropdown-content"
                onMouseEnter={() => clearTimeout(timeoutRef.current)}
              >
                {semesters.map(semester => (
                  <div key={semester.value} className="semester-item">
                    <button 
                      onClick={() => toggleSemester(semester.value)}
                      onMouseEnter={() => clearTimeout(timeoutRef.current)}
                      className="semester-btn"
                    >
                      {semester.name} {openSemester === semester.value ? '▲' : '▼'}
                    </button>
                    
                    {openSemester === semester.value && (
                      <div 
                        className="course-list"
                        onMouseEnter={() => clearTimeout(timeoutRef.current)}
                      >
                        {courseData[semester.value].map(course => (
                          <Link 
                            key={course.code}
                            to={`/resources/${course.code}`}
                            className="course-item"
                            onClick={() => {
                              closeAll();
                              setIsMobileMenuOpen(false);
                            }}
                          >
                            {course.code} - {createShortForm(course.name)}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </li>
          <li><Link to="/more" onClick={() => setIsMobileMenuOpen(false)}>More</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;