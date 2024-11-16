import { useState, useEffect } from "react";
import { useForm, useFieldArray, FieldValues } from "react-hook-form";
import { createClimbingSession } from "../services/apiServices";
import { PostClimbingSession, DifficultySet, DifficultyCompletion, DifficultyCompletionWithId } from "../models/ClimbingSession";
import { FormSessionProps,  } from "../models/PropsInterface";

export const useClimbingSessionForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<FormSessionProps>({
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      location: undefined,
      climbType: "IN",
      height: 5,
      comments: undefined,
      difficultySet: undefined,
      difficulties: [],
    },
  });
  const { fields, append } = useFieldArray({ control, name: "difficulties" });
  const [selectedSet, setSelectedSet] = useState<DifficultySet>();

  useEffect(() => {
    if (fields.length === 0 && selectedSet) {
      // Ajouter les difficultés déjà ordonnées grâce à `ordering` défini dans le modèle Django
      selectedSet.difficulties.forEach((difficultyOrder) => {
        append({ difficulty: difficultyOrder.difficulty, count: 0 });
      });
    }
  }, [append, selectedSet, fields.length]);
  
  // Post de la nouvelle session
  const addSession = async (data: FieldValues) => {
    //Remplacer les difficultées par leur id
    const difficultyCountsWithID: DifficultyCompletionWithId[] =
      data.difficulties.map((difficulty: DifficultyCompletion) => {
        const difficultyId = selectedSet?.difficulties.find(
          (d) => d.difficulty.label === difficulty.difficulty.label
        )?.difficulty.id;
        return { difficulty: Number(difficultyId) || 1, count: Number(difficulty.count) };
      });

    // Créer l'objet PostClimbingSession à envoyer à l'API
    const newSession: PostClimbingSession = {
      date: data.date,
      location: data.location,
      climbType: data.climbType,
      height: data.height,
      comments: data.comments,
      climber: 1,
      difficultySet: selectedSet?.id || 1,
      difficultyCompletions: difficultyCountsWithID,
    };
    console.log("Nouvelle session:", newSession);

    // Appel à l'API pour ajouter la session
    createClimbingSession(newSession)
      .then((data) => {
        console.log("Session ajoutée avec succès:", data);
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout de la session:", error);
      });
  };

  return {
    register,
    handleSubmit,
    setValue,
    isSubmitting,
    reset,
    fields,
    selectedSet,
    setSelectedSet,
    addSession,
    errors,
  };
};
