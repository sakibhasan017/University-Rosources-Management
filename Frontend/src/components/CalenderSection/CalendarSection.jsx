import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './CalendarSection.css';

const CalendarSection = () => {
  const [events, setEvents] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupEvent, setPopupEvent] = useState(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [section, setSection] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(null);
  const [sectionPopupEvents, setSectionPopupEvents] = useState(null);

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/calendar/list`);
        const data = await res.json();

        if (data.success && Array.isArray(data.message)) {
          const formatted = data.message.map(item => ({
            title: item.title,
            date: item.date,
            section: item.section,
            color:
              item.section === 'A' ? '#3498db' :
              item.section === 'B' ? '#2ecc71' :
              '#f39c12'
          }));
          setEvents(formatted);
        } else {
          console.error("Invalid response format", data);
        }
      } catch (error) {
        console.error("Failed to fetch calendar data", error);
      }
    };

    fetchCalendarData();
  }, []);

  const getUpcomingEvents = (targetSection) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    return events
      .filter(event => {
        const eventDate = new Date(event.date);
        eventDate.setHours(0, 0, 0, 0);
        
        
        if (targetSection === 'All') {
          return event.section === 'All' && eventDate >= today;
        } else {
          return (event.section === targetSection || event.section === 'All') && eventDate >= today;
        }
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date)); 
  };

  const handleSectionClick = (section) => {
    const upcomingEvents = getUpcomingEvents(section);
    setSectionPopupEvents({
      section,
      events: upcomingEvents
    });
  };

  const closeSectionPopup = () => {
    setSectionPopupEvents(null);
  };

  const handleEventClick = (clickInfo) => {
    setPopupEvent({
      title: clickInfo.event.title,
      date: clickInfo.event.start,
      section: clickInfo.event.extendedProps.section || 'N/A'
    });
  };

  const closeEventPopup = () => {
    setPopupEvent(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsSuccess(null);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/notify/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, section }),
      });
      const data = await res.json();
      setMessage(data.message);
      setIsSuccess(data.success);

      if (data.success) {
        setName('');
        setEmail('');
        setSection('');
        setTimeout(() => {
          setShowPopup(false);
          setMessage('');
          setIsSuccess(null);
        }, 1000);
      }
    } catch (err) {
      setMessage('Failed to submit.');
      setIsSuccess(false);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setMessage('');
    setIsSuccess(null);
  };

  return (
    <section className="calendar-section" id="calendar">
      <div className="calendar-header">
        <h2>📅 Monthly Alerts</h2>
        <div className="notify-link">
          <p onClick={() => setShowPopup(true)}>Wanna Notify? <u>Click here</u></p>
        </div>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-form">
            <h3>Get Notified by Email</h3>
            <p className="notify-disclaimer">
              ⚠️ Disclaimer: This notification service uses multiple servers.  
              If a server is down, notifications may not be delivered.  
              Please do not rely 100% on this feature.
            </p>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <select
                value={section}
                onChange={(e) => setSection(e.target.value)}
                required
              >
                <option value="">Select Section</option>
                <option value="A">Section A</option>
                <option value="B">Section B</option>
              </select>
              <button type="submit">Submit</button>
              {message && (
                <p className={isSuccess ? 'message success' : 'message error'}>
                  {message}
                </p>
              )}
              <button type="button" onClick={closePopup}>Close</button>
            </form>
          </div>
        </div>
      )}

      {popupEvent && (
        <div className="popup-overlay" onClick={closeEventPopup}>
          <div className="event-popup" onClick={(e) => e.stopPropagation()}>
            <h3>Event Details</h3>
            <p><strong>Title:</strong> {popupEvent.title}</p>
            <p><strong>Section:</strong> {popupEvent.section}</p>
            <p><strong>Date:</strong> {popupEvent.date.toDateString()}</p>
            <button onClick={closeEventPopup}>Close</button>
          </div>
        </div>
      )}

      {sectionPopupEvents && (
        <div className="popup-overlay" onClick={closeSectionPopup}>
          <div className="event-popup" onClick={(e) => e.stopPropagation()}>
            <h3>Upcoming Events for Section {sectionPopupEvents.section}</h3>
            {sectionPopupEvents.events.length > 0 ? (
              <div className="upcoming-events-list">
                {sectionPopupEvents.events.map((ev, index) => {
                  const eventDate = new Date(ev.date);
                  const today = new Date();
                  const isToday = eventDate.toDateString() === today.toDateString();
                  
                  return (
                    <div key={index} className="upcoming-event-item">
                      <div className="event-date">
                        {isToday ? 'Today' : eventDate.toLocaleDateString()}
                      </div>
                      <div className="event-title">{ev.title}</div>
                      <div className="event-section-badge">{ev.section}</div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p>No upcoming events for this section.</p>
            )}
            <button onClick={closeSectionPopup}>Close</button>
          </div>
        </div>
      )}

      <div className="legend">
        <button className="legend-item section-a" onClick={() => handleSectionClick('A')}>
          Section A
        </button>
        <button className="legend-item section-b" onClick={() => handleSectionClick('B')}>
          Section B
        </button>
        <button className="legend-item section-all" onClick={() => handleSectionClick('All')}>
          All Sections
        </button>
      </div>

      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          height="auto"
          eventClick={handleEventClick}
        />
      </div>
    </section>
  );
};

export default CalendarSection;