import React, { useEffect, useState } from "react";
import { getClimbingSessions } from "../services/apiServices";
import { ClimbingSession } from "../models/ClimbingSession";

const ProfilePage: React.FC = () => {
  const [sessions, setSessions] = useState<ClimbingSession[]>([]);

  useEffect(() => {
    // Récupère les sessions lors du chargement de la page
    const fetchSessions = async () => {
      try {
        const fetchedSessions = await getClimbingSessions();
        setSessions(fetchedSessions);
      } catch (error) {
        console.error("Erreur lors de la récupération des sessions :", error);
      }
    };

    fetchSessions();
  }, []);

  return (
    <div className="hero-banner d-flex align-items-center justify-content-center">
      <div className="container mt-5">
        <h1 className="text-center mb-4">Mes Sessions d'Entraînement</h1>

        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Date</th>
                <th>Location</th>
                <th>Type d'escalade</th>
                <th>Hauteur</th>
                <th>Commentaires</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session) => (
                // <Link to={'/sessions/'+session.id}></Link>
                <tr key={session.id}>
                  {/* Utilise une clé unique */}
                  <td>{session.date}</td>
                  <td>
                    {
                      typeof session.location === "object" && session.location
                        ? session.location.gymName // Afficher le gymName si c'est un objet
                        : "N/A" // Afficher N/A si c'est un nombre (ID)
                    }
                  </td>
                  <td>
                    {session.climbType === "IN" ? "Intérieur" : "Extérieur"}
                  </td>
                  <td>{session.height} m</td>
                  <td>{session.comments}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
