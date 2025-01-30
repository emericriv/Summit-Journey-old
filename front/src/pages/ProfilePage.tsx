import React, { useEffect, useState } from "react";
import SessionHistory from "../components/SessionHistory";
import PersonnalInformations from "../components/PersonnalInformations";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import MaterialInfoComponent from "../components/MaterialInfoComponent";
import PlannedSessionList from "../components/PlannedSessionList";
import { getPlannedSessions } from "../services/apiServices";
import { PlannedClimbingSession } from "../models/PlannedClimbingSession";

const ProfilePage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!user) {
    return <p>Chargement...</p>;
  }

  const [sessions, setSessions] = useState<PlannedClimbingSession[]>([]);

  // Récupération des sessions depuis l'API
  useEffect(() => {
    getPlannedSessions().then((data) => {
      setSessions(data);
    });
    console.log("sessions", sessions.length);
  }, []);

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
        <h3>Sessions planifiées</h3>
        <PlannedSessionList
          PlannedSessions={sessions}
          setPlannedSessions={setSessions}
          SessionsToDisplay={2}
          CompactDisplay={true}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
