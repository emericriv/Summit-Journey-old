import React, { useState } from "react";
import { connectUser } from "../services/apiServices";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    if (!email || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    setError(null);

    connectUser(email, password)
      .then((accessToken) => {
        console.log("Token d'accès:", accessToken);
        // Rediriger l'utilisateur vers une autre page
      })
      .catch((error) => {
        setError(`Erreur lors de la connexion : ${error.message}`);
      });
  };

  return (
    <div style={styles.container}>
      {/* <form style={styles.form}> */}
      <h2 style={styles.title}>Connexion</h2>
      {error && <p style={styles.error}>{error}</p>}
      <div style={styles.inputGroup}>
        <label htmlFor="email" style={styles.label}>
          Email
        </label>
        <input
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />
      </div>
      <div style={styles.inputGroup}>
        <label htmlFor="password" style={styles.label}>
          Mot de passe
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
      </div>
      <button onClick={handleSubmit} style={styles.button}>
        Se connecter
      </button>
      {/* </form> */}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
  },
  form: {
    width: "100%",
    maxWidth: "400px",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  title: {
    marginBottom: "20px",
    fontSize: "24px",
    textAlign: "center",
    color: "#333",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontSize: "14px",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    outline: "none",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
  error: {
    color: "red",
    marginBottom: "15px",
    textAlign: "center",
  },
};

export default LoginPage;
