import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import RegisterForm from "./components/Register";
import Login from "./components/Login";
import RootLayout from "./components/RootLayout";
import StudentProfile from "./components/StudentProfile";
import CompanyProfile from "./components/CompanyProfile"; // ✅ Import Correctly

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "register", element: <RegisterForm /> },
      { path: "login", element: <Login /> },
      { path: "studentprofile", element: <StudentProfile /> },
      { path: "companyprofile", element: <CompanyProfile /> }, // ✅ Corrected
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
