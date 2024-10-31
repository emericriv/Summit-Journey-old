import { SearchPlaceResponse } from "../models/Searchplaces";
import axios from "axios";

const LocationsPage: React.FC = () => {
  const searchPlace = async () => {
    const query = "Salle d'escalade Toulouse";

    try {
      const response = await axios.get<SearchPlaceResponse>(
        `http://127.0.0.1:8000/api/search-place/?query=${encodeURIComponent(
          query
        )}`
      );
      console.log(response.data.results); // `response.data` est maintenant de type `SearchPlaceResponse`
    } catch (error) {
      console.error("Erreur lors de la recherche :", error);
    }
  };

  return (
    <div className="hero-banner align-items-center justify-content-center">
      <div
        className="container py-5 py-md-0"
        id="location-tab-pane"
        role="tabpanel"
        aria-labelledby="location-tab"
      >
        <h2>Où grimper ?</h2>
        <div className="row">
          <div className="city-selection col-md-6">
            <h3>Choisis ta salle :</h3>
            <input
              type="text"
              className="form-control"
              id="location"
              placeholder="test"
            />

            <button id="searchGyms" className="btn" onClick={searchPlace}>
              Indique moi les salles dans cette ville
            </button>
          </div>
          <div className="map col-md-6 card w-50 p-3">
            <div className="card-body">
              <h5 className="card-title">
                Découvre les salles d'escalade près de chez toi
              </h5>
            </div>
            <div className="ratio ratio-1x1">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d356933.8714888409!2d10.413661869378636!3d45.65994086120074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4781eca8aec020b9%3A0x91dcf07c1c969bb8!2sGarda!5e0!3m2!1spl!2spl!4v1672244147501!5m2!1spl!2spl"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationsPage;
