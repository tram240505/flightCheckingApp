import { useState, useEffect,useRef } from "react";
import "./FlightChecking.css"; 
import { useNavigate } from "react-router-dom";

export default function FlightChecking() {
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [sortBy, setSortBy] = useState("price");
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const fromRef = useRef();
  const toRef = useRef();

  // Convert stops string to number for sorting
    const stopsToNumber = (stops) => {
    if (stops === null || stops === undefined) return 10;
    let n = Number(stops); 
    if (!isNaN(n)) return n;
    const s = stops.toLowerCase();
    if (s === "non-stop") return 0;
    if (s === "one") return 1;
    if (s === "two") return 2;
    return 10;
  };

  const stopsToText = (stops) => {
    if (stops === 0) return "Non-stop";
    if (stops === 1) return "One";
    if (stops === 2) return "Two";
    return stops;
  };

  // Fetch autocomplete suggestions
  const fetchSuggestions = async (term, setFunc) => {
    if (!term) return setFunc([]);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/flights/cities?term=${term}`);
      const data = await res.json();
      setFunc(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchSuggestions(fromCity, setFromSuggestions); }, [fromCity]);
  useEffect(() => { fetchSuggestions(toCity, setToSuggestions); }, [toCity]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (fromRef.current && !fromRef.current.contains(e.target)) {
        setFromSuggestions([]);
      }
      if (toRef.current && !toRef.current.contains(e.target)) {
        setToSuggestions([]);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);


  
  // Search flights
  const handleSearch = async () => {
    if (!fromCity.trim() || !toCity.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/flights?source_city=${fromCity}&destination_city=${toCity}&sort_by=${sortBy}&sort_order=${sortOrder}`);
      const data = await res.json();
      let flightData = data.data || [];

      
      flightData.sort((a, b) => {
        if (sortBy === "stops") {
          return sortOrder === "asc"
            ? stopsToNumber(a.stops) - stopsToNumber(b.stops)
            : stopsToNumber(b.stops) - stopsToNumber(a.stops);
        } else {
          return sortOrder === "asc"
            ? parseFloat(a[sortBy]) - parseFloat(b[sortBy])
            : parseFloat(b[sortBy]) - parseFloat(a[sortBy]);
        }
      });

      setFlights(flightData);
      
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

const handleBooking = (flight) => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("You must login before booking!");
    navigate("/login");
    return;
  }
navigate(`/booking/${flight._id}`);
};



  

  return (
    <div className="flight-container">
      <h1>Flight Checking</h1>
      {role === "admin" && (
  <button
    onClick={() => navigate("/admin")}
    style={{
      background: "purple",
      color: "white",
      padding: "8px 14px",
      borderRadius: 6,
      marginBottom: 10,
      cursor: "pointer",
    }}
  >
    Admin Panel
  </button>
)}

{token && (
  <button
    onClick={() => {
      localStorage.clear();
      window.location.href = "/";
    }}
    style={{
      position: "absolute",
      top: "20px",
      right: "20px",
      padding: "8px 14px",
      background: "red",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontWeight: "bold"
    }}
  >
    Logout
  </button>
)}
      <div className="search-section">
        <div className="autocomplete">
          <input
            type="text"
            value={fromCity}
            onChange={(e)=>setFromCity(e.target.value)}
            placeholder="From city"
          />
          {fromCity && fromSuggestions.length>0 && (
            <ul className="suggestions">
              {fromSuggestions.map(c => (
            <li key={c} onClick={(e)=>{
            e.stopPropagation();     
            setFromCity(c);           
            setFromSuggestions([]);   
            }}>{c}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="autocomplete">
          <input
            type="text"
            value={toCity}
            onChange={(e)=>setToCity(e.target.value)}
            placeholder="To city"
          />
          {toCity && toSuggestions.length>0 && (
            <ul className="suggestions">
              {toSuggestions.map(c => (
                <li key={c} onClick={(e)=>{
                e.stopPropagation();
                setToCity(c);
                setToSuggestions([]);
                }}>{c}</li>
              ))}
            </ul>
          )}
        </div>

        <button className="search-btn" onClick={handleSearch}>Search</button>
      </div>

      <div className="sort-section">
        <label>Sort by:</label>
        <select value={sortBy} onChange={e=>setSortBy(e.target.value)}>
          <option value="price">Price</option>
          <option value="duration">Duration</option>
          <option value="days_left">Days Left</option>
          <option value="stops">Stops</option>
        </select>
        <select value={sortOrder} onChange={e=>setSortOrder(e.target.value)}>
          <option value="asc">ASC</option>
          <option value="desc">DESC</option>
        </select>
        
      </div>

      {loading && <p className="loading">Searching...</p>}
      {!loading && flights.length===0 && <p className="no-flights">No flights found</p>}

   <div className="flights-list">
  {flights.map(f => (
    <div key={f._id} className="flight-card">
      <h2>{f.flight} - {f.airline}</h2>
      <p>{f.source_city} → {f.destination_city}</p>
      <p>Departure: {f.departure_time} | Arrival: {f.arrival_time}</p>
      <p>Stops: {stopsToText(stopsToNumber(f.stops))} | Class: {f.class} | Duration: {f.duration} mins</p>
      <p>Days Left: {f.days_left} | Price: ${f.price}</p>

   
      <button 
        className="book-btn"
        onClick={() => handleBooking(f)}
      >
        Book
      </button>

    </div>
  ))}
</div>

    </div>
  );
}
