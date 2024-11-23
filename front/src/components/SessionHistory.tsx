import React, { useEffect, useState } from "react";
import { getClimbingSessions } from "../services/apiServices";
import { ClimbingSession } from "../models/ClimbingSession";
import { SessionHistoryProps } from "../models/PropsInterface";
import { useNavigate, useLocation } from "react-router-dom";
import HighestDifficultiesCompletedComponent from "./HighestDifficultiesCompletedComponent";

const SessionHistory: React.FC<SessionHistoryProps> = ({
  numberOfSessions,
}) => {
  const [sessions, setSessions] = useState<ClimbingSession[]>();

  useEffect(() => {
    // Récupère les sessions lors du chargement de la page
    const fetchSessions = async () => {
      try {
        const fetchedSessions = await getClimbingSessions();
        if (numberOfSessions > fetchedSessions.length) {
          setSessions(fetchedSessions);
        } else {
          setSessions(fetchedSessions.slice(0, numberOfSessions));
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des sessions :", error);
      }
    };
    fetchSessions();
  }, [numberOfSessions]);

  const navigate = useNavigate();
  const location = useLocation();

  const goToEditSessionPage = (sessionId: number) => {
    navigate(`/edit-session/${sessionId}`, {
      state: { from: location.pathname },
    });
  };

  if (sessions?.length === 0) {
    return <p>Vous n'avez pas encore de session enregistrée</p>;
  }

  return (
    <>
      {sessions ? (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Date</th>
                <th>Location</th>
                <th>Type d'escalade</th>
                <th>Plus hautes difficultés</th>
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
                  <td>
                    {Array.isArray(session.difficultyCompletions) &&
                    session.difficultyCompletions ? (
                      <HighestDifficultiesCompletedComponent
                        session={session}
                        number={2}
                      />
                    ) : (
                      `autre`
                    )}
                  </td>
                  {/* <td>{session.comments}</td> */}
                  <td>
                    <button
                      onClick={() => {
                        if (session.id) goToEditSessionPage(session.id);
                      }}
                      className="btn"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="table-responsive mb-2">
          <div className="placeholder" style={{ height: 163, width: "100%" }}>
            <div className="animated-background"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default SessionHistory;
