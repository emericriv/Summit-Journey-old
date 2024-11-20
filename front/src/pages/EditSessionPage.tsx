// Page of redirection when a session need to be edeted
import React, { useEffect, useState } from "react";
import { useClimbingSessionForm } from "../hooks/useClimbingSessionForm";
import DateInput from "../components/NewSessionsComponent/DateInput";
import GymLocationSelect from "../components/NewSessionsComponent/GymLocationSelect";
import ClimbTypeSelect from "../components/NewSessionsComponent/ClimbTypeSelect";
import DifficultySetSelect from "../components/NewSessionsComponent/DifficultySetSelect";
import DifficultyList from "../components/NewSessionsComponent/DifficultyList";
import HeightInput from "../components/NewSessionsComponent/HeightInput";
import CommentInput from "../components/NewSessionsComponent/CommentInput";
import { FieldValues } from "react-hook-form";
import { useParams } from "react-router-dom";
import { GetClimbingSession } from "../models/ClimbingSession";
import { GetClimbingSessionById } from "../services/apiServices";

const EditSessionPage: React.FC = () => {
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

  const { id } = useParams<{ id: string }>();
  const [session, setSession] = useState<GetClimbingSession>();

  useEffect(() => {
    if (!session && id) {
      const fetchSession = async () => {
        try {
          const response = await GetClimbingSessionById(Number(id));
          setSession(response);
        } catch (error) {
          console.error("Erreur lors du chargement de la session :", error);
        }
      };
      fetchSession();
    }
  }, [id, session]);

  useEffect(() => {
    if (session) setValue("location", session?.location.id);
  }, [session, setValue]);

  const onSubmit = async (data: FieldValues) => {
    if (session) {
      await addUpdateSession({ data: data, sessionId: session.id });
    }
    reset();
  };

  useEffect(() => {
    console.log("errors", errors);
  }, [errors]);

  // Permet de pré-remplir le formulaire avec les données de la session
  useEffect(() => {
    // Pré-remplir le formulaire avec les données de la session
    if (session) {
      reset({
        date: session.date || new Date().toISOString().split("T")[0],
        location: session.location.id,
        climbType: session.climbType || "IN",
        height: session.height || 5,
        comments: session.comments || "",
        difficultySet: session.difficultySet || undefined,
        difficulties: session.difficultyCompletions || [],
      });
    }
  }, [session, reset]);

  return (
    <div className="hero-banner d-flex align-items-center justify-content-center my-3">
      <div
        className="newSession container py-5 py-md-0"
        id="session-tab-pane"
        role="tabpanel"
        aria-labelledby="session-tab"
      >
        {/* Add session ands reset form on submit */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row mb-3">
            <DateInput register={register} />
            <GymLocationSelect
              control={control}
              initGymId={session?.location.id}
            />
          </div>
          <ClimbTypeSelect register={register} />
          <DifficultySetSelect
            updateSelectedSet={updateSelectedSet}
            reset={reset}
            register={register}
          />
          <DifficultyList
            fields={fields}
            register={register}
            selectedSet={selectedSet}
          />
          <HeightInput register={register} />
          <CommentInput register={register} />
          <button type="submit" disabled={isSubmitting} className="btn">
            Mettre à jour la session
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditSessionPage;
