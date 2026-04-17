import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         background:
//           "linear-gradient(135deg, #0f172a, #1e293b, #2563eb)",
//         color: "white",
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         padding: "50px"
//       }}
//     >
//       {/* LEFT CONTENT */}
//       <div> 
//         {/* style={{ width: "50%" }} */}
//         <p
//           style={{
//             fontSize: "18px",
//             opacity: 0.85,
//             marginTop: "10px"
//           }}
//         >
//           Real-time tracking • Smart booking • Safe journeys
//         </p>

//         <h1
//           style={{
//             fontSize: "56px",
//             marginBottom: "20px"
//           }}
//         >
//           Smart Bus Tracking System 🚌
//         </h1>

//         <p
//           style={{
//             fontSize: "22px",
//             opacity: 0.9,
//             lineHeight: "1.6"
//           }}
//         >
//           Travel Smart, Travel Safe!!
//           <br />
//           Book tickets, track buses live, and enjoy
//           a smooth journey experience.
//         </p>

//         <div style={{ marginTop: "30px" }}>
//           <button
//             onClick={() => navigate("login")}
//             style={{
//               padding: "14px 24px",
//               marginRight: "15px",
//               borderRadius: "12px",
//               border: "none",
//               fontSize: "16px",
//               cursor: "pointer"
//             }}
//           >
//             Login
//           </button>

//           <button
//             onClick={() => navigate("/register")}
//             style={{
//               padding: "14px 24px",
//               borderRadius: "12px",
//               border: "none",
//               fontSize: "16px",
//               cursor: "pointer"
//             }}
//           >
//             Register
//           </button>
//         </div>
//       </div>

//       {/* RIGHT ANIMATION */}
//       {/* <div
//         style={{
//           width: "40%",
//           textAlign: "center"
//         }}
//       >
//         <style>
//           {`
//             @keyframes busMove {
//               0% { transform: translateX(-20px); }
//               50% { transform: translateX(20px); }
//               100% { transform: translateX(-20px); }
//             }
//           `}
//         </style>

//         <div
//           style={{
//             fontSize: "120px",
//             animation: "busMove 3s infinite ease-in-out"
//           }}
//         >
//           👨‍✈️🚌
//         </div>

//         <h2 style={{ marginTop: "20px" }}>
//           Live Bus Monitoring
//         </h2>
//       </div> */}
      
//       {/* RIGHT SIDE - CREATIVE ANIMATION */}
// <div
//   style={{
//     width: "50%",
//     position: "relative",
//     height: "400px",
//     overflow: "hidden"
//   }}
// >
//   <style>
//     {`
//       @keyframes roadMove {
//         0% { background-position: 0 0; }
//         100% { background-position: 200px 0; }
//       }

//       @keyframes busDrive {
//         0% { transform: translateX(-100px); }
//         100% { transform: translateX(100%); }
//       }

//       @keyframes glow {
//         0% { opacity: 0.3; transform: scale(1); }
//         50% { opacity: 0.6; transform: scale(1.2); }
//         100% { opacity: 0.3; transform: scale(1); }
//       }
//     `}
//   </style>

//   {/* GLOW BACKGROUND */}
//   <div
//     style={{
//       position: "absolute",
//       top: "20%",
//       left: "30%",
//       width: "200px",
//       height: "200px",
//       // background: "#2563eb",
//       background: "linear-gradient(90deg, #2563eb, #1d4ed8)",
//       color: "white",
//       borderRadius: "50%",
//       filter: "blur(80px)",
//       animation: "glow 4s infinite"
//     }}
//   />

//   {/* ROAD */}
//   <div
//     style={{
//       position: "absolute",
//       bottom: "80px",
//       width: "100%",
//       height: "6px",
//       background:
//         "repeating-linear-gradient(to right, white 0 20px, transparent 20px 40px)",
//       animation: "roadMove 1s linear infinite"
//     }}
//   />

//   {/* BUS + DRIVER */}
//   <div
//     style={{
//       position: "absolute",
//       bottom: "60px",
//       fontSize: "60px",
//       animation: "busDrive 6s linear infinite"
//     }}
//   >
//     👨‍✈️🚌
//   </div>

//   {/* SLOGAN */}
//   <div
//     style={{
//       position: "absolute",
//       top: "20px",
//       left: "10%",
//       fontSize: "28px",
//       fontWeight: "bold",
//       color: "#60a5fa"
//     }}
//   >
//     Travel Smart 🚀
//   </div>

//   <div
//     style={{
//       position: "absolute",
//       top: "60px",
//       left: "10%",
//       fontSize: "22px",
//       color: "#cbd5f5"
//     }}
//   >
//     Travel Safe!!
//   </div>
// </div>
//     </div>
//   );

return (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      background: "linear-gradient(135deg, #0f172a, #1e293b, #2563eb)",
      flexDirection: "row",
      width: "100vw",
      color: "white"
    }}
  >
    {/* LEFT SIDE */}
    <div
      style={{
        flex: 1,
        padding: "60px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0f172a, #1e293b, #2563eb)"
      }}
    >
      <h1 style={{ fontSize: "56px" }}>
        Smart Bus Tracking System 🚌
      </h1>

      <p style={{ fontSize: "20px", marginTop: "10px" }}>
        Travel Smart, Travel Safe!!
      </p>

      <p style={{ marginTop: "10px", opacity: 0.8 }}>
        Real-time tracking • Smart booking • Safe journeys
      </p>

      <div style={{ marginTop: "30px" }}>
        <button
          onClick={() => navigate("/login")}
          style={{
            padding: "12px 20px",
            marginRight: "10px",
            borderRadius: "10px",
            border: "none",
            background: "#2563eb",
            color: "white",
            cursor: "pointer"
          }}
        >
          Login
        </button>

        <button
          onClick={() => navigate("/register")}
          style={{
            padding: "12px 20px",
            borderRadius: "10px",
            border: "none",
            background: "#1d4ed8",
            color: "white",
            cursor: "pointer"
          }}
        >
          Register
        </button>
      </div>
    </div>

    {/* RIGHT SIDE ANIMATION */}
    <div
      style={{
        flex: 1,
        position: "relative",
        height: "100vh",
        background: "red",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    > <h1>RIGHT SIDE WORKING</h1>
      <style>
        {`
          @keyframes busMove {
            0% { left: -100px; }
            100% { left: 100%; }
          }

          @keyframes roadMove {
            0% { background-position: 0; }
            100% { background-position: 200px; }
          }
        `}
      </style>

      {/* ROAD */}
      <div
        style={{
          position: "absolute",
          bottom: "120px",
          width: "100%",
          height: "6px",
          background:
            "repeating-linear-gradient(to right, white 0 20px, transparent 20px 40px)",
          backgroundSize: "200px 100%",
          animation: "roadMove 1s linear infinite"
        }}
      />

      {/* BUS */}
      {/* <div
        style={{
          position: "absolute",
          left: "0px",
          bottom: "100px",
          fontSize: "70px",
          animation: "busMove 6s linear infinite"
        }}
      >
        👨‍✈️🚌
      </div> */}

      <div
  style={{
    position: "absolute",
    top: "50%",
    left: "50%",
    fontSize: "100px"
  }}
>
  🚌
</div>

      {/* TEXT */}
      <div
        style={{
          position: "absolute",
          top: "25%",
          left: "20%",
          fontSize: "28px",
          color: "#93c5fd"
        }}
      >
        Live Tracking 🚀
      </div>
    </div>
  </div>
);

}

export default LandingPage;