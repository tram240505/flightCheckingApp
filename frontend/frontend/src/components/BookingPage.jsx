import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function BookingPage() {
  const { id } = useParams(); // flightId
  const navigate = useNavigate();

  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // Fetch flight details when page loads
  useEffect(() => {
    fetch(`http://localhost:3000/flights/${id}`)
      .then(res => res.json())
      .then(data => {
        setFlight(data);
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:3000/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        flightId: id,
        name,
        phone,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Booking successful!");
      navigate("/my-bookings");
    } else {
      alert(data.error);
    }
  };

  // Loading indicator
  if (loading) return <p>Loading flight...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Booking Page</h1>


      <div
        style={{
          border: "1px solid #ccc",
          padding: 15,
          borderRadius: 8,
          marginBottom: 20,
          background: "#f9f9f9"
        }}
      >
        <h2>{flight.flight} - {flight.airline}</h2>
        <p>{flight.source_city} → {flight.destination_city}</p>
        <p>Departure: {flight.departure_time}</p>
        <p>Arrival: {flight.arrival_time}</p>
        <p>Price: ${flight.price}</p>
      </div>

    
      <h2>Your Details</h2>

      <input
        placeholder="Your Name"
        value={name}
        onChange={e => setName(e.target.value)}
        style={{ display: "block", marginBottom: 10, padding: 10 }}
      />

      <input
        placeholder="Phone Number"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        style={{ display: "block", marginBottom: 10, padding: 10 }}
      />

      <button onClick={handleSubmit} style={{ padding: "10px 20px" }}>
        Confirm Booking
      </button>

      <br /><br />

      <button onClick={() => navigate("/")}>Back Home</button>
    </div>
  );
}
