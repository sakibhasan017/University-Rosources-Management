import React from "react";
import { Link } from "react-router-dom";
import "./LatestCourses.css";
import courses from "../../data/courses.js";

const { courseData } = courses;

const createShortForm = (name) => {
  const excludeWords = ["and", "of", "the", "for", "in", "to", "with", "&", "(", ")"];
  return name
    .split(" ")
    .filter((word) => !excludeWords.includes(word.toLowerCase()))
    .map((word) => word[0]?.toUpperCase() || "")
    .join("");
};

const LatestCourses = () => {
  const semesters = Object.keys(courseData).map((sem) => ({
    name: `Semester ${sem.replace("semester", "")}`,
    value: sem,
    number: parseInt(sem.replace("semester", "")),
  }));

  const latestSemester = semesters.reduce((max, semester) =>
    semester.number > max.number ? semester : max
  );

  return (
    <section className="home-courses">
      <h2>{latestSemester.name} Courses Shortcut</h2>
      <div className="course-buttons">
        {courseData[latestSemester.value].map((course) => (
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
