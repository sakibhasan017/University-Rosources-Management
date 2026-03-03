import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import axios from "axios";
import "./OnlineClassReportSection.css";

const OnlineClassReportSection = () => {
  const [onlineClasses, setOnlineClasses] = useState([]);
  const [reports, setReports] = useState([]);
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
      (item) => item.section === selectedSection || item.section === "All",
    );
  };

  useEffect(() => {
    if (modalContent) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [modalContent]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const onlineRes = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/onlineClass/list`,
        );
        const reportRes = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/report/list`,
        );

        if (onlineRes.data.success) {
          setOnlineClasses(onlineRes.data.message);
        }

        if (reportRes.data.success) {
          const sortedReports = [...reportRes.data.message].sort(
            (a, b) => new Date(a.date || "") - new Date(b.date || ""),
          );
          setReports(sortedReports);
        }
      } catch (err) {
        console.error("Error fetching online classes/reports", err);
      }
    };

    fetchData();
  }, []);

  return (
    <section id="report" className="online-report-section">
      <h2>💻 Online Classes & ®️ Lab Reports</h2>

      <div style={{ margin: "20px 0" }}>
        <label
          htmlFor="sectionFilterOR"
          style={{ fontWeight: "600", marginRight: "10px" }}
        >
          Filter by Section:
        </label>
        <select
          id="sectionFilterOR"
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
          style={{
            padding: "6px 12px",
            fontSize: "16px",
            borderRadius: "6px",
          }}
        >
          <option value="All">All</option>
          <option value="A">Section A</option>
          <option value="B">Section B</option>
        </select>
      </div>

      <div className="online-report-columns">
        <div className="column left-column">
          <h3>Online Classes</h3>
          {filterBySection(onlineClasses).length === 0 ? (
            <p className="no-data">No scheduled online classes!</p>
          ) : (
            <div className="responsive-table-online">
              <table>
                <thead>
                  <tr>
                    <th>Course</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Section</th>
                    <th>Link</th>
                  </tr>
                </thead>
                <tbody>
                  {filterBySection(onlineClasses).map((c, i) => (
                    <tr key={i}>
                      <td>{c.course}</td>
                      <td>{c.date || "TBD"}</td>
                      <td>{c.time || "TBD"}</td>
                      <td>
                        <span
                          className={`section-badges section-${(c.section || "all").toLowerCase()}`}
                        >
                          {c.section}
                        </span>
                      </td>
                      <td>
                        {c.link ? (
                          <a
                            className="join-link"
                            href={c.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Join
                          </a>
                        ) : (
                          <span className="no-link">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="column right-column">
          <h3>Lab Reports</h3>
          {filterBySection(reports).length === 0 ? (
            <p className="no-data">No lab reports available!</p>
          ) : (
            <div className="responsive-table-report">
              <table>
                <thead>
                  <tr>
                    <th>Course</th>
                    <th>Topic</th>
                    <th>Date</th>
                    <th>Section</th>
                  </tr>
                </thead>
                <tbody>
                  {filterBySection(reports).map((r, i) => (
                    <tr key={i}>
                      <td>{r.course}</td>
                      <td>
                        <button
                          className="topic-link"
                          onClick={() =>
                            openModal(r.course, r.topic, r.additional)
                          }
                        >
                          View Topic
                        </button>
                      </td>
                      <td>{r.date || "TBD"}</td>
                      <td>
                        <span
                          className={`section-badges section-${(r.section || "all").toLowerCase()}`}
                        >
                          {r.section}
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
              <span
                dangerouslySetInnerHTML={createSanitizedHTML(
                  modalContent.topic,
                )}
              />
            </p>

            {modalContent.additional && (
              <p>
                <strong>Note:</strong>{" "}
                <span
                  dangerouslySetInnerHTML={createSanitizedHTML(
                    modalContent.additional,
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

export default OnlineClassReportSection;
