import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import "./ScheduleSection.css";
import axios from "axios";

const ScheduleSection = () => {
  const [exams, setExams] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [modalContent, setModalContent] = useState(null);
  const [selectedSection, setSelectedSection] = useState("All");

  const createSanitizedHTML = (html) => ({
    __html: DOMPurify.sanitize(html || ""),
  });

  const openModal = (title, topic, additional) => {
    setModalContent({ title, topic, additional });
  };

  const closeModal = () => {
    setModalContent(null);
  };

  const filterBySection = (items) => {
    if (selectedSection === "All") return items;
    return items.filter(
      (item) => item.section === selectedSection || item.section === "All"
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const examRes = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/exam/list`
        );
        const assignRes = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/assignment/list`
        );

        if (examRes.data.success) setExams(examRes.data.message);
        if (assignRes.data.success) setAssignments(assignRes.data.message);
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="schedule-section">
      <h2>📅 Exam & Assignment Schedule</h2>

      <div style={{ margin: "20px 0" }}>
        <label
          htmlFor="sectionFilter"
          style={{ fontWeight: "600", marginRight: "10px" }}
        >
          Filter by Section:
        </label>
        <select
          id="sectionFilter"
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
          style={{ padding: "6px 12px", fontSize: "16px", borderRadius: "6px" }}
        >
          <option value="All">All</option>
          <option value="A">Section A</option>
          <option value="B">Section B</option>
        </select>
      </div>

      <div className="schedule-columns" id="exam">
        <div className="column">
          <h3>Exam Schedule</h3>
          {filterBySection(exams).length === 0 ? (
            <p className="no-data">No upcoming exams!</p>
          ) : (
            <div className="responsive-table-exam">
              <table>
                <thead>
                  <tr>
                    <th>Course</th>
                    <th>Topic</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Exam Type</th>
                    <th>Section</th>
                  </tr>
                </thead>
                <tbody>
                  {filterBySection(exams).map((e, i) => (
                    <tr key={i}>
                      <td>{e.course}</td>
                      <td>
                        <button
                          className="topic-link"
                          onClick={() =>
                            openModal(e.course, e.topic, e.additional)
                          }
                        >
                          View Topic
                        </button>
                      </td>
                      <td>{e.date}</td>
                      <td>{e.time}</td>
                      <td>{e.examType}</td>
                      <td>
                        <span
                          className={`section-badges section-${e.section.toLowerCase()}`}
                        >
                          {e.section}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="column">
          <h3>Assignments</h3>
          {filterBySection(assignments).length === 0 ? (
            <p className="no-data">No pending assignments!</p>
          ) : (
            <div className="responsive-table">
              <table>
                <thead>
                  <tr>
                    <th>Course</th>
                    <th>Topic</th>
                    <th>Deadline</th>
                    <th>Section</th>
                  </tr>
                </thead>
                <tbody>
                  {filterBySection(assignments).map((a, i) => (
                    <tr key={i}>
                      <td>{a.course}</td>
                      <td>
                        <button
                          className="topic-link"
                          onClick={() =>
                            openModal(a.course, a.topic, a.additional)
                          }
                        >
                          View Topic
                        </button>
                      </td>
                      <td>{a.deadline}</td>
                      <td>
                        <span
                          className={`section-badges section-${a.section.toLowerCase()}`}
                        >
                          {a.section}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {modalContent && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{modalContent.title}</h2>
            <p>
              <strong>Topic:</strong> {modalContent.topic}
            </p>
            {modalContent.additional && (
              <p>
                <strong>Note:</strong>
                <span
                  dangerouslySetInnerHTML={createSanitizedHTML(
                    modalContent.additional
                  )}
                />
              </p>
            )}
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ScheduleSection;
