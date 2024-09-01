import { useState } from 'react';
import './sidebar.css'; 

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: 'Overview', src: 'Overview' },
    { title: 'Transactions', src: 'Transactions' },
    { title: 'Loyalty Cards', src: 'Card', gap: true },
    { title: 'Subscriptions', src: 'Calendar' },
    { title: 'Debts', src: 'Debt' },
    { title: 'Legal information', src: 'Legal' },
    { title: 'Notifications', src: 'Notifications', gap: true },
    { title: 'Setting', src: 'Settings' },
  ];

  return (
    <div className="sidebar">
      <div className={`sidebar-container ${open ? 'open' : 'closed'}`}>
        <img
          src="/assets/control.png"
          className={`toggle-btn ${!open && 'rotate-180'}`}
          onClick={() => setOpen(!open)}
          alt="Toggle"
        />
        <div className="header">
          <img
            src="/assets/smiley.svg"
            className={`smiley-icon ${open && 'rotate'}`}
            alt="Logo"
          />
          <h1 className={`title ${!open && 'hidden'}`}>AdeCodes</h1>
        </div>
        <ul className="menu-list">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`menu-item ${Menu.gap ? 'gap' : ''} ${index === 0 && 'active'}`}
            >
              <img src={`/assets/${Menu.src}.svg`} alt={Menu.title} />
              <span className={`menu-title ${!open && 'hidden'}`}>{Menu.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;