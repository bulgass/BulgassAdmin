import React from 'react';
import './homepage.css'; 
import Sidebar from './submodule/sidebar/sidebar';

const HomePage = () => {
  return (
    <div className="home-page">
            <Sidebar />
      <h1 className="title">Daily Timetable</h1>
      <div className="timetable">
        <div className="timetable-header">
          <div className="time-slot">Time</div>
          <div className="event-slot">Event</div>
        </div>
        <div className="timetable-row">
          <div className="time-slot">08:00 AM</div>
          <div className="event-slot">Morning Meeting</div>
        </div>
        <div className="timetable-row">
          <div className="time-slot">10:00 AM</div>
          <div className="event-slot">Project Work</div>
        </div>
        <div className="timetable-row">
          <div className="time-slot">12:00 PM</div>
          <div className="event-slot">Lunch Break</div>
        </div>
        <div className="timetable-row">
          <div className="time-slot">02:00 PM</div>
          <div className="event-slot">Client Call</div>
        </div>
        <div className="timetable-row">
          <div className="time-slot">04:00 PM</div>
          <div className="event-slot">Team Meeting</div>
        </div>
        <div className="timetable-row">
          <div className="time-slot">06:00 PM</div>
          <div className="event-slot">Wrap Up</div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;