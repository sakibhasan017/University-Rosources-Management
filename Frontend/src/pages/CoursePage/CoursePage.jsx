import React from "react";
import { useParams } from "react-router-dom";
import courses from "../../data/courses.js";
import "./CoursePage.css";

const { teachers, courseData, videoData, extra } = courses;

const CoursePage = () => {
  const { courseId } = useParams();
  const allCourses = Object.values(courseData).flat();
  const course = allCourses.find((c) => c.code === courseId);

  if (!course) return <div className="course-not-found">Course not found.</div>;

  const courseTeachers = course.teacherId
    ? teachers.filter((t) => course.teacherId.includes(t.id))
    : [];

 
  const courseVideos = course.videoId
    ? videoData.filter((v) => course.videoId.includes(v.code))
    : [];


  const courseExtras = course.ExtraId
    ? extra.filter((e) => course.ExtraId.includes(e.code))
    : [];

  return (
    <div className={`course-container ${!course.folderId ? "no-folder" : ""}`}>
      <div className="course-header">
        <h2 className="course-title">{course.name}</h2>
        <div className="course-meta">
          {course.code && <span className="course-code">{course.code}</span>}
        </div>
      </div>

      {courseTeachers.length > 0 && (
        <div className="teacher-section">
          <h3 className="teacher-section-title">
            Course Instructor{courseTeachers.length > 1 ? "s" : ""}
          </h3>
          <div className="teacher-grid">
            {courseTeachers.map((teacher) => (
              <div className="teacher-card" key={teacher.id}>
                <h4 className="teacher-name">{teacher.name}</h4>
                {teacher.designation && (
                  <p className="teacher-designation">{teacher.designation}</p>
                )}
                <p className="teacher-department">
                  {teacher.department} - {teacher.university}
                </p>
                {teacher.phone && (
                  <p className="teacher-contact">📞 {teacher.phone}</p>
                )}
                {teacher.email && (
                  <p className="teacher-contact">
                    ✉️ <a href={`mailto:${teacher.email}`}>{teacher.email}</a>
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      

      {!course.folderId ? (
        <p className="no-folder-message">
          No Google Drive folder is available for this course yet.
        </p>
      ) : (
        <div className="drive-container">
          <iframe
            src={`https://drive.google.com/embeddedfolderview?id=${course.folderId}#list`}
            className="drive-iframe"
            allowFullScreen
            title={course.name}
          />
        </div>
      )}
      <br />
      <br />
      {courseVideos.length > 0 && (
        <div className="video-section">
          <h3 className="video-section-title">Lecture Videos</h3>
          <div className="video-grid">
            {courseVideos.map((video) => {
              const isYouTube = video.vDrive.includes("youtu");
              return (
                <div className="video-card" key={video.code}>
                  <h4 className="video-title">{video.title}</h4>
                  <p className="video-date">{video.date}</p>
                  {isYouTube ? (
                    <iframe
                      className="video-frame"
                      src={`https://www.youtube.com/embed/${
                        video.vDrive.split("v=")[1] ||
                        video.vDrive.split("/").pop()
                      }`}
                      title={video.title}
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <iframe
                      className="video-frame"
                      src={`https://drive.google.com/file/d/${
                        video.vDrive.split("/d/")[1].split("/")[0]
                      }/preview`}
                      title={video.title}
                      allowFullScreen
                    ></iframe>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
      
      {courseExtras.length > 0 && (
        <div className="extra-section">
          <h3 className="extra-section-title">Extra Resources</h3>
          <div className="extra-grid">
            {courseExtras.map((info) => (
              <div className="extra-card" key={info.code}>
                <h4 className="extra-title">{info.title}</h4>
                {info.link && (
                  <p>
                    🔗{" "}
                    <a
                      href={info.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {info.link}
                    </a>
                  </p>
                )}
                {info.addition1 && <p>{info.addition1}</p>}
                {info.addtional2 && <p>{info.addtional2}</p>}
                {info.additional3 && <p>{info.additional3}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursePage;
