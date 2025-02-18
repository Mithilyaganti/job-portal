// StudentProfile.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function StudentProfile() {
  return (
    <div className="container py-5" style={{ background: 'linear-gradient(to right, #00c6ff, #0072ff)', minHeight: '100vh' }}>
      <header className="text-center text-white mb-5">
        <h1 className="display-3">Welcome to Your Student Profile</h1>
        <p className="lead">Explore your personalized dashboard with job postings, interviews, hackathons, mock tests, and much more!</p>
      </header>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {/* Student Details Card */}
        <div className="col">
          <div className="card shadow-lg border-light rounded">
            <div className="card-body">
              <h2 className="card-title text-primary">Student Details</h2>
              <p className="card-text text-muted">View and update your personal details, educational background, and contact information.</p>
              <Link to="./student/profile" className="btn btn-warning">View Details</Link>
            </div>
          </div>
        </div>

        {/* Job Postings Card */}
        <div className="col">
          <div className="card shadow-lg border-light rounded">
            <div className="card-body">
              <h2 className="card-title text-primary">Job Postings</h2>
              <p className="card-text text-muted">Explore a variety of job postings from top companies and apply to the roles you're interested in.</p>
              <Link to="./student/jobs" className="btn btn-warning">View Job Postings</Link>
            </div>
          </div>
        </div>

        {/* Virtual Interviews Card */}
        <div className="col">
          <div className="card shadow-lg border-light rounded">
            <div className="card-body">
              <h2 className="card-title text-primary">Virtual Interviews</h2>
              <p className="card-text text-muted">Prepare and attend virtual interviews hosted by companies looking for your skills.</p>
              <Link to="./student/interviews" className="btn btn-warning">Join Virtual Interviews</Link>
            </div>
          </div>
        </div>

        {/* Hackathons Card */}
        <div className="col">
          <div className="card shadow-lg border-light rounded">
            <div className="card-body">
              <h2 className="card-title text-primary">Hackathons</h2>
              <p className="card-text text-muted">Showcase your skills and creativity in upcoming hackathons. Compete and win exciting rewards!</p>
              <Link to="./student/hackathons" className="btn btn-warning">View Hackathons</Link>
            </div>
          </div>
        </div>

        {/* Mock Tests Card */}
        <div className="col">
          <div className="card shadow-lg border-light rounded">
            <div className="card-body">
              <h2 className="card-title text-primary">Mock Tests</h2>
              <p className="card-text text-muted">Test your skills and prepare for real-world challenges with mock tests tailored to your field.</p>
              <Link to="./student/mocktests" className="btn btn-warning">Start Mock Tests</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentProfile;