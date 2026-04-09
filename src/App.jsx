import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Booking from "./Pages/Booking"; // 1. Import it here

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* 2. Add the dynamic route for booking */}
        <Route path="/book/:id" element={<Booking />} />
      </Routes>
    </BrowserRouter>
  );
}