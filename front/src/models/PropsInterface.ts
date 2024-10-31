import { ClimbingGymLocation } from './ClimbingGymLocation';

export interface DifficultyInputProps {
  color: string;
}

export interface NavButtonProps {
  to: string;
  children: React.ReactNode;
  isActive: boolean;
}

export interface MapProps {
  locations: ClimbingGymLocation[];
  userCity: string;
}