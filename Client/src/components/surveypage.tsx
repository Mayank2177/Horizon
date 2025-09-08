// src/components/SurveyPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './surveypage.css';

// Define the form data type
interface FormData {
  fullName: string;
  email: string;
  location: string;
  role: string;
  experience: string;
  skills: string[];
  aiProficiency: string;
  aiTools: string[];
  languages: string;
  hasProjects: string;
  projectDescription: string;
  clientWork: string;
  interests: string[];
  learningStyle: string;
}

const SurveyPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    location: '',
    role: '',
    experience: '',
    skills: [],
    aiProficiency: '',
    aiTools: [],
    languages: '',
    hasProjects: '',
    projectDescription: '',
    clientWork: '',
    interests: [],
    learningStyle: '',
  });

  const [progress, setProgress] = useState<number>(0);

  // Calculate progress based on required fields
  useEffect(() => {
    const requiredFields: (keyof FormData)[] = ['fullName', 'email', 'location'];
    const filledRequired = requiredFields.filter(
      field => formData[field] && (Array.isArray(formData[field]) ? formData[field].length > 0 : formData[field].toString().trim() !== '')
    );
    setProgress((filledRequired.length / requiredFields.length) * 100);
  }, [formData]);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData(prev => {
        const list = prev[name as keyof FormData];
        if (Array.isArray(list)) {
          if (checked) {
            return { ...prev, [name]: [...list, value] };
          }
          return { ...prev, [name]: list.filter(item => item !== value) };
        }
        return prev;
      });
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Inside SurveyPage.tsx - update handleSubmit
  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  console.log('Survey Data:', formData);

  // Save to localStorage (or Context/Redux)
  localStorage.setItem('userProfile', JSON.stringify({
    name: formData.fullName,
    displayName: formData.fullName.split(' ')[0] || 'User',
    email: formData.email,
    grade: formData.experience ? `${formData.experience} years exp` : 'Beginner',
    subjects: formData.skills,
    goals: [
      { type: 'Short-term', text: 'Start learning recommended skills' },
      { type: 'Long-term', text: 'Land dream job in AI/ML' }
    ],
    topics: formData.interests,
    streak: 1,
  }));

  // Navigate to profile
  navigate('/profile');
  };
  return (
    <div className="survey-container">
      <div className="header">
        <h1>Technical Skills & Experience Assessment</h1>
        <p>Help us understand your background and expertise</p>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <form className="form-container" onSubmit={handleSubmit}>
        {/* Basic Info */}
        <div className="section">
          <h2 className="section-title">🔍 Basic Info</h2>
          <div className="form-group">
            <label htmlFor="fullName">
              1. Full Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">
              2. Email Address <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">
              3. Current Location (City/Country) <span className="required">*</span>
            </label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="e.g., Mumbai, India"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">4. Current Role or Title</label>
            <input
              type="text"
              id="role"
              name="role"
              placeholder="e.g., Software Developer, Student, Data Analyst"
              value={formData.role}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="experience">5. Years of Experience</label>
            <select
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
            >
              <option value="">Select experience level</option>
              <option value="0-1">0-1 years (Entry level)</option>
              <option value="2-3">2-3 years</option>
              <option value="4-5">4-5 years</option>
              <option value="6-10">6-10 years</option>
              <option value="10+">10+ years</option>
            </select>
          </div>
        </div>

        {/* Skill Assessment */}
        <div className="section">
          <h2 className="section-title">🧠 Skill Assessment</h2>
          <div className="form-group">
            <label>6. What are your core technical skills?</label>
            <div className="hint">Select all that apply</div>
            <div className="checkbox-group">
              {(['Python', 'SQL', 'React', 'Machine Learning', 'UI/UX', 'JavaScript', 'Java', 'Node.js'] as const).map(skill => (
                <div className="checkbox-item" key={skill}>
                  <input
                    type="checkbox"
                    id={skill.toLowerCase().replace(/\s+/g, '')}
                    name="skills"
                    value={skill}
                    checked={formData.skills.includes(skill)}
                    onChange={handleChange}
                  />
                  <label htmlFor={skill.toLowerCase().replace(/\s+/g, '')}>{skill}</label>
                </div>
              ))}
            </div>
            <input
              type="text"
              placeholder="Other skills (comma separated)"
              style={{ marginTop: '10px' }}
            />
          </div>

          <div className="form-group">
            <label>7. Rate your proficiency in AI/ML/Data Science</label>
            <div className="radio-group">
              {(['Beginner', 'Intermediate', 'Advanced'] as const).map(level => (
                <div className="radio-item" key={level}>
                  <input
                    type="radio"
                    id={level.toLowerCase()}
                    name="aiProficiency"
                    value={level}
                    checked={formData.aiProficiency === level}
                    onChange={handleChange}
                  />
                  <label htmlFor={level.toLowerCase()}>{level}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>8. Are you familiar with any AI tools/frameworks?</label>
            <div className="hint">Select all that apply</div>
            <div className="checkbox-group">
              {(['TensorFlow', 'PyTorch', 'HuggingFace', 'LangChain', 'OpenAI API', 'Pandas'] as const).map(tool => (
                <div className="checkbox-item" key={tool}>
                  <input
                    type="checkbox"
                    id={tool.toLowerCase().replace(/\s+/g, '')}
                    name="aiTools"
                    value={tool}
                    checked={formData.aiTools.includes(tool)}
                    onChange={handleChange}
                  />
                  <label htmlFor={tool.toLowerCase().replace(/\s+/g, '')}>{tool}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="languages">9. Which programming languages are you comfortable with?</label>
            <textarea
              id="languages"
              name="languages"
              placeholder="e.g., Python, JavaScript, Java, C++, R, etc."
              value={formData.languages}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Project Experience */}
        <div className="section">
          <h2 className="section-title">🛠 Project Experience</h2>
          <div className="form-group">
            <label>10. Have you worked on any real-world projects or internships?</label>
            <div className="radio-group">
              {(['Yes', 'No'] as const).map(option => (
                <div className="radio-item" key={option}>
                  <input
                    type="radio"
                    id={`projects${option}`}
                    name="hasProjects"
                    value={option}
                    checked={formData.hasProjects === option}
                    onChange={handleChange}
                  />
                  <label htmlFor={`projects${option}`}>{option}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="projectDescription">11. If yes, briefly describe one recent project</label>
            <div className="hint">Focus on: project focus, tech stack used, and outcome</div>
            <textarea
              id="projectDescription"
              name="projectDescription"
              placeholder="Describe your project, the technologies you used, and what you achieved..."
              value={formData.projectDescription}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>12. Are you comfortable working on live client projects or hackathons?</label>
            <div className="radio-group">
              {(['Yes', 'No', 'Maybe'] as const).map(option => (
                <div className="radio-item" key={option}>
                  <input
                    type="radio"
                    id={`client${option}`}
                    name="clientWork"
                    value={option}
                    checked={formData.clientWork === option}
                    onChange={handleChange}
                  />
                  <label htmlFor={`client${option}`}>{option}</label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Learning & Interests */}
        <div className="section">
          <h2 className="section-title">📚 Learning & Interests</h2>
          <div className="form-group">
            <label>13. What topics are you most interested in learning right now?</label>
            <div className="hint">Select all that apply</div>
            <div className="checkbox-group">
              {(['GenAI', 'Healthcare AI', 'Web Development', 'Cloud Computing', 'Mobile Development', 'Blockchain'] as const).map(topic => (
                <div className="checkbox-item" key={topic}>
                  <input
                    type="checkbox"
                    id={topic.toLowerCase().replace(/\s+/g, '')}
                    name="interests"
                    value={topic}
                    checked={formData.interests.includes(topic)}
                    onChange={handleChange}
                  />
                  <label htmlFor={topic.toLowerCase().replace(/\s+/g, '')}>{topic}</label>
                </div>
              ))}
            </div>
            <input
              type="text"
              placeholder="Other interests (comma separated)"
              style={{ marginTop: '10px' }}
            />
          </div>

          <div className="form-group">
            <label>14. Preferred learning style?</label>
            <div className="radio-group">
              {(['Videos', 'Reading', 'Hands-on projects', 'Live sessions'] as const).map(style => (
                <div className="radio-item" key={style}>
                  <input
                    type="radio"
                    id={style.toLowerCase().replace(/\s+/g, '')}
                    name="learningStyle"
                    value={style}
                    checked={formData.learningStyle === style}
                    onChange={handleChange}
                  />
                  <label htmlFor={style.toLowerCase().replace(/\s+/g, '')}>{style}</label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Submit Assessment
        </button>
      </form>
    </div>
  );
};

export default SurveyPage;
