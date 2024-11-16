import React from "react";

const SessionHistory: React.FC = () => {
  return (
    <div className="card">
      <div className="card-body">
        <h3>Informations personnelles</h3>
        <form>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Nom d'utilisateur
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Nom d'utilisateur"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Adresse email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Adresse email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Mot de passe
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Mot de passe"
            />
          </div>
          <button type="submit" className="btn">
            Enregistrer les modifications
          </button>
        </form>
      </div>
    </div>
  );
};

export default SessionHistory;
