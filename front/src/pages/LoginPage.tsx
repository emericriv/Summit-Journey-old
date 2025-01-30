import React from "react";
import LoginComponent from "../components/LoginComponent";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Navigate to="/profile" />
  ) : (
    <div className="hero-banner d-flex flex-column align-items-center justify-content-evenly">
      <div className="row global-appearance welcome">
        <h1>Bienvenue sur Summit Journey</h1>
        <p>Votre compagnon pour suivre vos aventures de grimpe !</p>
      </div>
      <LoginComponent />
    </div>
  );
};

export default LoginPage;
