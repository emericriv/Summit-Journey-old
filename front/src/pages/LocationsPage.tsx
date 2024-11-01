import SearchClimbingGyms from "../components/SearchClimbingGym";

const LocationsPage: React.FC = () => {
  return (
    <div className="hero-banner d-flex align-items-center justify-content-center">
      <div
        className="container py-3"
        id="location-tab-pane"
        role="tabpanel"
        aria-labelledby="location-tab"
      >
        <SearchClimbingGyms />
      </div>
    </div>
  );
};

export default LocationsPage;
