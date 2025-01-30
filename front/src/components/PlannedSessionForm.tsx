// PlannedSessionForm.tsx
import { Controller, useForm } from "react-hook-form";
import { PlannedClimbingSession } from "../models/PlannedClimbingSession";
import GymLocationSelectForm from "./FormComponents/GymLocationSelectForm";
import { useAuth } from "../context/AuthContext";
import DatePicker, { registerLocale } from "react-datepicker";
import { fr } from "date-fns/locale/fr";
registerLocale("fr", fr);
import { useState } from "react";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import "react-datepicker/dist/react-datepicker-cssmodules.css";

const PlannedSessionForm = ({
  onSubmit,
}: {
  onSubmit: (data: PlannedClimbingSession) => void;
}) => {
  const { register, handleSubmit, control } = useForm<PlannedClimbingSession>();
  const { user } = useAuth();
  const [date, setDate] = useState<Date | null>(new Date());

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
            <Controller
              name="startTime"
              control={control}
              defaultValue={date?.toISOString() || ""}
              render={({ field }) => (
                <DatePicker
                  locale="fr"
                  id="start-time"
                  selected={date}
                  dateFormat="dd/MM/yyyy, HH:mm"
                  showWeekNumbers
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  className="form-control"
                  minDate={new Date()}
                  timeCaption="Heure"
                  onChange={(selectedDate) => {
                    setDate(selectedDate);
                    field.onChange(selectedDate?.toISOString() || ""); // Met à jour la valeur dans react-hook-form
                  }}
                />
              )}
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
