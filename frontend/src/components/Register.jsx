import { useState } from "react";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 201) {
        setMessage("Bitte checke deine Inbox und bestätige dein E-Mail.");
      } else if (response.status === 400) {
        setMessage("Registrierung fehlgeschlagen. Bitte kontrolliere deine Eingaben.");
      } else {
        setMessage("Es gab einen Fehler. Bitte versuche es erneut.");
      }
    } catch (error) {
      setMessage("Es gab ein Problem beim Verbinden mit dem Server.");
    }
  };

  return (
    <div className="register-container">
      <h2>Create a new account</h2>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Passwort</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="register-button">
          Registrieren
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Register;
