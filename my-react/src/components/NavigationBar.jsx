import React from 'react';
import { Link } from 'react-router-dom';

function NavigationBar() {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Job Portal
        </Link>
        <div>
          <Link to="/login" className="mr-4 hover:text-gray-300">
            Login
          </Link>
          <Link to="/register" className="hover:text-gray-300">
            Register
          </Link>
          {/* Add conditional rendering for logged-in user (e.g., profile link) */}
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;