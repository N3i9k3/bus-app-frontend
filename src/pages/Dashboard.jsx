import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../Services/api";

export default function Dashboard() {
  const [search, setSearch] = useState({ from: "", to: "", date: "" });
  const [buses, setBuses] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    // 1. Validation to ensure all fields, including date, are provided
    if (!search.from || !search.to || !search.date) {
      alert("Please fill in Pickup, Destination, and Travel Date");
      return;
    }

    try {
      // 2. Corrected API call including the 'date' parameter
      const res = await API.get(`/buses/search?from=${search.from}&to=${search.to}&date=${search.date}`);
      setBuses(res.data);
      
      if (res.data.length === 0) {
        alert("No buses found for this route on the selected date.");
      }
    } catch (err) {
      console.error(err);
      alert("Search failed. Please try again.");
    }
  };

  return (
    <div className="container" style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
      {/* Search Header Section */}
      <div className="search-section" style={{ 
        padding: "30px", 
        backgroundColor: "#f4f4f4", 
        borderRadius: "15px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)" 
      }}>
        <h2 style={{ marginBottom: "20px", color: "#333" }}>Search Your Bus 🚍</h2>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <input 
            type="text" 
            placeholder="From (e.g. Nagpur)" 
            style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ccc", flex: 1 }}
            onChange={(e) => setSearch({...search, from: e.target.value})} 
          />
          <input 
            type="text" 
            placeholder="To (e.g. Pune)" 
            style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ccc", flex: 1 }}
            onChange={(e) => setSearch({...search, to: e.target.value})} 
          />
          <input 
            type="date" 
            style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ccc" }}
            onChange={(e) => setSearch({...search, date: e.target.value})} 
          />
          <button 
            onClick={handleSearch} 
            style={{ 
              backgroundColor: "#4f46e5", 
              color: "white", 
              padding: "12px 25px", 
              borderRadius: "8px", 
              border: "none", 
              cursor: "pointer",
              fontWeight: "bold" 
            }}
          >
            Search Buses
          </button>
        </div>
      </div>

      {/* Results Section */}
      <div className="bus-list" style={{ marginTop: "30px" }}>
        {buses.length > 0 ? (
          buses.map(bus => (
            <div key={bus.id} className="card" style={{ 
              margin: "15px 0", 
              padding: "20px", 
              backgroundColor: "white", 
              borderRadius: "12px", 
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              border: "1px solid #eee",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <div style={{ textAlign: "left" }}>
                <h3 style={{ margin: "0 0 10px 0", color: "#4f46e5" }}>{bus.bus_number}</h3>
                <p style={{ margin: "5px 0" }}><strong>Route:</strong> {bus.origin} ➔ {bus.destination}</p>
                <p style={{ margin: "5px 0" }}><strong>Departure:</strong> {bus.departure_time} | <strong>Fare:</strong> ₹{bus.fare}</p>
                <p style={{ margin: "5px 0", fontSize: "13px", color: "#666" }}>
                  <strong>Stops:</strong> {bus.route_path}
                </p>
                <p style={{ margin: "5px 0", fontSize: "13px", color: bus.available_seats > 0 ? "green" : "red" }}>
                  <strong>Seats Left:</strong> {bus.available_seats}
                </p>
                {/* Visualizing if it's a specific weekday or daily bus */}
                <p style={{ margin: "5px 0", fontSize: "12px", color: "#888" }}>
                  Schedule: {bus.day_of_week} {bus.travel_date ? `(${bus.travel_date})` : ''}
                </p>
              </div>
              
              <button 
                onClick={() => navigate(`/book/${bus.id}?date=${search.date}`)}
                disabled={bus.available_seats <= 0}
                style={{ 
                  backgroundColor: bus.available_seats > 0 ? "#10b981" : "#9ca3af", 
                  color: "white", 
                  padding: "12px 20px", 
                  borderRadius: "8px", 
                  border: "none", 
                  cursor: bus.available_seats > 0 ? "pointer" : "not-allowed" 
                }}
              >
                {bus.available_seats > 0 ? "Book Now" : "Sold Out"}
              </button>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", color: "#999", marginTop: "50px" }}>
            Enter your details above to find available buses.
          </p>
        )}
      </div>
    </div>
  );
}