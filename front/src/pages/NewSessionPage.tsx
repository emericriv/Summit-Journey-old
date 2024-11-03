import { useForm, FieldValues } from "react-hook-form";
import Select, { StylesConfig } from "react-select";
import { useEffect, useState } from "react";

import {
  createClimbingSession,
  fetchClimbingGyms,
} from "../services/apiServices";
import { ClimbingSession } from "../models/ClimbingSession";
import { ClimbingGymLocation } from "../models/ClimbingGymLocation";
import { GymOption } from "../models/PropsInterface";
// import DifficultyInput from "../components/DifficultyInput";

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
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      location: "",
      climbType: "IN",
      height: 0,
      comments: "",
    },
  });

  const [gymOptions, setGymOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [allGyms, setAllGyms] = useState<ClimbingGymLocation[]>([]);

  // Charger les salles d'escalade lors du montage du composant
  useEffect(() => {
    console.log("Chargement des salles d'escalade...");
    const fetchGyms = async () => {
      const allGyms = await fetchClimbingGyms();
      setAllGyms(allGyms);
      const options: GymOption[] = allGyms.map((gym: { gymName: string }) => ({
        label: gym.gymName,
        value: gym.gymName,
      }));
      setGymOptions(options);
    };
    fetchGyms();
  }, []);

  // Post de la nouvelle session
  const addSession = async (data: FieldValues) => {
    // Récupérer la salle d'escalade sélectionnée
    const selectedGym: ClimbingGymLocation | undefined = allGyms.find((gym) => {
      return gym.gymName === data.location;
    });

    // Vérifier que la salle d'escalade existe
    if (!selectedGym?.id) {
      console.error("Aucune salle d'escalade trouvée pour ce nom.");
      return; // Arrête la fonction si aucune salle n'est trouvée
    }

    // Créer l'objet ClimbingSession à envoyer à l'API
    const newSession: ClimbingSession = {
      date: data.date,
      location: selectedGym.id,
      climbType: data.climbType,
      height: data.height,
      comments: data.comments,
      climber: 1,
    };

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
            reset();
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
                onChange={(selectedOption) =>
                  setValue("location", selectedOption?.value || "")
                }
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
            {/* <p className="form-label">Voies grimpées par difficulté</p>
            <div className="d-flex flex-wrap align-items-center row-gap-2">
              <DifficultyInput color="yellow" />
              <DifficultyInput color="green" />
              <DifficultyInput color="blue" />
              <DifficultyInput color="red" />
              <DifficultyInput color="black" />
              <DifficultyInput color="purple" />
            </div> */}
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
