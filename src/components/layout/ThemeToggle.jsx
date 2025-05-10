import React from "react";
import { Sun, Moon } from "lucide-react";
import { useAuthStore } from "../../store/authStore";

const ThemeToggle = () => {
  const isDarkMode = useAuthStore((state) => state.isDarkMode);
  const toggleDarkMode = useAuthStore((state) => state.toggleDarkMode);

  return (
    <button
      onClick={toggleDarkMode}
      className="text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 "
    >
      {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default ThemeToggle;
