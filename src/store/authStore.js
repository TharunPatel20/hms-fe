import { create } from "zustand"

// Mock user data for demonstration purposes
const mockUsers = {
  doctor: {
    id: "d1",
    name: "Dr. John Smith",
    email: "john.smith@hospital.com",
    role: "doctor",
    specialization: "Cardiology",
    department: "Cardiology",
    isApproved: true,
    yearsOfExperience: 10,
    profileImage: "https://randomuser.me/api/portraits/men/46.jpg"
  },
  patient: {
    id: "p1",
    name: "Jane Doe",
    email: "jane.doe@example.com",
    role: "patient",
    gender: "Female",
    dateOfBirth: "1990-05-15",
    bloodGroup: "O+",
    address: "123 Main St, Anytown",
    phone: "555-123-4567",
    profileImage: "https://randomuser.me/api/portraits/women/65.jpg"
  },
  admin: {
    id: "a1",
    name: "Admin User",
    email: "admin@hospital.com",
    role: "admin",
    department: "Administration",
    profileImage: "https://randomuser.me/api/portraits/men/32.jpg"
  }
}

export const useAuthStore = create(set => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  login: (role, userData) => {
    set({ isLoading: true })

    // Simulate API call with a timeout
    setTimeout(() => {
      const mockUser = { ...mockUsers[role], ...userData }
      set({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false
      })
    }, 1000)
  },
  logout: () => {
    set({
      user: null,
      isAuthenticated: false
    })
  }
}))
