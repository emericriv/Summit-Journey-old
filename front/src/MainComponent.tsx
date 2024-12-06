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
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

const MainComponent: React.FC = () => {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/session"
          element={<ProtectedRoute element={<NewSessionPage />} />}
        />
        <Route path="/locations" element={<LocationsPage />} />
        <Route
          path="/profile"
          element={<ProtectedRoute element={<ProfilePage />} />}
        />
        <Route
          path="/edit-session/:id"
          element={<ProtectedRoute element={<EditSessionPage />} />}
        />
        <Route
          path="/all-sessions"
          element={<ProtectedRoute element={<AllSessionPage />} />}
        />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer />
    </AuthProvider>
  );
};

export default MainComponent;
