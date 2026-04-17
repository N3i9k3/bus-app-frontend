import { useState, useEffect } from "react";
import API from "../Services/api";

// ✅ CHANGE #1: HELPER FUNCTION - Format date/time like AdminDashboard

const formatDateTime = (dateTimeString) => {
  if (!dateTimeString) return "Not set";

  return new Date(dateTimeString).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short"
  });
};

function UserDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [buses, setBuses] = useState([]);
  const [ticket, setTicket] = useState(null);

  const [selectedSeat, setSelectedSeat] = useState(null);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);
  const [activeBusId, setActiveBusId] = useState(null); // ✅ FIXED
  const [myBookings, setMyBookings] = useState([]);
  const [showBookings, setShowBookings] = useState(false);
  const [passengerType, setPassengerType] = useState("male");
  const [age, setAge] = useState("");

  // ---------------- FETCH ALL BUSES ----------------
  useEffect(() => {
  const fetchBuses = async () => {
    try {
      const res = await API.get("/buses");
      setBuses(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  fetchBuses();
  fetchMyBookings();
}, []);

  // ---------------- FETCH BOOKED SEATS ----------------
  const fetchBookedSeats = async (busId) => {
  try {
    const res = await API.get(`/bookings/seats/${busId}`);

    // ✅ FORCE NUMBER TYPE
    // return res.data.map(item => Number(item.seat_number));
     return res.data.map((seat) =>
      Number(seat.seat_number)
    );
  } catch (err) {
    console.log(err);
    return [];
  }
};

  // ---------------- SEARCH BUSES ----------------
  const searchBuses = async () => {
    try {
      const res = await API.get("/buses/search", {
        params: { source, destination }
      });

      setBuses(res.data);

      setSelectedBus(null);
      setActiveBusId(null);
      setSelectedSeat(null);
      setBookedSeats([]);

    } catch (error) {
      console.log(error);
      alert("No buses found");
    }
  };

  // ---------------- BOOK TICKET ----------------

// ✅ calculate fare based on passenger type and age

const calculateFare = (baseFare) => {
  const passengerAge = Number(age);

  switch (passengerType) {
    case "female":
      return baseFare * 0.5;

    case "child":
      return passengerAge <= 5 ? 0 : baseFare;

    case "senior":
      return passengerAge >= 60
        ? baseFare * 0.5
        : baseFare;

    default:
      return baseFare;
  }
};

  const bookTicket = async () => {
      
  if (!selectedBus) {
    alert("Please select a bus");
    return;
  }

  if (!selectedSeat) {
    alert("Please select a seat");
    return;
  }

  if (!passengerType) {
    alert("Please select passenger type");
    return;
  }

  if (
    (passengerType === "child" ||
      passengerType === "senior") &&
    !age
  ) {
    alert("Please enter age");
    return;
  }

  try {
    const seatToBook = selectedSeat;

    // ✅ FIXED: Find bus first and store all details
    const busDetails = buses.find((b) => b.id === selectedBus);
    const baseFare = busDetails?.fare;
    
    // ✅ FIXED: Calculate fare with baseFare properly
    const calculatedFare = baseFare ? calculateFare(baseFare) : 0;

    console.log("Booking payload:", {
      busId: selectedBus,
      seatNumber: seatToBook,
      fare: calculatedFare
    });

    const res = await API.post("/bookings", {
      busId: selectedBus,
      passengerName: user?.name,
      seatNumber: seatToBook,
      fare: calculatedFare,
      passengerType: passengerType,
      age: age || null
    });

    // ✅ fetch fresh booked seats from DB
    const updatedSeats = await fetchBookedSeats(selectedBus);
    setBookedSeats(updatedSeats);

    // ✅ show ticket with proper fare
    setTicket({
      busNumber: busDetails?.bus_number,
      source: busDetails?.source,
      destination: busDetails?.destination,
      departureTime: busDetails?.departure_time,
      arrivalTime: busDetails?.arrival_time,
      seatNumber: seatToBook,
      passengerName: user?.name,  // ✅ ADDED: passenger name
      passengerType,
      age:
        passengerType === "child" ||
        passengerType === "senior"
          ? age
          : "N/A",
      fare: calculatedFare,  // ✅ Use pre-calculated fare
      bookingDate: new Date().toLocaleString("en-IN")
    });

    // ✅ clear selection
    setSelectedSeat(null);

    alert(res.data.message);

  } catch (error) {
    console.log("Booking Error:", error.response?.data);
    alert(error.response?.data?.message || "Booking failed ❌");
  }
};

const fetchMyBookings = async () => {
  try {
    const res = await API.get(
      `/bookings/history/${user?.name}`
    );

    console.log("My Bookings Data:", res.data);  // ✅ DEBUG: Check what data we're getting
    setMyBookings(res.data);
  } catch (error) {
    console.log(error);
  }
};


// Print Ticket Function

const printTicket = (ticketData) => {
  console.log("PRINT TICKET DATA:", ticketData); 
  const passengerName =
  ticketData.passenger_name ||
  ticketData.passengerName ||
  user?.name;

const busNumber =
  ticketData.bus_number ||
  ticketData.busNumber;

const seatNumber =
  ticketData.seat_number ||
  ticketData.seatNumber;

const source = ticketData.source;
const destination = ticketData.destination;

const fare =
  ticketData.fare ||
  ticketData.total_fare ||
  0;

const passengerTypeDisplay =
  ticketData.passenger_type ||
  ticketData.passengerType ||
  "Adult";

const formattedDeparture = formatDateTime(
  ticketData.departure_time ||
  ticketData.departureTime
);

const formattedArrival = formatDateTime(
  ticketData.arrival_time ||
  ticketData.arrivalTime
);

  const printContent = `
  <html>
    <head>
      <title>Bus Ticket</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background: #f3f4f6;
          padding: 20px;
        }

        .ticket {
          max-width: 750px;
          margin: auto;
          background: white;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 6px 20px rgba(0,0,0,0.2);
          border: 1px solid #d1d5db;
        }

        .header {
          background: linear-gradient(90deg, #2563eb, #1d4ed8);
          color: white;
          padding: 18px 25px;
          display: flex;
          justify-content: space-between;
          font-size: 22px;
          font-weight: bold;
        }

        .content {
          display: grid;
          grid-template-columns: 2fr 1fr;
        }

        .left {
          padding: 25px;
        }

        .right {
          border-left: 2px dashed #9ca3af;
          padding: 20px;
          background: #f9fafb;
        }

        .route {
          margin: 20px 0;
          padding: 15px;
          background: #f3f4f6;
          border-radius: 12px;
          text-align: center;
          font-size: 20px;
          font-weight: bold;
        }

        .fare {
          margin-top: 20px;
          color: green;
          font-size: 24px;
          font-weight: bold;
        }

        .footer {
          padding: 15px;
          background: #f3f4f6;
          text-align: center;
          font-size: 14px;
        }
      </style>
    </head>

    <body>
      <div class="ticket">
        <div class="header">
          <span>🎫 Bus Ticket</span>
          <span>BUS${Date.now()}</span>
        </div>

        <div class="content">
          <div class="left">
            <p><b>Passenger:</b> ${passengerName}</p>
            <p><b>Bus No:</b> ${busNumber}</p>
            <p><b>Seat:</b> ${seatNumber}</p>
            <p><b>Type:</b> ${passengerTypeDisplay}</p>

            <div class="route">
              ${source} → ${destination}
            </div>

            <p><b>Departure:</b> ${formattedDeparture}</p>
            <p><b>Arrival:</b> ${formattedArrival}</p>

            <div class="fare">
              Fare: ₹${fare}
            </div>
          </div>

          <div class="right">
            <h3>Boarding Pass</h3>
            <p><b>Bus:</b> ${busNumber}</p>
            <p><b>Seat:</b> ${seatNumber}</p>
            <p><b>From:</b> ${source}</p>
            <p><b>To:</b> ${destination}</p>
          </div>
        </div>

        <div class="footer">
          Please arrive 15 minutes before departure 🚍
        </div>
      </div>
    </body>
  </html>
`;
  // const originalContent = document.body.innerHTML;

  // document.body.innerHTML = printContent;

  // window.print();

  // document.body.innerHTML = originalContent;

  // window.location.reload();

  const printWindow = window.open("", "_blank");

printWindow.document.write(printContent);
printWindow.document.close();
printWindow.focus();
printWindow.print();
printWindow.close();
};


const cancelTicket = async (bookingId) => {
  try {
    await API.delete(`/bookings/${bookingId}`);

    alert("Ticket cancelled successfully");

    fetchMyBookings();

    if (selectedBus) {
      const updatedSeats = await fetchBookedSeats(selectedBus);
      setBookedSeats(updatedSeats);
    }

  } catch (error) {
    console.log(error);
  }
};

const isBookingValid =
  selectedSeat &&
  passengerType &&
  (
    passengerType === "male" ||
    passengerType === "female" ||
    (
      (passengerType === "child" ||
        passengerType === "senior") &&
      age
    )
  );

  const busCardColors = [
  "linear-gradient(135deg, #2563eb, #1d4ed8)",
  "linear-gradient(135deg, #10b981, #059669)",
  "linear-gradient(135deg, #f59e0b, #d97706)",
  "linear-gradient(135deg, #8b5cf6, #7c3aed)",
  "linear-gradient(135deg, #ef4444, #dc2626)",
  "linear-gradient(135deg, #06b6d4, #0891b2)"
];

  // ----------------- MAIN RETURN FUNCTION
return (
  <div style={{ padding: "20px", color: "white" }}>
    <h1>User Dashboard</h1>

    {/* SEARCH */}
    <div style={{ marginBottom: "20px" }}>
      <input
        placeholder="Source"
        value={source}
        onChange={(e) => setSource(e.target.value)}
        style={{ marginRight: "10px", padding: "8px" }}
      />

      <input
        placeholder="Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        style={{ marginRight: "10px", padding: "8px" }}
      />

      <button
        onClick={searchBuses}
        style={{ marginRight: "10px", padding: "8px 15px" }}
      >
        Search Buses
      </button>

      <button
        onClick={() => {
          // fetchMyBookings();
          // setShowBookings(true);
          if (!showBookings) fetchMyBookings();
          setShowBookings(!showBookings);
        }}
        style={{ padding: "8px 15px" }}
      > 
        {showBookings ? "Hide Bookings" : "My Bookings"}
      </button>
    </div>

    {/* MAIN 2 COLUMN LAYOUT */}
    <div
      style={{
        display: "flex",
        gap: "25px",
        alignItems: "flex-start"
      }}
    >
      {/* LEFT SIDE */}
      <div style={{ flex: 2}}>
        <h2>Available Buses</h2>

        {buses.map((bus, index) => (
          <div
            key={bus.id}
            style={{
              // background: activeBusId === bus.id ? "rgba(235, 37, 179, 0.8)" : "rgba(255,255,255,0.08)",
              // color: activeBusId === bus.id ? "pink" : "white",
              // border: "1px solid white",
              // margin: "10px",
              // padding: "15px",
              // borderRadius: "12px"

              background:
                busCardColors[index % busCardColors.length],
              color: "white",
              margin: "12px 0",
              padding: "18px",
              borderRadius: "16px",
              boxShadow: "0 8px 20px rgba(224, 221, 221, 0.2)",
              transition: "15s ease",
              fontStyle: "normal-bold"
            }}
          >
            <h3 style={{background: "rgba(205, 195, 208, 0.88)", color: "black", fontStyle: "bold"}}>{bus.bus_number}</h3>
            <p>{bus.source} → {bus.destination}</p>
            <p>Departure: {formatDateTime(bus.departure_time)}</p>
            <p>Arrival: {formatDateTime(bus.arrival_time)}</p>
            <p>Capacity: {bus.capacity}</p>
            <p>Fare: ₹{bus.fare}</p>

            <button
              onClick={async () => {
                setActiveBusId(bus.id);
                setSelectedBus(bus.id);

                const seats = await fetchBookedSeats(bus.id);
                setBookedSeats(seats);

                setSelectedSeat(null);
              }}
              style={{
                // background: activeBusId === bus.id ? "green" : "transparent",
                // color: activeBusId === bus.id ? "pink" : "white",
                background:
                    "linear-gradient(90deg, #04080f, #060a15)",
                color: "white",
                padding: "8px 15px",
                borderRadius: "8px"
              }}
            >
              {activeBusId === bus.id
                ? "Selected ✅"
                : "Select Bus"}
            </button>

            {/* SEAT BOOKING UI */}
            {activeBusId === bus.id && (
              <div style={{ marginTop: "15px" }}>
                <h4>Seat Booking</h4>

                <p>
                  <b>Ticket Fare:</b> ₹{calculateFare(bus.fare)}
                </p>

                <p>
                  Remaining Seats:{" "}
                  {bus.capacity - bookedSeats.length}
                </p>

                {/* SEATS */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(5, 50px)",
                    gap: "10px",
                    marginTop: "10px"
                  }}
                >
                  {Array.from(
                    { length: bus.capacity },
                    (_, i) => i + 1
                  ).map((seat) => {
                    const isBooked =
                      bookedSeats.includes(Number(seat));

                    return (
                      <button
                        key={seat}
                        disabled={isBooked}
                        onClick={() =>
                          setSelectedSeat(seat)
                        }
                        style={{
                          padding: "10px",
                          background: isBooked
                            ? "red"
                            : selectedSeat === seat
                            ? "green"
                            : "white",
                          color: isBooked
                            ? "white"
                            : "black",
                          cursor: isBooked
                            ? "not-allowed"
                            : "pointer"
                        }}
                      >
                        {seat}
                      </button>
                    );
                  })}
                </div>

                {/* PASSENGER TYPE */}
                <div style={{ marginTop: "15px" }}>
                  <label>Passenger Type: </label>

                  <select
                    value={passengerType}
                    onChange={(e) => {
                      setPassengerType(
                        e.target.value
                      );
                      setAge("");
                    }}
                  >
                    <option value="">
                      Select Type
                    </option>
                    <option value="male">
                      Male Adult
                    </option>
                    <option value="female">
                      Female Adult
                    </option>
                    <option value="child">
                      Child
                    </option>
                    <option value="senior">
                      Senior Citizen
                    </option>
                  </select>

                  {(passengerType === "child" ||
                    passengerType ===
                      "senior") && (
                    <div
                      style={{
                        marginTop: "10px"
                      }}
                    >
                      <label>Age: </label>
                      <input
                        type="number"
                        value={age}
                        onChange={(e) =>
                          setAge(
                            e.target.value
                          )
                        }
                        placeholder="Enter age"
                      />
                    </div>
                  )}
                </div>

                {/* BOOK BUTTON */}
                <button
                  onClick={bookTicket}
                  disabled={!isBookingValid}
                  style={{
                    marginTop: "15px",
                    padding: "10px",
                    opacity: isBookingValid
                      ? 1
                      : 0.5
                  }}
                >
                  Book Seat
                </button>
              </div>
            )}
          </div>
        ))}
        {ticket && (
  <div
    style={{
      marginTop: "25px",
      background: "white",
      color: "black",
      padding: "20px",
      borderRadius: "16px",
      boxShadow: "0 6px 20px rgba(0,0,0,0.2)"
    }}
  >
    <h3>🎫 Current Ticket</h3>
    <p><b>Passenger:</b> {ticket.passengerName}</p>
    <p><b>Bus:</b> {ticket.busNumber}</p>
    <p><b>Seat:</b> {ticket.seatNumber}</p>
    <p><b>Route:</b> {ticket.source} → {ticket.destination}</p>
    <p><b>Fare:</b> ₹{ticket.fare}</p>

    <button
      onClick={() => printTicket(ticket)}
      style={{
        marginTop: "10px",
        background: "#2563eb",
        color: "white",
        border: "none",
        padding: "10px 15px",
        borderRadius: "8px"
      }}
    >
      Print Ticket
    </button>
  </div>
)}

{/* <div
  style={{
    position: "fixed",
    top: "120px",
    right: "40px",
    width: "34%",
    height: "70vh",
    borderRadius: "22px",
    background:
      "linear-gradient(135deg, rgba(37,99,235,0.15), rgba(16,185,129,0.10))",
    backdropFilter: "blur(10px)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    overflow: "hidden"
  }}
>
  <div
    style={{
      fontSize: "90px",
      animation: "busBounce 2s ease-in-out infinite"
    }}
  >
    👨‍✈️🚌
  </div>

  <h2
    style={{
      marginTop: "25px",
      fontSize: "28px",
      fontWeight: "bold",
      lineHeight: "1.4"
    }}
  >
    Travel Smart,<br />
    Travel Safe!! 🚍✨
  </h2>

  <p
    style={{
      marginTop: "15px",
      fontSize: "16px",
      opacity: 0.85
    }}
  >
    Your journey begins with comfort and safety
  </p>
</div> */}

</div>


      {/* RIGHT SIDE */}
    {showBookings && (
      <div
        style={{
          flex: 1,
          minWidth: "420px",
          position: "sticky",
          top: "20px"
        }}
      >
        <h2>My Bookings 🎫</h2>

        {myBookings.length === 0 ? (
          <p>No bookings yet</p>
        ) : (
          myBookings.map((ticket) => (
            <div
              key={ticket.id}
              style={{
                background: "white",
                color: "black",
                borderRadius: "16px",
                marginBottom: "15px",
                overflow: "hidden",
                boxShadow:
                  "0 6px 20px rgba(0,0,0,0.2)"
              }}
            >
              <div
                style={{
                  background:
                    "linear-gradient(90deg, #2563eb, #1d4ed8)",
                  color: "white",
                  padding: "15px"
                }}
              >
                🎫 {ticket.bus_number}
              </div>

              <div style={{ padding: "15px" }}>
                <p>
                  <b>Passenger:</b>{" "}
                  {ticket.passenger_name}
                </p>
                <p>
                  <b>Seat:</b>{" "}
                  {ticket.seat_number}
                </p>
                <p>
                  <b>Route:</b>{" "}
                  {ticket.source} →{" "}
                  {ticket.destination}
                </p>
                <p>
                  <b>Departure:</b><br />
                  {formatDateTime(
                    ticket.departure_time
                  )}
                </p>
                <p>
                  <b>Arrival:</b><br />
                  {formatDateTime(
                    ticket.arrival_time
                  )}
                </p>
                <p>
                  <b>Fare:</b> ₹{ticket.fare}
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "10px"
                  }}
                >
                  <button
                    onClick={() =>
                      cancelTicket(ticket.id)
                    }
                    style={{
                      background: "red",
                      color: "white",
                      border: "none",
                      padding: "8px 12px",
                      borderRadius: "8px"
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() =>
                      printTicket(ticket)
                    }
                    style={{
                      background: "#2563eb",
                      color: "white",
                      border: "none",
                      padding: "8px 12px",
                      borderRadius: "8px"
                    }}
                  >
                    Print
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    )}
    </div>
  </div>
);

}
export default UserDashboard;
