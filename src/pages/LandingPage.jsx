// import { useNavigate } from "react-router-dom";

// function LandingPage() {
//   const navigate = useNavigate();

// //   return (
// //     <div
// //       style={{
// //         minHeight: "100vh",
// //         background:
// //           "linear-gradient(135deg, #0f172a, #1e293b, #2563eb)",
// //         color: "white",
// //         display: "flex",
// //         justifyContent: "space-between",
// //         alignItems: "center",
// //         padding: "50px"
// //       }}
// //     >
// //       {/* LEFT CONTENT */}
// //       <div> 
// //         {/* style={{ width: "50%" }} */}
// //         <p
// //           style={{
// //             fontSize: "18px",
// //             opacity: 0.85,
// //             marginTop: "10px"
// //           }}
// //         >
// //           Real-time tracking • Smart booking • Safe journeys
// //         </p>

// //         <h1
// //           style={{
// //             fontSize: "56px",
// //             marginBottom: "20px"
// //           }}
// //         >
// //           Smart Bus Tracking System 🚌
// //         </h1>

// //         <p
// //           style={{
// //             fontSize: "22px",
// //             opacity: 0.9,
// //             lineHeight: "1.6"
// //           }}
// //         >
// //           Travel Smart, Travel Safe!!
// //           <br />
// //           Book tickets, track buses live, and enjoy
// //           a smooth journey experience.
// //         </p>

// //         <div style={{ marginTop: "30px" }}>
// //           <button
// //             onClick={() => navigate("login")}
// //             style={{
// //               padding: "14px 24px",
// //               marginRight: "15px",
// //               borderRadius: "12px",
// //               border: "none",
// //               fontSize: "16px",
// //               cursor: "pointer"
// //             }}
// //           >
// //             Login
// //           </button>

// //           <button
// //             onClick={() => navigate("/register")}
// //             style={{
// //               padding: "14px 24px",
// //               borderRadius: "12px",
// //               border: "none",
// //               fontSize: "16px",
// //               cursor: "pointer"
// //             }}
// //           >
// //             Register
// //           </button>
// //         </div>
// //       </div>

// //       {/* RIGHT ANIMATION */}
// //       {/* <div
// //         style={{
// //           width: "40%",
// //           textAlign: "center"
// //         }}
// //       >
// //         <style>
// //           {`
// //             @keyframes busMove {
// //               0% { transform: translateX(-20px); }
// //               50% { transform: translateX(20px); }
// //               100% { transform: translateX(-20px); }
// //             }
// //           `}
// //         </style>

// //         <div
// //           style={{
// //             fontSize: "120px",
// //             animation: "busMove 3s infinite ease-in-out"
// //           }}
// //         >
// //           👨‍✈️🚌
// //         </div>

// //         <h2 style={{ marginTop: "20px" }}>
// //           Live Bus Monitoring
// //         </h2>
// //       </div> */}
      
// //       {/* RIGHT SIDE - CREATIVE ANIMATION */}
// // <div
// //   style={{
// //     width: "50%",
// //     position: "relative",
// //     height: "400px",
// //     overflow: "hidden"
// //   }}
// // >
// //   <style>
// //     {`
// //       @keyframes roadMove {
// //         0% { background-position: 0 0; }
// //         100% { background-position: 200px 0; }
// //       }

// //       @keyframes busDrive {
// //         0% { transform: translateX(-100px); }
// //         100% { transform: translateX(100%); }
// //       }

// //       @keyframes glow {
// //         0% { opacity: 0.3; transform: scale(1); }
// //         50% { opacity: 0.6; transform: scale(1.2); }
// //         100% { opacity: 0.3; transform: scale(1); }
// //       }
// //     `}
// //   </style>

