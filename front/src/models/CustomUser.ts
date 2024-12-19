import { ClimbingGymLocation } from "./ClimbingGymLocation";

export interface CustomUser {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  zipCode: string;
  city: string;
  favoriteClimbingGym?: ClimbingGymLocation;
  favoriteClimbingGymId?: number;
}
