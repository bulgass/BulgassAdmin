import { useState } from 'react';
import { Link } from 'react-router-dom'; 
import './sidebar.css';
import logo from "../../../assets/logo.png";
import BulgassLogo from "../../../assets/bulgass.png"




const Sidebar = () => {
  const [open, setOpen] = useState(true);

  const Menus = [
    { title: 'Login', path:'/login', src: logo },
    { title: 'Signup', path:'/signup', src: logo },

  ];

  return (
    <div className={`sidebar ${open ? 'open' : 'closed'}`}>
      <img
        src=".//"
        className={`toggle-btn ${!open ? 'rotate-180' : ''}`}
        onClick={() => setOpen(!open)}
        alt="Toggle"
      />
      <div className="header">
        <img
          src={BulgassLogo}
          className={`smiley-icon ${open ? 'rotate' : ''}`} width={60}
          alt="Logo"
        />
        <h1 className={`title ${!open ? 'hidden' : ''}`}>Bulgass</h1>
      </div>
      <ul className="menu-list">
        {Menus.map((Menu, index) => (
          <Link to={Menu.path} className="menu-link"> 
          <li
            key={index}
            className={`menu-item ${Menu.gap ? 'gap' : ''} ${index === 0 ? 'active' : ''}`}
          >
              <img src={`${Menu.src}`} alt={Menu.title} width={30}/>
              <span className={`menu-title ${!open ? 'hidden' : ''}`}>{Menu.title}</span>
          </li>
            </Link>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;