// //   {/* GLOW BACKGROUND */}
// //   <div
// //     style={{
// //       position: "absolute",
// //       top: "20%",
// //       left: "30%",
// //       width: "200px",
// //       height: "200px",
// //       // background: "#2563eb",
// //       background: "linear-gradient(90deg, #2563eb, #1d4ed8)",
// //       color: "white",
// //       borderRadius: "50%",
// //       filter: "blur(80px)",
// //       animation: "glow 4s infinite"
// //     }}
// //   />

// //   {/* ROAD */}
// //   <div
// //     style={{
// //       position: "absolute",
// //       bottom: "80px",
// //       width: "100%",
// //       height: "6px",
// //       background:
// //         "repeating-linear-gradient(to right, white 0 20px, transparent 20px 40px)",
// //       animation: "roadMove 1s linear infinite"
// //     }}
// //   />

// //   {/* BUS + DRIVER */}
// //   <div
// //     style={{
// //       position: "absolute",
// //       bottom: "60px",
// //       fontSize: "60px",
// //       animation: "busDrive 6s linear infinite"
// //     }}
// //   >
// //     👨‍✈️🚌
// //   </div>

// //   {/* SLOGAN */}
// //   <div
// //     style={{
// //       position: "absolute",
// //       top: "20px",
// //       left: "10%",
// //       fontSize: "28px",
// //       fontWeight: "bold",
// //       color: "#60a5fa"
// //     }}
// //   >
// //     Travel Smart 🚀
// //   </div>

// //   <div
// //     style={{
// //       position: "absolute",
// //       top: "60px",
// //       left: "10%",
// //       fontSize: "22px",
// //       color: "#cbd5f5"
// //     }}
// //   >
// //     Travel Safe!!
// //   </div>
// // </div>
// //     </div>
// //   );

// // return (
// //   <div
// //     style={{
// //       minHeight: "100vh",
// //       display: "flex",
// //       background: "linear-gradient(135deg, #0f172a, #1e293b, #2563eb)",
// //       flexDirection: "row",
// //       width: "100vw",
// //       color: "white"
// //     }}
// //   >
// //     {/* LEFT SIDE */}
// //     <div
// //       style={{
// //         flex: 1,
// //         padding: "60px",
// //         display: "flex",
// //         flexDirection: "column",
// //         justifyContent: "center",
// //         background: "linear-gradient(135deg, #0f172a, #1e293b, #2563eb)"
// //       }}
// //     >
// //       <h1 style={{ fontSize: "56px" }}>
// //         Smart Bus Tracking System 🚌
// //       </h1>

// //       <p style={{ fontSize: "20px", marginTop: "10px" }}>
// //         Travel Smart, Travel Safe!!
// //       </p>

// //       <p style={{ marginTop: "10px", opacity: 0.8 }}>
// //         Real-time tracking • Smart booking • Safe journeys
// //       </p>

// //       <div style={{ marginTop: "30px" }}>
// //         <button
// //           onClick={() => navigate("/login")}
// //           style={{
// //             padding: "12px 20px",
// //             marginRight: "10px",
// //             borderRadius: "10px",
// //             border: "none",
// //             background: "#2563eb",
// //             color: "white",
// //             cursor: "pointer"
// //           }}
// //         >
// //           Login
// //         </button>

// //         <button
// //           onClick={() => navigate("/register")}
// //           style={{
// //             padding: "12px 20px",
// //             borderRadius: "10px",
// //             border: "none",
// //             background: "#1d4ed8",
// //             color: "white",
// //             cursor: "pointer"
// //           }}
// //         >
// //           Register
// //         </button>
// //       </div>
// //     </div>

// //     {/* RIGHT SIDE ANIMATION */}
// //     <div
// //       style={{
// //         flex: 1,
// //         position: "relative",
// //         height: "100vh",
// //         background: "red",
// //         display: "flex",
// //         justifyContent: "center",
// //         alignItems: "center"
// //       }}
// //     > <h1>RIGHT SIDE WORKING</h1>
// //       <style>
// //         {`
// //           @keyframes busMove {
// //             0% { left: -100px; }
// //             100% { left: 100%; }
// //           }

