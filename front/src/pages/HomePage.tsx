import { Link } from "react-router-dom";
import SessionHistory from "../components/SessionHistory";
import { useAuth } from "../context/AuthContext";
// import axios from "axios";

const HomePage: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

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
                <h3>Prochaines sessions</h3>
                {isAuthenticated ? (
                  <p>Vous n'avez pas de session de prévue pour le moment.</p>
                ) : (
                  <p>Connectez-vous pour pouvoir programmer une session.</p>
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
