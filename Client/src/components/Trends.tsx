import React from "react";
import Header from './Header';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from "recharts";
import { TrendingUp, Briefcase, Lightbulb } from "lucide-react";
import "./trends.css";

const skillTrends = [
  { year: "2020", AI: 40, WebDev: 60, DataScience: 30 },
  { year: "2021", AI: 55, WebDev: 70, DataScience: 50 },
  { year: "2022", AI: 70, WebDev: 75, DataScience: 65 },
  { year: "2023", AI: 85, WebDev: 80, DataScience: 75 },
  { year: "2024", AI: 95, WebDev: 85, DataScience: 90 },
];

const demandTrends = [
  { skill: "AI/ML", demand: 95 },
  { skill: "Web Dev", demand: 80 },
  { skill: "Cloud", demand: 75 },
  { skill: "Cybersecurity", demand: 70 },
  { skill: "Blockchain", demand: 60 },
];

const COLORS = ["#6a11cb", "#2575fc", "#ff6f61", "#28a745", "#ffc107"];

const Trends: React.FC = () => {
  return (
    <>
      <Header />
      <div className="trends-container">
        <h1>Career & Skill Trends 📊</h1>
        <p className="subtitle">
          Explore the latest insights into career growth, skill demand, and emerging opportunities.
        </p>

        {/* Insight Highlights */}
        <div className="insights-grid">
          <div className="insight-card">
            <TrendingUp className="icon" />
            <h3>Fastest Growing Skill</h3>
            <p>AI/ML dominates 2024 with a <strong>95% demand rate</strong>, leading innovation across industries.</p>
          </div>
          <div className="insight-card">
            <Briefcase className="icon" />
            <h3>Career Hotspot</h3>
            <p>Web Development remains highly relevant with <strong>80% demand</strong>, ensuring long-term opportunities.</p>
          </div>
          <div className="insight-card">
            <Lightbulb className="icon" />
            <h3>Emerging Tech</h3>
            <p>Cloud, Cybersecurity, and Blockchain continue to grow steadily, shaping the future digital economy.</p>
          </div>
        </div>

        {/* Line Chart: Skill Growth */}
        <div className="chart-card">
          <h2>Skill Growth Over Years</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={skillTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="AI" stroke="#6a11cb" strokeWidth={3} />
              <Line type="monotone" dataKey="WebDev" stroke="#2575fc" strokeWidth={3} />
              <Line type="monotone" dataKey="DataScience" stroke="#ff6f61" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart: Demand Trends */}
        <div className="chart-card">
          <h2>Top In-Demand Skills</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={demandTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="skill" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="demand" fill="#2575fc" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart: Market Share */}
        <div className="chart-card">
          <h2>Skill Market Share</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={demandTrends}
                dataKey="demand"
                nameKey="skill"
                outerRadius={120}
                label
              >
                {demandTrends.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Career Advice Section */}
        <div className="career-advice">
          <h2>💡 Career Advice</h2>
          <ul>
            <li><strong>AI/ML:</strong> Focus on Python, TensorFlow, and real-world projects.</li>
            <li><strong>Web Dev:</strong> Master React, Next.js, and full-stack deployment.</li>
            <li><strong>Cybersecurity:</strong> Gain certifications like CEH, CompTIA Security+.</li>
            <li><strong>Blockchain:</strong> Learn Solidity and smart contract development.</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Trends;
