import React from "react";
import { Link } from "react-router-dom";
import "./LatestCourses.css";
import courses from "../../data/courses.js";

const { mastersCourseData } = courses;

const createShortForm = (name) => {
  const excludeWords = ["and", "of", "the", "for", "in", "to", "with", "&", "(", ")"];
  return name
    .split(" ")
    .filter((word) => !excludeWords.includes(word.toLowerCase()))
    .map((word) => word[0]?.toUpperCase() || "")
    .join("");
};

const LatestCourses = () => {
  const mastersSemesters = Object.keys(mastersCourseData).map((sem) => ({
    name: `Semester ${sem.replace("semester", "")}`,
    value: sem,
    number: parseInt(sem.replace("semester", "")),
  }));

  const latestMastersSemester = mastersSemesters.reduce((max, semester) =>
    semester.number > max.number ? semester : max
  );

  return (
    <section className="home-courses">
      <h2>Master's {latestMastersSemester.name} Courses Shortcut</h2>

      <div className="course-buttons">
        {mastersCourseData[latestMastersSemester.value].map((course) => (
          <Link
            key={course.code}
            to={`/resources/${course.code}`}
            className="course-btn"
          >
            {course.code} - {createShortForm(course.name)}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default LatestCourses;