// import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
// import { useState, useEffect } from "react";
// import L from "leaflet";

// const busIcon = new L.Icon({
//   iconUrl: "https://cdn-icons-png.flaticon.com/512/61/61231.png",
//   iconSize: [40, 40],
// });

// function BusSimulation() {

// const route = [
//   {name:"Nagpur", coords:[21.1458,79.0882]},
//   {name:"Wardha", coords:[20.7453,78.6022]},
//   {name:"Amravati", coords:[20.9374,77.7796]},
//   {name:"Akola", coords:[20.7002,77.0082]},
//   {name:"Aurangabad", coords:[19.8762,75.3433]},
//   {name:"Pune", coords:[18.5204,73.8567]}
// ];

// const [index,setIndex] = useState(0);

// useEffect(()=>{

// const interval = setInterval(()=>{

// setIndex(prev=>{
// if(prev < route.length-1){
// return prev+1;
// }
// return prev;
// });

// },3000);

// return ()=>clearInterval(interval);

// },[]);

// return(

// <MapContainer
// center={[20.5,77]}
// zoom={6}
// style={{height:"500px",width:"100%"}}
// >

// <TileLayer
// attribution="&copy; OpenStreetMap contributors"
// url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// />

// {/* Route Line */}

// <Polyline
// positions={route.map(stop=>stop.coords)}
// color="blue"
// />

// {/* Stop Markers */}

// {route.map((stop,i)=>(
// <Marker key={i} position={stop.coords}>
// <Popup>{stop.name} Bus Stop</Popup>
// </Marker>
// ))}

// {/* Moving Bus */}

// <Marker
// position={route[index].coords}
// icon={busIcon}
// >

// <Popup>
// Bus Moving → {route[index].name}
// </Popup>

// </Marker>

// </MapContainer>

// );

// }

// export default BusSimulation;












// import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
// import { useState, useEffect } from "react";
// import L from "leaflet";

// const busIcon = new L.Icon({
//   iconUrl: "https://cdn-icons-png.flaticon.com/512/61/61231.png",
//   iconSize: [40, 40],
// });

// function BusSimulation() {

// const route = [
//   [21.1458,79.0882], // Nagpur
//   [20.7453,78.6022], // Wardha
//   [20.9374,77.7796], // Amravati
//   [20.7002,77.0082], // Akola
//   [19.8762,75.3433], // Aurangabad
//   [18.5204,73.8567]  // Pune
// ];

// const [position,setPosition] = useState(route[0]);
// const [index,setIndex] = useState(0);

// useEffect(()=>{

// let start = route[index];
// let end = route[index+1];

// if(!end) return;

// let step = 0;

// const interval = setInterval(()=>{

// step += 0.02;

// const lat = start[0] + (end[0]-start[0]) * step;
// const lng = start[1] + (end[1]-start[1]) * step;

// setPosition([lat,lng]);

// if(step >= 1){
// clearInterval(interval);
// setIndex(index+1);
// }

// },100);

// return ()=>clearInterval(interval);

// },[index]);

// return(

// <MapContainer
// center={[20.5,77]}
// zoom={6}
// style={{height:"500px",width:"100%"}}
// >

// <TileLayer
// attribution="&copy; OpenStreetMap contributors"
// url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// />

// <Polyline positions={route} color="blue"/>

// <Marker position={position} icon={busIcon}>
// <Popup>Bus Moving Nagpur → Pune</Popup>
// </Marker>

// </MapContainer>

// );

// }

// export default BusSimulation;






// import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
// import { useState, useEffect } from "react";
// import L from "leaflet";

// const busIcon = new L.Icon({
//   iconUrl: "https://cdn-icons-png.flaticon.com/512/3448/3448339.png",
//   iconSize: [45, 45],
//   iconAnchor: [22, 40]
// });

// function BusSimulation() {

//   // Bus stops
//   const stops = [
//     { name: "Nagpur", coords: [21.1458, 79.0882] },
//     { name: "Wardha", coords: [20.7453, 78.6022] },
//     { name: "Amravati", coords: [20.9374, 77.7796] },
//     { name: "Akola", coords: [20.7002, 77.0082] },
//     { name: "Chhatrapati Sambhajinagar", coords: [19.8762, 75.3433] },
//     { name: "Pune", coords: [18.5204, 73.8567] }
//   ];

//   // Route coordinates
//   const route = stops.map(stop => stop.coords);

