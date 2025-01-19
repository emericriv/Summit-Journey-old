// PlannedSessionList.tsx
import { PlannedClimbingSession } from "../models/PlannedClimbingSession";

interface PlannedSessionListProps {
  PlannedSessions: PlannedClimbingSession[];
}

const PlannedSessionList: React.FC<PlannedSessionListProps> = ({
  PlannedSessions,
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
    try {
      return new Date(dateString).toLocaleString("fr-FR", {
        dateStyle: "long",
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
    ref: React.RefObject<HTMLLIElement> | null = null
  ) => (
    <li key={id} ref={ref as any} className="event-item">
      <p>
        {formatDate(session.startTime)} -{" "}
        {session.endTime ? formatDate(session.endTime) : "Non spécifiée"}
      </p>
      <h6>{session.location.gymName}</h6>
      {session.participants && session.participants.length > 0 && (
        <p>Participants : {session.participants}</p>
      )}
    </li>
  );

  return (
    <div className="list-container">
      {upcomingSessions.length > 0 && (
        <>
          <h4>Sessions à venir</h4>
          <ul style={{ padding: 0, listStyle: "none" }}>
            {upcomingSessions.map((session, index) =>
              renderSession(session, index)
            )}
          </ul>
        </>
      )}
      {pastSessions.length > 0 && (
        <>
          <h4>Sessions passées</h4>
          <ul style={{ padding: 0, listStyle: "none" }}>
            {pastSessions.map((session, index) =>
              renderSession(session, index)
            )}
          </ul>
        </>
      )}
    </div>
  );
};

export default PlannedSessionList;
