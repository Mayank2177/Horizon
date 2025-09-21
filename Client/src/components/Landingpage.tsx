// src/components/Landingpage.tsx
import React from 'react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import './landingpage.css';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <Header />

      <div className="content">
        <div className="title">
          <h2>AI-Powered Personalized Career and Skills Advisor</h2>
          <p id="para">
            An AI-powered career advisor that maps student skills, recommends personalized career paths, 
            and bridges skill gaps. Our solution prepares students for the evolving job market with data-driven guidance.
          </p>
          <div className="btn">
            <button className="button" onClick={() => navigate('/survey')}>
              <span id="ah">Get Started</span>
            </button>
          </div>
        </div>
        <div className="img">
          <img src="/IMG.jpg" alt="AI Career Mentor" width="720" height="480" />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
