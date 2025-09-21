// src/components/Header.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Use Link for SPA navigation
import './Header.css';

const Header: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0); // 0 = Home, 1 = About, etc.

  // Tab labels and routes
  const tabs = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Alert', path: '/alert' },
    { label: 'Contact', path: '/contact' },
    { label: 'Trends', path: '/trends' },
  ];

  return (
    <header className="header">
      <h1>Welcome To Career Mentor</h1>

      <nav
        id="navigate"
        onMouseLeave={() => setActiveTab(-1)} // Reset highlight when mouse leaves
      >
        {tabs.map((tab, index) => (
          <Link
            key={tab.path}
            to={tab.path}
            onMouseEnter={() => setActiveTab(index)}
            className="nav-link"
          >
            {tab.label}
          </Link>
        ))}
        {/* Sliding highlight */}
        <span
          className="slider"
          style={{
            transform: `translateX(${activeTab * 100 + 15}px)`, // 100px per tab + 15px offset
            transition: 'transform 0.3s ease',
          }}
        />
      </nav>
    </header>
  );
};

export default Header;
