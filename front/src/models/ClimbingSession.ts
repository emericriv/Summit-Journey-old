import { ClimbingGymLocation } from "./ClimbingGymLocation";

export interface ClimbingSession {
  id?: number;
  date: string
  location: ClimbingGymLocation;
  climbType: string;
  height: number;
  comments: string;
  // media?: string;        // URL vers l'image, si ce champ est ajouté plus tard
}
