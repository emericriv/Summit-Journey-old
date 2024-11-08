import { ClimbingGymLocation } from "./ClimbingGymLocation";

export interface ClimbingSession {
  id?: number;
  date: string;
  location: ClimbingGymLocation | number;
  climbType: string;
  height: number;
  comments: string;
  climber: number; // Change to Climber when the model is created
  // media?: string;        // URL vers l'image, si ce champ est ajouté plus tard
}

export interface Difficulty {
  label: string;
  color: boolean;
  hexColor: string;
}


export interface DifficultyOrder{
  order: number,
  difficulty_set: DifficultySet,
  difficulty: Difficulty
}

export interface DifficultySet{
  difficulties : DifficultyOrder[];
}