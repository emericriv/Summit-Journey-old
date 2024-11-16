import React, { useEffect, useState } from "react";
import { getClimbingSessions } from "../services/apiServices";
import { GetClimbingSession } from "../models/ClimbingSession";
import { SessionHistoryProps } from "../models/PropsInterface";

const SessionHistory: React.FC<SessionHistoryProps> = ({
  numberOfSessions,
}) => {
  const [sessions, setSessions] = useState<GetClimbingSession[]>();

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

  const getHighestDifficultiesCompleted = (
    session: GetClimbingSession,
    number: number
  ) => {
    // reverse used set to start from the highest difficulty
    const reversedDifficultyCompletions = [
      ...(session.difficultyCompletions || []),
    ].reverse();
    const topDifficulties = reversedDifficultyCompletions
      .filter((completion) => completion.count > 0) // Exclure les counts nuls
      .slice(0, number); // Récupérer les 2 premiers éléments

    // setHighestDifficulties(topDifficulties);
    return (
      <div>
        {topDifficulties &&
          topDifficulties.map((difficulty, index) => (
            <span key={index}>
              {difficulty.count}{" "}
              <span
                className={`difficulty-circle mx-1`}
                style={{
                  backgroundColor: difficulty.difficulty.color
                    ? difficulty.difficulty.hexColor
                    : "transparent",
                }}
              >
                {difficulty.difficulty.color ? "" : difficulty.difficulty.label}
              </span>
            </span>
          ))}
      </div>
    );
  };

  if (sessions?.length === 0) {
    return <p>Vous n'avez pas encore de session enregistrée</p>;
  }

  return (
    <>
      {sessions && (
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
                    session.difficultyCompletions
                      ? getHighestDifficultiesCompleted(session, 2)
                      : `autre`}
                  </td>
                  <td>{session.comments}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default SessionHistory;
