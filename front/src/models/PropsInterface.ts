import { ClimbingGymLocation } from './ClimbingGymLocation';
import { ClimbingSession, Difficulty, DifficultyCompletion, DifficultySet } from './ClimbingSession';
import { Control, FieldArrayWithId, UseFormRegister, UseFormReset } from "react-hook-form";

export interface DifficultyInputProps {
  difficulty: Difficulty;
  register: UseFormRegister<FormSessionProps>;
  name: `difficulties.${number}.count`;
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
  gym: ClimbingGymLocation; // Données du gymnase
  openInfoWindowId: number | null; // ID de l'info-bulle ouverte ou null si aucune n'est ouverte
  setOpenInfoWindowId: (id: number | null) => void; // Fonction pour ouvrir/fermer l'info-bulle
}

// Used for component in the new session form
export interface ClimbTypeSelectProps {
  register: UseFormRegister<FormSessionProps>;
}

export interface CommentInputProps {
  register: UseFormRegister<FormSessionProps>;
}

export interface DateInputProps {
  register: UseFormRegister<FormSessionProps>;
}

export interface DifficultyListProps {
  fields: FieldArrayWithId<FormSessionProps, "difficulties", "id">[];
  register: UseFormRegister<FormSessionProps>;
  selectedSet: DifficultySet | undefined;
}

export interface DifficultySetSelectProps {
  updateSelectedSet: (
    set: DifficultySet
  ) => void;
  reset: UseFormReset<FormSessionProps>;
  register: UseFormRegister<FormSessionProps>;
  initSetId?: number;
}

export interface HeightInputProps {
  register: UseFormRegister<FormSessionProps>;
}

export interface GymLocationSelectProps {
  control: Control<FormSessionProps>;
  initGymId?: number;
}

export interface GymOption {
  label: string;
  value: string;
}

export interface FormSessionProps { 
  date: string;
  location: number;
  climbType: string;
  height: number;
  comments: string;
  difficultySet: number;
  difficulties: DifficultyCompletion[];
}
  
export interface SessionHistoryProps {
  numberOfSessions: number;
}

export interface SessionFormComponentProps {
  session?: ClimbingSession;
}

export interface HighestDifficultiesCompletedProps {
  session: ClimbingSession;
  number: number;
}

export interface CityAutocompleteProps {
  setCityId: (id: number) => void;
};