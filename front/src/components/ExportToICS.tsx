// ExportToICS.tsx

import { PlannedClimbingSession } from "../models/PlannedClimbingSession";

const ExportToICS = ({ session }: { session: PlannedClimbingSession }) => {
  const generateICS = () => {
    const start = new Date(session.startTime)
      .toISOString()
      .replace(/-|:|\.\d+/g, "");
    const end = session.endTime
      ? new Date(session.endTime).toISOString().replace(/-|:|\.\d+/g, "")
      : start;
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

  return <button onClick={generateICS}>Exporter vers calendrier</button>;
};

export default ExportToICS;
