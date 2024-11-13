import { useClimbingSessionForm } from "../hooks/useClimbingSessionForm";
import DateInput from "../components/NewSessionsComponent/DateInput";
import GymLocationSelect from "../components/NewSessionsComponent/GymLocationSelect";
import ClimbTypeSelect from "../components/NewSessionsComponent/ClimbTypeSelect";
import DifficultySetSelect from "../components/NewSessionsComponent/DifficultySetSelect";
import DifficultyList from "../components/NewSessionsComponent/DifficultyList";
import CommentInput from "../components/NewSessionsComponent/CommentInput";

const NewSessionPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    isSubmitting,
    reset,
    fields,
    gymOptions,
    difficultySets,
    selectedSet,
    setSelectedSet,
    handleCountChange,
    addSession,
  } = useClimbingSessionForm();

  return (
    <div className="hero-banner d-flex align-items-center justify-content-center">
      <div
        className="newSession container py-5 py-md-0"
        id="session-tab-pane"
        role="tabpanel"
        aria-labelledby="session-tab"
      >
        <form onSubmit={handleSubmit(addSession)}>
          <div className="row mb-3">
            <DateInput register={register} />
            <GymLocationSelect options={gymOptions} setValue={setValue} />
          </div>
          <ClimbTypeSelect register={register} />
          <DifficultySetSelect
            options={difficultySets}
            setSelectedSet={setSelectedSet}
            reset={reset}
            register={register}
          />
          <DifficultyList
            fields={fields}
            register={register}
            handleCountChange={handleCountChange}
            selectedSet={selectedSet}
          />
          <CommentInput register={register} />
          <button type="submit" disabled={isSubmitting} className="btn">
            Enregistrer la session
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewSessionPage;
