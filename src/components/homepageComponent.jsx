import React from 'react';
import './homepage.css'; 
import Sidebar from './submodule/sidebar/sidebar';

const HomePage = () => {
  return (
    <div className="home-page">
            <Sidebar />
      <h1 className="title">Daily Timetable</h1>
        <div className="header-calender">
          <h1>September 2025</h1>
          <div className="calendar">
            <div className="week-day">Monday </div>
            <div className="week-day">Tuesday</div>
            <div className="week-day">Wednesday</div>
            <div className="week-day">Thursday</div>
            <div className="week-day">Friday</div>
            <div className="week-day">Saturday</div>
            <div className="week-day">Sunday</div>
            <div className="number">1</div>
            <div className="number">2</div>
            <div className="number">3</div>
            <div className="number">4</div>
            <div className="number">5</div>
            <div className="number">6</div>
            <div className="number">7</div>
            <div className="number">8</div>
            <div className="number">9</div>
            <div className="number">10</div>
            <div className="number">11</div>
            <div className="number">12</div>
            <div className="number">13</div>
            <div className="number">14</div>
            <div className="number">15</div>
            <div className="number">16</div>
            <div className="number">17</div>
            <div className="number">18</div>
            <div className="number">19</div>
            <div className="number">20</div>
            <div className="number">21</div>
            <div className="number">22</div>
            <div className="number">23</div>
            <div className="number">24</div>
            <div className="number">25</div>
            <div className="number">26</div>
            <div className="number">27</div>
            <div className="number">28</div>
            <div className="number">29</div>
            <div className="number">30</div>
            <div className="number">31</div>
            <div className="number">32</div>
            <div className="number">33</div>
            <div className="number">34</div>
            <div className="number">35</div>
          </div>
        </div>
    </div>
  );
};

export default HomePage;