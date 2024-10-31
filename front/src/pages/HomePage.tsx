import { Link } from "react-router-dom";
// import axios from "axios";

const HomePage: React.FC = () => {
  return (
    <div className="hero-banner d-flex align-items-center justify-content-center">
      <div className="container py-5 py-md-0">
        <div className="welcome">
          <h1>Bienvenue sur Summit Journey</h1>
          <p>Votre compagnon pour suivre vos aventures de grimpe !</p>
        </div>
        <div className="dashboard mt-5">
          <h1>Tableau de bord</h1>
          <div className="row">
            <div className="col-12 col-md-6 my-2">
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
            <div className="col-12 col-md-6 my-2">
              <div className="card">
                <div className="card-body">
                  <h3>Historique des sessions</h3>
                  <p>Vous n'avez pas encore de session enregistrée.</p>
                  <button className="btn">Nouvelle session</button>
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
