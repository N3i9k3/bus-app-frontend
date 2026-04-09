import { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import API from "../Services/api";

export default function Booking() {
  const { id } = useParams(); // Gets Bus ID from URL
  const [searchParams] = useSearchParams();
  const travelDate = searchParams.get("date") || "Not Selected";
  const navigate = useNavigate();

  const [bus, setBus] = useState(null);
  const [gender, setGender] = useState("male");
  const [totalFare, setTotalFare] = useState(0);
  const [isPaid, setIsPaid] = useState(false);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Bus details when page loads
  useEffect(() => {
    const fetchBusDetails = async () => {
      try {
        const res = await API.get(`/buses/${id}`);
        setBus(res.data);
        setTotalFare(res.data.fare); // Set initial fare
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        alert("Could not load bus details.");
        navigate("/dashboard");
      }
    };
    fetchBusDetails();
  }, [id, navigate]);

  // 2. Handle Gender Discount Logic (50% for Female)
  const handleGenderChange = (e) => {
    const selectedGender = e.target.value;
    setGender(selectedGender);
    if (bus) {
      const discountedFare = selectedGender === "female" ? bus.fare / 2 : bus.fare;
      setTotalFare(discountedFare);
    }
  };

  // 3. Handle Final Payment and Seat Deduction
  const handlePayment = async () => {
    try {
      // Calls PATCH /api/buses/book/:id to decrease available_seats in MySQL
      await API.patch(`/buses/book/${id}`);
      setIsPaid(true); // Switch to Digital Ticket view
    } catch (err) {
      alert("Booking failed! No seats available or server error.");
    }
  };

  if (loading) return <div style={{ textAlign: "center", marginTop: "50px" }}>Loading Bus Details...</div>;

  // --- VIEW 1: DIGITAL TICKET (Shows after Payment) ---
  if (isPaid) {
    return (
      <div style={{ padding: "40px", textAlign: "center", backgroundColor: "#f9fafb", minHeight: "100vh" }}>
        <div id="ticket" style={{ 
          border: "2px dashed #444", 
          padding: "30px", 
          display: "inline-block", 
          textAlign: "left", 
          backgroundColor: "#fff",
          maxWidth: "500px",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
        }}>
          <h2 style={{ textAlign: "center", color: "#4f46e5", margin: "0 0 10px 0" }}>CONFIRMED E-TICKET 🎫</h2>
          <p style={{ textAlign: "center", fontSize: "12px", color: "#666" }}>Booking ID: #BUS{Math.floor(Math.random() * 9000) + 1000}</p>
          <hr style={{ border: "1px dashed #eee", margin: "20px 0" }} />
          
          <div style={{ lineHeight: "2" }}>
            <p><strong>Passenger:</strong> Verified User</p>
            <p><strong>Gender:</strong> {gender.toUpperCase()}</p>
            <p><strong>Travel Date:</strong> {travelDate}</p>
            <p><strong>Bus Number:</strong> {bus.bus_number}</p>
            <p><strong>Route:</strong> {bus.origin} ➔ {bus.destination}</p>
            <p><strong>Fare Confirmed:</strong> ₹{totalFare} <span style={{ color: "green" }}>(CONFIRMED)</span></p>
            <p style={{ fontSize: "13px" }}><strong>Stops:</strong> {bus.route_path}</p>
          </div>
          
          <hr style={{ border: "1px dashed #eee", margin: "20px 0" }} />
          <p style={{ fontSize: "11px", color: "#888", textAlign: "center" }}>* Please carry a valid ID proof during travel.</p>
          
          <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
            <button onClick={() => window.print()} style={{ flex: 1, padding: "10px", cursor: "pointer", background: "#333", color: "#fff", border: "none", borderRadius: "5px" }}>
              Print Ticket
            </button>
            <button onClick={() => navigate("/dashboard")} style={{ flex: 1, padding: "10px", cursor: "pointer", background: "#eee", border: "none", borderRadius: "5px" }}>
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- VIEW 2: BOOKING REVIEW (Shows before Payment) ---
  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "auto" }}>
      <div className="card" style={{ 
        padding: "30px", 
        borderRadius: "15px", 
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)", 
        backgroundColor: "#fff",
        border: "1px solid #eee"
      }}>
        <h2 style={{ color: "#333", marginBottom: "20px" }}>Review Your Journey</h2>
        
        <div style={{ marginBottom: "20px", borderBottom: "1px solid #f0f0f0", paddingBottom: "15px" }}>
          <p style={{ fontSize: "18px", margin: "5px 0" }}><strong>{bus.origin} ➔ {bus.destination}</strong></p>
          <p style={{ color: "#666" }}>Date: {travelDate} | Bus: {bus.bus_number}</p>
        </div>

        <div style={{ marginBottom: "25px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Select Gender:</label>
          <select 
            value={gender} 
            onChange={handleGenderChange} 
            style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ccc" }}
          >
            <option value="male">Male (Standard Fare)</option>
            <option value="female">Female (50% Discount Applied)</option>
          </select>
          {gender === "female" && <p style={{ color: "green", fontSize: "13px", marginTop: "5px" }}>🎉 Mahila Samman Discount Applied!</p>}
        </div>

        <div style={{ backgroundColor: "#f8f9fa", padding: "15px", borderRadius: "8px", marginBottom: "25px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
            <span>Base Fare:</span>
            <span>₹{bus.fare}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "20px", borderTop: "1px solid #ddd", paddingTop: "10px" }}>
            <span>Final Total:</span>
            <span style={{ color: "#4f46e5" }}>₹{totalFare}</span>
          </div>
        </div>

        <button 
          onClick={handlePayment} 
          style={{ 
            width: "100%", 
            padding: "15px", 
            backgroundColor: "#10b981", 
            color: "white", 
            fontSize: "18px", 
            fontWeight: "bold", 
            border: "none", 
            borderRadius: "10px", 
            cursor: "pointer" 
          }}
        >
          Confirm ₹{totalFare}
        </button>
      </div>
    </div>
  );
}