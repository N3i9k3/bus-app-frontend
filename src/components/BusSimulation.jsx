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






import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import { useState, useEffect } from "react";
import busImg from "../assets/bus_logo.png";
import L from "leaflet";
const busIcon = new L.Icon({
  iconUrl: busImg,
  iconSize: [60, 60],
  iconAnchor: [30, 30]
});

function BusSimulation() {

const stops = [
{ name: "Nagpur", coords: [21.1458, 79.0882] },
{ name: "Wardha", coords: [20.7453, 78.6022] },
{ name: "Amravati", coords: [20.9374, 77.7796] },
{ name: "Akola", coords: [20.7002, 77.0082] },
{ name: "Aurangabad", coords: [19.8762, 75.3433] },
{ name: "Pune", coords: [18.5204, 73.8567] }
];

const route = stops.map(stop => stop.coords);

const [position,setPosition] = useState(route[0]);
const [index,setIndex] = useState(0);
const [nextStop,setNextStop] = useState(stops[0].name);

useEffect(()=>{

let start = route[index];
let end = route[index+1];

if(!end) return;

let step = 0;

const interval = setInterval(()=>{

step += 0.02;

const lat = start[0] + (end[0]-start[0]) * step;
const lng = start[1] + (end[1]-start[1]) * step;

setPosition([lat,lng]);

if(step >= 1){
clearInterval(interval);
setIndex(index+1);
setNextStop(stops[index+1]?.name);
}

},100);

return ()=>clearInterval(interval);

},[index]);

return(

<div>

<h2>Bus Route: Nagpur → Pune</h2>
<h3>Next Stop: {nextStop}</h3>

<MapContainer
center={[20.5,77]}
zoom={6}
style={{height:"500px",width:"100%"}}
>

<TileLayer
url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>

<Polyline positions={route} color="blue"/>

{stops.map((stop,i)=>(
<Marker key={i} position={stop.coords}>
<Popup>{stop.name}</Popup>
</Marker>
))}

<Marker position={position} icon={busIcon}>
<Popup>Bus Moving</Popup>
</Marker>

</MapContainer>

</div>

);

}

export default BusSimulation;