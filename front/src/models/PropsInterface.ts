import { ClimbingGymLocation } from './ClimbingGymLocation';

export interface DifficultyInputProps {
  color: string;
}

export interface NavButtonProps {
  to: string;
  children: React.ReactNode;
  isActive: boolean;
}

export interface MapComponentProps {
  gyms: ClimbingGymLocation[];
}

export interface MarkerWithInfoWindowProps {
  gym: ClimbingGymLocation;
}

// Used in NewSessionPage.tsx for the select element
export interface GymOption {
  label: string;
  value: string;
}