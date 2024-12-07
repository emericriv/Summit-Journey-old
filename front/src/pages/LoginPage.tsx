import React from "react";
import LoginComponent from "../components/LoginComponent";
import SignUpComponent from "../components/SignUpComponent";

const LoginPage: React.FC = () => {
  return (
    <div className="hero-banner d-flex align-items-center justify-content-evenly">
      <LoginComponent />
      <div className="separator"></div>
      <SignUpComponent />
    </div>
  );
};

export default LoginPage;
