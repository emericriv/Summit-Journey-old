import { ClimbingGymLocation } from "./ClimbingGymLocation";

export interface GetClimbingSession {
  id?: number;
  date: string;
  location: ClimbingGymLocation;
  climbType: string;
  height: number;
  difficultySet: number;
  comments: string;
  difficultyCompletions: DifficultyCompletion[];
  climber: number; // Change to Climber when the model is created
  // media?: string;        // URL vers l'image, si ce champ est ajouté plus tard
}

export interface PostClimbingSession {
  date: string;
  location: number;
  climbType: string;
  height: number;
  difficultySet: number;
  comments: string;
  difficultyCompletions: DifficultyCompletionWithId[];
  climber: number;
}

export interface Difficulty {
  id : number;
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
  id ?: number;
  difficulties : DifficultyOrder[];
}

export interface DifficultyCompletion{
  difficulty: Difficulty;
  count: number;
}

export interface DifficultyCompletionWithId{
  difficulty: number;
  count: number;
}