// PlannedSessionsPage.tsx
import { useState, useEffect } from "react";
import { PlannedClimbingSession } from "../models/PlannedClimbingSession";
import PlannedSessionForm from "../components/PlannedSessionForm";
import PlannedSessionList from "../components/PlannedSessionList";
import CalendarView from "../components/CalendarView";
import {
  createPlannedSession,
  getPlannedSessions,
} from "../services/apiServices";

const PlannedSessionsPage = () => {
  const [sessions, setSessions] = useState<PlannedClimbingSession[]>([]);

  // Récupération des sessions depuis l'API
  useEffect(() => {
    getPlannedSessions().then((data) => {
      setSessions(data);
    });
  }, []);

  // Fonction pour soumettre une nouvelle session
  const handleNewSession = async (data: PlannedClimbingSession) => {
    try {
      const payload: PlannedClimbingSession = {
        startTime: data.startTime,
        location: data.location,
        isCompleted: false, // Assuming a default value for isCompleted
      };
      const response = await createPlannedSession(payload);
      if (response) {
        console.log("Session ajoutée:", response);
        setSessions((prevSessions) => [...prevSessions, response]); // Mise à jour locale
      } else {
        alert("Erreur lors de l'ajout de la session");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="hero-banner">
      <div className="planned-sessions-grid">
        {/* Formulaire pour ajouter une nouvelle session */}
        <div className="plannning-session-form grid-card global-appearance d-flex flex-column">
          <h2 style={{ margin: 0, alignSelf: "center" }}>
            📝 Planifier une session
          </h2>
          <PlannedSessionForm onSubmit={handleNewSession} />
        </div>

        {/* Vue Calendrier */}
        <div className="calendar-view grid-card global-appearance">
          <h2>📅 Calendrier des sessions</h2>
          <CalendarView sessions={sessions} />
        </div>

        {/* Liste des sessions existantes */}
        <div className="planned-sessions-list grid-card global-appearance">
          <h2>📋 Sessions planifiées</h2>
          <PlannedSessionList
            PlannedSessions={sessions}
            setPlannedSessions={setSessions}
            DisplayOld={true}
          />
        </div>
      </div>
    </div>
  );
};

export default PlannedSessionsPage;
