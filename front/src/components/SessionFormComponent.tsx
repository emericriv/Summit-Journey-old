// Page of redirection when a props.session need to be edeted
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useClimbingSessionForm } from "../hooks/useClimbingSessionForm";
import DateInput from "./FormComponents/DateInput";
import GymLocationSelectForm from "./FormComponents/GymLocationSelectForm";
import ClimbTypeSelect from "./FormComponents/ClimbTypeSelect";
import DifficultySetSelect from "./FormComponents/DifficultySetSelect";
import DifficultyList from "./FormComponents/DifficultyList";
import HeightInput from "./FormComponents/HeightInput";
import CommentInput from "./FormComponents/CommentInput";
import { FieldValues } from "react-hook-form";
import { SessionFormComponentProps } from "../models/PropsInterface";
import { ClimbingSession } from "../models/ClimbingSession";
import {
  createClimbingSession,
  updateClimbingSession,
} from "../services/apiServices";
import { useAuth } from "../context/AuthContext";

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
  } = useClimbingSessionForm();

  const location = useLocation();
  const navigate = useNavigate();

  const { user } = useAuth();

  const previousRoute = location.state?.from || "/"; // Par défaut, retourne à "/"
  // Récupérer le startTime passé dans les query params
  const searchParams = new URLSearchParams(location.search);
  const startTime = searchParams.get("startTime");

  // Convertir la date ISO en format compatible avec datetime-local
  const formatDateForInput = (isoDate: string | null) => {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    const localDate = date.toISOString().slice(0, 16);
    return localDate;
  };

  if (startTime) {
    const initialStartTime = formatDateForInput(startTime);
    setValue("dateTimeStart", initialStartTime);
  }

  const [isSaved, setIsSaved] = React.useState(false);

  useEffect(() => {
    if (props.session) setValue("location", props.session.location.id);
  }, [props.session, setValue]);

  const onSubmit = async (data: FieldValues) => {
    const sessionRequest = PrepareDataForRequest({ data: data });
    // Si une props.session est passée, on met à jour la session
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
      // Sinon, on crée une nouvelle session
      createClimbingSession(sessionRequest)
        .then((data) => {
          console.log("Session ajoutée avec succès:", data);
          // on ne fait le reset que lorsque la session est ajoutée
          reset(defaultValues);
          setIsSaved(true);
          setTimeout(() => {
            setIsSaved(false);
          }, 3000);
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
        dateTimeStart:
          formatDateForInput(props.session.dateTimeStart) ||
          new Date()
            .toLocaleString(undefined, { timeZoneName: "short" })
            .replace(" ", "T")
            .slice(0, 16),
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
    <div className="hero-banner d-flex align-items-center justify-content-center">
      <div
        className="form-style global-appearance container py-2 py-md-0 m-4 m-d-0"
        id="session-tab-pane"
        role="tabpanel"
        aria-labelledby="session-tab"
      >
        {/* Add props.session ands reset form on submit */}
        <form onSubmit={handleSubmit(onSubmit)} className="session-form-grid">
          <DateInput register={register} />
          <div className="gym-location-select">
            <GymLocationSelectForm
              control={control}
              initGymId={
                props.session?.location.id || user?.favoriteClimbingGym?.id
              }
            />
          </div>
          <ClimbTypeSelect register={register} />
          <HeightInput register={register} />
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
          <CommentInput register={register} />
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn custom-btn primary-transparent-bg submit-btn mt-2"
          >
            {props.session
              ? "Mettre à jour la session"
              : "Enregistrer la session"}
          </button>
          {isSaved ? (
            <div className="alert alert-info mb-0 px-2 py-1 mt-2 d-flex align-items-center justify-content-center saved-info">
              Session enregistrée !
            </div>
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default SessionFormComponent;
