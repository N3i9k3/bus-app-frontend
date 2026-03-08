import { useEffect } from "react";
import { io } from "socket.io-client";
import BusMap from "./components/BusMap";

const socket = io("http://localhost:5000");

function App() {

  useEffect(() => {

    navigator.geolocation.watchPosition((position) => {

      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      console.log("Sending location:", lat, lng);

      socket.emit("locationUpdate", { lat, lng });

    });

  }, []);

  return (
    <div>
      <h1>Live Bus Tracking</h1>
      <BusMap />
    </div>
  );
}

export default App;