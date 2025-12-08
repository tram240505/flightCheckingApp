import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function VerifyOtp() {
  const { state } = useLocation();
  const email = state?.email;
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const verify = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
      localStorage.setItem("email", email);
      navigate("/");
    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="otp-box">
      <h2>Verify OTP</h2>
      <p>OTP sent to: {email}</p>
      <input placeholder="Enter OTP" value={otp} onChange={e=>setOtp(e.target.value)} />
      <button onClick={verify}>Verify</button>
    </div>
  );
}
