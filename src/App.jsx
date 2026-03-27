// import { useEffect } from "react";
// import { io } from "socket.io-client";
// import BusMap from "./components/BusMap";

// const socket = io("http://localhost:5000");

// function App() {

//   useEffect(() => {

//     navigator.geolocation.watchPosition((position) => {

//       const lat = position.coords.latitude;
//       const lng = position.coords.longitude;

//       console.log("Sending location:", lat, lng);

//       socket.emit("locationUpdate", { lat, lng });

//     });

//   }, []);

//   return (
//     <div>
//       <h1>Live Bus Tracking</h1>
//       <BusMap />
//     </div>
//   );
// }

// export default App;







import { useState } from "react";
import BusMap from "./components/BusMap";
import BusSimulation from "./components/BusSimulation";
import BusInfo from "./components/BusInfo";

function App() {

const [mode,setMode] = useState("live");

return (

<div>

<h1>Smart Bus Tracking System</h1>

<button onClick={()=>setMode("live")}>
Live Tracking
</button>

<button onClick={()=>setMode("simulation")}>
Bus Simulation
</button>

{mode==="live" && <BusMap />}

{mode==="simulation" && (
<>
<BusSimulation/>
<BusInfo/>
</>
)}

</div>

);

}

export default App;