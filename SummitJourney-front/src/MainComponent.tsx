import React from "react";
import Header from "./components/header";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NewSessionPage from "./pages/NewSessionPage";
import LocationsPage from "./pages/LocationsPage";
import ProfilePage from "./pages/ProfilePage";
import Footer from "./components/footer";

const MainComponent: React.FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/session" element={<NewSessionPage />} />
        <Route path="/locations" element={<LocationsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default MainComponent;