// //           @keyframes roadMove {
// //             0% { background-position: 0; }
// //             100% { background-position: 200px; }
// //           }
// //         `}
// //       </style>

// //       {/* ROAD */}
// //       <div
// //         style={{
// //           position: "absolute",
// //           bottom: "120px",
// //           width: "100%",
// //           height: "6px",
// //           background:
// //             "repeating-linear-gradient(to right, white 0 20px, transparent 20px 40px)",
// //           backgroundSize: "200px 100%",
// //           animation: "roadMove 1s linear infinite"
// //         }}
// //       />

// //       {/* BUS */}
// //       {/* <div
// //         style={{
// //           position: "absolute",
// //           left: "0px",
// //           bottom: "100px",
// //           fontSize: "70px",
// //           animation: "busMove 6s linear infinite"
// //         }}
// //       >
// //         👨‍✈️🚌
// //       </div> */}

// //       <div
// //   style={{
// //     position: "absolute",
// //     top: "50%",
// //     left: "50%",
// //     fontSize: "100px"
// //   }}
// // >
// //   🚌
// // </div>

// //       {/* TEXT */}
// //       <div
// //         style={{
// //           position: "absolute",
// //           top: "25%",
// //           left: "20%",
// //           fontSize: "28px",
// //           color: "#93c5fd"
// //         }}
// //       >
// //         Live Tracking 🚀
// //       </div>
// //     </div>
// //   </div>
// // );

// // export default function SmartBusLandingPage() {
  
//   return (
//     <div className="min-h-screen bg-[#081120] text-white overflow-hidden">
//       {/* NAVBAR */}
//       <nav className="flex items-center justify-between px-10 py-6 border-b border-white/10 backdrop-blur-md bg-white/5">
//         <div className="flex items-center gap-4">
//           <div className="text-4xl">🚌</div>
//           <h1 className="text-3xl font-bold tracking-wide">
//             Smart Bus Tracking System
//           </h1>
//         </div>

//         <div className="flex gap-4">
//           <button className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-lg">
//             Login
//           </button>

//           <button className="px-6 py-2 rounded-xl border border-white/30 hover:bg-white/10 transition-all duration-300">
//             Register
//           </button>
//         </div>
//       </nav>

//       {/* HERO SECTION */}
//       <section className="grid grid-cols-1 lg:grid-cols-2 items-center px-10 lg:px-20 py-16 gap-10">
//         {/* LEFT CONTENT */}
//         <div>
//           <div className="inline-block px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/30 text-sm text-blue-300 mb-6">
//             Real-Time Bus Monitoring Platform
//           </div>

//           <h2 className="text-5xl lg:text-7xl font-extrabold leading-tight mb-6">
//             Track Every Bus
//             <span className="block text-blue-400">
//               In Real Time
//             </span>
//           </h2>

//           <p className="text-lg text-gray-300 leading-8 mb-8 max-w-xl">
//             Monitor live buses, simulate custom routes, manage drivers,
//             check passenger data, and visualize smart transportation
//             systems with interactive maps and real-time tracking.
//           </p>

//           <div className="flex flex-wrap gap-4">
//             <button className="px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-lg font-semibold shadow-2xl shadow-blue-500/30">
//               Start Tracking
//             </button>

//             <button className="px-8 py-4 rounded-2xl border border-white/20 hover:bg-white/10 transition-all duration-300 text-lg">
//               Explore Features
//             </button>
//           </div>

//           {/* STATS */}
//           <div className="grid grid-cols-3 gap-4 mt-12">
//             <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
//               <h3 className="text-3xl font-bold text-blue-400">120+</h3>
//               <p className="text-gray-400 mt-2">Active Buses</p>
//             </div>

