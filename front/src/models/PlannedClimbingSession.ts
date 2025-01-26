import { ClimbingGymLocation } from "./ClimbingGymLocation";

export interface PlannedClimbingSession {
  id?: number;
  location: ClimbingGymLocation;
  startTime: string;
  participants?: string;
  isCompleted: boolean;
  user?: number;
}