//   const [position, setPosition] = useState(route[0]);
//   const [index, setIndex] = useState(0);
//   const [nextStop, setNextStop] = useState(stops[0].name);

//   useEffect(() => {

//     let start = route[index];
//     let end = route[index + 1];

//     if (!end) return;

//     let step = 0;

//     const interval = setInterval(() => {

//       step += 0.02;

//       const lat = start[0] + (end[0] - start[0]) * step;
//       const lng = start[1] + (end[1] - start[1]) * step;

//       setPosition([lat, lng]);

//       // Detect next stop
//       checkNextStop([lat, lng]);

//       if (step >= 1) {
//         clearInterval(interval);
//         setIndex(index + 1);
//       }

//     }, 100);

//     return () => clearInterval(interval);

//   }, [index]);

//   function checkNextStop(position) {

//     stops.forEach((stop) => {

//       const distance =
//         Math.abs(position[0] - stop.coords[0]) +
//         Math.abs(position[1] - stop.coords[1]);

//       if (distance < 0.05) {
//         setNextStop(stop.name);
//       }

//     });

//   }

//   return (

//     <div>

//       <h2>Next Stop: {nextStop}</h2>
//       <h3>Current Bus Location: {nextStop}</h3>
//       <div style={{marginBottom:"10px"}}>

//         <h2>Bus Route: Nagpur → Pune</h2>
//         <p>Total Stops: 6</p>
//         <p>Bus ID: BUS101</p>

//     </div>

//       <MapContainer
//         center={[20.5, 77]}
//         zoom={6}
//         style={{ height: "500px", width: "100%" }}
//       >

//         <TileLayer
//           attribution="&copy; OpenStreetMap contributors"
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />

//         {/* Route line */}
//         {/* <Polyline positions={route} color="blue" /> */}
//         <Polyline
//             positions={route}
//             pathOptions={{
//                 color: "#007bff",
//                 weight: 6
//             }}
//         />

//         {/* Bus stops */}
//         {stops.map((stop, i) => (
//             <Marker key={i} position={stop.coords}>
//                 <Popup>{stop.name} Bus Stop</Popup>
//             </Marker>
//         ))}

//         {/* Moving bus */}
//         <Marker position={position} icon={busIcon} >
//         </Marker>

//       </MapContainer>

//     </div>

//   );
// }

// export default BusSimulation;






// import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
// import { useState, useEffect } from "react";
// import busImg from "../assets/bus_logo.png";
// import L from "leaflet";
// const busIcon = new L.Icon({
//   iconUrl: busImg,
//   iconSize: [60, 60],
//   iconAnchor: [30, 30]
// });

// function BusSimulation() {

// const stops = [
// { name: "Nagpur", coords: [21.1458, 79.0882] },
// { name: "Wardha", coords: [20.7453, 78.6022] },
// { name: "Amravati", coords: [20.9374, 77.7796] },
// { name: "Akola", coords: [20.7002, 77.0082] },
// { name: "Aurangabad", coords: [19.8762, 75.3433] },
// { name: "Pune", coords: [18.5204, 73.8567] }
// ];

// const route = stops.map(stop => stop.coords);

// const [position,setPosition] = useState(route[0]);
// const [index,setIndex] = useState(0);
// const [currentStop,setCurentStop] = useState(stops[0].name);

// useEffect(()=>{

// let start = route[index];
// let end = route[index+1];

// if(!end) return;

// let step = 0;

// const interval = setInterval(()=>{

// step += 0.02;

// const lat = start[0] + (end[0]-start[0]) * step;
// const lng = start[1] + (end[1]-start[1]) * step;

// setPosition([lat,lng]);

// if(step >= 1){
// clearInterval(interval);
// setIndex(index+1);
// setCurentStop(stops[index+1]?.name);
// }

// },100);

// return ()=>clearInterval(interval);

// },[index]);

// return(

// <div>

// <h2>Bus Route: Nagpur → Pune</h2>
// <h3>Current Stop: {currentStop}</h3>

// <MapContainer
// center={[20.5,77]}
// zoom={6}
// style={{height:"500px",width:"100%"}}
// >

// <TileLayer
// url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// />

// <Polyline positions={route} color="blue"/>

// {stops.map((stop,i)=>(
// <Marker key={i} position={stop.coords}>
// <Popup>{stop.name}</Popup>
// </Marker>
// ))}

// <Marker position={position} icon={busIcon}>
// <Popup>Bus Moving</Popup>
// </Marker>

