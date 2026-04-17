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







// import { useState } from "react";
// import BusMap from "./components/BusMap";
// import BusSimulation from "./components/BusSimulation";
// import BusInfo from "./components/BusInfo";
// import AdminDashboard from "./components/AdminDashboard";

// function App() {

// const [mode,setMode] = useState("live");

// return (

// <div>

// <h1>Smart Bus Tracking System</h1>

// <button onClick={()=>setMode("live")}>
// Live Tracking
// </button>

// <button onClick={()=>setMode("simulation")}>
// Bus Simulation
// </button>

// {mode==="live" && <BusMap />}

// {mode==="simulation" && (
// <>
// <BusSimulation/>
// <BusInfo/>
// </>
// )}

// </div>

// );

// }

// export default App;









// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./Pages/Login";
// import Dashboard from "./Pages/Dashboard";
// import Booking from "./Pages/Booking"; // 1. Import it here

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         {/* 2. Add the dynamic route for booking */}
//         <Route path="/book/:id" element={<Booking />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }









import { useState, useEffect } from "react";
import BusMap from "./components/BusMap";
import BusSimulation from "./components/BusSimulation";
import BusInfo from "./components/BusInfo";
import AdminDashboard from "./components/AdminDashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import UserDashboard from "./components/UserDashboard";

// import "./App.css";

function App() {
// const handleLogout = () => {
//   console.log("Before logout:", localStorage.getItem("token"));

//   localStorage.clear();

//   console.log("After logout:", localStorage.getItem("token"));

//   alert("Logged out successfully ✅");

//   window.location.href = "/";
// };
  const handleLogout = () => {
  localStorage.clear();
  // localStorage.removeItem("mode");
  setMode("landing");

  alert("Logged out successfully ✅");

  window.location.href = "/";
};
  // const [mode, setMode] = useState(
  //   localStorage.getItem("mode") || "live"
  // );
  const user = JSON.parse(localStorage.getItem("user"));

const getDefaultMode = () => {
  if (!user) return "live";
  if (user.role === "admin") return "admin";
  return "user";
};

const [mode, setMode] = useState(
  localStorage.getItem("mode") || getDefaultMode()
);

  useEffect(() => {
    localStorage.setItem("mode", mode);
  }, [mode]);

  // const user = JSON.parse(localStorage.getItem("user"));
  {mode === "landing" && <LandingPage />}

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        color: "white",
        // padding: "30px",
        boxSizing: "border-box",
        fontFamily: "Arial, sans-serif"
      }}
    >
      {/* <h1>Smart Bus Tracking System</h1> */}
        <h1
          style={{
            fontSize: "64px",
            fontWeight: "bold",
            marginBottom: "30px",
            letterSpacing: "1px",
            textShadow: "0 4px 10px rgba(0,0,0,0.3)"
          }}
        >
          🚍 Smart Bus Tracking System
        </h1>


      {/* NAVIGATION BUTTONS */}
      {/* <div 
      /*style={{ marginBottom: "20px" }} */
        /*style={{
          padding: "12px 22px",
          marginRight: "12px",
          borderRadius: "30px",
          background: "rgba(255,255,255,0.08)",
          color: "white",
          border: "1px solid rgba(255,255,255,0.15)",
          cursor: "pointer",
          fontWeight: "600",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
        }}
        >*/}


        
        {/* <button onClick={() => setMode("live")}>
          Live Tracking
        </button> */}

        {/* <button onClick={() => setMode("simulation")}>
          Bus Simulation
        </button> */}

        {/* {user?.role === "admin" && (
          <button onClick={() => setMode("admin")}>
            Admin Dashboard
          </button>
        )} */}

        {/* <button onClick={() => setMode("login")}
            /*style={{
              padding: "12px 22px",
              marginRight: "12px",
              borderRadius: "30px",
              background: "rgba(255,255,255,0.08)",
              color: "white",
              border: "1px solid rgba(255,255,255,0.15)",
              cursor: "pointer",
              fontWeight: "600",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
            }}
          >
          Login
        </button> */}

        {/* <button onClick={handleLogout}
          /*style={{
            padding: "12px 22px",
            marginRight: "12px",
            borderRadius: "30px",
            background: "rgba(255,255,255,0.08)",
            color: "white",
            border: "1px solid rgba(255,255,255,0.15)",
            cursor: "pointer",
            fontWeight: "600",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
          }} 
          >
          Logout
        </button> */}

        {/* <button onClick={() => setMode("register")}
          /*style={{
            padding: "12px 22px",
            marginRight: "12px",
            borderRadius: "30px",
            background: "rgba(255,255,255,0.08)",
            color: "white",
            border: "1px solid rgba(255,255,255,0.15)",
            cursor: "pointer",
            fontWeight: "600",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
          }}
        >
          Register
        </button> */}

        {/* {user && (
          <button onClick={() => setMode("user")}>
            User Dashboard
          </button>
        )}
      </div> */}

      {/* SHOW ONLY AFTER LOGIN */}
{user && (
  <>
    {user.role === "admin" && (
      <button onClick={() => setMode("admin")}>
        Admin Dashboard
      </button>
    )}

    <button onClick={() => setMode("live")}>
      Live Tracking
    </button>

    <button onClick={() => setMode("simulation")}>
      Bus Simulation
    </button>

    <button onClick={() => setMode("user")}>
      User Dashboard
    </button>

    <button onClick={handleLogout}>
      Logout
    </button>
  </>
)}

{/* BEFORE LOGIN */}
{!user && (
  <>
    <button onClick={() => setMode("login")}>
      Login
    </button>

    <button onClick={() => setMode("register")}>
      Register
    </button>
  </>
)}

      {/* SCREEN MODES */}
      {/* {mode === "live" && <BusMap />}

      {mode === "simulation" && (
        <>
          <BusSimulation />
          <BusInfo />
        </>
      )}

      {mode === "admin" && user?.role === "admin" && (
        <AdminDashboard />
      )}  
          
      {mode === "login" && <Login setMode={setMode} />}

      {mode === "register" && <Register />}

      {mode === "user" && <UserDashboard />} */}

      {mode === "landing" && <LandingPage />}

{mode === "login" && <Login setMode={setMode} />}

{mode === "register" && <Register setMode={setMode} />}

{mode === "live" && user && <BusMap />}

{mode === "simulation" && user && (
  <>
    <BusSimulation />
    <BusInfo />
  </>
)}

{mode === "admin" && user?.role === "admin" && (
  <AdminDashboard />
)}

{mode === "user" && user && <UserDashboard />}
    </div>
  );
}

export default App;