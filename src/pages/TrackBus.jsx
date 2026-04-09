import { MapContainer, TileLayer, Marker, useMap, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import API from "../Services/api";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for Leaflet icons
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const socket = io("http://localhost:5000");

export default function TrackBus() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pos, setPos] = useState([21.1458, 79.0882]); // Nagpur Default
  const [bus, setBus] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    // 1. Load Bus details + Initial Location from Database
    const loadInitialData = async () => {
      try {
        const res = await API.get(`/buses/${id}`);
        setBus(res.data);
        
        // If your DB has lat/lng columns, use them for the initial state
        if (res.data.current_lat && res.data.current_lng) {
          setPos([res.data.current_lat, res.data.current_lng]);
        }
      } catch (err) {
        console.error("Error loading bus:", err);
      }
    };

    loadInitialData();

    // 2. Real-time Socket Updates
    socket.on("receiveLocation", (data) => {
      if (data && data.busId === parseInt(id)) {
        setPos([data.lat, data.lng]);
        setLastUpdated(new Date().toLocaleTimeString());
      }
    });

    return () => socket.off("receiveLocation");
  }, [id]);

  if (!bus) return <div style={loaderStyle}>Initializing Nagpur Hub Systems...</div>;

  return (
    <div style={containerStyle}>
      {/* HEADER BAR */}
      <div style={headerStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <button onClick={() => navigate(-1)} style={backButtonStyle}>←</button>
          <h1 style={{ margin: 0, fontSize: "20px", fontWeight: "600" }}>Live Fleet Tracking</h1>
        </div>
        <div style={statusBadgeStyle}>
          <span style={dotStyle}></span> Live Updates: {lastUpdated}
        </div>
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* LEFT SIDE: THE MAP */}
        <div style={{ flex: 2, position: "relative" }}>
          <MapContainer center={pos} zoom={14} style={{ height: "100%", width: "100%" }}>
            <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
            <Marker position={pos}>
              <Popup>
                <strong>{bus.bus_number}</strong> <br />
                Status: On Route
              </Popup>
            </Marker>
            <RecenterMap lat={pos[0]} lng={pos[1]} />
          </MapContainer>
        </div>

        {/* RIGHT SIDE: INFO PANEL */}
        <div style={sidebarStyle}>
          <div style={cardStyle}>
            <h2 style={{ color: "#4f46e5", marginTop: 0 }}>{bus.bus_number}</h2>
            <p style={{ color: "#666", fontSize: "14px" }}>{bus.origin} ➔ {bus.destination}</p>
            <div style={statGrid}>
              <div style={statItem}>
                <small>Occupancy</small>
                <strong>85%</strong>
              </div>
              <div style={statItem}>
                <small>Speed</small>
                <strong>42 km/h</strong>
              </div>
            </div>
          </div>

          <h3 style={{ fontSize: "16px", marginBottom: "20px", color: "#374151" }}>Route Timeline</h3>
          <div style={timelineContainer}>
            {bus.route_path.split(',').map((station, index) => (
              <div key={index} style={timelineItem}>
                <div style={index === 0 ? activeDot : inactiveDot}></div>
                <p style={index === 0 ? activeText : inactiveText}>{station.trim()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Map Helper Component
function RecenterMap({ lat, lng }) {
  const map = useMap();
  useEffect(() => { map.setView([lat, lng], map.getZoom()); }, [lat, lng, map]);
  return null;
}

// --- STYLING (The "Attractive" Part) ---

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  width: "100vw",
  backgroundColor: "#f3f4f6",
  fontFamily: "'Inter', sans-serif",
};

const headerStyle = {
  height: "70px",
  backgroundColor: "#ffffff",
  borderBottom: "1px solid #e5e7eb",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 30px",
  zIndex: 10,
};

const sidebarStyle = {
  flex: 1,
  padding: "30px",
  background: "#ffffff",
  borderLeft: "1px solid #e5e7eb",
  overflowY: "auto",
  boxShadow: "-4px 0 15px rgba(0,0,0,0.02)",
};

const cardStyle = {
  backgroundColor: "#f8fafc",
  padding: "20px",
  borderRadius: "12px",
  marginBottom: "30px",
  border: "1px solid #e2e8f0",
};

const statGrid = {
  display: "grid",
  gridTemplateColumns: "1/2 1/2",
  gap: "10px",
  marginTop: "15px",
};

const statItem = {
  backgroundColor: "#fff",
  padding: "10px",
  borderRadius: "8px",
  textAlign: "center",
  border: "1px solid #edf2f7",
};

const timelineItem = {
  display: "flex",
  alignItems: "center",
  marginBottom: "25px",
  position: "relative",
};

const activeDot = {
  height: "14px",
  width: "14px",
  backgroundColor: "#4f46e5",
  borderRadius: "50%",
  marginRight: "15px",
  boxShadow: "0 0 0 4px rgba(79, 70, 229, 0.2)",
};

const inactiveDot = {
  height: "10px",
  width: "10px",
  backgroundColor: "#d1d5db",
  borderRadius: "50%",
  marginRight: "19px",
};

const activeText = { margin: 0, fontWeight: "600", color: "#111827" };
const inactiveText = { margin: 0, color: "#6b7280", fontSize: "14px" };

const statusBadgeStyle = {
  backgroundColor: "#ecfdf5",
  color: "#065f46",
  padding: "8px 16px",
  borderRadius: "20px",
  fontSize: "13px",
  fontWeight: "500",
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const dotStyle = {
  height: "8px",
  width: "8px",
  backgroundColor: "#10b981",
  borderRadius: "50%",
  animation: "pulse 2s infinite",
};

const backButtonStyle = {
  border: "none",
  background: "#f3f4f6",
  padding: "8px 12px",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "18px",
};

const loaderStyle = {
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "18px",
  color: "#4f46e5",
  fontWeight: "bold",
};