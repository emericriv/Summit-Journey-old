import { useState, useEffect } from "react";
import { useForm, useFieldArray, FieldValues } from "react-hook-form";
import { createClimbingSession, updateClimbingSession } from "../services/apiServices";
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

  const updateSelectedSet = (set: DifficultySet) => {
    setSelectedSet(set);
    if (set.id !== undefined) setValue("difficultySet", set.id);
  }

  useEffect(() => {
    if (fields.length === 0 && selectedSet) {
      // Ajouter les difficultés déjà ordonnées grâce à `ordering` défini dans le modèle Django
      selectedSet.difficulties.forEach((difficultyOrder) => {
        append({ difficulty: difficultyOrder.difficulty, count: 0 }, { shouldFocus: false }); // shouldFocus: false pour éviter le focus sur le dernier champ
      });
    }
  }, [append, selectedSet, fields.length]);
  
  // Post de la nouvelle session
  const addUpdateSession = async ({ data, sessionId }: { data: FieldValues, sessionId?: number }) => {
    //Remplacer les difficultées par leur id
    console.log("Données du formulaire:", data);
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
    if (sessionId) {
      // Update the session
      const updatedSession : PostClimbingSession = { ...newSession, id: sessionId };
      updateClimbingSession(updatedSession)
        .then((data) => {
          console.log("Session mise à jour avec succès:", data);
        })
        .catch((error) => {
          console.error("Erreur lors de la mise à jour de la session:", error);
        });
    } else {
    createClimbingSession(newSession)
      .then((data) => {
        console.log("Session ajoutée avec succès:", data);
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout de la session:", error);
      });
    };
  }

  return {
    register,
    handleSubmit,
    setValue,
    isSubmitting,
    reset,
    fields,
    selectedSet,
    updateSelectedSet,
    addUpdateSession,
    errors,
    control,
  };
};
