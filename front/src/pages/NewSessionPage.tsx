import { useState } from "react";
import { createClimbingSession } from "../services/apiServices";
import { ClimbingSession } from "../models/ClimbingSession";
// import DifficultyInput from "../components/DifficultyInput";

const NewSessionPage: React.FC = () => {
  // const [date, setDate] = useState("");
  // const [location, setLocation] = useState("");
  // const [climbingType, setClimbingType] = useState("interior");
  // const [height, setHeight] = useState(0);
  // const [comments, setComments] = useState("");

  // const [formData, setFormData] = useState<ClimbingSession>({
  //   date: "2024-10-30",
  //   location: "iriji",
  //   climbType: "interior",
  //   height: 0,
  //   comments: "jojoij",
  // });

  const [formData, setFormData] = useState({
    date: "",
    location: "",
    climbType: "IN",
    height: 5,
    comments: "",
  });

  const addSession = async () => {
    const newSession: ClimbingSession = formData;
    // newSession.climbType = newSession.climbType === "interior" ? "IN" : "OUT";

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
        <form>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="sessionDate" className="form-label">
                Date de la session
              </label>
              <input
                type="date"
                className="form-control"
                id="sessionDate"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="location" className="form-label">
                Lieu
              </label>
              <input
                type="text"
                className="form-control"
                id="location"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
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
              className="form-select"
              id="climbingType"
              value={formData.climbType}
              onChange={(e) =>
                setFormData({ ...formData, climbType: e.target.value })
              }
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
              type="number"
              className="form-control"
              id="height"
              value={formData.height}
              onChange={(e) =>
                setFormData({ ...formData, height: parseInt(e.target.value) })
              }
              placeholder="Hauteur grimpée en mètres"
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
              className="form-control"
              id="comments"
              placeholder="Commentaires sur la session"
              onChange={(e) =>
                setFormData({ ...formData, comments: e.target.value })
              }
              value={formData.comments}
            ></textarea>
          </div>
        </form>

        <button onClick={addSession} className="btn">
          Enregistrer la session
        </button>
      </div>
    </div>
  );
};

export default NewSessionPage;
