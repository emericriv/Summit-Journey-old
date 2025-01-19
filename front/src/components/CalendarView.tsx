// CalendarView.tsx (exemple simple avec react-calendar)
import Calendar from "react-calendar";
import { PlannedClimbingSession } from "../models/PlannedClimbingSession";

const CalendarView = ({ sessions }: { sessions: PlannedClimbingSession[] }) => {
  const tileClasseName = ({ date }: { date: Date }) => {
    const hasSession = sessions.some(
      (session) =>
        new Date(session.startTime).toDateString() === date.toDateString()
    );
    return hasSession ? "react-tile-with-session" : null;
  };

  return <Calendar tileClassName={tileClasseName} />;
};

export default CalendarView;
