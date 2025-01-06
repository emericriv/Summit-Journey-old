import React from "react";
import SessionHistory from "../components/SessionHistory";
import PersonnalInformations from "../components/PersonnalInformations";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import MaterialInfoComponent from "../components/MaterialInfoComponent";

const ProfilePage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!user) {
    return <p>Chargement...</p>;
  }

  return (
    <div className="hero-banner profile-grid">
      <div className="personnal-informations grid-card global-appearance">
        <PersonnalInformations />
      </div>
      <div className="session-history grid-card flex-card global-appearance">
        <h3>Historique des sessions</h3>
        <SessionHistory numberOfSessions={2} />
      </div>
      <div className="equipments grid-card global-appearance">
        <MaterialInfoComponent />
      </div>
      <div className="grid-card global-appearance">
        <h3>Potentiel nouvel élément</h3>
        <p>A venir</p>
      </div>
    </div>
  );
};

export default ProfilePage;
