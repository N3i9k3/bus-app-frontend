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








// import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import { useState, useEffect } from "react";
// import { io } from "socket.io-client";
// import API from "../api";

// const socket = io("http://localhost:5000");

// function BusMap() {

//   // 🔹 States
//   // const [busLocation, setBusLocation] = useState([21.1458, 79.0882]);
//   const [route, setRoute] = useState([[21.1458, 79.0882]]);
//   const [buses, setBuses] = useState([]);
//   const [selectedBusId, setSelectedBusId] = useState(null);
//   const [busLocations, setBusLocations] = useState({});

//   // 🔹 Fetch buses from backend
//   const fetchBuses = async () => {
//     try {
//       const res = await API.get("/buses");
//       setBuses(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     fetchBuses();
//   }, []);

//   // 🔹 Socket: Listen for live location
//   useEffect(() => {

//     // socket.on("locationUpdate", (data) => {

//     //   const newPoint = [data.lat, data.lng];

//     //   setBusLocation(newPoint);
//     //   setRoute(prev => [...prev, newPoint]);

//     // }); .....1st version - single bus

//   //   socket.on("locationUpdate", (data) => {

//   // // Only update if selected bus matches
//   // if (data.busId === selectedBusId) {

//   //   const newPoint = [data.lat, data.lng];

//   //   setBusLocation(newPoint);
//   //   setRoute(prev => [...prev, newPoint]);
//   // }

//   // });  .....2nd version - multiple buses

//   socket.on("locationUpdate", (data) => {
//     console.log("LIVE DATA:", data); 
//   setBusLocations(prev => ({
//     ...prev,
//     [data.busId]: [data.lat, data.lng]
//   }));

// }); 
//     return () => socket.disconnect();

//   }, []);

//   useEffect(() => {

//   setInterval(() => {
//     socket.emit("locationUpdate", {
//       busId: 1,
//       lat: 21.14 + Math.random() * 0.1,
//       lng: 79.08 + Math.random() * 0.1
//     });
//   }, 3000);

// }, []);

//   // 🔹 Add Bus
//     const [form, setForm] = useState({
//       bus_number: "",
//       capacity: "",
//       driver_name: "",
//       source: "",
//       destination: ""
//     });

//   const handleChange = (e) => {
//   setForm({ ...form, [e.target.name]: e.target.value });
// };
// const addBus = async () => {
//   await API.post("/buses", form);
//   fetchBuses();
// };


//   // 🔹 Delete Bus
//   const deleteBus = async (id) => {
//     await API.delete(`/buses/${id}`);
//     fetchBuses();
//   };

//   /* 🔹 Book Seat */
//     const bookSeat = async (id) => {
//     await API.post(`/buses/${id}/book`);
//     fetchBuses(); // refresh data
//   };


//   return (
//     <div>

//       {/* 🗺️ Map */}
//       <MapContainer
//         center={[20.5, 77]}
//         zoom={6}
//         style={{ height: "500px", width: "100%" }}
//       >

//         <TileLayer
//           attribution="&copy; OpenStreetMap contributors"
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />

//         {/* Bus Marker */}
//         {/* <Marker position={busLocation}>
//           <Popup>Live Bus Location</Popup>
//         </Marker> */}

//         {Object.keys(busLocations).map((id) => {
//           if (parseInt(id) !== selectedBusId) return null;

//           return (
//             <Marker key={id} position={busLocations[id]}>
//               <Popup>Bus {id}</Popup>
//             </Marker>
//           );
//         })}

        

//         {/* Route Path */}
//         <Polyline positions={route} color="blue" />

//       </MapContainer>

//       {/* 🔥 Button Add Bus */}
//       <h2>Add Bus</h2>

//       <input name="bus_number" placeholder="Bus Number" onChange={handleChange} />
//       <input name="capacity" placeholder="Capacity" onChange={handleChange} />
//       <input name="driver_name" placeholder="Driver Name" onChange={handleChange} />
//       <input name="source" placeholder="From (Nagpur)" onChange={handleChange} />
//       <input name="destination" placeholder="To (Pune)" onChange={handleChange} />

//       <button onClick={addBus}>Add Bus</button>

//       {/* 📋 Bus List */}
//       <h2>Bus List</h2>

//       {buses.map((bus) => (
//         <div key={bus.id} style={{ border: "1px solid white", margin: "10px", padding: "10px" }}>

//       <h3>{bus.bus_number}</h3>

//       <p>Driver: {bus.driver_name}</p>
//       <p>Route: {bus.source} → {bus.destination}</p>

//       <p>Total Seats: {bus.capacity}</p>
//       <p>Passengers: {bus.passengers}</p>
//       {/* <p>Available Seats: {bus.capacity - bus.passengers}</p> */}
//       <p style={{ 
//         color: bus.capacity - bus.passengers === 0 ? "red" : "lightgreen" 
//       }}>
//         Available Seats: {bus.capacity - bus.passengers}
//       </p>

