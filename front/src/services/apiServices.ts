import { ClimbingSession, DifficultyOrder, DifficultySet } from '../models/ClimbingSession';
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

export const updateClimbingSession = async (session: ClimbingSession): Promise<ClimbingSession> => {
  const response = await apiClient.put<ClimbingSession>(
    `sessions/${session.id}/`,
    session
  );
  return response.data;
}

export const deleteClimbingSession = async (id: number): Promise<void> => {
  // Possibilité de rajouter un paramètre isDeleted dans la table session pour ne pas supprimer définitivement
  // Et filtrer avec ce paramètre pour ne pas afficher les sessions supprimées et garder la data
  const response = await apiClient.delete(`sessions/${id}/`);
  return response.data;
}

export const getClimbingSessions = async (): Promise<ClimbingSession[]> => {
  const response = await apiClient.get<ClimbingSession[]>("sessions/");
  return response.data;
};

export const GetClimbingSessionById = async (id: number): Promise<ClimbingSession> => {
  const response = await apiClient.get<ClimbingSession>(`sessions/${id}/`);
  return response.data;
}

export const getDifficultySets = async (): Promise<DifficultySet[]> => {
  const response = await apiClient.get<DifficultySet[]>("difficulty-sets/");
  return response.data;
}

export const getDifficultyOrder = async (): Promise<DifficultyOrder> => {
  const response = await apiClient.get<DifficultyOrder>("difficulty-order/");
  return response.data;
}

export const getClimbingGyms = async (): Promise<ClimbingGymLocation[]> => {
  const response = await apiClient.get<ClimbingGymLocation[]>("gyms/");
  return response.data;
}

export const getCities = async (query: string) => {
  const response = await apiClient.get<[]>(`cities/search/?q=${query}`);
  return response.data;
}

export const getGymsByCityId = async ({ cityId }: { cityId: number }) => {
    try {
      const response = await apiClient.get<ClimbingGymLocation[]>(
        `gyms/search/${cityId}/`
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