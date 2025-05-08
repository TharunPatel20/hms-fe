import { create } from "zustand"

export const useAuthStore = create((set) => ({
  user: null,
  role: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,

  login: (role, data) => {
    const { token, ...user } = data

    localStorage.setItem("token", token)
    localStorage.setItem("role", role)
    localStorage.setItem("user", JSON.stringify(user))

    set({
      user,
      role,
      token,
      isAuthenticated: true,
      isLoading: false,
    })
  },

  logout: () => {
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    localStorage.removeItem("user")

    set({
      user: null,
      role: null,
      token: null,
      isAuthenticated: false,
    })
  },
}))
