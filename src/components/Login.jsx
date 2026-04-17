import { useState } from "react";
import API from "../Services/api";

function Login({ setMode }) {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

const handleLogin = async () => {
  try {
    const res = await API.post("/auth/login", form);

    console.log("LOGIN RESPONSE:", res.data);

    localStorage.setItem("token", res.data.token);
    // localStorage.setItem("user", JSON.stringify(res.data.user));
    localStorage.setItem("user", JSON.stringify(res.data.user));

      if (res.data.user.role === "admin") {
        setMode("admin");   // or redirect
      } else {
        setMode("user");
      }

    console.log("TOKEN AFTER SAVE:", localStorage.getItem("token"));

    alert("Login successful ✅");

  } catch (error) {
    console.log("LOGIN ERROR:", error.response?.data || error.message);
    alert("Login failed");
  }
};

  return (
    <div
       style={{
        width: "40%",
        height: "100%",
        marginTop: "40px",
        background: "rgba(0,0,0,0.25) transparent",
        // backdropFilter: "blur(10px)",
        padding: "30px",
        borderRadius: "20px",
        // boxShadow: "0 8px 25px rgba(0,0,0,0.25)"
      }} 
    >
      <h2>Login</h2>

      <input
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "15px",
          borderRadius: "10px",
          border: "1px solid #475569",
          background: "#1e293b",
          color: "white",
          fontSize: "15px"
        }}
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />

      <input
       style={{
          width: "100%",
          padding: "12px",
          marginBottom: "15px",
          borderRadius: "10px",
          border: "1px solid #475569",
          background: "#1e293b",
          color: "white",
          fontSize: "15px"
        }}  
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />

      <button onClick={handleLogin}
        style={{
          width: "50%",
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
        Login
      </button>
    </div>
  );
}

export default Login;