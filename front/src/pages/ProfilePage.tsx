import React from "react";
import SessionHistory from "../components/SessionHistory";
import PersonnalInformations from "../components/PersonnalInformations";

const ProfilePage: React.FC = () => {
  return (
    <div className="hero-banner d-flex justify-content-center align-items-center">
      <div className="row">
        <div className="col-md-6 mb-3">
          <PersonnalInformations />
        </div>
        <div className="col-md-6">
          <div className="session-history card mb-3">
            <div className="card-body">
              <h3>Historique des sessions</h3>
              <SessionHistory numberOfSessions={2} />
            </div>
          </div>
          <div className="equipments card mb-3">
            <div className="card-body">
              <h3>Matériel et modèle</h3>
              <ul>
                <li>Chaussons d'escalade : La Sportiva Solution</li>
                <li>Harnais : Petzl Corax</li>
                <li>Casque : Petzl Meteor</li>
                <li>Corde : Beal Joker</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
