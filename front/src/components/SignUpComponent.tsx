import React, { useState } from "react";
import { connectUser, createUser } from "../services/apiServices";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { CustomUser } from "../models/CustomUser";
import CityAutoComplete from "./CityAutoComplete";

interface SignUpProps {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  zipCode: string;
  city: string;
  password: string;
  passwordConfirmation: string;
}

const SignUpComponent: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    getValues,
    reset,
    control,
  } = useForm<SignUpProps>();

  const { login } = useAuth();
  const navigate = useNavigate();

  // État pour gérer le message d'erreur
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: FieldValues) => {
    try {
      console.log(data);
      const newUser: CustomUser = {
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        zipCode: data.zipCode,
        city: data.city,
        password: data.password,
      };
      createUser(newUser).then(async (response) => {
        console.log(response);
        const accessToken = await connectUser(data.username, data.password);
        if (accessToken) {
          login(); // Mettez à jour l'état d'authentification
          navigate("/profile"); // Redirigez après connexion
        }
      });
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      setErrorMessage(
        "Erreur lors de la création du compte. Veuillez réessayer."
      );
      // vider le champ mot de passe et confirmation de mot de passe mais pas les autres champs
      reset({
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        zipCode: data.zipCode,
        city: data.city,
        password: "",
        passwordConfirmation: "",
      });
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div className="form-style global-appearance signup-form">
      <form onSubmit={handleSubmit(onSubmit)} className="signup-grid">
        <h2>Inscription</h2>
        <div className="username-input">
          <label htmlFor="register-username">Nom d'utilisateur</label>
          <input
            id="register-username"
            className="form-control"
            {...register("username", {
              required: "Renseignez votre nom d'utilisateur",
            })}
          />
          {errors.username && (
            <p className="error-message">{errors.username.message}</p>
          )}
        </div>
        <div className="first-name-input">
          <label htmlFor="register-first-name">Prénom</label>
          <input
            id="register-first-name"
            className="form-control"
            {...register("firstName", {
              required: "Renseignez votre prénom",
            })}
          />
          {errors.firstName && (
            <p className="error-message">{errors.firstName.message}</p>
          )}
        </div>
        <div className="last-name-input">
          <label htmlFor="register-last-name">Nom de famille</label>
          <input
            id="register-last-name"
            className="form-control"
            {...register("lastName", {
              required: "Renseignez votre nom",
            })}
          />
          {errors.lastName && (
            <p className="error-message">{errors.lastName.message}</p>
          )}
        </div>
        <div className="email-input">
          <label htmlFor="register-email">e-mail</label>
          <input
            id="register-email"
            className="form-control"
            {...register("email", {
              required: "Le nom d'utilisateur est obligatoire",
            })}
          />
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}
        </div>
        <div className="zip-code-input">
          <label htmlFor="register-zip-code">Code ZIP</label>
          <input
            id="register-zip-code"
            className="form-control"
            {...register("zipCode", {
              required: "Renseignez votre code ZIP",
              minLength: {
                value: 5,
                message: "Le code ZIP doit contenir 5 caractères",
              },
              maxLength: {
                value: 5,
                message: "Le code ZIP doit contenir 5 caractères",
              },
            })}
          />
          {errors.zipCode && (
            <p className="error-message">{errors.zipCode.message}</p>
          )}
        </div>
        <div className="city-input">
          <label htmlFor="register-city">Ville</label>
          {/* <input
            id="register-city"
            className="form-control"
            {...register("city", {
              required: "La ville est obligatoire",
            })}
          /> */}
          <Controller
            name="city"
            control={control}
            render={({ field: { onChange, onBlur, ref } }) => {
              return (
                <CityAutoComplete
                  setCityLabel={(city: string) => {
                    onChange(city);
                  }}
                  onBlur={onBlur}
                  ref={ref}
                  placeholder=""
                />
              );
            }}
          />
          {errors.city && (
            <p className="error-message">{errors.city.message}</p>
          )}
        </div>
        <div className="password-input">
          <label htmlFor="register-password">Mot de passe</label>
          <input
            id="register-password"
            className="form-control"
            type="password"
            {...register("password", {
              required: "Le mot de passe est obligatoire",
            })}
          />
          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}
        </div>
        <div className="password-confirmation-input">
          <label htmlFor="register-password-confirmation">
            Confirmation du mot de passe
          </label>
          <input
            id="register-password-confirmation"
            className="form-control"
            type="password"
            {...register("passwordConfirmation", {
              required: "Confirmez votre mot de passe",
              validate: (value) =>
                value === getValues("password") ||
                "Les mots de passe ne correspondent pas",
            })}
          />
          {errors.passwordConfirmation && (
            <p className="error-message">
              {errors.passwordConfirmation.message}
            </p>
          )}
        </div>
        <div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn custom-btn primary-transparent-bg submit-btn mt-2"
          >
            S'incrire
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpComponent;
