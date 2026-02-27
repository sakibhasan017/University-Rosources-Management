import React from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../../components/Hero/Hero.jsx";
import NoticeSection from "../../components/NoticeSection/NoticeSection.jsx";
import ScheduleSection from "../../components/ScheduleSection/ScheduleSection.jsx";
import RoutineSection from "../../components/RoutineSection/RoutineSection.jsx";
import CalendarSection from "../../components/CalenderSection/CalendarSection.jsx";
import LatestCourses from "../../components/LatestCourses/LatestCourses.jsx";
import "./Home.css";
import OnlineClassReportSection from "../../components/OnlineClassReportSection/OnlineClassReportSection.jsx";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Hero />
      <div className="identity-btn-wrapper">
        <button 
          className="identity-btn"
          onClick={() => navigate("/profile-card")}
        >
          🚀 Build your identity
        </button>
      </div>

      <LatestCourses />
      <NoticeSection />
      <OnlineClassReportSection />
      <ScheduleSection />
      <div style={{ marginTop: "60px" }}>
        <RoutineSection />
      </div>

      <CalendarSection />
    </>
  );
};

export default Home;
