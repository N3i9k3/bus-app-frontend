// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import { useState, useEffect } from "react";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:5000");

// function BusMap() {

//   const [busLocation, setBusLocation] = useState([21.1458, 79.0882]);

//   useEffect(() => {

//     socket.on("busLocation", (data) => {
//       console.log("Bus location:", data);

//       setBusLocation([data.lat, data.lng]); // move marker
//     });

//   }, []);

//   return (
//     <MapContainer
//       center={busLocation}
//       zoom={13}
//       style={{ height: "500px", width: "100%" }}
//     >
//       <TileLayer
//         attribution="&copy; OpenStreetMap contributors"
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />

//       <Marker position={busLocation}>
//         <Popup>Live Bus Location</Popup>
//       </Marker>

//     </MapContainer>
//   );
// }

// export default BusMap;








import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function BusMap() {

  const [busLocation, setBusLocation] = useState([21.1458, 79.0882]); // Nagpur start
  const [route, setRoute] = useState([[21.1458, 79.0882]]); // route path

  useEffect(() => {

    socket.on("busLocation", (data) => {

      const newPoint = [data.lat, data.lng];

      setBusLocation(newPoint);

      // add point to route path
      setRoute(prev => [...prev, newPoint]);

    });

  }, []);

  return (
    <MapContainer
      center={[20.5, 77]}   // center between Nagpur and Pune
      zoom={6}
      style={{ height: "500px", width: "100%" }}
    >

      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Bus marker */}
      <Marker position={busLocation}>
        <Popup>Live Bus Location</Popup>
      </Marker>

      {/* Route path */}
      <Polyline positions={route} color="blue" />

    </MapContainer>
  );
}

export default BusMap;