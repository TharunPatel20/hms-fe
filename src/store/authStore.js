import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: '',
      role: '',
      token: '',
      isAuthenticated: false,
      isLoading: false,

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
      }
    }),
    {
      name: "ui-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
)
