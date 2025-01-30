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
import PlannedSessionsPage from "./pages/PlannedSessionPage";
import SignUpPage from "./pages/SignUpPage";

const MainComponent: React.FC = () => {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
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
          path="/planned-sessions"
          element={<ProtectedRoute element={<PlannedSessionsPage />} />}
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
        <Route path="/register" element={<SignUpPage />} />
      </Routes>
      <Footer />
    </AuthProvider>
  );
};

export default MainComponent;
