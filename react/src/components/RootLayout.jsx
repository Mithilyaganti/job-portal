import React from "react";
import NavigationBar from "./NavigationBar"; // ✅ Ensure correct import
import Footer from "./Footer"; // ✅ Ensure correct import
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <div>
      <NavigationBar />
      <div style={{ minHeight: "80vh" }}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default RootLayout;
