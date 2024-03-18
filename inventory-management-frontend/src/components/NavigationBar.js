import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../styles/components/_navbar_modified.scss'

const NavigationBar = () => {
  const handleLogout = () => {
    // Implement logout functionality
    // For example, clear user data from state or local storage
    toast.info('You have been logged out.');
  };

  return (
    <nav className="navbar">
    <div className="navbar-container">
      <Link to="/" className="navbar-logo">IMS</Link>
      <ul className="nav-menu">
        <li className="nav-item">
          <Link to="/" className="nav-links">Products</Link>
        </li>
        <li className="nav-item">
            <Link to="/sales" className="nav-links">Sales</Link>
          </li>
          <li className="nav-item">
            <Link to="/stock" className="nav-links">Stock Dashboard</Link>
          </li>
        <li className="nav-item">
          <button onClick={handleLogout} className="nav-links btn-logout">Logout</button>
        </li>
      </ul>
    </div>
  </nav>
  );
};

export default NavigationBar;
