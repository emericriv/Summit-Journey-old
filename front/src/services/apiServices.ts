import { ClimbingSession, DifficultySet } from '../models/ClimbingSession';
import { ClimbingGymLocation } from '../models/ClimbingGymLocation';
import axios from "axios";
import {AxiosError} from 'axios';


const apiClient = axios.create({
  baseURL : 'http://127.0.0.1:8000/api/',
  timeout: 10000,
  headers : {
    'Content-Type': 'application/json',
  }
})

export const createClimbingSession = async (session: ClimbingSession): Promise<ClimbingSession> => {
  const response = await apiClient.post<ClimbingSession>(
    "sessions/",
    session
  );
  return response.data;
};

export const getClimbingSessions = async (): Promise<ClimbingSession[]> => {
  const response = await apiClient.get<ClimbingSession[]>("sessions/");
  return response.data;
};

export const getDifficultySets = async (): Promise<DifficultySet[]> => {
  const response = await apiClient.get<DifficultySet[]>("difficulty-sets/");
  return response.data;
}

export const getClimbingGyms = async (): Promise<ClimbingGymLocation[]> => {
  const response = await apiClient.get<ClimbingGymLocation[]>("gyms/");
  return response.data;
}

export const getGymsByCity = async ({ city }: { city: string }) => {
    try {
      const response = await apiClient.get<ClimbingGymLocation[]>(
        `gyms/search/${city}/`
      );
      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des salles d'escalade",
        error
      );
      if (error instanceof AxiosError) {
        displayErrors(error);
      }
      return [];
    }
  };

  
const displayErrors = (error: AxiosError) => {
  if (error.response) {
    // Le serveur a répondu avec un statut différent de 2xx
    console.error("Erreur du serveur:", {
      code: error.response.status,
      data: error.response.data,
      headers: error.response.headers,
    });
  } else if (error.request) {
    // La requête a été faite mais aucune réponse n'a été reçue
    console.error("Aucune réponse reçue:", error.request);
  } else {
    // Une erreur est survenue lors de la configuration de la requête
    console.error(
      "Erreur lors de la configuration de la requête:",
      error.message
    );
  }

  // console.error('Détails de l\'erreur:', error.config); // Afficher la configuration de la requête
  throw error; // Propager l'erreur pour la gestion des erreurs en aval
};