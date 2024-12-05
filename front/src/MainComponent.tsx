import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NewSessionPage from "./pages/NewSessionPage";
import LocationsPage from "./pages/LocationsPage";
import ProfilePage from "./pages/ProfilePage";
import Footer from "./components/footer";
import Navbar from "./components/Navbar";
import EditSessionPage from "./pages/EditSessionPage";
import AllSessionPage from "./pages/AllSessionsPage";
import LoginPage from "./pages/LoginPage";

const MainComponent: React.FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/session" element={<NewSessionPage />} />
        {/* <Route path="/session/:id" element={<SessionPage />} /> */}
        <Route path="/locations" element={<LocationsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/edit-session/:id" element={<EditSessionPage />} />
        <Route path="/all-sessions" element={<AllSessionPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default MainComponent;
