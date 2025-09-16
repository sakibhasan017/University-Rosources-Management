import React, { useState } from "react";
import { Link } from "react-router-dom";
import courses from "../../data/courses.js"
import "./Resources.css";

const {courseData} = courses;

const Resources = () => {
  const [openSemester, setOpenSemester] = useState(null);

  const toggleSemester = (semester) => {
    setOpenSemester((prev) => (prev === semester ? null : semester));
  };

  return (
    <div className="resources-container">
      <h2 className="resources-title">Resources</h2>
      {Object.entries(courseData).map(([semesterKey, courses], index) => {
        const semesterTitle = `Semester ${index + 1}`;
        return (
          <div className="semester-section" key={semesterKey}>
            <h3
              className="semester-title"
              onClick={() => toggleSemester(semesterKey)}
            >
              {semesterTitle} ▾
            </h3>
            {openSemester === semesterKey && (
  <ul className="course-list">
    {courses.map((course) => (
      <li key={course.code}>
        <Link to={`/resources/${course.code}`}>
          {course.code} - {course.name}
        </Link>
      </li>
    ))}
  </ul>
)}

          </div>
        );
      })}
    </div>
  );
};

export default Resources;
