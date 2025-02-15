import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4 text-center">Welcome to the Job Portal</h1>
      <p className="text-lg text-gray-700 mb-8 text-center">
        Find your dream job or the perfect candidate.
      </p>

      <div className="flex justify-center space-x-4">
        <Link
          to="/post-job" // You'll need to create this route
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Post a Job
        </Link>
        <Link
          to="/search-jobs" // You'll need to create this route
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Search for Jobs
        </Link>
      </div>

      {/*  More visually appealing content (e.g., featured jobs, testimonials) could go here */}
    </div>
  );
}

export default Home;