import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // backend URL

function BusMap() {
  const [busLocation, setBusLocation] = useState([18.5204, 73.8567]);

  useEffect(() => {

    socket.on("busLocation", (data) => {
      console.log("New location:", data);

      setBusLocation([data.lat, data.lng]);
    });

  }, []);

  return (
    <MapContainer
      center={busLocation}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={busLocation}>
        <Popup>Live Bus Location</Popup>
      </Marker>

    </MapContainer>
  );
}

export default BusMap;