//       <button onClick={() => deleteBus(bus.id)}>Delete</button>
//       <button onClick={() => bookSeat(bus.id)}>Book Seat</button>
//       {/* <button 
//         onClick={() => bookSeat(bus.id)} 
//         disabled={bus.passengers >= bus.capacity} >
//         {bus.passengers >= bus.capacity ? "Full" : "Book Seat"}
//         </button> */} 
//       {/* Disable button if bus is full */}

//       <button onClick={() => setSelectedBusId(bus.id)}>
//         Track Bus
//       </button>
//     </div>
//   ))}

//     </div>
//   );
// }

// export default BusMap;











// import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import { useState, useEffect } from "react";
// import { io } from "socket.io-client";
// import API from "../api";

// const socket = io("http://localhost:5000", {
//   transports: ["websocket"]
// });

// function BusMap() {

//   // 🔹 States
//   const [route, setRoute] = useState([]);
//   const [buses, setBuses] = useState([]);
//   const [selectedBusId, setSelectedBusId] = useState(null);
//   const [busLocations, setBusLocations] = useState({});

//   // 🔹 Fetch buses
//   const fetchBuses = async () => {
//     try {
//       const res = await API.get("/buses");
//       setBuses(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     fetchBuses();
//   }, []);

//   // 🔹 Socket: listen location
//   useEffect(() => {

//     socket.on("connect", () => {
//       console.log("✅ Socket connected:", socket.id);
//     });

//     socket.on("locationUpdate", (data) => {
//       console.log("LIVE DATA:", data);

//       // store all bus locations
//       setBusLocations(prev => ({
//         ...prev,
//         [data.busId]: [data.lat, data.lng]
//       }));

//       // update route ONLY for selected bus
//       if (data.busId === selectedBusId) {
//         const newPoint = [data.lat, data.lng];
//         setRoute(prev => [...prev, newPoint]);
//       }
//     });

//     return () => {
//       socket.off("locationUpdate");
//     };

//   }, [selectedBusId]);

//   // 🔹 Reset route when new bus selected
//   useEffect(() => {
//     setRoute([]);
//   }, [selectedBusId]);

//   // 🔹 Simulation (for testing)
//   let busesSim = {
//   1: { lat: 21.14, lng: 79.08 },
//   2: { lat: 21.10, lng: 79.05 }
// };

// useEffect(() => {
//   const interval = setInterval(() => {

//     Object.keys(busesSim).forEach(id => {
//       busesSim[id].lat += 0.001;
//       busesSim[id].lng += 0.001;

//       socket.emit("locationUpdate", {
//         busId: Number(id),
//         lat: busesSim[id].lat,
//         lng: busesSim[id].lng
//       });
//     });

//   }, 2000);

//   return () => clearInterval(interval);
// }, []);

