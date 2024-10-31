import axios from 'axios';
import { ClimbingSession } from '../models/ClimbingSession';

const BASE_URL = 'http://127.0.0.1:8000/api/sessions/';

export const createClimbingSession = async (session: ClimbingSession): Promise<ClimbingSession> => {
  const response = await axios.post<ClimbingSession>(BASE_URL, session);
  return response.data;
};

export const getClimbingSessions = async (): Promise<ClimbingSession[]> => {
  const response = await axios.get<ClimbingSession[]>(BASE_URL);
  return response.data;
};