import React, { useState, useEffect } from 'react';
import './homepage.css'; 
import Sidebar from './submodule/sidebar/sidebar';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const Day = ({ day, isCurrentMonth, handleDayClick }) => {
  return (
    <div 
      className={`day ${isCurrentMonth ? 'current-month' : 'other-month'}`} 
      onClick={() => handleDayClick(day)}
    >
      {day}
    </div>
  );
};

const HomePage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysData, setDaysData] = useState({}); 
  const [selectedDay, setSelectedDay] = useState(null);
  const [modalData, setModalData] = useState({ courseName: '', startTime: '', endTime: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const month = currentDate.getMonth() + 1; 
      const year = currentDate.getFullYear();
      const calendarCollection = collection(db, 'calendar');
      const snapshot = await getDocs(calendarCollection);
        
      const data = {};
      snapshot.forEach(doc => {
        data[doc.id] = doc.data(); 
      });
      setDaysData(data);
    };

    fetchData();
  }, [currentDate]);

  const handleDayClick = (day) => {
    setSelectedDay(day);
    setModalData(daysData[day] || { courseName: '', startTime: '', endTime: '' });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    const dayData = {
      day: selectedDay,
      month: currentDate.getMonth() + 1,
      year: currentDate.getFullYear(),
      ...modalData,
    };

    const docId = `${selectedDay}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
    const dayDoc = doc(db, 'calendar', docId);
    
    await setDoc(dayDoc, dayData); 
    
    setDaysData(prev => ({ ...prev, [selectedDay]: dayData }));
    setIsModalOpen(false);
  };

  const changeMonth = (direction) => {
    const newDate = new Date(currentDate.setMonth(currentDate.getMonth() + direction));
    setCurrentDate(newDate);
  };

  const calculateEndTime = (startTime) => {
    const [hours, minutes] = startTime.split(':');
    const startDate = new Date();
    startDate.setHours(parseInt(hours));
    startDate.setMinutes(parseInt(minutes));

    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); 

    const endHours = endDate.getHours().toString().padStart(2, '0');
    const endMinutes = endDate.getMinutes().toString().padStart(2, '0');

    return `${endHours}:${endMinutes}`;
  };

  const handleStartTimeChange = (e) => {
    const newStartTime = e.target.value;
    const newEndTime = calculateEndTime(newStartTime); 
    setModalData({ ...modalData, startTime: newStartTime, endTime: newEndTime }); 
  };

  return (
    <div className="home-page">
      <Sidebar />
      <div className="calendar">
        <div className="header">
          <button className="btn-calendar" onClick={() => changeMonth(-1)}>Previous</button>
          <h2>{currentDate.toLocaleString('en-US', { month: 'long' })} {currentDate.getFullYear()}</h2>
          <button className="btn-calendar" onClick={() => changeMonth(1)}>Next</button>
        </div>
        <div className="days-grid">
          {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((dayName) => (
            <div className="day-name" key={dayName}>{dayName}</div>
          ))}
          {Array.from({ length: 42 }).map((_, index) => {
            const day = index - new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay() + 1;
            return (
              <Day
                key={index}
                day={day > 0 && day <= new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate() ? day : ''}
                isCurrentMonth={day > 0 && day <= new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()}
                handleDayClick={handleDayClick}
              />
            );
          })}
        </div>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Course Details for {selectedDay}</h2>
            <label>
              Course Name:
              <input 
                type="text" 
                value={modalData.courseName} 
                onChange={(e) => setModalData({ ...modalData, courseName: e.target.value })} 
              />
            </label>
            <label>
              Start Time:
              <input 
                type="time" 
                value={modalData.startTime} 
                onChange={handleStartTimeChange} 
              />
            </label>
            <label>
              End Time:
              <input 
                type="time" 
                value={modalData.endTime} 
                readOnly 
              />
            </label>
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
