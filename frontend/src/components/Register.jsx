import { useState } from "react";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    function onSubmit(e) {
        e.preventDefault();

        fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ 
              email: email,
              password: password
            })
        })
        .then(res => {
            if (!res.ok) {
                throw new Error("registration failed");
            }
            setMessage("Bitte checke deine Inbox und bestätige dein E-Mail.");
            setEmail("");  
            setPassword("");
        })
        .catch((error) => setMessage("Registrierung fehlgeschlagen. Bitte kontrolliere deine Daten."));

    }

    return (
        <div className="login-container">
            <h2>Registration</h2>
            {message && <p>{message}</p>}
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email">E-Mail-Adresse</label>
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
                <button type="submit" className="login-button">Registrieren</button>
            </form>
        </div>
    )
}
