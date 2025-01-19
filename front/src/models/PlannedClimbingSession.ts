import { ClimbingGymLocation } from "./ClimbingGymLocation";

export interface PlannedClimbingSession {
    id?: number;
    location: ClimbingGymLocation;
    startTime: string;
    endTime?: string | null;
    participants?: string;
    isCompleted: boolean;
    user?: number;
}
