import React, { useState, useEffect } from 'react';
import './RoutineSection.css';

const routineData = {
  section: {
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    times: ['8:30–10:00', '10:15–11:45', '12:00–1:30', '2:00–3:30', '3:45–5:15'],
    schedule: {
      Sunday: [
        { course: 'BDAD', location: 'ST-603' },
        null,
        // { course: 'CC Lab (12:00 – 3:00)', location: 'LAB-02', isLab: true, span: 2 },
        null,
        null,
        null,
      ],
      Monday: [
        { course: 'AML', location: 'ST-604' },
        { course: 'AML', location: 'ST-604' },
        { course: 'RM (12:00 - 2:00)', location: 'ST-604' },
        null,
        null,
      ],
      Tuesday: [
        { course: '', location: 'Online', span: 5 },
      ],
      Wednesday: [
        { course: 'AN', location: 'ST-604' },
        { course: 'AN', location: 'ST-604' },
        { course: 'ICS', location: 'ST-604' },
        { course: 'ICS', location: 'ST-604' },
        null,
      ],
      Thursday: [
        { course: '', location: 'Enjoy Your Day!', span: 5 },     
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
  return (
    <section className="routine-section" id="routine">
      <center>
        <h1>📘 Class Routine</h1>
      </center>
      <br />

      <div className="routine-wrapper">
        <RoutineTable routine={routineData.section} />
      </div>
    </section>
  );
};

export default RoutineSection;