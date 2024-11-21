import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch("https://fullstack-authentication-nca6.onrender.com/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password })
    })
      .then((response) => {
          setLoading(false);
          if (response.status === 200) {
            setMessage("Login erfolgreich!");
            return response.json();
          } else if (response.status === 400 || response.status === 401) {
            setMessage("Bitte kontrolliere deine Daten");
          } else if (response.status === 403) {
            setMessage("Bitte bestätige deine E-Mail");
          } else {
            setMessage("Es gab einen Fehler. Bitte versuche es erneut.");
          }
      })
      .then((data) => {
        if (data && data.token) {
          localStorage.setItem("token", data.token); // Token speichern
          navigate("/home"); // Nach erfolgreichem Login umleiten
        }
      })
     .catch((error) => {
        setLoading(false);
        setMessage("Es gab ein Problem beim Verbinden mit dem Server.");
      });
    }
  

  return (
    <div className="login-container">
      <h2>Sign in to your account</h2>
      <form onSubmit={handleSubmit}>
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

        <div className="forgot-password">
          <a href="/forgot-password">Forgot your password?</a>
        </div>

        <div className="form-group">
          <label htmlFor="password">Passwort</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>


        <button type="submit" className="login-button">
          Anmelden
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;
