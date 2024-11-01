import { useForm } from "react-hook-form";
import Select from "react-select";
import { useEffect, useState } from "react";

import {
  createClimbingSession,
  fetchClimbingGyms,
} from "../services/apiServices";
import { ClimbingSession } from "../models/ClimbingSession";
import { ClimbingGymLocation } from "../models/ClimbingGymLocation";
// import DifficultyInput from "../components/DifficultyInput";

interface FormValues {
  date: string;
  location: string;
  climbType: string;
  height: number;
  comments: string;
}

const NewSessionPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    // formState: { errors },
  } = useForm({
    defaultValues: {
      date: "",
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
    const fetchGyms = async () => {
      const allGyms = await fetchClimbingGyms();
      setAllGyms(allGyms);
      const options = allGyms.map((gym: { gymName: string }) => ({
        label: gym.gymName,
        value: gym.gymName,
      }));
      setGymOptions(options);
    };
    fetchGyms();
  }, []);

  const addSession = async (data: FormValues) => {
    const selectedGym: ClimbingGymLocation | undefined = allGyms.find((gym) => {
      return gym.gymName === data.location;
    });

    if (!selectedGym) {
      console.error("Aucune salle d'escalade trouvée pour ce nom.");
      return; // Arrête la fonction si aucune salle n'est trouvée
    }

    const newSession: ClimbingSession = {
      date: data.date,
      location: selectedGym.id || 0,
      climbType: data.climbType,
      height: data.height,
      comments: data.comments,
      climber: 1,
    };

    console.log("Nouvelle session à ajouter:", newSession);

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
          onSubmit={handleSubmit((data) => {
            console.log(data);
            addSession(data);
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
              <label className="form-label">Lieu</label>
              <Select
                className="basic-single"
                classNamePrefix="select"
                options={gymOptions}
                onChange={(selectedOption) =>
                  setValue("location", selectedOption?.value || "")
                }
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

          <input type="submit" className="btn" value="Enregistrer la session" />
        </form>
      </div>
    </div>
  );
};

export default NewSessionPage;
