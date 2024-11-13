import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault()

    fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, rememberMe })
        .then((response) => {
          if (response.status === 200) {
            setMessage("Login erfolgreich!");
          } else if (response.status === 400 || response.status === 401) {
            setMessage("Bitte kontrolliere deine Daten");
          } else if (response.status === 403) {
            setMessage("Bitte bestätige deine E-Mail");
          } else {
            setMessage("Es gab einen Fehler. Bitte versuche es erneut.");
          }
        })
        .catch((error) => {
          setMessage("Es gab ein Problem beim Verbinden mit dem Server.");
        })
    })
  }
    //   });

    //   if (response.status === 400 || response.status === 401) {
    //     setMessage("Bitte kontrolliere deine Daten.");
    //   } else if (response.status === 403) {
    //     setMessage("Bitte bestätige deine E-Mail.");
    //   } else if (response.ok) {
    //     setMessage("Login erfolgreich!");
    //   } else {
    //     setMessage("Anmeldung fehlgeschlagen. Bitte versuche es erneut.");
    //   }
    // } catch (error) {
    //   setMessage("Es gab ein Problem beim Verbinden mit dem Server.");
    // };

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

         <div className="remember-me">
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label htmlFor="rememberMe">Remember me on this device</label>
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
