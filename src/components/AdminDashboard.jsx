// import { useState, useEffect } from "react";
// import API from "../Services/api";

// function AdminDashboard() {
//   const [buses, setBuses] = useState([]);
//   const [users, setUsers] = useState([]);

//   const [form, setForm] = useState({
//     bus_number: "",
//     capacity: "",
//     driver_name: "",
//     source: "",
//     destination: ""
//   });

//   const fetchBuses = async () => {
//     const res = await API.get("/buses");
//     setBuses(res.data);
//   };

//   const fetchUsers = async () => {
//     const res = await API.get("/admin/users");
//     setUsers(res.data);
//   };

//   useEffect(() => {
//     fetchBuses();
//     fetchUsers();
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const addBus = async () => {
//     await API.post("/buses", form);
//     fetchBuses();

//     setForm({
//       bus_number: "",
//       capacity: "",
//       driver_name: "",
//       source: "",
//       destination: ""
//     });
//   };

//   const deleteBus = async (id) => {
//     await API.delete(`/buses/${id}`);
//     fetchBuses();
//   };

//   const changeRole = async (id, role) => {
//   try {
//     await API.put(`/admin/change-role/${id}`, { role });
//     alert(`Role changed to ${role}`);
//   } catch (error) {
//     console.log(error);
//   }
// };

//   return (
//     <div style={{ padding: "20px", color: "white" }}>
//       <h1>Admin Dashboard</h1>

//       <h2>Add Bus</h2>

//       <input name="bus_number" placeholder="Bus Number" onChange={handleChange} />
//       <input name="capacity" placeholder="Capacity" onChange={handleChange} />
//       <input name="driver_name" placeholder="Driver Name" onChange={handleChange} />
//       <input name="source" placeholder="Source" onChange={handleChange} />
//       <input name="destination" placeholder="Destination" onChange={handleChange} />

//       <button onClick={addBus}>Add Bus</button>

//       <h2>Bus List</h2>

//       {buses.map((bus) => (
//         <div key={bus.id}>
//           <p>
//             {bus.bus_number} <br />
//             {bus.source} → {bus.destination} <br />
//              Driver: {bus.driver_name} <br />
//              Capacity: {bus.capacity} <br />
//           </p>
//           <button onClick={() => deleteBus(bus.id)}>
//             Delete
//           </button>
//         </div>
//       ))}

//       <h2>User Management</h2>

//       {users.map((user) => (
//         <div key={user.id}>
//           <p>{user.name} - {user.role}</p>

//             <button onClick={() => changeRole(user.id, "admin")}>
//                 Make Admin
//             </button>

//             <button onClick={() => changeRole(user.id, "passenger")}>
//                 Make Passenger
//             </button>
          
//         </div>
//       ))}
//     </div>
//   );
// }

// export default AdminDashboard;

















import { useState, useEffect } from "react";
import API from "../Services/api";

function AdminDashboard() {
  const [buses, setBuses] = useState([]);
  const [users, setUsers] = useState([]);
  const [editFare, setEditFare] = useState("");

  const [form, setForm] = useState({
    bus_number: "",
    capacity: "",
    driver_name: "",
    source: "",
    destination: "",
    departure_time: "",
    arrival_time: "",
    fare:""
  });

  const [editingBusId, setEditingBusId] = useState(null);
  const [editForm, setEditForm] = useState({
    bus_number: "",
    driver_name: "",
    capacity: "",
    source: "",
    destination: "",
    departure_time: "",
    arrival_time: "",
    fare:""
  });
  
  // ---------------- FETCH BUSES ----------------
  const fetchBuses = async () => {
  try {
    const res = await API.get("/buses");
    console.log("Fetched buses:", res.data);
    setBuses(res.data);
  } catch (error) {
    console.log(error);
  }
};

  // ---------------- FETCH USERS ----------------
  const fetchUsers = async () => {
    try {
      const res = await API.get("/admin/users");
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBuses();
    fetchUsers();
  }, []);

  // ---------------- HANDLE ADD FORM ----------------
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // ---------------- ADD BUS ----------------
  const addBus = async () => {
    try {
      console.log("Sending bus data:", form);

      await API.post("/buses", form);

      alert("Bus added successfully ✅");

      setForm({
        bus_number: "",
        capacity: "",
        driver_name: "",
        source: "",
        destination: "",
        departure_time: "",
        arrival_time: "",
        fare:""
      });

      fetchBuses();
    } catch (error) {
      console.log(error);
      alert("Failed to add bus ❌");
    }
  };

  // ---------------- DELETE BUS ----------------
  const deleteBus = async (id) => {
    try {
      await API.delete(`/buses/${id}`);
      fetchBuses();
    } catch (error) {
      console.log(error);
    }
  };

  // ---------------- CHANGE ROLE ----------------
  const changeRole = async (id, role) => {
    try {
      await API.put(`/admin/users/${id}/role`, { role });

      alert("Role updated successfully ✅");

      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  // ---------------- EDIT FORM CHANGE ----------------
  const handleEditChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  // ---------------- UPDATE BUS ----------------
  const updateBus = async () => {
    try {
      await API.put(`/buses/${editingBusId}`, editForm);

      alert("Bus updated successfully ✅");

      setEditingBusId(null);
      fetchBuses();
    } catch (error) {
      console.log(error);
      alert("Update failed ❌");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "20px" }}>
        Admin Dashboard
      </h1>

      {/* ---------------- ADD BUS ---------------- */}
      <div
        style={{
          background: "#1f2937",
          padding: "20px",
          borderRadius: "12px",
          marginBottom: "30px"
        }}
      >
        <h2>Add New Bus</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "10px",
            marginTop: "15px"
          }}
        >
          <input name="bus_number" placeholder="Bus Number" value={form.bus_number} onChange={handleChange} />
          <input name="capacity" placeholder="Capacity" value={form.capacity} onChange={handleChange} />
          <input name="driver_name" placeholder="Driver Name" value={form.driver_name} onChange={handleChange} />
          <input name="source" placeholder="Source" value={form.source} onChange={handleChange} />
          <input name="destination" placeholder="Destination" value={form.destination} onChange={handleChange} />
          <input name="departure_time" type="datetime-local" value={form.departure_time} onChange={handleChange} />
          <input name="arrival_time" type="datetime-local" value={form.arrival_time} onChange={handleChange} />
          <input name="fare" placeholder="Ticket Fare" value={form.fare} onChange={handleChange} />
        </div>

        <button
          onClick={addBus}
          style={{
            marginTop: "15px",
            padding: "10px 20px",
            borderRadius: "8px",
            background: "#2563eb",
            color: "white",
            border: "none"
          }}
        >
          Add Bus
        </button>
      </div>

      {/* ---------------- BUS LIST ---------------- */}
      <h2 style={{ marginBottom: "20px" }}>Bus List</h2>

      {buses.map((bus) => (
        <div
          key={bus.id}
          style={{
            border: "1px solid #374151",
            borderRadius: "12px",
            padding: "20px",
            marginBottom: "20px",
            background: "#111827"
          }}
        >
          <h3>{bus.bus_number}</h3>

          <p><b>Driver:</b> {bus.driver_name}</p>
          <p><b>Route:</b> {bus.source} → {bus.destination}</p>
          <p><b>Total Seats:</b> {bus.capacity}</p>
          <p><b>Passengers:</b> {bus.passengers}</p>
          <p><b>Departure:</b>{" "}
            {bus.departure_time
              ? new Date(bus.departure_time).toLocaleString("en-IN", {
                dateStyle: "medium",
                timeStyle: "short"
              })
            : "Not set"}
          </p>

          <p><b>Arrival:</b>{" "}
            {bus.arrival_time
              ? new Date(bus.arrival_time).toLocaleString("en-IN", {
                dateStyle: "medium",
                timeStyle: "short"
              })
            : "Not set"}
          </p>
          <p><b>Fare:</b> ₹{bus.fare}</p>

          <p style={{ color: "lightgreen" }}>
            <b>Available Seats:</b> {bus.capacity - bus.passengers}
          </p>

          <button
            onClick={() => deleteBus(bus.id)}
            style={{ marginRight: "10px", padding: "8px 15px" }}
          >
            Delete
          </button>

          <button
            onClick={() => {
              setEditingBusId(bus.id);
              setEditForm({
                bus_number: bus.bus_number,
                driver_name: bus.driver_name,
                capacity: bus.capacity,
                source: bus.source,
                destination: bus.destination,
                departure_time: bus.departure_time || "",
                arrival_time: bus.arrival_time || "",
                fare: bus.fare || ""
              });
            }}
            style={{ padding: "8px 15px" }}
          >
            Edit
          </button>

          {/* ---------------- EDIT SECTION ---------------- */}
          {editingBusId === bus.id && (
            <div style={{ marginTop: "20px" }}>
              <h3>Edit Bus</h3>

              <input name="bus_number" value={editForm.bus_number} onChange={handleEditChange} placeholder="Bus Number" />
              <input name="driver_name" value={editForm.driver_name} onChange={handleEditChange} placeholder="Driver Name" />
              <input name="capacity" value={editForm.capacity} onChange={handleEditChange} placeholder="Capacity" />
              <input name="source" value={editForm.source} onChange={handleEditChange} placeholder="Source" />
              <input name="destination" value={editForm.destination} onChange={handleEditChange} placeholder="Destination" />
              <input name="departure_time" type="datetime-local" value={editForm.departure_time} onChange={handleEditChange} />
              <input name="arrival_time" type="datetime-local" value={editForm.arrival_time} onChange={handleEditChange} />
              <input name="fare" placeholder="Ticket Fare" value={editForm.fare} onChange={handleEditChange} />

              <button
                onClick={updateBus}
                style={{ marginTop: "10px" }}
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      ))}

      {/* ---------------- USER MANAGEMENT ---------------- */}
      <h2 style={{ marginTop: "40px", marginBottom: "20px" }}>
        User Management
      </h2>

      {users.map((user) => (
        <div
          key={user.id}
          style={{
            border: "1px solid #374151",
            borderRadius: "12px",
            padding: "20px",
            marginBottom: "20px",
            background: "#111827"
          }}
        >
          <h3>{user.name}</h3>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Role:</b> {user.role}</p>

          <button
            onClick={() => changeRole(user.id, "admin")}
            style={{ marginRight: "10px", padding: "8px 15px" }}
          >
            Make Admin
          </button>

          <button
            onClick={() => changeRole(user.id, "user")}
            style={{ padding: "8px 15px" }}
          >
            Make User
          </button>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;