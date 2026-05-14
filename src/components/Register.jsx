// import { useState } from "react";
// import API from "../Services/api";

// function Register() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: ""
//   });

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleRegister = async () => {
//     try {
//       const res = await API.post("/auth/register", form);
//       alert(res.data.message || "Registered successfully ✅");
//     } catch (error) {
//       console.log(error);
//       alert("Registration failed ❌");
//     }
//   };

//   return (
//     <div>
//       <h2>Register</h2>

//       <input
//         name="name"
//         placeholder="Name"
//         onChange={handleChange}
//       />

//       <input
//         name="email"
//         placeholder="Email"
//         onChange={handleChange}
//       />

//       <input
//         type="password"
//         name="password"
//         placeholder="Password"
//         onChange={handleChange}
//       />

//       <button onClick={handleRegister}>
//         Register
//       </button>
//     </div>
//   );
// }

// export default Register;











import { useState } from "react";
import API from "../Services/api";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleRegister = async () => {
    try {
      const res = await API.post("/auth/register", form);
      alert(res.data.message);
    } catch (error) {
      console.log(error);
      alert("Registration failed ❌");
    }
  };

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h1>Register</h1>

      <input
        style={{
          width: "30%",
          padding: "12px",
          marginBottom: "15px",
          borderRadius: "10px",
          border: "1px solid #475569",
          background: "#1e293b",
          color: "white",
          fontSize: "15px"
        }} 
        placeholder="Name"
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
 
      />

      <input
        style={{
          width: "30%",
          padding: "12px",
          marginBottom: "15px",
          borderRadius: "10px",
          border: "1px solid #475569",
          background: "#1e293b",
          color: "white",
          fontSize: "15px"
        }} 
        placeholder="Email"
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        style={{
          width: "30%",
          padding: "12px",
          marginBottom: "15px",
          borderRadius: "10px",
          border: "1px solid #475569",
          background: "#1e293b",
          color: "white",
          fontSize: "15px"
        }} 
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />
      <br />
      <button onClick={handleRegister}
        style={{
          width: "20%",
          padding: "15px",
          borderRadius: "12px",
          border: "none",
          background: "#3b82f6",
          color: "white",
          fontWeight: "bold",
          cursor: "pointer",
          fontSize: "16px"
        }} 
      >
        Register
      </button>
    </div>
  );
}

export default Register;