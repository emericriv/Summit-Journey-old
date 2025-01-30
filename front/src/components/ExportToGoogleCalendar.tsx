import { PlannedClimbingSession } from "../models/PlannedClimbingSession";

const ExportToGoogleCalendar = ({
  session,
}: {
  session: PlannedClimbingSession;
}) => {
  const exportToGoogleCalendar = () => {
    const start = new Date(session.startTime)
      .toISOString()
      .replace(/-|:|\.\d+/g, "");
    const end = new Date(
      new Date(session.startTime).getTime() + 2 * 60 * 60 * 1000
    )
      .toISOString()
      .replace(/-|:|\.\d+/g, "");

    const title = encodeURIComponent("Session d'escalade");
    const location = encodeURIComponent(session.location.gymName || "");
    const details = encodeURIComponent(
      `Participants: ${session.participants || "N/A"}`
    );

    const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}&sf=true&output=xml`;

    window.open(googleCalendarUrl, "_blank");
  };

  return (
    <button
      onClick={exportToGoogleCalendar}
      className="custom-btn primary-transparent-bg"
    >
      Exporter
    </button>
  );
};

export default ExportToGoogleCalendar;
