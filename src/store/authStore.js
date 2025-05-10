import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: "",
      role: "",
      token: "",
      isAuthenticated: false,
      isLoading: false,
      isDarkMode: false, // Add darkMode state

      login: (role, data) => {
        set({
          user: data.userId,
          role: data.role,
          token: data.token,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      logout: () => {
        set({
          user: null,
          role: null,
          token: null,
          isAuthenticated: false,
        });
      },

      // Action to toggle dark mode
      toggleDarkMode: () => {
        set((state) => {
          const newDarkModeState = !state.isDarkMode;
          // Apply or remove dark class from document
          if (newDarkModeState) {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }

          return {
            isDarkMode: newDarkModeState,
          };
        });
      },
    }),
    {
      name: "ui-storage", // Name of the item in the storage
      storage: createJSONStorage(() => sessionStorage), // Storage is sessionStorage
    }
  )
);
