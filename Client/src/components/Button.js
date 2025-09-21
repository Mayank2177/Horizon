// components/LandingPage.js
import React, { useState } from 'react';
import Header from './Header';
import './Landingpage.css';

const LandingPage = () => {
  const [showSurvey, setShowSurvey] = useState(false);

  const handleGetStarted = () => {
    setShowSurvey(true);
  };

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
            <button className="button" onClick={handleGetStarted}>
              <a href="#survey" id="ah">Get Started</a>
            </button>
          </div>
        </div>

        <div className="img">
          <img src="ai-page.jpg" alt="AI Career Mentor" width="720" height="480" />
        </div>
      </div>

      {/* Popup Survey - Simplified Modal */}
      {showSurvey && (
        <div className="survey-popup">
          <div className="popup-content">
            <h3>Welcome! Let's personalize your journey.</h3>
            <form>
              <label>
                Name: <input type="text" required />
              </label>
              <label>
                Skills (comma-separated): <input type="text" placeholder="e.g., JavaScript, Design" />
              </label>
              <label>
                Career Interest: 
                <select>
                  <option>Web Development</option>
                  <option>Data Science</option>
                  <option>UX Design</option>
                  <option>AI/ML</option>
                </select>
              </label>
              <button type="submit">Submit</button>
              <button type="button" onClick={() => setShowSurvey(false)}>Close</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
