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

// Interceptor pour ajouter automatiquement le token à toutes les requêtes
apiClient.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error : AxiosError) => {
    displayErrors(error);
    return Promise.reject(error);
  }
);

// Interceptor pour gérer les réponses
apiClient.interceptors.response.use(
  response => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Si le statut est 401 et que ce n'est pas une tentative de refresh, on tente de rafraîchir le token
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Appelle ton endpoint de refresh token
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await apiClient.post('/token/refresh/', { refresh: refreshToken });

        if (response.status === 200) {
          const newAccessToken = response.data.access;
          const newRefreshToken = response.data.refresh;

          // Stocke le nouveau token
          localStorage.setItem('accessToken', newAccessToken);
          localStorage.setItem('refreshToken', newRefreshToken);

          // Modifie le header Authorization et réessaye la requête initiale
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

          return apiClient(originalRequest);
        }
      } catch (refreshError: any) {
        if (error) {
          console.error('API Error:', refreshError.response || refreshError.message);
        }
        // Si la tentative de refresh échoue, déconnecte l'utilisateur ou gère l'erreur

        return Promise.reject(refreshError);
      }
    }

    // Si c'est une autre erreur ou si le refresh échoue, rejette l'erreur
    return Promise.reject(error);
  }
);

export const connectUser = async (username: string, password: string) => {
  try {
    const response = await apiClient.post('/token/', {
      username,
      password,
    });
    const accessToken = response.data.access;
    const refreshToken = response.data.refresh;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    return accessToken;
  } catch (error : any) {
    displayErrors(error as AxiosError);
  }
};

export const disconnectUser = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

export const createUser = async (user: any) => {
  try {
    const response = await apiClient.post('/users/', user);
    return response.data;
  } catch (error : any) {
    displayErrors(error as AxiosError);
  }
}

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
