import { useForm, FieldValues, useFieldArray } from "react-hook-form";
import Select, { StylesConfig } from "react-select";
import { useEffect, useState } from "react";

import {
  createClimbingSession,
  getClimbingGyms,
  getDifficultySets,
} from "../services/apiServices";
import {
  ClimbingSession,
  Difficulty,
  DifficultyCompletion,
  DifficultyCompletionWithId,
  DifficultySet,
} from "../models/ClimbingSession";
import { ClimbingGymLocation } from "../models/ClimbingGymLocation";
import { FormSessionProps, GymOption } from "../models/PropsInterface";
import DifficultyInput from "../components/DifficultyInput";

const selectStyles: StylesConfig<GymOption, false> = {
  control: (provided) => ({
    ...provided,
    boxShadow: "none",
    textAlign: "left",
    opacity: 0.8,
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "black" : "grey",
    backgroundColor: state.isSelected
      ? "lightgrey"
      : state.isFocused
      ? "lightgrey"
      : "white",
  }),
};

const NewSessionPage: React.FC = () => {
  // Hook form
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

  const { fields, append } = useFieldArray({
    control,
    name: "difficulties",
  });

  const [gymOptions, setGymOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [allGyms, setAllGyms] = useState<ClimbingGymLocation[]>([]);
  const [difficultySets, setDifficultySets] = useState<DifficultySet[]>();
  const [selectedSet, setSelectedSet] = useState<DifficultySet>();
  const [difficultyCounts, setDifficultyCounts] = useState<
    DifficultyCompletion[]
  >([]);

  // Charger les salles d'escalade lors du montage du composant
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

  return (
    <div className="hero-banner d-flex align-items-center justify-content-center">
      <div
        className="newSession container py-5 py-md-0"
        id="session-tab-pane"
        role="tabpanel"
        aria-labelledby="session-tab"
      >
        <form
          onSubmit={handleSubmit(async (data) => {
            console.log(data);
            addSession(data);
            // reset();
          })}
        >
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="sessionDate" className="form-label">
                Date de la session
              </label>
              <input
                {...register("date", { required: true })}
                type="date"
                className="form-control"
                id="sessionDate"
              />
            </div>
            <div className="col-md-6">
              <p className="form-label">Lieu</p>
              <Select<GymOption>
                options={gymOptions}
                onChange={(selectedOption) => {
                  setValue("location", selectedOption?.value || "");
                }}
                styles={selectStyles}
                placeholder="Lieu de la grimpe"
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="climbingType" className="form-label">
              Type de grimpe
            </label>
            <select
              {...register("climbType", { required: true })}
              className="form-select"
              id="climbingType"
            >
              <option value="IN">Intérieur</option>
              <option value="OUT">Extérieur</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="difficultySet" className="form-label">
              Set de difficulté
            </label>
            <select
              {...register("difficultySet", { required: true })}
              className="form-select"
              id="difficultySet"
              onChange={(e) => {
                const selectedSet = difficultySets?.find(
                  (set) => set.id === parseInt(e.target.value)
                );
                reset({ difficulties: [] });
                setSelectedSet(selectedSet);
              }}
            >
              {difficultySets?.map((set) => (
                <option key={set.id} value={set.id}>
                  {set.id}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <p className="form-label">Voies grimpées par difficulté</p>
            <div className="d-flex flex-wrap align-items-center row-gap-2">
              {selectedSet &&
                fields.map((field, index) => (
                  <DifficultyInput
                    key={index}
                    difficulty={field}
                    register={register}
                    name={`difficulties.${index}.label`}
                    onCountChange={handleCountChange}
                  />
                ))}
            </div>
            <p>Hauteur</p>
            <input
              {...register("height", { required: true })}
              type="number"
              className="form-control"
              placeholder="Hauteur grimpée en mètres"
              id="height"
            />
          </div>

          {/* <div className="mb-3">
            <div id="dropzone" className="drag-drop-area">
              <p>
                Déposez vos fichiers ici ou cliquez pour sélectionner des
                fichiers.
              </p>
              <input type="file" id="imageUpload" multiple accept="image/*" />
            </div>
          </div> */}

          <div className="mb-3">
            <label htmlFor="comments" className="form-label">
              Commentaires
            </label>
            <textarea
              {...register("comments")}
              className="form-control"
              placeholder="Commentaires sur la session"
              id="comments"
            ></textarea>
          </div>

          <button type="submit" disabled={isSubmitting} className="btn">
            Enregistrer la session
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewSessionPage;
