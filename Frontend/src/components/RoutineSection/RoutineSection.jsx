import React, { useState, useEffect } from 'react';
import './RoutineSection.css';

// const routineData = {
//   sectionA: {
//     days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
//     times: ['8:30–10:00', '10:15–11:45', '12:00–1:30', '2:00–3:30', '3:45–5:15'],
//     schedule: {
//       Sunday: [
//         { course: 'HCI', location: 'CR-301' },
//         { course: 'CC', location: 'CR-302' },
//         { course: 'CC Lab (12:00 – 3:00)', location: 'LAB-02', isLab: true, span: 2 },
//         null,
//         null,
//       ],
//       Monday: [
//         { course: 'ML', location: 'CR-301' },
//         { course: 'SAD', location: 'CR-302' },
//         null,
//         null,
//         null,
//       ],
//       Tuesday: [
//         { course: '', location: 'Online', span: 5 },
//       ],
//       Wednesday: [
//         { course: 'ML', location: 'CR-301' },
//         { course: 'CC', location: 'LAB-01' },
//         { course: 'ML Lab (12:00 – 3:00)', location: 'LAB-01', isLab: true, span: 2 },
//         null,
//         null,
//       ],
//       Thursday: [
//         { course: 'SAD', location: 'CR-304' },
//         { course: 'HCI', location: 'CR-303' },
//         null,
//         null,
//         null,        
//       ],
//     },
//   },
//   sectionB: {
//     days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
//     times: ['8:30–10:00', '10:15–11:45', '12:00–1:30', '2:00–3:30', '3:45–5:15'],
//     schedule: {
//       Sunday: [
//         { course: 'CC', location: 'CR-302' },
//         { course: 'HCI', location: 'CR-301' },
//         null,
//         null,
//         null,
//       ],
//       Monday: [
//         { course: 'SAD', location: 'CR-302' },
//         { course: 'ML', location: 'CR-301' },
//         { course: 'ML Lab (12:00 – 3:00)', location: 'LAB-01', isLab: true, span: 2 },
//         null,
//         null,
//       ],
//       Tuesday: [
//         { course: '', location: 'Online', span: 5 },
//       ],
//       Wednesday: [
//         { course: 'CC', location: 'LAB-01' },
//         { course: 'ML', location: 'CR-301' },
//         { course: 'CC Lab (12:00 – 3:00)', location: 'LAB-02', isLab: true, span: 2 },
//         null,
//         null,
//       ],
//       Thursday: [
//         { course: 'HCI', location: 'CR-303' },
//         { course: 'SAD', location: 'CR-304' },
//         null,
//         null,
//         null,        
//       ],
//     },
//   },
// };

const ramandanRoutineData = {
  sectionA: {
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    times: ['9:00–10:00', '10:10–11:10', '11:20–12:20', '12:30–1:30', '1:45–2:45'],
    schedule: {
      Sunday: [
        { course: 'HCI', location: 'CR-301' },
        { course: 'CC', location: 'CR-302' },
        { course: 'CC Lab (11:20 – 1:10)', location: 'LAB-02', isLab: true, span: 2 },
        null,
        null,
      ],
      Monday: [
        { course: 'ML', location: 'CR-301' },
        { course: 'SAD', location: 'CR-302' },
        null,
        null,
        null,
      ],
      Tuesday: [
        { course: '', location: 'Online', span: 5 },
      ],
      Wednesday: [
        { course: 'ML', location: 'CR-301' },
        { course: 'CC', location: 'LAB-01' },
        { course: 'ML Lab (11:20 – 1:10)', location: 'LAB-01', isLab: true, span: 2 },
        null,
        null,
      ],
      Thursday: [
        { course: 'SAD', location: 'CR-304' },
        { course: 'HCI', location: 'CR-303' },
        null,
        null,
        null,        
      ],
    },
  },
  sectionB: {
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    times: ['9:00–10:00', '10:10–11:10', '11:20–12:20', '12:30–1:30', '1:45–2:45'],
    schedule: {
      Sunday: [
        { course: 'CC', location: 'CR-302' },
        { course: 'HCI', location: 'CR-301' },
        null,
        null,
        null,
      ],
      Monday: [
        { course: 'SAD', location: 'CR-302' },
        { course: 'ML', location: 'CR-301' },
        { course: 'ML Lab (11:20 – 1:10)', location: 'LAB-01', isLab: true, span: 2 },
        null,
        null,
      ],
      Tuesday: [
        { course: '', location: 'Online', span: 5 },
      ],
      Wednesday: [
        { course: 'CC', location: 'LAB-01' },
        { course: 'ML', location: 'CR-301' },
        { course: 'CC Lab (11:20 – 1:10)', location: 'LAB-02', isLab: true, span: 2 },
        null,
        null,
      ],
      Thursday: [
        { course: 'HCI', location: 'CR-303' },
        { course: 'SAD', location: 'CR-304' },
        null,
        null,
        null,        
      ],
    },
  },
};


const RoutineTable = ({ routine }) => {
  const [spannedSlots, setSpannedSlots] = useState({});

  useEffect(() => {
    const spans = {};
    routine.days.forEach(day => {
      const daySchedule = routine.schedule[day];
      for (let i = 0; i < daySchedule.length; i++) {
        const slot = daySchedule[i];
        if (slot && slot.span > 1) {
          spans[`${day}-${i}`] = slot.span;
        }
      }
    });
    setSpannedSlots(spans);
  }, [routine]);

  const shouldSkipSlot = (day, index) => {
    for (let i = 0; i < index; i++) {
      const key = `${day}-${i}`;
      if (spannedSlots[key] && index < i + spannedSlots[key]) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className='responsive-table-wrapper'>
      <table className="routine-table">
        <thead>
          <tr>
            <th>Day / Time</th>
            {routine.times.map((time, idx) => (
              <th key={idx}>{time}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {routine.days.map((day) => (
            <tr key={day}>
              <td className="day-cell">{day}</td>
              {routine.schedule[day].map((slot, idx) => {
                if (shouldSkipSlot(day, idx)) {
                  return null;
                }

                const span = slot?.span || 1;
                
                return (
                  <td 
                    key={idx} 
                    className={`slot ${slot ? 'filled' : 'empty'} ${slot?.isLab ? 'lab-slot' : ''}`}
                    colSpan={span}
                  >
                    {slot ? (
                      <>
                        <div className="course-name">{slot.course}</div>
                        <div className="location">📍 {slot.location}</div>
                        
                      </>
                    ) : (
                      <span className="no-class">—</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const RoutineSection = () => {
  const [currentSection, setCurrentSection] = useState('sectionA');
  const [fade, setFade] = useState(false);

  const handleSectionChange = (section) => {
    setFade(true); 
    setTimeout(() => {
      setCurrentSection(section);
      setFade(false); 
    }, 300); 
  };

  return (
    <section className="routine-section" id="routine">
      <center><h1>📘 Class Routine</h1></center><br />

      <div className="section-buttons">
        <button
          className={currentSection === 'sectionA' ? 'active' : ''}
          onClick={() => handleSectionChange('sectionA')}
        >
          Section A
        </button>
        <button
          className={currentSection === 'sectionB' ? 'active' : ''}
          onClick={() => handleSectionChange('sectionB')}
        >
          Section B
        </button>
      </div>

      <div className={`routine-wrapper ${fade ? 'fade-out' : ''}`}>
        <RoutineTable routine={ramandanRoutineData[currentSection]} />
      </div>
    </section>
  );
};

export default RoutineSection;