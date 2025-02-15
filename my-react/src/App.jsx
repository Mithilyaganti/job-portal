import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import RootLayout from './components/RootLayout';
import CompanyProfile from './components/CompanyProfile';
import StudentProfile from './components/StudentProfile';
// import other components

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout><Home /></RootLayout>} />
        <Route path="/login" element={<RootLayout><Login /></RootLayout>} />
        <Route path="/register" element={<RootLayout><Register /></RootLayout>} />
        <Route path="/company-profile" element={<RootLayout><CompanyProfile/></RootLayout>}/>
        <Route path='/student-profile' element={<RootLayout><StudentProfile/></RootLayout>}/>
        {/* Add routes for /post-job, /search-jobs, and other pages */}
      </Routes>
    </Router>
  );
}

export default App;