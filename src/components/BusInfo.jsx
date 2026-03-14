function BusInfo() {

const busData = {
busId: "BUS101",
route: "Nagpur → Pune",
totalSeats: 50,
availableSeats: 12,
passengers: 38,
nextStop: "Wardha",
stops: ["Nagpur","Wardha","Amravati","Akola","Aurangabad","Pune"]
};

return (

<div style={{padding:"20px"}}>

<h2>Bus Information</h2>

<p><b>Bus ID:</b> {busData.busId}</p>
<p><b>Route:</b> {busData.route}</p>
<p><b>Total Seats:</b> {busData.totalSeats}</p>
<p><b>Available Seats:</b> {busData.availableSeats}</p>
<p><b>Passengers:</b> {busData.passengers}</p>
<p><b>Next Stop:</b> {busData.nextStop}</p>

<h3>Stops</h3>

<ul>
{busData.stops.map((stop,index)=>(
<li key={index}>{stop}</li>
))}
</ul>

</div>

);

}

export default BusInfo;