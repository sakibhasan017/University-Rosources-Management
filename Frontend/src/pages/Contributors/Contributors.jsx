import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Contributors.css";
import { FaUserCircle } from "react-icons/fa";

const Contributors = () => {
  const [profiles, setProfiles] = useState([]);
  const navigate = useNavigate();

  const designationMap = {
    "2254901012": { title: "Founder & Owner", priority: 1 },
    "2254901060": { title: "Lead Developer & Maintainer", priority: 2 },
    "2254901010": { title: "Content & Operations Manager", priority: 3 },
    "2254901054": { title: "Innovation Advisor", priority: 4 },
    "2254901036": { title: "Security Analyst & QA Tester", priority: 5 },
    "2254901020": { title: "Media & Content Producer", priority: 6 },
  };

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/profile/list`
        );
        const result = await res.json();

        if (!result.success || !Array.isArray(result.data)) {
          console.error("Invalid response:", result);
          return;
        }

        const filtered = result.data.filter((p) =>
          Object.keys(designationMap).includes(p.studentId)
        );

        const withDesignations = filtered.map((p) => ({
          ...p,
          designation: designationMap[p.studentId].title,
          priority: designationMap[p.studentId].priority,
        }));

        withDesignations.sort((a, b) => a.priority - b.priority);

        setProfiles(withDesignations);
      } catch (err) {
        console.error("Error fetching profiles:", err);
      }
    };

    fetchProfiles();
  }, []);

  return (
    <div className="contributors-page">
      <h1 className="contributors-title">Contributors & Management</h1>
      <div className="contributors-grid">
        {profiles.map((profile) => (
          <div
            key={profile._id}
            onClick={() => navigate(`/user/${profile._id}`)}
            className="contributor-card"
          >
            <div className="contributor-img-wrapper">
              {profile.img ? (
                <img
                  src={profile.img}
                  alt={profile.name}
                  className="contributor-img"
                  onError={(e) => (e.target.style.display = "none")}
                />
              ) : (
                <FaUserCircle className="contributor-icon" />
              )}
            </div>
            <h2 className="contributor-name">{profile.name}</h2>
            <p className="contributor-designation">{profile.designation}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contributors;
