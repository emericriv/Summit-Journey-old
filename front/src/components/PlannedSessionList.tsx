// PlannedSessionList.tsx
import { Link } from "react-router-dom";
import { PlannedClimbingSession } from "../models/PlannedClimbingSession";
import { deletePlannedSession } from "../services/apiServices";

interface PlannedSessionListProps {
  PlannedSessions: PlannedClimbingSession[];
  setPlannedSessions: React.Dispatch<
    React.SetStateAction<PlannedClimbingSession[]>
  >;
  DisplayOld?: boolean;
  SessionsToDisplay?: number;
  CompactDisplay?: boolean;
}

const PlannedSessionList: React.FC<PlannedSessionListProps> = ({
  PlannedSessions,
  setPlannedSessions,
  DisplayOld = false,
  SessionsToDisplay,
  CompactDisplay = false,
}) => {
  // Trier les sessions par ordre chronologique
  const sortedSessions = [...PlannedSessions].sort(
    (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
  );

  // Séparer les sessions futures et passées
  const now = new Date().toISOString();
  const upcomingSessions = sortedSessions.filter(
    (session) => session.startTime >= now
  );
  const pastSessions = sortedSessions.filter(
    (session) => session.startTime < now
  );

  const formatDate = (dateString: string) => {
    console.log("dateString", dateString);
    try {
      return new Date(dateString).toLocaleString(undefined, {
        dateStyle: CompactDisplay ? "short" : "long",
        timeStyle: "short",
        timeZone: "UTC", // Force l'affichage en UTC
      });
    } catch (error) {
      console.error("Erreur de formatage de date :", error);
      return "Date invalide";
    }
  };

  const renderSession = (
    session: PlannedClimbingSession,
    id: number,
    past: boolean = false,
    ref: React.RefObject<HTMLLIElement> | null = null
  ) => (
    <li
      key={id}
      ref={ref as any}
      className="event-item d-flex justify-content-between align-items-center"
    >
      <div>
        <p>{formatDate(session.startTime)}</p>
        <h6>{session.location.gymName}</h6>
        {session.participants && session.participants.length > 0 && (
          <p>Participants : {session.participants}</p>
        )}
      </div>
      {past && (
        <Link
          to={`/session?startTime=${encodeURIComponent(session.startTime)}`}
          className="btn custom-btn primary-transparent-bg"
        >
          Ajouter
        </Link>
      )}
      <button
        onClick={() => {
          if (session.id !== undefined) {
            deletePlannedSession(session.id);
            setPlannedSessions((prevSessions) =>
              prevSessions.filter((s) => s.id !== session.id)
            );
          }
        }}
        className="delete-button btn-icon custom-btn-danger"
      >
        <i className="bi bi-x-lg"></i>
      </button>
    </li>
  );

  return (
    <div className="list-container">
      {upcomingSessions.length > 0 && (
        <>
          <h4>Sessions à venir</h4>
          <ul style={{ padding: 0, listStyle: "none" }}>
            {upcomingSessions
              .slice(0, SessionsToDisplay || upcomingSessions.length)
              .map((session, index) => renderSession(session, index))}
          </ul>
        </>
      )}
      {/* On n'affiche pas les sessions passées si le nombre de sessions à afficher est limité */}
      {!SessionsToDisplay && DisplayOld && pastSessions.length > 0 && (
        <>
          <h4>Sessions passées non complétées</h4>
          <ul style={{ padding: 0, listStyle: "none" }}>
            {pastSessions.map((session, index) =>
              renderSession(session, index, true)
            )}
          </ul>
        </>
      )}
    </div>
  );
};

export default PlannedSessionList;
