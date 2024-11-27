import React, { useEffect, useState } from "react";
import { getClimbingSessions } from "../services/apiServices";
import { ClimbingSession } from "../models/ClimbingSession";
import { SessionHistoryProps } from "../models/PropsInterface";
import { useNavigate, useLocation } from "react-router-dom";
import HighestDifficultiesCompletedComponent from "./HighestDifficultiesCompletedComponent";

const SessionHistory: React.FC<SessionHistoryProps> = ({
  numberOfSessions,
}) => {
  const [sessions, setSessions] = useState<ClimbingSession[]>([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const fetchedSessions = await getClimbingSessions();
        setSessions(
          numberOfSessions > fetchedSessions.length
            ? fetchedSessions
            : fetchedSessions.slice(0, numberOfSessions)
        );
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

  return (
    <>
      {sessions ? (
        <div className="grid-table">
          {/* En-tête */}
          <div className="grid-header">Date</div>
          <div className="grid-header">Location</div>
          <div className="grid-header">Plus hautes difficultés</div>
          <div></div> {/*Just an empty column for spacing*/}
          {/* Colonne vide pour espacement */}
          {/* Corps du tableau */}
          {sessions.map((session) => (
            <React.Fragment key={session.id}>
              <div className="grid-cell">{session.date}</div>
              <div className="grid-cell">
                {typeof session.location === "object" && session.location
                  ? session.location.gymName
                  : "N/A"}
              </div>
              <div className="grid-cell">
                {Array.isArray(session.difficultyCompletions) &&
                session.difficultyCompletions ? (
                  <HighestDifficultiesCompletedComponent
                    session={session}
                    number={3}
                  />
                ) : (
                  "autre"
                )}
              </div>
              <div className="edit-button">
                <button
                  onClick={() => session.id && goToEditSessionPage(session.id)}
                  className="btn-icon"
                  aria-label="Modifier"
                >
                  <i className="bi bi-pencil-fill"></i>
                </button>
              </div>
            </React.Fragment>
          ))}
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