// </MapContainer>

// </div>

// );

// }

// export default BusSimulation;














// import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
// import { useState, useEffect } from "react";
// import { io } from "socket.io-client";
// import L from "leaflet";
// import busImg from "../assets/bus_logo.png";

// const socket = io("https://bus-app-backend-kvx7.https://bus-app-backend-kvx7.onrender.com/", {
//   transports: ["websocket"]
// });

// const busIcon = new L.Icon({
//   iconUrl: busImg,
//   iconSize: [50, 50],
//   iconAnchor: [25, 25]
// });

// function BusSimulation() {

//   // 🔥 ROUTES
//   const routes = {
//     "nagpur-pune": {
//       name: "Nagpur → Pune",
//       path: [
//         [21.1458, 79.0882],
//         [20.7453, 78.6022],
//         [20.9374, 77.7796],
//         [20.7002, 77.0082],
//         [19.8762, 75.3433],
//         [18.5204, 73.8567]
//       ]
//     },
//     "nagpur-delhi": {
//       name: "Nagpur → Delhi",
//       path: [
//         [21.1458, 79.0882],
//         [22.7196, 75.8577],
//         [23.2599, 77.4126],
//         [26.9124, 75.7873],
//         [28.6139, 77.2090]
//       ]
//     }
//   };

//   // 🔹 States
//   const [selectedRoute, setSelectedRoute] = useState("nagpur-pune");
//   const [activeBuses, setActiveBuses] = useState({});
//   const [busIdInput, setBusIdInput] = useState("");

//   // 🔥 Start simulation for a bus
//   const startBus = () => {
//     const id = Number(busIdInput);
//     if (!id) return;

//     setActiveBuses(prev => ({
//       ...prev,
//       [id]: {
//         route: selectedRoute,
//         index: 0,
//         position: routes[selectedRoute].path[0]
//       }
//     }));

//     setBusIdInput("");
//   };

//   // 🔥 Simulation engine
//   useEffect(() => {

//   const interval = setInterval(() => {

//     setActiveBuses(prev => {

//       const updated = { ...prev };

//       Object.keys(updated).forEach(id => {

//         let bus = updated[id];
//         const routePath = routes[bus.route].path;

//         let start = routePath[bus.index];
//         let end = routePath[bus.index + 1];

//         if (!end) return;

//         // initialize step if not present
//         if (!bus.step) bus.step = 0;

//         bus.step += 0.02;   // 🔥 controls smoothness (smaller = smoother)

//         const lat = start[0] + (end[0] - start[0]) * bus.step;
//         const lng = start[1] + (end[1] - start[1]) * bus.step;

//         // update position
//         updated[id].position = [lat, lng];

//         // send to backend
//         socket.emit("locationUpdate", {
//           busId: Number(id),
//           lat,
//           lng
//         });

//         // move to next segment
//         if (bus.step >= 1) {
//           bus.index += 1;
//           bus.step = 0.05;
//         }

//       });

//       return updated;

//     });

//   }, 200);  // 🔥 faster interval = smoother movement

//   return () => clearInterval(interval);

// }, []);


//   return (
//     <div>

//       {/* 🔥 Dynamic Route Info */}
//       <h2>Selected Route: {routes[selectedRoute].name}</h2>

//       {/* 🔹 Controls */}
//       <input
//         type="number"
//         placeholder="Enter Bus ID"
//         value={busIdInput}
//         onChange={(e) => setBusIdInput(e.target.value)}
//       />

//       <select onChange={(e) => setSelectedRoute(e.target.value)}>
//         {Object.keys(routes).map((key) => (
//           <option key={key} value={key}>
//             {routes[key].name}
//           </option>
//         ))}
//       </select>

//       <button onClick={startBus}>Start Bus</button>

//       {/* 🗺️ Map */}
//       <MapContainer center={[20.5, 77]} zoom={6} style={{ height: "500px" }}>

//         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

//         {/* 🔵 Show selected route */}
//         <Polyline positions={routes[selectedRoute].path} color="blue" />

//         {/* 🔥 Show ALL buses */}
//         {Object.keys(activeBuses).map((id) => (
//           <Marker
//             key={id}
//             position={activeBuses[id].position}
//             icon={busIcon}
//           >
//             <Popup>
//               Bus {id} <br />
//               Route: {routes[activeBuses[id].route].name}
//             </Popup>
//           </Marker>
//         ))}

