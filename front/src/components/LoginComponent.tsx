import React, { useState } from "react";
import { connectUser } from "../services/apiServices";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface LoginProps {
  username: string;
  password: string;
}

const LoginComponent: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<LoginProps>();

  const { login } = useAuth();
  const navigate = useNavigate();

  // État pour gérer le message d'erreur
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = () => {
    // Réinitialiser le message d'erreur lors d'une saisie
    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  const onSubmit = async (data: FieldValues) => {
    try {
      const accessToken = await connectUser(data.username, data.password);
      if (accessToken) {
        login(); // Mettez à jour l'état d'authentification
        navigate("/profile"); // Redirigez après connexion
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      setErrorMessage(
        "Vérifiez votre nom d'utilisateur et mot de passe, il semblerait qu'il y ait une erreur."
      );
      // vider le champ mot de passe mais pas le nom d'utilisateur
      reset({ username: data.username, password: "" });
    }
  };

  return (
    <div className="form-style global-appearance login-form">
      <form onSubmit={handleSubmit(onSubmit)} className="login-grid">
        <h2>Connexion</h2>
        <div>
          <label htmlFor="username" className="form-label">
            Nom d'utilisateur
          </label>
          <input
            id="username"
            className="form-control"
            {...register("username", {
              required: "Le nom d'utilisateur est obligatoire",
            })}
            onChange={handleChange}
          />
          {errors.username && (
            <p className="error-message">{errors.username.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="password" className="form-label">
            Mot de passe
          </label>
          <input
            id="password"
            className="form-control"
            type="password"
            {...register("password", {
              required: "Le mot de passe est obligatoire",
            })}
            onChange={handleChange}
          />
          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}
        </div>
        <div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn custom-btn primary-transparent-bg submit-btn mt-2"
          >
            Se connecter
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginComponent;
