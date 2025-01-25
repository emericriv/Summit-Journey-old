import { ClimbingGymLocation } from "./ClimbingGymLocation";

export interface ClimbingSession {
  id?: number;
  dateTimeStart: string;
  location: ClimbingGymLocation;
  climbType: string;
  height: number;
  difficultySet: number;
  comments: string;
  difficultyCompletions: DifficultyCompletion[];
  // media?: string;        // URL vers l'image, si ce champ est ajouté plus tard
}

export interface Difficulty {
  id : number;
  label?: string;
  color?: boolean;
  hexColor?: string;
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
