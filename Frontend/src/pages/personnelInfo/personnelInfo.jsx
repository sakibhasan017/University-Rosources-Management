import React, { useEffect, useState } from "react";
import "./personnelInfo.css";

const PersonnelInfo = () => {
  const [personnel, setPersonnel] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/personnel/list`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched personnel:", data);
        setPersonnel(Array.isArray(data) ? data : data.message || []);
      })
      .catch((err) => console.error("Error fetching personnel:", err));
  }, []);

  const deanSection = personnel.filter(
    (p) => p.designation?.toLowerCase().includes("dean")
  );

  const chairmanSection = personnel.filter(
    (p) => p.designation?.toLowerCase().includes("chairman")
  );

  const facultySection = personnel.filter((p) =>
    ["professor", "assistant professor", "associate professor", "lecturer"].some(
      (role) => p.designation?.toLowerCase().includes(role)
    )
  );

  const othersSection = personnel.filter(
    (p) =>
      !deanSection.includes(p) &&
      !chairmanSection.includes(p) &&
      !facultySection.includes(p)
  );

  const renderSection = (title, data) => (
    <div className="psnl-section">
      <h2>{title}</h2>
      <div className="personnel-grid">
        {data.map((person, index) => (
          <div className="psnl-card" key={index}>
            <h3>{person.name}</h3>
            <p className="designation">{person.designation}</p>
            {person.phone && <p>📞 {person.phone}</p>}
            {person.email && (
              <p>
                📧 <a href={`mailto:${person.email}`}>{person.email}</a>
              </p>
            )}
            {person.roomNo && <p>🏢 Room: {person.roomNo}</p>}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="personnel-page">
      <h1 className="page-title">Meet Our Academic & Administrative Team</h1>

      {renderSection("Dean", deanSection)}
      {renderSection("Chairman", chairmanSection)}
      {renderSection("Faculties", facultySection)}
      {renderSection("Others", othersSection)}
    </div>
  );
};

export default PersonnelInfo;