//       </MapContainer>

//     </div>
//   );
// }

// export default BusSimulation;
















import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import API from "../Services/api";
import L from "leaflet";
import busImg from "../assets/bus_logo.png";

const socket = io("https://bus-app-backend-kvx7.onrender.com", {
  transports: ["websocket"]
});

const busIcon = new L.Icon({
  iconUrl: busImg,
  iconSize: [50, 50],
  iconAnchor: [25, 25]
});

function BusSimulation() {

  // 🔥 ROUTES
  const cityCoords = {
  ahmednagar: [19.0948, 74.7480],
  akola: [20.7002, 77.0082],
  amravati: [20.9374, 77.7796],
  chhatrapati_sambhajinagar: [19.8762, 75.3433], 
  beed: [18.9891, 75.7601],
  bhandara: [21.1448, 79.6521],
  bhopal: [23.2599, 77.4126],
  buldhana: [20.5286, 76.1843],
  chandrapur: [19.9515, 79.2961],
  delhi: [28.7041, 77.1025],
  dhule: [20.9042, 74.7749],
  gadchiroli: [20.1848, 79.9948],
  gondia: [21.4624, 80.2207],
  hingoli: [19.7153, 77.1471],
  jaipur: [26.9124, 75.7873],
  jalgaon: [21.0077, 75.5626],
  jalna: [19.8297, 75.8800],
  kolhapur: [16.7050, 74.2433],
  latur: [18.4088, 76.5603],
  mumbai_city: [18.9220, 72.8347],
  mumbai_suburban: [19.0600, 72.8600], // Bandra
  nagpur: [21.1458, 79.0882],
  nanded: [19.1429, 77.3037],
  nandurbar: [21.3703, 74.2384],
  nashik: [19.9975, 73.7898],
  osmanabad: [18.1853, 76.0420], // Dharashiv
  palghar: [19.6936, 72.7655],
  parbhani: [19.2677, 76.7748],
  pune: [18.5204, 73.8567],
  raigad: [18.5158, 73.1822], // Alibag
  ratnagiri: [16.9902, 73.3120],
  sangli: [16.8524, 74.5815],
  satara: [17.6805, 73.9915],
  sindhudurg: [16.1084, 73.6293], // Oros
  solapur: [17.6599, 75.9064],
  thane: [19.2183, 72.9781],
  wardha: [20.7453, 78.6022],
  washim: [20.1005, 77.1333],
  yavatmal: [20.3888, 78.1204],
  mumbai: [19.0760, 72.8777] // General Mumbai coordinate
};

  // 🔹 States
  const [buses, setBuses] = useState([]);              // 🔥 FROM DB
  // const [selectedRoute, setSelectedRoute] = useState("nagpur-pune");
  const [activeBuses, setActiveBuses] = useState({});

  // 🔥 Fetch buses from backend
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

  // 🔥 Start simulation for selected bus
//  const startBus = (bus) => {

//   const start = cityCoords[bus.source.toLowerCase().trim()];
//   const end = cityCoords[bus.destination.toLowerCase().trim()];

//   if (!start || !end) {
//     alert("Route not defined for this city");
//     return;
//   }

//   const routePath = [start, end];

//   setActiveBuses(prev => ({
//     ...prev,
//     [bus.id]: {
//       route: routePath,
//       index: 0,
//       step: 0,
//       position: start
//     }
//   }));
// };



const startBus = (bus) => {
  const source = bus.source.toLowerCase().trim();
  const destination = bus.destination.toLowerCase().trim();

  // 🔥 Predefined smart route map
  const routeMap = {
    "nagpur-pune": ["nagpur", "amravati", "akola", "chhatrapati_sambhajinagar", "nashik", "pune"],
    "nagpur-mumbai": ["nagpur", "amravati", "akola", "chhatrapati_sambhajinagar", "nashik", "pune", "mumbai"],
    "nagpur-delhi": ["nagpur", "bhopal", "jaipur", "delhi"],
    "nagpur-wardha": ["nagpur", "wardha"],
    "nagpur-chandrapur": ["nagpur", "wardha", "chandrapur"]
  };

  const routeKey = `${source}-${destination}`;

  let routeCities = routeMap[routeKey];

  // 🔥 fallback if route not defined
  if (!routeCities) {
    routeCities = [source, destination];
  }

  const routePath = routeCities
    .map(city => cityCoords[city])
    .filter(Boolean);

  if (routePath.length < 2) {
    alert("Route not defined for this city");
    return;
  }

  setActiveBuses(prev => ({
    ...prev,
    [bus.id]: {
      route: routePath,
      index: 0,
      step: 0,
      position: routePath[0]
    }
  }));
};

  // 🔥 Smooth simulation engine
  useEffect(() => {

    const interval = setInterval(() => {

      setActiveBuses(prev => {

        const updated = { ...prev };

        Object.keys(updated).forEach(id => {

          let bus = updated[id];
          const routePath = bus.route;

          let start = routePath[bus.index];
          let end = routePath[bus.index + 1];

          if (!end) return;

          bus.step += 0.02;

          const lat = start[0] + (end[0] - start[0]) * bus.step;
          const lng = start[1] + (end[1] - start[1]) * bus.step;

          updated[id].position = [lat, lng];

          // 🔥 Send to backend → BusMap.jsx will receive
          socket.emit("locationUpdate", {
            busId: Number(id),
            lat,
            lng
          });

          if (bus.step >= 1) {
            bus.index += 1;
            bus.step = 0;
          }

        });

        return updated;

      });

    }, 100);

    return () => clearInterval(interval);

  }, []);

  
return (
  <div
    style={{
      minHeight: "100vh",
      width: "100vw", // Force full viewport width
      background: "#111827",
      color: "white",
      padding: "20px",
      boxSizing: "border-box", // Prevents padding from causing horizontal scroll
      overflowX: "hidden" 
    }}
  >
      <h1 style={{ textAlign: "center", marginBottom: "20px", fontSize: "32px", fontWeight: "bold" }}>
        Smart Bus Simulation Dashboard
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "320px 1fr", // 320px for the list, '1fr' for the REST of the screen
          gap: "20px",
          width: "100%", // Takes full width of the parent div
          height: "85vh" // Fixed height for the dashboard
        }}
      >
          {/* LEFT PANEL */}
          <div
            style={{
              background: "#1f2937",
              padding: "20px",
              borderRadius: "15px",
              height: "100%", 
              overflowY: "auto",
              boxShadow: "0 4px 20px rgba(0,0,0,0.4)"
            }}
          >
            <h2 style={{ marginBottom: "20px" }}>