//             <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
//               <h3 className="text-3xl font-bold text-green-400">50+</h3>
//               <p className="text-gray-400 mt-2">Drivers</p>
//             </div>

//             <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
//               <h3 className="text-3xl font-bold text-yellow-400">24/7</h3>
//               <p className="text-gray-400 mt-2">Live Tracking</p>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT SIDE */}
//         <div className="relative flex justify-center items-center">
//           {/* GLOW */}
//           <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-3xl rounded-full"></div>

//           {/* MAIN CARD */}
//           <div className="relative bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 w-full max-w-xl shadow-2xl">
//             {/* TOP BAR */}
//             <div className="flex justify-between items-center mb-6">
//               <div>
//                 <h3 className="text-2xl font-bold">Live Bus Dashboard</h3>
//                 <p className="text-gray-400">Real-time route monitoring</p>
//               </div>

//               <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
//             </div>

//             {/* MAP MOCKUP */}
//             <div className="bg-[#0f172a] rounded-2xl h-[320px] relative overflow-hidden border border-white/10">
//               {/* GRID */}
//               <div className="absolute inset-0 opacity-10">
//                 <div className="grid grid-cols-6 h-full">
//                   {Array.from({ length: 24 }).map((_, i) => (
//                     <div key={i} className="border border-white/10"></div>
//                   ))}
//                 </div>
//               </div>

//               {/* ROUTE LINE */}
//               <svg
//                 className="absolute inset-0 w-full h-full"
//                 viewBox="0 0 500 300"
//               >
//                 <path
//                   d="M40 250 C120 220, 160 180, 230 190 S340 120, 450 70"
//                   stroke="#3b82f6"
//                   strokeWidth="6"
//                   fill="none"
//                   strokeLinecap="round"
//                 />
//               </svg>

//               {/* BUS POINTS */}
//               <div className="absolute left-[12%] bottom-[18%] w-5 h-5 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50"></div>

//               <div className="absolute left-[40%] top-[42%] w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>

//               <div className="absolute right-[12%] top-[18%] w-5 h-5 bg-red-400 rounded-full"></div>

//               {/* LABELS */}
//               <div className="absolute left-[10%] bottom-[8%] text-sm text-white font-semibold">
//                 Nagpur
//               </div>

//               <div className="absolute right-[10%] top-[8%] text-sm text-white font-semibold">
//                 Mumbai
//               </div>
//             </div>

//             {/* BOTTOM CARDS */}
//             <div className="grid grid-cols-2 gap-4 mt-6">
//               <div className="bg-blue-500/10 border border-blue-400/20 rounded-2xl p-4">
//                 <p className="text-gray-400 text-sm">Current Speed</p>
//                 <h4 className="text-2xl font-bold mt-2">68 km/h</h4>
//               </div>

//               <div className="bg-green-500/10 border border-green-400/20 rounded-2xl p-4">
//                 <p className="text-gray-400 text-sm">Passengers</p>
//                 <h4 className="text-2xl font-bold mt-2">38</h4>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default LandingPage;


// // import { useNavigate } from "react-router-dom";

