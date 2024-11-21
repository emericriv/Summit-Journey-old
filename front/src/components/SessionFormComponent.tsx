// Page of redirection when a props.session need to be edeted
import React, { useEffect } from "react";
import { useClimbingSessionForm } from "../hooks/useClimbingSessionForm";
import DateInput from "./NewSessionsComponent/DateInput";
import GymLocationSelect from "./NewSessionsComponent/GymLocationSelect";
import ClimbTypeSelect from "./NewSessionsComponent/ClimbTypeSelect";
import DifficultySetSelect from "./NewSessionsComponent/DifficultySetSelect";
import DifficultyList from "./NewSessionsComponent/DifficultyList";
import HeightInput from "./NewSessionsComponent/HeightInput";
import CommentInput from "./NewSessionsComponent/CommentInput";
import { FieldValues } from "react-hook-form";
import { SessionFormComponentProps } from "../models/PropsInterface";

const SessionFormComponent: React.FC<SessionFormComponentProps> = (
  props: SessionFormComponentProps
) => {
  const {
    register,
    handleSubmit,
    setValue,
    isSubmitting,
    reset,
    fields,
    selectedSet,
    updateSelectedSet,
    addUpdateSession,
    errors,
    control,
  } = useClimbingSessionForm();

  useEffect(() => {
    if (props.session) setValue("location", props.session.location.id);
  }, [props.session, setValue]);

  const onSubmit = async (data: FieldValues) => {
    if (props.session) {
      await addUpdateSession({ data: data, sessionId: props.session.id });
    } else {
      await addUpdateSession({ data: data });
    }
    reset();
  };

  useEffect(() => {
    console.log("errors", errors);
  }, [errors]);

  useEffect(() => {
    // Pré-remplir le formulaire avec les données de la session
    if (props.session) {
      reset({
        date: props.session.date || new Date().toISOString().split("T")[0],
        location: props.session.location.id,
        climbType: props.session.climbType || "IN",
        height: props.session.height || 5,
        comments: props.session.comments || "",
        difficultySet: props.session.difficultySet || undefined,
        difficulties: props.session.difficultyCompletions || [],
      });
    }
  }, [props.session, reset]);

  return (
    <div className="hero-banner d-flex align-items-center justify-content-center my-3">
      <div
        className="newSession container py-5 py-md-0"
        id="props.session-tab-pane"
        role="tabpanel"
        aria-labelledby="props.session-tab"
      >
        {/* Add props.session ands reset form on submit */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row mb-3">
            <DateInput register={register} />
            <GymLocationSelect
              control={control}
              initGymId={props.session?.location.id}
            />
          </div>
          <ClimbTypeSelect register={register} />
          <DifficultySetSelect
            updateSelectedSet={updateSelectedSet}
            reset={reset}
            register={register}
            initSetId={props.session?.difficultySet}
          />
          <DifficultyList
            fields={fields}
            register={register}
            selectedSet={selectedSet}
          />
          <HeightInput register={register} />
          <CommentInput register={register} />
          <button type="submit" disabled={isSubmitting} className="btn">
            Mettre à jour la props.session
          </button>
        </form>
      </div>
    </div>
  );
};

export default SessionFormComponent;
