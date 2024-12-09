import React from "react";
import LoginComponent from "../components/LoginComponent";
import SignUpComponent from "../components/SignUpComponent";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? (
    <Navigate to="/profile" />
  ) : (
    <div className="hero-banner d-flex align-items-center justify-content-evenly">
      <LoginComponent />
      <div className="separator"></div>
      <SignUpComponent />
    </div>
  );
};

export default LoginPage;
