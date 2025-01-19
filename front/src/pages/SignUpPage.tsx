import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import SignUpComponent from "../components/SignUpComponent";

const LoginPage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Navigate to="/profile" />
  ) : (
    <div className="hero-banner d-flex align-items-center justify-content-evenly">
      <SignUpComponent />
    </div>
  );
};

export default LoginPage;
