import DifficultyInput from "../components/DifficultyInput";

const NewSessionPage: React.FC = () => {
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
              <input type="date" className="form-control" id="sessionDate" />
            </div>
            <div className="col-md-6">
              <label htmlFor="location" className="form-label">
                Lieu
              </label>
              <input
                type="text"
                className="form-control"
                id="location"
                placeholder="Lieu de la grimpe"
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="climbingType" className="form-label">
              Type de grimpe
            </label>
            <select className="form-select" id="climbingType">
              <option value="interior">Intérieur</option>
              <option value="exterior">Extérieur</option>
            </select>
          </div>

          <div className="mb-3">
            <p className="form-label">Voies grimpées par difficulté</p>
            <div className="d-flex flex-wrap align-items-center row-gap-2">
              <DifficultyInput color="yellow" />
              <DifficultyInput color="green" />
              <DifficultyInput color="blue" />
              <DifficultyInput color="red" />
              <DifficultyInput color="black" />
              <DifficultyInput color="purple" />
            </div>
          </div>

          <div className="mb-3">
            <div id="dropzone" className="drag-drop-area">
              <p>
                Déposez vos fichiers ici ou cliquez pour sélectionner des
                fichiers.
              </p>
              <input type="file" id="imageUpload" multiple accept="image/*" />
            </div>
          </div>

          <button type="submit" className="btn">
            Enregistrer la session
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewSessionPage;
