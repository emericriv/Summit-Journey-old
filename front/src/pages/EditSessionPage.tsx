// Page of redirection when a session need to be edeted
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ClimbingSession } from "../models/ClimbingSession";
import { GetClimbingSessionById } from "../services/apiServices";
import SessionFormComponent from "../components/SessionFormComponent";

const EditSessionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [session, setSession] = useState<ClimbingSession>();

  useEffect(() => {
    if (!session && id) {
      const fetchSession = async () => {
        try {
          const response = await GetClimbingSessionById(Number(id));
          setSession(response);
        } catch (error) {
          console.error("Erreur lors du chargement de la session :", error);
        }
      };
      fetchSession();
    }
  }, [id, session]);

  // Permet de pré-remplir le formulaire avec les données de la session

  return session && <SessionFormComponent session={session} />;
};

export default EditSessionPage;
