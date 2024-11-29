import React, { useEffect, useState } from "react";
import {
  getClimbingSessions,
  deleteClimbingSession,
} from "../services/apiServices";
import { ClimbingSession } from "../models/ClimbingSession";
import { SessionHistoryProps } from "../models/PropsInterface";
import { useNavigate, useLocation, Link } from "react-router-dom";
import HighestDifficultiesCompletedComponent from "./HighestDifficultiesCompletedComponent";
import ModalComponent from "./ModalComponent";

const SessionHistory: React.FC<SessionHistoryProps> = ({
  numberOfSessions,
}) => {
  const [sessions, setSessions] = useState<ClimbingSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<number | null>(null);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const fetchedSessions = await getClimbingSessions();
        setSessions(fetchedSessions);
      } catch (error) {
        console.error("Erreur lors de la récupération des sessions :", error);
      }
    };
    fetchSessions();
  }, [numberOfSessions]);

  const handleResponse = () => {
    setSessions(sessions.filter((session) => session.id !== currentSessionId));
    setCurrentSessionId(null);
  };

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
          {numberOfSessions !== "all" ? (
            <div>
              <Link
                to="/all-sessions"
                className="bi bi-list-task btn-icon btn-icon-list py-1 px-2"
              />
            </div>
          ) : (
            <div></div>
          )}
          {/* Colonne vide pour espacement */}
          {/* Corps du tableau */}
          {sessions
            .slice(
              0,
              numberOfSessions === "all" ? sessions.length : numberOfSessions
            )
            .map((session) => (
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
                <div className="div-button">
                  <button
                    onClick={() =>
                      session.id && goToEditSessionPage(session.id)
                    }
                    className="btn-icon btn-icon-edit"
                    aria-label="Modifier"
                  >
                    <i className="bi bi-pencil-fill"></i>
                  </button>
                  <button
                    onClick={() =>
                      session.id && setCurrentSessionId(session.id)
                    }
                    className="btn-icon btn-icon-delete"
                    aria-label="Supprimer"
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                </div>
              </React.Fragment>
            ))}
          {currentSessionId && (
            <ModalComponent
              setCurrentSessionId={setCurrentSessionId}
              description="Voulez-vous supprimer cette session ?"
              title="Supprimer session"
              actionDescription="Supprimer"
              callApi={deleteClimbingSession}
              objectId={currentSessionId}
              buttonClassName="btn-outline-danger"
              buttonStyle={{ color: "red" }}
              handleResponse={handleResponse}
            />
          )}
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