function LandingPage({ setMode}) {

  // const navigate = useNavigate();

  return (

    <div className="min-h-screen bg-[#081120] text-white overflow-hidden">

      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-10 py-6 border-b border-white/10 backdrop-blur-md bg-white/5">

        <div className="flex items-center gap-4">
          <div className="text-4xl">🚌</div>

          <h1 className="text-5xl font-bold tracking-wide">
            Smart Bus Tracking System
          </h1>
        </div>

        <div className="flex gap-4">

          <button
            onClick={() => setMode("login")}
            className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-lg"
          >
            Login
          </button>

          <button
            onClick={() => setMode("register")}
            className="px-6 py-2 rounded-xl border border-white/30 hover:bg-white/10 transition-all duration-300"
          >
            Register
          </button>

        </div>

      </nav>

      {/* HERO SECTION */}
      <section className="grid grid-cols-1 lg:grid-cols-2 items-center px-10 lg:px-20 py-16 gap-10">

        {/* LEFT SIDE */}
        <div>

          <div className="inline-block px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/30 text-sm text-blue-300 mb-6">
            Real-Time Bus Monitoring Platform
          </div>

          <h2 className="text-5xl lg:text-7xl font-extrabold leading-tight mb-6">
            Track Every Bus
            <span className="block text-blue-400">
              In Real Time
            </span>
          </h2>

          <p className="text-lg text-gray-300 leading-8 mb-8 max-w-xl">
            Monitor live buses, simulate routes, manage drivers,
            track passengers, and visualize transportation systems
            using smart interactive maps.
          </p>

          <div className="flex flex-wrap gap-4">

            <button
              onClick={() => setMode("login")}
              className="px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-lg font-semibold shadow-2xl shadow-blue-500/30"
            >
              Start Tracking
            </button>

            <button
              className="px-8 py-4 rounded-2xl border border-white/20 hover:bg-white/10 transition-all duration-300 text-lg"
            >
              Explore Features
            </button>

          </div>

          {/* STATS */}
          <div className="grid grid-cols-3 gap-4 mt-12">

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
              <h3 className="text-3xl font-bold text-blue-400">120+</h3>
              <p className="text-gray-400 mt-2">Active Buses</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
              <h3 className="text-3xl font-bold text-green-400">50+</h3>
              <p className="text-gray-400 mt-2">Drivers</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
              <h3 className="text-3xl font-bold text-yellow-400">24/7</h3>
              <p className="text-gray-400 mt-2">Live Tracking</p>
            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="relative flex justify-center items-center">

          {/* BLUE GLOW */}
          <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-3xl rounded-full"></div>

          {/* DASHBOARD CARD */}
          <div className="relative bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 w-full max-w-xl shadow-2xl">

            {/* TOP */}
            <div className="flex justify-between items-center mb-6">

              <div>
                <h3 className="text-2xl font-bold">
                  Live Bus Dashboard
                </h3>

                <p className="text-gray-400">
                  Real-time route monitoring
                </p>
              </div>

              <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>

            </div>

            {/* MAP */}
            <div className="bg-[#0f172a] rounded-2xl h-[320px] relative overflow-hidden border border-white/10">

              {/* ROUTE */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 500 300"
              >

                <path
                  d="M40 250 C120 220, 160 180, 230 190 S340 120, 450 70"
                  stroke="#3b82f6"
                  strokeWidth="6"
                  fill="none"
                  strokeLinecap="round"
                />

              </svg>

              {/* BUS POINTS */}
              <div className="absolute left-[12%] bottom-[18%] w-5 h-5 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50"></div>

              <div className="absolute left-[40%] top-[42%] w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>

              <div className="absolute right-[12%] top-[18%] w-5 h-5 bg-red-400 rounded-full"></div>

              {/* LABELS */}
              <div className="absolute left-[10%] bottom-[8%] text-sm text-white font-semibold">
                Nagpur
              </div>

              <div className="absolute right-[10%] top-[8%] text-sm text-white font-semibold">
                Mumbai
              </div>

            </div>

            {/* BOTTOM CARDS */}
            <div className="grid grid-cols-2 gap-4 mt-6">

              <div className="bg-blue-500/10 border border-blue-400/20 rounded-2xl p-4">
                <p className="text-gray-400 text-sm">
                  Current Speed
                </p>

                <h4 className="text-2xl font-bold mt-2">
                  68 km/h
                </h4>
              </div>

              <div className="bg-green-500/10 border border-green-400/20 rounded-2xl p-4">
                <p className="text-gray-400 text-sm">
                  Passengers
                </p>

                <h4 className="text-2xl font-bold mt-2">
                  38
                </h4>
              </div>

            </div>

          </div>

        </div>

      </section>

    </div>

  );
}

export default LandingPage;