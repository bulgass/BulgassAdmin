import React,{useState} from 'react';
import './homepage.css'; 
import Sidebar from './submodule/sidebar/sidebar';


const Day = ({ day, isCurrentMonth }) => {
  return (
      <div className={`day ${isCurrentMonth ? 'current-month' : 'other-month'}`}>
          {day}
      </div>
  );
};

const HomePage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  
  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

  
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

  const daysFromPrevMonth = startOfMonth.getDay();

  const daysArray = [];
  for (let i = 1 - daysFromPrevMonth; i <= daysInMonth; i++) {
      daysArray.push(i);
  }

  const changeMonth = (direction) => {
      const newDate = new Date(currentDate.setMonth(currentDate.getMonth() + direction));
      setCurrentDate(newDate);
  };
  return (
    <div className="home-page">
            <Sidebar />
      <div className="calendar">
            <div className="header">
                <button className='btn-calendar' onClick={() => changeMonth(-1)}>Previous</button>
                <h2>
                    {currentDate.toLocaleString('en-US', { month: 'long' })} {currentDate.getFullYear()}
                </h2>
                <button className='btn-calendar' onClick={() => changeMonth(1)}>Next</button>
            </div>
            <div className="days-grid">
                {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
                    <div className="day-name" key={day}>{day}</div>
                ))}
                {daysArray.map((day, index) => (
                    <Day 
                        key={index} 
                        day={day > 0 ? day : ''} 
                        isCurrentMonth={day > 0} 
                    />
                ))}
            </div>
        </div>
    </div>
  );
};

export default HomePage;