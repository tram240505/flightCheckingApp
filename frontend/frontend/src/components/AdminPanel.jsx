import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function AdminPanel() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState("");

  const [form, setForm] = useState({
    airline: "",
    flight: "",
    source_city: "",
    departure_time: "",
    stops: "",
    arrival_time: "",
    destination_city: "",
    class: "",
    duration: "",
    days_left: "",
    price: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addFlight = async () => {
    setMsg("");
    const token = localStorage.getItem("token");

    const res = await fetch(`${import.meta.env.VITE_API_URL}/flights/admin/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        ...form,
        stops: Number(form.stops),
        duration: Number(form.duration),
        days_left: Number(form.days_left),
        price: Number(form.price),
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setErrors(data.errors || {});
      return;
    }

    setErrors({});
    setMsg("Flight added successfully!");

    setForm({
      airline: "",
      flight: "",
      source_city: "",
      departure_time: "",
      stops: "",
      arrival_time: "",
      destination_city: "",
      class: "",
      duration: "",
      days_left: "",
      price: "",
    });
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin Panel</h1>

      {msg && <p className="admin-success">{msg}</p>}

      {Object.keys(form).map((key) => (
        <div key={key}>
          <input
            className="admin-input"
            name={key}
            placeholder={key.replace("_", " ")}
            value={form[key]}
            onChange={handleChange}
          />
          {errors[key] && <p className="admin-error">{errors[key]}</p>}
        </div>
      ))}

      <button className="admin-btn add" onClick={addFlight}>
        Add Flight
      </button>

      <button className="admin-btn back" onClick={() => navigate("/")}>
        Back Home
      </button>

      <button className="admin-btn logout" onClick={() => {
        localStorage.clear();
        navigate("/login");
      }}>
        Logout
      </button>
    </div>
  );
}
