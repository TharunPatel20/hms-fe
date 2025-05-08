import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import UserNavbar from "./UserNavbar";
import PublicNavbar from "./PublicNavbar";

const Navbar = ({ transparent = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navbarClass = transparent && !isScrolled
    ? "bg-transparent text-white"
    : "bg-white text-gray-800 border-b";

  return (
    <nav className={`fixed w-full z-50 transition-all ${navbarClass}`}>
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        <span className="text-xl font-bold">MediCare</span>

        <div className="hidden sm:flex">
          {isAuthenticated ? <UserNavbar /> : <PublicNavbar />}
        </div>

        {/* Mobile Toggle */}
        <button
          className="sm:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu (optional) could be broken out the same way */}
      {/* You can refactor mobile menu logic into separate components too if needed */}
    </nav>
  );
};

export default Navbar;
