import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default function DriverDrive() {
  const [isSharing, setIsSharing] = useState(false);
  const busId = 1; // For testing, assume this is Bus ID 1 from your SQL table

  useEffect(() => {
    let watchId;
    if (isSharing) {
      watchId = navigator.geolocation.watchPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        console.log("Sending Location:", latitude, longitude);
        socket.emit("updateLocation", { busId, lat: latitude, lng: longitude });
      });
    }
    return () => navigator.geolocation.clearWatch(watchId);
  }, [isSharing]);

  return (
    <div className="container">
      <div className="card">
        <h2>Driver Detail 🕹️</h2>
        <p>Bus ID: {busId}</p>
        <button 
          onClick={() => setIsSharing(!isSharing)}
          style={{ backgroundColor: isSharing ? "red" : "green" }}
        >
          {isSharing ? "Stop Sharing Location" : "Start Sharing Location"}
        </button>
        {isSharing && <p className="status">📡 Tracking Live...</p>}
      </div>
    </div>
  );
}