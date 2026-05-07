// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://https://bus-app-backend-kvx7.onrender.com//api"
// });

// API.interceptors.request.use((req) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     req.headers.Authorization = `Bearer ${token}`;
//   }
//   return req;
// });

// export default API;









// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://https://bus-app-backend-kvx7.onrender.com//api",
// });

// // token auto attach karega
// API.interceptors.request.use((req) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     req.headers.Authorization = `Bearer ${token}`;
//   }
//   return req;
// });

// export default API;









// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://https://bus-app-backend-kvx7.onrender.com//api"
// });

// API.interceptors.request.use((req) => {
//   const token = localStorage.getItem("token");

//   if (token) {
//     req.headers.Authorization = `Bearer ${token}`;
//   }

//   return req;
// });

// export default API;

import axios from "axios";

const API = axios.create({
  baseURL: "http://https://bus-app-backend-kvx7.onrender.com//api"
});

// ✅ Automatically attach token in every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default API;