import { Link } from "react-router-dom";
import SessionHistory from "../components/SessionHistory";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { getPlannedSessions } from "../services/apiServices";
import { PlannedClimbingSession } from "../models/PlannedClimbingSession";
import PlannedSessionList from "../components/PlannedSessionList";

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  const [sessions, setSessions] = useState<PlannedClimbingSession[]>([]);

  // Récupération des sessions depuis l'API
  useEffect(() => {
    getPlannedSessions().then((data) => {
      setSessions(data);
    });
    console.log("sessions", sessions.length);
  }, []);

  return (
    <div className="hero-banner d-flex justify-content-center align-items-center">
      <div className="row mx-5 py-5 py-md-3">
        <div className="global-appearance welcome">
          <h1>Bienvenue sur Summit Journey</h1>
          <p>Votre compagnon pour suivre vos aventures de grimpe !</p>
        </div>
        <div className="dashboard mt-3">
          <h1>Tableau de bord</h1>
          <div className="Dashboard-grid">
            <div className="home-next-session grid-card global-appearance d-flex flex-column justify-content-between">
              <div>
                {isAuthenticated ? (
                  sessions.length > 0 ? (
                    <PlannedSessionList
                      PlannedSessions={sessions}
                      setPlannedSessions={setSessions}
                      SessionsToDisplay={2}
                      CompactDisplay={true}
                    />
                  ) : (
                    <>
                      <h3>Prochaines sessions</h3>
                      <p>
                        Vous n'avez pas de session de prévue pour le moment.
                      </p>
                    </>
                  )
                ) : (
                  <p>Connectez-vous pour pouvoir programmer une session.</p>
                )}
              </div>
              {isAuthenticated ? (
                <Link
                  to="/planned-sessions"
                  className="custom-btn btn primary-transparent-bg mt-2 align-self-start"
                >
                  Planifier une session
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="custom-btn btn primary-transparent-bg mt-2 align-self-start"
                >
                  Se connecter
                </Link>
              )}
            </div>
            <div className="home-session-history grid-card global-appearance d-flex flex-column justify-content-between">
              <div>
                <h3>Historique des sessions</h3>
                {isAuthenticated ? (
                  <SessionHistory numberOfSessions={2} />
                ) : (
                  <p>Connectez-vous pour voir votre historique de sessions.</p>
                )}
              </div>
              {isAuthenticated ? (
                <Link
                  to="/session"
                  className="custom-btn btn primary-transparent-bg mt-2 align-self-start"
                >
                  Nouvelle session
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="custom-btn btn primary-transparent-bg mt-2 align-self-start"
                >
                  Se connecter
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
