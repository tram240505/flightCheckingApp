import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
    const navigate = useNavigate();


  const handleRegister = async () => {
    const res = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password}),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("User created! Now you can login.");
    } else {
      setMessage(data.error || "Error");
    }
  };

 return (
    <div>
      <h2>Register</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br/>

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br/>

      <button onClick={handleRegister}>Register</button>

      {message && (
        <div style={{ marginTop: "10px" }}>
          <p>{message}</p>

          {/* BUTTON BACK TO LOGIN */}
          <button
            onClick={() => navigate("/login")}
            style={{
              marginTop: "5px",
              padding: "6px 12px",
              background: "blue",
              color: "white",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
            }}
          >
         Login
          </button>
        </div>
      )}
    </div>
  );
}