//   // 🔹 Add Bus form
//   const [form, setForm] = useState({
//     bus_number: "",
//     capacity: "",
//     driver_name: "",
//     source: "",
//     destination: ""
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const addBus = async () => {
//     await API.post("/buses", form);
//     fetchBuses();
//   };

//   // 🔹 Delete Bus
//   const deleteBus = async (id) => {
//     await API.delete(`/buses/${id}`);
//     fetchBuses();
//   };

//   // 🔹 Book Seat
//   const bookSeat = async (id) => {
//     await API.post(`/buses/${id}/book`);
//     fetchBuses();
//   };

//   // 🔹 Selected bus location
//   const selectedLocation = busLocations[selectedBusId];

//   return (
//     <div>

//       {/* 🗺️ Map */}
//       <MapContainer
//         center={selectedLocation || [20.5, 77]}
//         zoom={6}
//         style={{ height: "500px", width: "100%" }}
//       >

//         <TileLayer
//           attribution="&copy; OpenStreetMap contributors"
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />

//         {/* 🔥 Show ONLY selected bus
//         {Object.keys(busLocations).map((id) => {
//           if (parseInt(id) !== selectedBusId) return null;

//           return (
//             <Marker key={id} position={busLocations[id]}>
//               <Popup>Bus {id}</Popup>
//             </Marker>
//           );
//         })} */}

//         {/* 🟢 Show all buses on map */}
//         {Object.keys(busLocations).map((id) => (
//           <Marker 
//             key={id} 
//             position={busLocations[id]}>
//             <Popup>Bus {id}</Popup>
//           </Marker>
//         ))}

//         {/* 🔵 Route Path */}
//         <Polyline positions={route} color="blue" />

//       </MapContainer>

//       {/* 🔥 Add Bus */}
//       <h2>Add Bus</h2>

//       <input name="bus_number" placeholder="Bus Number" onChange={handleChange} />
//       <input name="capacity" placeholder="Capacity" onChange={handleChange} />
//       <input name="driver_name" placeholder="Driver Name" onChange={handleChange} />
//       <input name="source" placeholder="From (Nagpur)" onChange={handleChange} />
//       <input name="destination" placeholder="To (Pune)" onChange={handleChange} />

//       <button onClick={addBus}>Add Bus</button>

//       {/* 📋 Bus List */}
//       <h2>Bus List</h2>

//       {buses.map((bus) => (
//         <div
//           key={bus.id}
//           style={{
//             border: "1px solid white",
//             margin: "10px",
//             padding: "10px"
//           }}
//         >

//           <h3 style={{ color: selectedBusId === bus.id ? "yellow" : "white" }}>
//             {bus.bus_number}
//           </h3>

//           <p>Driver: {bus.driver_name}</p>
//           <p>Route: {bus.source} → {bus.destination}</p>

//           <p>Total Seats: {bus.capacity}</p>
//           <p>Passengers: {bus.passengers}</p>

//           <p style={{
//             color: bus.capacity - bus.passengers === 0 ? "red" : "lightgreen"
//           }}>
//             Available Seats: {bus.capacity - bus.passengers}
//           </p>

//           <button onClick={() => deleteBus(bus.id)}>Delete</button>

//           <button
//             onClick={() => bookSeat(bus.id)}
//             disabled={bus.passengers >= bus.capacity}
//           >
//             {bus.passengers >= bus.capacity ? "Full" : "Book Seat"}
//           </button>

//           <button onClick={() => setSelectedBusId(bus.id)}>
//             Track Bus
//           </button>

//         </div>
//       ))}

//     </div>
//   );
// }

// export default BusMap;















import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import API from "../api";

const socket = io("http://localhost:5000", {
  transports: ["websocket"]
});

function BusMap() {

  const [route, setRoute] = useState([]);
  const [buses, setBuses] = useState([]);
  const [selectedBusId, setSelectedBusId] = useState(null);
  const [busLocations, setBusLocations] = useState({});

  // 🔹 Fetch buses
  const fetchBuses = async () => {
    try {
      const res = await API.get("/buses");
      setBuses(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBuses();
  }, []);

  // 🔹 Socket listener
  useEffect(() => {

    socket.on("connect", () => {
      console.log("✅ Connected:", socket.id);
    });

    socket.on("locationUpdate", (data) => {

      setBusLocations(prev => ({
        ...prev,
        [data.busId]: [data.lat, data.lng]
      }));

      if (data.busId === selectedBusId) {
        setRoute(prev => [...prev, [data.lat, data.lng]]);
      }
    });

    return () => socket.off("locationUpdate");

  }, [selectedBusId]);

  // 🔹 Reset route on new selection
  useEffect(() => {
    setRoute([]);
  }, [selectedBusId]);

  const selectedLocation = busLocations[selectedBusId];

  // 🔹 Add Bus form
  const [form, setForm] = useState({
    bus_number: "",
    capacity: "",
    driver_name: "",
    source: "",
    destination: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addBus = async () => {
    await API.post("/buses", form);
    fetchBuses();
  };

  const deleteBus = async (id) => {
    await API.delete(`/buses/${id}`);
    fetchBuses();
  };

  const bookSeat = async (id) => {
    await API.post(`/buses/${id}/book`);
    fetchBuses();
  };

  return (
    <div>

      {/* 🗺️ MAP */}
      <MapContainer
        center={selectedLocation || [20.5, 77]}
        zoom={6}
        style={{ height: "500px", width: "100%" }}
      >

        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Show ALL buses */}
        {Object.keys(busLocations).map((id) => (
          <Marker key={id} position={busLocations[id]}>
            <Popup>Bus {id}</Popup>
          </Marker>
        ))}

        {/* Route path for selected bus */}
        <Polyline positions={route} color="blue" />

      </MapContainer>

      {/* ➕ ADD BUS */}
      <h2>Add Bus</h2>

      <input name="bus_number" placeholder="Bus Number" onChange={handleChange} />
      <input name="capacity" placeholder="Capacity" onChange={handleChange} />
      <input name="driver_name" placeholder="Driver Name" onChange={handleChange} />
      <input name="source" placeholder="From" onChange={handleChange} />
      <input name="destination" placeholder="To" onChange={handleChange} />

      <button onClick={addBus}>Add Bus</button>

      {/* 📋 BUS LIST */}
      <h2>Bus List</h2>

      {buses.map((bus) => (
        <div
          key={bus.id}
          style={{
            border: "1px solid white",
            margin: "10px",
            padding: "10px"
          }}
        >

          <h3 style={{ color: selectedBusId === bus.id ? "yellow" : "white" }}>
            {bus.bus_number}
          </h3>

          <p><b>Driver:</b> {bus.driver_name}</p>
          <p><b>Route:</b> {bus.source} → {bus.destination}</p>

          <p><b>Total Seats:</b> {bus.capacity}</p>
          <p><b>Passengers:</b> {bus.passengers}</p>

          <p style={{
            color: bus.capacity - bus.passengers === 0 ? "red" : "lightgreen"
          }}>
            <b>Available Seats:</b> {bus.capacity - bus.passengers}
          </p>

          <button onClick={() => deleteBus(bus.id)}>Delete</button>

          <button
            onClick={() => bookSeat(bus.id)}
            disabled={bus.passengers >= bus.capacity}
          >
            {bus.passengers >= bus.capacity ? "Full" : "Book Seat"}
          </button>

          <button onClick={() => setSelectedBusId(bus.id)}>
            Track Bus
          </button>

        </div>
      ))}

    </div>
  );
}

export default BusMap;