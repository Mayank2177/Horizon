// src/components/ProfilePage.tsx
import React, { useState, useEffect, useRef } from 'react';
import './profilepage.css';

// Define user data type
interface UserProfile {
  name: string;
  displayName: string;
  age?: string;
  dob?: string;
  grade: string;
  language?: string;
  school?: string;
  email: string;
  avatar: string;
  subjects: string[];
  goals: Array<{ type: string; text: string }>;
  topics: string[];
  streak: number;
}

const ProfilePage: React.FC = () => {
  // Default profile data (will be replaced by survey data later)
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Emma Rose Johnson',
    displayName: 'Emma',
    age: '13',
    dob: '2011-03-15',
    grade: '7th Grade',
    language: 'English',
    school: 'Riverside Middle School',
    email: 'parent@email.com',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Emma',
    subjects: ['Mathematics', 'Science', 'English', 'History', 'Art', 'Music'],
    goals: [
      { type: 'Short-term', text: 'Master multiplication tables up to 12x12' },
      { type: 'Short-term', text: 'Improve reading comprehension scores' },
      { type: 'Long-term', text: 'Prepare for Science Olympiad competition' },
      { type: 'Long-term', text: 'Achieve Honor Roll status' },
    ],
    topics: [
      'Fractions & Decimals', 'Photosynthesis', 'American Revolution', 'Creative Writing',
      'Geometry Basics', 'Solar System', 'Poetry Analysis', 'World War II',
      'Algebra Introduction', 'Cell Biology', 'Essay Writing', 'Ancient Civilizations'
    ],
    streak: 12,
  });
  
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('userProfile');
    if (saved) {
      const savedProfileData = JSON.parse(saved);
      // Construct a new, clean profile from survey data to avoid mixing with the placeholder
      const newProfile: UserProfile = {
        // Fields from survey
        name: savedProfileData.name || '',
        displayName: savedProfileData.displayName || 'User',
        email: savedProfileData.email || '',
        grade: savedProfileData.grade || 'Beginner',
        subjects: savedProfileData.subjects || [],
        goals: savedProfileData.goals || [],
        topics: savedProfileData.topics || [],
        streak: savedProfileData.streak || 0,
        // Fields not from survey - provide sensible defaults
        avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${savedProfileData.displayName || 'User'}`,
        language: 'English',
        // Optional fields are left empty as they were not collected
        age: '',
        dob: '',
        school: '',
      };
      setProfile(newProfile);
    }
  }, []);

  // Handle avatar change
  const changeAvatar = (url: string) => {
    setProfile(prev => ({ ...prev, avatar: url }));

    // Use ref for imperative animation as a React-friendly approach
    if (avatarRef.current) {
      avatarRef.current.style.transform = 'scale(0.9)';
      setTimeout(() => {
        if (avatarRef.current) avatarRef.current.style.transform = 'scale(1)';
      }, 150);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar" id="mainAvatar" ref={avatarRef}>
          <img src={profile.avatar} alt="Profile Avatar" id="avatarImg" />
        </div>

        <div className="avatar-selector">
          {['Emma', 'Alex', 'Sam', 'Taylor', 'Jordan'].map(seed => (
            <div
              key={seed}
              className={`avatar-option ${profile.avatar.includes(seed) ? 'active' : ''}`}
              onClick={() => changeAvatar(`https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}`)}
            >
              <img src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}`} alt={`Avatar ${seed}`} />
            </div>
          ))}
        </div>

        <h1 className="profile-name">{profile.displayName}</h1>
        <p className="profile-subtitle">{profile.grade} • Lifelong Learner</p>
      </div>

      <div className="profile-content">
        {/* Basic Info */}
        <div className="section">
          <h2 className="section-title">📋 Basic Information</h2>
          <div className="info-item">
            <span className="info-label">Full Name</span>
            <span className="info-value">{profile.name || 'Not Provided'}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Display Name</span>
            <span className="info-value">{profile.displayName || 'Not Provided'}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Age</span>
            <span className="info-value">{profile.age || 'Not Provided'}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Date of Birth</span>
            <span className="info-value">{profile.dob || 'Not Provided'}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Grade Level</span>
            <span className="info-value">{profile.grade || 'Not Provided'}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Preferred Language</span>
            <span className="info-value">{profile.language || 'Not Provided'}</span>
          </div>
          <div className="info-item">
            <span className="info-label">School</span>
            <span className="info-value">{profile.school || 'Not Provided'}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Guardian Email</span>
            <span className="info-value">{profile.email}</span>
          </div>
          <button className="edit-btn">Edit Profile</button>
        </div>

        {/* Academic Preferences */}
        <div className="section">
          <h2 className="section-title">📚 Academic Preferences</h2>
          <h3 style={{ marginBottom: '10px', color: '#555' }}>Subjects of Interest</h3>
          <div className="subjects-grid">
            {profile.subjects.map((subject, idx) => (
              <div className="subject-tag" key={idx}>{subject}</div>
            ))}
          </div>

          <h3 style={{ margin: '25px 0 10px', color: '#555' }}>Learning Goals</h3>
          <div className="goals-list">
            {profile.goals.map((goal, idx) => (
              <div className="goal-item" key={idx}>
                <div className="goal-type">{goal.type}</div>
                <div>{goal.text}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress & Badges */}
        <div className="section progress-section">
          <h2 className="section-title">📈 Progress Tracking</h2>
          <div className="streak-counter">
            <div className="streak-number">{profile.streak}</div>
            <div>Days Learning Streak! 🔥</div>
            <p style={{ marginTop: '10px', opacity: 0.9 }}>Keep it up! You're doing amazing!</p>
          </div>

          <h3 style={{ marginBottom: '15px', color: '#555' }}>Achievements & Badges</h3>
          <div className="badges-container">
            {[
              { icon: '🧮', name: 'Math Master', desc: 'Completed 50+ math problems' },
              { icon: '📚', name: 'Reading Star', desc: 'Read 10 books this month' },
              { icon: '✍️', name: 'Grammar Guru', desc: 'Perfect grammar test scores' },
              { icon: '🔬', name: 'Science Explorer', desc: 'Completed 5 experiments' },
              { icon: '🎯', name: 'Goal Achiever', desc: 'Reached 3 learning goals' },
              { icon: '⚡', name: 'Speed Learner', desc: 'Quick problem solver' },
            ].map((badge, idx) => (
              <div className="badge" key={idx}>
                <div className="badge-icon">{badge.icon}</div>
                <div className="badge-name">{badge.name}</div>
                <div className="badge-desc">{badge.desc}</div>
              </div>
            ))}
          </div>

          <div className="topics-covered">
            <h3 style={{ marginBottom: '10px', color: '#555' }}>Topics Covered So Far</h3>
            <div className="topics-list">
              {profile.topics.map((topic, idx) => (
                <div className="topic-item" key={idx}>{topic}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
