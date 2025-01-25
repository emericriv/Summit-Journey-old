import { useState, useEffect } from "react";
import { useForm, useFieldArray, FieldValues } from "react-hook-form";
import { ClimbingSession, DifficultySet, DifficultyCompletion } from "../models/ClimbingSession";
import { FormSessionProps,  } from "../models/PropsInterface";

export const useClimbingSessionForm = () => {
  const defaultValues = {
    dateTimeStart: new Date()
      .toLocaleString("sv-SE", { timeZoneName: "short" })
      .replace(" ", "T")
      .slice(0, 16),
    location: undefined,
    climbType: "IN",
    height: 5,
    comments: "",
    difficultySet: undefined,
    difficulties: [],
  }

  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<FormSessionProps>({
    defaultValues: defaultValues,
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
  // Changer pour Prepare data pour la requete API
  const PrepareDataForRequest = ({ data }: { data: FieldValues }) => {
    // Partie Préparation de données à garder dans le hook

    //Remplacer les difficultées par leur id
    console.log("Données du formulaire:", data);
    const difficultyCountsWithID: DifficultyCompletion[] =
      data.difficulties.map((difficulty: DifficultyCompletion) => {
        const difficultyId = selectedSet?.difficulties.find(
          (d) => d.difficulty.label === difficulty.difficulty.label
        )?.difficulty.id;
        return { difficulty: Number(difficultyId) || 1, count: Number(difficulty.count) };
      });

    // Créer l'objet ClimbingSession à envoyer à l'API
    const newSession: ClimbingSession = {
      dateTimeStart: data.dateTimeStart,
      location: data.location,
      climbType: data.climbType,
      height: data.height,
      comments: data.comments,
      difficultySet: selectedSet?.id || 1,
      difficultyCompletions: difficultyCountsWithID,
      };
    console.log("Nouvelle session:", newSession);

    return newSession;
  }

  return {
    register,
    handleSubmit,
    setValue,
    isSubmitting,
    reset,
    defaultValues,
    fields,
    selectedSet,
    updateSelectedSet,
    PrepareDataForRequest,
    errors,
    control,
    watch,
  };
};
