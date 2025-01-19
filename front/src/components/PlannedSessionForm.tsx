// PlannedSessionForm.tsx
import { useForm } from "react-hook-form";
import { PlannedClimbingSession } from "../models/PlannedClimbingSession";
import GymLocationSelectForm from "./FormComponents/GymLocationSelectForm";
import { useAuth } from "../context/AuthContext";

const PlannedSessionForm = ({
  onSubmit,
}: {
  onSubmit: (data: PlannedClimbingSession) => void;
}) => {
  const { register, handleSubmit, control } = useForm<PlannedClimbingSession>();
  const { user } = useAuth();

  return (
    <>
      <div className="form-style">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="planned-session-form"
        >
          <GymLocationSelectForm
            control={control}
            initGymId={user?.favoriteClimbingGym?.id}
          />

          <div className="start-time-input">
            <label htmlFor="start-time" className="form-label">
              Heure de début
            </label>
            <input
              id="start-time"
              type="datetime-local"
              {...register("startTime")}
              className="form-control"
              required
            />
          </div>

          <div className="end-time-input">
            <label htmlFor="end-time" className="form-label">
              Heure de fin
            </label>
            <input
              id="end-time"
              type="datetime-local"
              className="form-control"
              {...register("endTime")}
            />
          </div>

          <div className="participants-input">
            <label htmlFor="participants" className="form-label">
              Autres participants
            </label>
            <input
              id="participants"
              className="form-control"
              {...register("participants")}
              placeholder="Participants (comma-separated)"
            />
          </div>
          <button
            type="submit"
            className="btn custom-btn primary-transparent-bg submit-btn mt-2"
          >
            Planifier la session
          </button>
        </form>
      </div>
    </>
  );
};

export default PlannedSessionForm;
