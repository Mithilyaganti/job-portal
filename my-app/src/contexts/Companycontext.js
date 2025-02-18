import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const CompanyContext = createContext();

export const useCompany = () => {
  return useContext(CompanyContext);
};

export const CompanyProvider = ({ children }) => {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token'); // Get token from local storage

  // Fetch company profile data from backend
  const fetchCompanyProfile = async () => {
    try {
      const response = await axios.get('http://localhost:4000/company/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setCompany(response.data);
    } catch (error) {
      console.error("Error fetching company profile:", error);
    } finally {
      setLoading(false);
    }
  };

  // Call fetchCompanyProfile when component mounts
  useEffect(() => {
    if (token) {
      fetchCompanyProfile();
    } else {
      setLoading(false);
    }
  }, [token]);

  return (
    <CompanyContext.Provider value={{ company, setCompany, loading, fetchCompanyProfile }}>
      {children}
    </CompanyContext.Provider>
  );
};
