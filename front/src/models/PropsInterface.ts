import { ClimbingGymLocation } from './ClimbingGymLocation';
import { Difficulty } from './ClimbingSession';
import { UseFormRegister } from "react-hook-form";

export interface DifficultyInputProps {
  difficulty: Difficulty;
  register: UseFormRegister<FormSessionProps>;
  name: `difficulties.${number}.label`;
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

export interface FormSessionProps { 
  date: string;
  location: string;
  climbType: string;
  height: number;
  comments: string;
  difficulties: Difficulty[];
}
  