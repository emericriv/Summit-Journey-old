import { useState, useEffect } from "react";
import { useForm, useFieldArray, FieldValues } from "react-hook-form";
import { createClimbingSession, getClimbingGyms, getDifficultySets } from "../services/apiServices";
import { ClimbingSession, DifficultySet, DifficultyCompletion, Difficulty, DifficultyCompletionWithId } from "../models/ClimbingSession";
import { FormSessionProps, GymOption } from "../models/PropsInterface";
import { ClimbingGymLocation } from "../models/ClimbingGymLocation";

export const useClimbingSessionForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { isSubmitting },
    reset,
  } = useForm<FormSessionProps>({
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      location: "",
      climbType: "IN",
      height: 0,
      comments: "",
      difficultySet: "",
      difficulties: [],
    },
  });
  const { fields, append } = useFieldArray({ control, name: "difficulties" });
  const [allGyms, setAllGyms] = useState<ClimbingGymLocation[]>([]);
  const [gymOptions, setGymOptions] = useState<GymOption[]>([]);
  const [difficultySets, setDifficultySets] = useState<DifficultySet[]>([]);
  const [selectedSet, setSelectedSet] = useState<DifficultySet>();
  const [difficultyCounts, setDifficultyCounts] = useState<DifficultyCompletion[]>([]);

  // Chargement des données initiales
  useEffect(() => {
    console.log("Chargement des salles d'escalade...");
    const getGyms = async () => {
      const allGyms = await getClimbingGyms();
      setAllGyms(allGyms);
      const options: GymOption[] = allGyms.map((gym: { gymName: string }) => ({
        label: gym.gymName,
        value: gym.gymName,
      }));
      setGymOptions(options);
    };
    const getAllDifficultySets = async () => {
      const DifficultySets = await getDifficultySets();
      setDifficultySets(DifficultySets);
      setSelectedSet(DifficultySets[0]);
    };
    getAllDifficultySets();
    getGyms();
  }, []);

  useEffect(() => {
    if (fields.length === 0 && selectedSet) {
      // Ajouter les difficultés déjà ordonnées grâce à `ordering` défini dans le modèle Django
      selectedSet.difficulties.forEach((difficultyOrder) => {
        append(difficultyOrder.difficulty);
      });
    }
  }, [append, selectedSet, fields.length]);

  const handleCountChange = (difficulty: Difficulty, count: number) => {
    setDifficultyCounts((prevCounts) => {
      const existing = prevCounts.find(
        (dc) => dc.difficulty.label === difficulty.label
      );
      if (existing) {
        return prevCounts.map((dc) =>
          dc.difficulty.label === difficulty.label ? { ...dc, count } : dc
        );
      } else {
        return [...prevCounts, { difficulty, count }];
      }
    });
  };
  
  // Post de la nouvelle session
  const addSession = async (data: FieldValues) => {
    // Récupérer la salle d'escalade sélectionnée
    const selectedGym: ClimbingGymLocation | undefined = allGyms.find((gym) => {
      return gym.gymName === data.location;
    });

    if (!selectedGym?.id) {
      console.error("Aucune salle d'escalade trouvée pour ce nom.");
      return; // Arrête la fonction si aucune salle n'est trouvée
    }

    //Remplacer les difficultées par leur id
    const difficultyCountsbis: DifficultyCompletionWithId[] =
      difficultyCounts.map((difficulty: DifficultyCompletion) => {
        const difficultyId = selectedSet?.difficulties.find(
          (d) => d.difficulty.label === difficulty.difficulty.label
        )?.difficulty.id;
        return { difficulty: difficultyId || 1, count: difficulty.count };
      });

    // Créer l'objet ClimbingSession à envoyer à l'API
    const newSession: ClimbingSession = {
      date: data.date,
      location: selectedGym.id,
      climbType: data.climbType,
      height: data.height,
      comments: data.comments,
      climber: 1,
      difficultySet: selectedSet?.id || 1,
      difficultyCompletions: difficultyCountsbis,
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
    gymOptions,
    difficultySets,
    selectedSet,
    setSelectedSet,
    handleCountChange,
    addSession,
  };
};
