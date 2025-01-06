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
  const [sessions, setSessions] = useState<ClimbingSession[]>();
  const [currentSessionId, setCurrentSessionId] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const fetchedSessions = await getClimbingSessions();
        // long loading simulation
        // setTimeout(() => {
        //   setSessions(fetchedSessions);
        // }, 1000);
        setSessions(fetchedSessions);
      } catch (error) {
        console.error("Erreur lors de la récupération des sessions :", error);
      }
    };
    fetchSessions();

    // Détection de la taille d'écran
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [numberOfSessions]);

  const handleResponse = () => {
    if (sessions) {
      setSessions(
        sessions.filter((session) => session.id !== currentSessionId)
      );
    }
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
        sessions.length > 0 ? (
          <div className="grid-table">
            {!isMobile && (
              <>
                <div className="grid-header">Date</div>
                <div className="grid-header">Lieu</div>
                <div className="grid-header">
                  {numberOfSessions === "all"
                    ? "Difficultés complétées"
                    : "Plus hautes difficultés"}
                </div>
                {numberOfSessions !== "all" ? (
                  <div className="button-cell">
                    <Link to="/all-sessions">
                      <button className="btn-icon btn-icon-list">
                        <i className="bi bi-list-task"></i>
                      </button>
                    </Link>
                  </div>
                ) : (
                  <div></div>
                )}
                {/* Colonne vide pour espacement */}
                {/* Corps du tableau */}
              </>
            )}

            {sessions
              .slice(
                0,
                numberOfSessions === "all" ? sessions.length : numberOfSessions
              )
              .map((session, index) =>
                isMobile ? (
                  <React.Fragment key={index}>
                    <div className="session-bubble">
                      <div className="bubble-header">
                        {new Date(session.date).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </div>
                      <div className="bubble-content">
                        {session.location?.gymName ?? "N/A"}
                      </div>
                      <div className="bubble-content">
                        {Array.isArray(session.difficultyCompletions) ? (
                          <HighestDifficultiesCompletedComponent
                            session={session}
                            numberOfDifficulties="all"
                          />
                        ) : (
                          "autre"
                        )}
                      </div>
                    </div>
                    <div className="div-button">
                      {numberOfSessions !== "all" ? (
                        <Link to="/all-sessions">
                          <button className="btn-icon btn-icon-list">
                            <i className="bi bi-list-task"></i>
                          </button>
                        </Link>
                      ) : (
                        <div></div>
                      )}
                      <button
                        onClick={() =>
                          session.id && goToEditSessionPage(session.id)
                        }
                        className="btn-icon custom-btn-primary"
                      >
                        <i className="bi bi-pencil-fill"></i>
                      </button>
                      <button
                        onClick={() =>
                          session.id && setCurrentSessionId(session.id)
                        }
                        className="btn-icon custom-btn-danger"
                      >
                        <i className="bi bi-trash-fill"></i>
                      </button>
                    </div>
                  </React.Fragment>
                ) : (
                  <React.Fragment key={index}>
                    <div className="grid-cell">
                      {new Date(session.date).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </div>
                    <div className="grid-cell">
                      {session.location?.gymName ?? "N/A"}
                    </div>
                    <div className="grid-cell">
                      {Array.isArray(session.difficultyCompletions) ? (
                        <HighestDifficultiesCompletedComponent
                          session={session}
                          numberOfDifficulties={
                            numberOfSessions === "all" ? "all" : 3
                          }
                        />
                      ) : (
                        "autre"
                      )}
                    </div>
                    <div className="div-button button-cell">
                      <button
                        onClick={() =>
                          session.id && goToEditSessionPage(session.id)
                        }
                        className="btn-icon custom-btn-primary"
                      >
                        <i className="bi bi-pencil-fill"></i>
                      </button>
                      <button
                        onClick={() =>
                          session.id && setCurrentSessionId(session.id)
                        }
                        className="btn-icon custom-btn-danger"
                      >
                        <i className="bi bi-trash-fill"></i>
                      </button>
                    </div>
                  </React.Fragment>
                )
              )}
            {currentSessionId && (
              <ModalComponent
                setDependantVariable={setCurrentSessionId}
                title="Supprimer session"
                actionDescription="Supprimer"
                callApi={deleteClimbingSession}
                objectId={currentSessionId}
                buttonClassName="custom-btn-danger"
                handleResponse={handleResponse}
              >
                <p>Êtes-vous sûr de vouloir supprimer cette session ?</p>
              </ModalComponent>
            )}
          </div>
        ) : (
          <div className="alert alert-info">Aucune session enregistrée</div>
        )
      ) : (
        <div className="placeholder" style={{ minHeight: 163 }}>
          <div className="animated-background"></div>
        </div>
      )}
    </>
  );
};

export default SessionHistory;
