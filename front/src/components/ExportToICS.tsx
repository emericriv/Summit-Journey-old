// ExportToICS.tsx

import { PlannedClimbingSession } from "../models/PlannedClimbingSession";

const ExportToICS = ({ session }: { session: PlannedClimbingSession }) => {
  const generateICS = () => {
    const start = new Date(session.startTime)
      .toISOString()
      .replace(/-|:|\.\d+/g, "");
    const end = new Date(
      new Date(session.startTime).getTime() + 2 * 60 * 60 * 1000
    )
      .toISOString()
      .replace(/-|:|\.\d+/g, "");
    const content = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:Session d'escalade
DTSTART:${start}
DTEND:${end}
LOCATION:${session.location}
DESCRIPTION:Participants: ${session.participants || "N/A"}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "planned_session.ics";
    link.click();
  };

  return (
    <button onClick={generateICS} className="custom-btn primary-transparent-bg">
      Exporter vers calendrier
    </button>
  );
};

export default ExportToICS;
