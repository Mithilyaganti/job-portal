import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      © {new Date().getFullYear()} Job Portal. All rights reserved.
    </footer>
  );
}

export default Footer;