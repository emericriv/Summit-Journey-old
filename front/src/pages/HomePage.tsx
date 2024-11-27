import { Link } from "react-router-dom";
import SessionHistory from "../components/SessionHistory";
// import axios from "axios";

const HomePage: React.FC = () => {
  return (
    <div className="hero-banner d-flex justify-content-center align-items-center">
      <div className="row mx-5 py-5 py-md-3">
        <div className="welcome">
          <h1>Bienvenue sur Summit Journey</h1>
          <p>Votre compagnon pour suivre vos aventures de grimpe !</p>
        </div>
        <div className="dashboard mt-3">
          <h1>Tableau de bord</h1>
          <div className="row">
            <div className="col-12 col-md-4 my-2">
              <div className="card">
                <div className="card-body">
                  <h3>Prochaines sessions</h3>
                  <p>Vous n'avez pas de session prévue pour le moment.</p>
                  <Link to="/session" className="btn">
                    Nouvelle session
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-8 my-2">
              <div className="card">
                <div className="card-body">
                  <h3>Historique des sessions</h3>
                  <SessionHistory numberOfSessions={2} />
                  <Link to="/session" className="btn mt-2">
                    Nouvelle session
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
