import SessionHistory from "../components/SessionHistory";

const AllSessionPage: React.FC = () => {
  return (
    <div className="hero-banner d-flex justify-content-center align-items-center">
      <div className="card global-appearance my-4" style={{ width: "90vw" }}>
        <div className="card-body">
          <h3 className="mb-3">Historique de toutes les sessions</h3>
          <SessionHistory numberOfSessions={"all"} />
        </div>
      </div>
    </div>
  );
};

export default AllSessionPage;
