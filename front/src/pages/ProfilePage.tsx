import React from "react";
import SessionHistory from "../components/SessionHistory";
import PersonnalInformations from "../components/PersonnalInformations";

const ProfilePage: React.FC = () => {
  return (
    <div className="hero-banner profile-grid">
      <div className="personnal-informations profile-card global-appearance">
        <PersonnalInformations />
      </div>
      <div className="session-history profile-card global-appearance">
        <h3>Historique des sessions</h3>
        <SessionHistory numberOfSessions={2} />
      </div>
      <div className="equipments profile-card global-appearance">
        <h3>Matériel et modèle</h3>
        <ul>
          <li>Chaussons d'escalade : La Sportiva Solution</li>
          <li>Harnais : Petzl Corax</li>
          <li>Casque : Petzl Meteor</li>
          <li>Corde : Beal Joker</li>
        </ul>
      </div>
      <div className="profile-card global-appearance">
        <h3>Potentiel nouvel élément</h3>
        <p>A venir</p>
      </div>
    </div>
  );
};

export default ProfilePage;
