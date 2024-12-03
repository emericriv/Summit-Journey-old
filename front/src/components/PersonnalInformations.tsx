import React from "react";

const PersonnalInformations: React.FC = () => {
  return (
    <>
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
        <button type="submit" className="custom-btn btn primary-transparent-bg">
          Enregistrer les modifications
        </button>
      </form>
    </>
  );
};

export default PersonnalInformations;
