import React from 'react';
import './GeneralResources.css';


import RoutineIcon from '../../assets/calender-icon.png';
import CalendarIcon from '../../assets/academic-icon.png';
import BusIcon from '../../assets/bus-icon.png';
import AssignmentIcon from '../../assets/assignment-icon.png';
import GroupIcon from '../../assets/group-icon.png';
import ReportIcon from '../../assets/report-icon.png';
import ImprovementIcon from '../../assets/improve_icon.png';
import StipendIcon from '../../assets/stipend_icon.png';
import GuideLineIcon from '../../assets/guidelineIcon.png';
import RamadanRoutineIcon from '../../assets/mosque.png'

const resources = [
  {
    title: "ICT Routine 8th Semester",
    url: "https://drive.google.com/file/d/1YNo4NkaDCzeBNy3s2YupctfvFhOI_yqz/view?usp=sharing",
    icon: RoutineIcon,
  },
  {
    title: "ICT Routine for Ramadan",
    url: "https://drive.google.com/file/d/1ywsz9B6nYLBtlXxMNR1hDx57Ex-MedOl/view?usp=drive_link",
    icon: RamadanRoutineIcon,
  },
  {
    title: "Academic Calendar",
    url: "https://drive.google.com/file/d/1ciibm-XWaaABQBKevsiTvRBUSvsgQRsG/view?usp=drive_link",
    icon: CalendarIcon,
  },
    {
    title: "Academic Guidelines",
    url: "https://drive.google.com/file/d/1zid6CdGhZtoTO_cuFZUGygc3_nBFdfrB/view?usp=sharing",
    icon: GuideLineIcon,
  },
  {
    title: "Bus Route for Student",
    url: "https://drive.google.com/file/d/1wWYjDnQbdcdGn8mPJz9JUB9yowsg2ODH/view",
    icon: BusIcon,
  },
  {
    title: "Cover Page for Assignment",
    url: "https://drive.google.com/file/d/15Fm0armFFmZ5Q-M_uwaksTIjtMd-R4sE/view",
    icon: AssignmentIcon,
  },
  {
    title: "Cover Page for Groups",
    url: "https://drive.google.com/file/d/1NxKb2sV5CjZsV166T1Lgf96DpSCWi1E6/view",
    icon: GroupIcon,
  },
  {
    title: "Cover Page for EEE Report",
    url: "https://drive.google.com/file/d/1ov2G5U1RTLYUIO6styfT2a54hKWcajHy/view",
    icon: ReportIcon,
  },
  {
    title: "Retake/Improvement Form",
    url: "https://docs.google.com/document/d/1h5xGwpRQQA6mCV1sY7u27cMJCV-RjN_Q/edit?usp=sharing&ouid=110645007617669572413&rtpof=true&sd=true",
    icon: ImprovementIcon,
  },
  {
    title: "Stipend Form",
    url: "https://docs.google.com/document/d/1pVAjHRckv35z34gmBBmHpid8had2oDPS/edit?usp=sharing&ouid=110645007617669572413&rtpof=true&sd=true",
    icon: StipendIcon,
  },

];

const GeneralResources = () => {
  return (
    <div className="resources-page">
      <div className="resources-header">
        <h1>📚 General Resources</h1>
        <p>Essential documents for students</p>
      </div>

      <div className="resources-grid">
        {resources.map((resource, index) => (
          <a 
            href={resource.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="resource-card"
            key={index}
          >
            <div className="resource-icon">
              <img src={resource.icon} alt={resource.title} />
            </div>
            <h3>{resource.title}</h3>
          </a>
        ))}
      </div>
    </div>
  );
};

export default GeneralResources;