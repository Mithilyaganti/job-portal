import React from 'react';
import NavigationBar from './NavigationBar';
import Footer from './Footer';

function RootLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <NavigationBar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}

export default RootLayout;