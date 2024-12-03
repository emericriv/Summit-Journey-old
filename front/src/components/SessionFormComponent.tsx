// Page of redirection when a props.session need to be edeted
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useClimbingSessionForm } from "../hooks/useClimbingSessionForm";
import DateInput from "./SessionFormComponents/DateInput";
import GymLocationSelect from "./SessionFormComponents/GymLocationSelect";
import ClimbTypeSelect from "./SessionFormComponents/ClimbTypeSelect";
import DifficultySetSelect from "./SessionFormComponents/DifficultySetSelect";
import DifficultyList from "./SessionFormComponents/DifficultyList";
import HeightInput from "./SessionFormComponents/HeightInput";
import CommentInput from "./SessionFormComponents/CommentInput";
import { FieldValues } from "react-hook-form";
import { SessionFormComponentProps } from "../models/PropsInterface";
import { ClimbingSession } from "../models/ClimbingSession";
import {
  createClimbingSession,
  updateClimbingSession,
} from "../services/apiServices";

const SessionFormComponent: React.FC<SessionFormComponentProps> = (
  props: SessionFormComponentProps
) => {
  const {
    register,
    handleSubmit,
    setValue,
    isSubmitting,
    reset,
    defaultValues,
    fields,
    selectedSet,
    updateSelectedSet,
    PrepareDataForRequest,
    errors,
    control,
    watch,
  } = useClimbingSessionForm();

  const location = useLocation();
  const navigate = useNavigate();

  const previousRoute = location.state?.from || "/"; // Par défaut, retourne à "/"

  useEffect(() => {
    if (props.session) setValue("location", props.session.location.id);
  }, [props.session, setValue]);

  const onSubmit = async (data: FieldValues) => {
    const sessionRequest = PrepareDataForRequest({ data: data });
    if (props.session) {
      const updatedSession: ClimbingSession = {
        ...sessionRequest,
        id: props.session.id,
      };
      updateClimbingSession(updatedSession)
        .then((data) => {
          console.log("Session mise à jour avec succès:", data);
          navigate(previousRoute); // Redirige vers la route précédente
        })
        .catch((error) => {
          console.error("Erreur lors de la mise à jour de la session:", error);
        });
    } else {
      createClimbingSession(sessionRequest)
        .then((data) => {
          console.log("Session ajoutée avec succès:", data);
          // on ne fait le reset que lorsque la session est ajoutée
          reset(defaultValues);
        })
        .catch((error) => {
          console.error("Erreur lors de l'ajout de la session:", error);
        });
    }
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
        className="sessionForm global-appearance container py-5 py-md-0"
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
              watch={watch}
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
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn custom-btn"
          >
            {props.session
              ? "Mettre à jour la session"
              : "Enregistrer la session"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SessionFormComponent;
