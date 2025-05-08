// import { create } from "zustand";

// export const useAuthStore = create((set) => {
//   // Read from localStorage initially
//   const storedUser = localStorage.getItem("user");
//   const storedRole = localStorage.getItem("role");
//   const storedToken = localStorage.getItem("token");

//   const parsedUser = storedUser ? JSON.parse(storedUser) : null;

//   return {
//     user: parsedUser,
//     role: storedRole,
//     token: storedToken,
//     isAuthenticated: !!storedToken,
//     isLoading: false,

//     login: (role, data) => {
//       const { token, ...user } = data;

//       localStorage.setItem("token", token);
//       localStorage.setItem("role", role);
//       localStorage.setItem("user", JSON.stringify(user));

//       set({
//         user,
//         role,
//         token,
//         isAuthenticated: true,
//         isLoading: false,
//       });
//     },

//     logout: () => {
//       localStorage.removeItem("token");
//       localStorage.removeItem("role");
//       localStorage.removeItem("user");

//       set({
//         user: null,
//         role: null,
//         token: null,
//         isAuthenticated: false,
//       });
//     },
//   };
// });
import { create } from "zustand";

// Read stored user from localStorage
const storedUser = localStorage.getItem("user");
let parsedUser = null;
try {
  parsedUser = storedUser ? JSON.parse(storedUser) : null;
} catch {
  parsedUser = null;
}

export const useAuthStore = create((set) => ({
  user: parsedUser,
  role: localStorage.getItem("role"),
  token: localStorage.getItem("token"),
  isAuthenticated: !!parsedUser,
  isLoading: false,

  login: (role, data) => {
    const { token, ...user } = data;

    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("user", JSON.stringify(user));

    set({
      user,
      role,
      token,
      isAuthenticated: true,
      isLoading: false,
    });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    set({
      user: null,
      role: null,
      token: null,
      isAuthenticated: false,
    });
  },
}));

