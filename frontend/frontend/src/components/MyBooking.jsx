import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${import.meta.env.VITE_API_URL}/bookings/my`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setBookings(data));
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={{ padding: 20, position: "relative" }}>
      
  
      <button
        onClick={logout}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          background: "red",
          color: "white",
          padding: "8px 14px",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Logout
      </button>

      <h1 style={{ marginTop: 40 }}>My Bookings</h1>

     
      <button
        onClick={() => navigate("/")}
        style={{
          background: "#007bff",
          color: "white",
          padding: "8px 14px",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
          margin: "10px 0 20px 0",
          display: "inline-block",
        }}
      >
        ← Back to Home
      </button>

  
      {bookings.length === 0 && (
        <p>No bookings found.</p>
      )}

      {/* LIST BOOKINGS */}
      {bookings.map((b) => (
        <div
          key={b._id}
          style={{
            border: "1px solid #ccc",
            padding: 15,
            marginBottom: 10,
            borderRadius: 6,
            background: "#f9f9f9"
          }}
        >
          <h3>
            {b.flightId.flight} - {b.flightId.airline}
          </h3>
          <p>
            {b.flightId.source_city} → {b.flightId.destination_city}
          </p>
          <p><strong>Price:</strong> ${b.flightId.price}</p>
          <p><strong>Name:</strong> {b.name}</p>
          <p><strong>Phone:</strong> {b.phone}</p>
        </div>
      ))}
    </div>
  );
}