//               Available Buses
//          </h2>
              {buses.map((bus) => (
                <div
                  key={bus.id}
                  style={{
                    border: "1px solid #374151",
                    padding: "15px",
                    marginBottom: "15px",
                    borderRadius: "10px",
                    background: "#111827"
                  }}
                >
                  <h3>{bus.bus_number}</h3>

                  <p>Driver: {bus.driver_name}</p>
                  <p>
                    Route: {bus.source} → {bus.destination}
                  </p>
                  <p>Seats: {bus.capacity}</p>
                  <p>Passengers: {bus.passengers}</p>

                  <button
                    onClick={() => startBus(bus)}
                    style={{
                      marginTop: "10px",
                      padding: "10px",
                      width: "100%",
                      borderRadius: "8px",
                      background: "#2563eb",
                      color: "white",
                      border: "none",
                      cursor: "pointer"
                    }}
                  >
                    Start Simulation
                  </button>
                </div>
              ))}
          </div>

          {/* RIGHT PANEL - THE MAP */}
          <div
            style={{
              borderRadius: "15px",
              overflow: "hidden",
              height: "100%", // Fill grid height
              width: "100%",  // Fill grid width (the 1fr space)
              background: "#1f2937",
              boxShadow: "0 4px 20px rgba(0,0,0,0.4)"
            }}
          >
            <MapContainer 
               center={[20.5, 77]} 
               zoom={6} 
               style={{ height: "100%", width: "100%" }} // This makes it expand to the right
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              {/* Route line */}
              {Object.values(activeBuses).map((bus, index) => (
                <Polyline
                  key={index}
                  positions={bus.route}
                />
              ))}

              {/* Stops */}
              {Object.values(activeBuses).map((bus, index) =>
                bus.route.map((point, i) => (
                  <Marker key={`${index}-${i}`} position={point}>
                    <Popup>Stop {i + 1}</Popup>
                  </Marker>
                ))
              )}

              {/* Moving bus */}
              {Object.entries(activeBuses).map(([id, bus]) => (
                <Marker
                  key={id}
                  position={bus.position}
                  icon={busIcon}
                >
                  <Popup>Bus {id}</Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
      </div>
  </div>
);


}

export default BusSimulation;