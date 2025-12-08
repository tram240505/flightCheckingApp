import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.status === 404) {
      // USER DOES NOT EXIST
      setErrorMsg("Account not found. Please register first.");
      return;
    }

    if (!res.ok) {
      // WRONG PASSWORD
      setErrorMsg(data.error || "Invalid credentials.");
      return;
    }

    // SUCCESS → GO TO OTP PAGE
    navigate("/verify-otp", { state: { email } });
  };

  return (
    <div>
      <h1>LOGIN</h1>

      <input 
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br />

      <input 
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br />

      <button onClick={login}>Login</button>

      {errorMsg && (
        <div style={{ marginTop: "10px", color: "red" }}>
          <p>{errorMsg}</p>
          <button
            onClick={() => navigate("/register")}
            style={{
              marginTop: "5px",
              padding: "6px 12px",
              border: "none",
              background: "blue",
              color: "white",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Register Now
          </button>
        </div>
      )}
    </div>
  );
}
