import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Resources from "./pages/Resources/Resources.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import CoursePage from "./pages/CoursePage/CoursePage.jsx";
import GeneralResources from "./pages/GeneralResources/GeneralResources.jsx";
import More from "./pages/More/More.jsx";
import Performance from "./pages/Performance/Performance.jsx";
import Memories from "./pages/Memories/Memories.jsx";
import Achievements from "./pages/Achievements/Achievements.jsx";
import Feedback from "./pages/Feedback/Feedback.jsx";
import WeeklyView from "./pages/WeeklyUpdates/WeeklyUpdate.jsx";
import ProfileCard from "./pages/ProfileCard/ProfileCard.jsx";
import UserInfoFromCard from "./pages/UserInfoFromCard/UserInfoFromCard.jsx";
import PersonnelInfo from "./pages/personnelInfo/personnelInfo.jsx";


const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/resources" element={<Resources/>} />
        <Route path="/resources/:courseId" element={<CoursePage/>}/>
        <Route path="/general-resources" element={<GeneralResources/>}/>
        <Route path="/more" element={<More/>}/>
        <Route path="/performance-tracker" element={<Performance/>}/>
        <Route path="/memories" element={<Memories/>}/>
        <Route path="/achievements" element={<Achievements/>}/>
        <Route path="/feedback" element={<Feedback/>}/>
        <Route path="/week-updates" element={<WeeklyView/>}/>
        <Route path="/profile-card" element={<ProfileCard/>}/>
        <Route path="/user/:id" element={<UserInfoFromCard/>}/>
        <Route path="/personnel-info" element={<PersonnelInfo/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
