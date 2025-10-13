import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import "./NoticeSection.css";

const NoticeSection = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/notice/list`
        );
        const data = await res.json();

        if (data.success) {
          setNotices(data.message);
        } else {
          console.error("Failed to fetch notices");
        }
      } catch (error) {
        console.error("Error fetching notices:", error);
      }
    };

    fetchNotices();
  }, []);

  const createSanitizedHTML = (html) => ({
    __html: DOMPurify.sanitize(html),
  });

  return (
    <section id="notices" className="notice-section">
      <h2>📢 Important Notices</h2>
      <div className="notices-container">
        {notices.map((notice) => (
          <div
            key={notice._id}
            className={`notice-card notice-sec-${notice.section.toLowerCase()}`}
          >
            <div className="notice-header">
              <h4 className="notice-title">{notice.title}</h4>
              <span className="section-badge">Section {notice.section}</span>
            </div>

            <div className="notice-content">
              {notice.extraInfo && (
                <p
                  className="extra-info"
                  dangerouslySetInnerHTML={createSanitizedHTML(
                    notice.extraInfo
                  )}
                />
              )}

              {notice.date && <p className="notice-date">📅 {notice.date}</p>}

              {notice.additional && (
                <div
                  className="additional-info"
                  dangerouslySetInnerHTML={createSanitizedHTML(
                    `📝 ${notice.additional}`
                  )}
                />
              )}

              {notice.link && (
                <a
                  href={
                    notice.link.startsWith("http")
                      ? notice.link
                      : `https://${notice.link}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="notice-link-button"
                >
                  🔗 Click Here!
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NoticeSection;
