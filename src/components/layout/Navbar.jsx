// import React, { useState } from "react"
// import { Link, useLocation, useNavigate } from "react-router-dom"
// import { Menu, X, ChevronDown, User, LogOut } from "lucide-react"
// import { useAuthStore } from "../../store/authStore"
// import Button from "../common/Button"

// const Navbar = ({ transparent = false }) => {
//   const [isOpen, setIsOpen] = useState(false)
//   const [profileOpen, setProfileOpen] = useState(false)
//   const { user, isAuthenticated, logout } = useAuthStore()
//   const location = useLocation()
//   const navigate = useNavigate()

//   const toggleMenu = () => setIsOpen(!isOpen)
//   const toggleProfile = () => setProfileOpen(!profileOpen)

//   const handleLogout = () => {
//     logout()
//     navigate("/")
//   }

//   // Determine if the navbar should be transparent based on scroll position
//   const [isScrolled, setIsScrolled] = useState(false)

//   React.useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10)
//     }

//     window.addEventListener("scroll", handleScroll)
//     return () => window.removeEventListener("scroll", handleScroll)
//   }, [])

//   const navbarClass =
//     transparent && !isScrolled
//       ? "bg-transparent text-white"
//       : "bg-white shadow-sm text-gray-800"

//   const getDashboardLink = () => {
//     if (!user) return "/"

//     switch (user.role) {
//       case "doctor":
//         return "/doctor/dashboard"
//       case "patient":
//         return "/patient/dashboard"
//       case "admin":
//         return "/admin/dashboard"
//       default:
//         return "/"
//     }
//   }

//   return (
//     <nav
//       className={`fixed w-full z-50 transition-all duration-300 ${navbarClass}`}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           <div className="flex">
//             <div className="flex-shrink-0 flex items-center">
//               <Link to="/" className="flex items-center">
//                 <span className="text-xl font-bold ml-2">MediCare</span>
//               </Link>
//             </div>

//             {/* Desktop menu */}
//             <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
//               <Link
//                 to="/"
//                 className={`${
//                   location.pathname === "/"
//                     ? "border-blue-500 text-blue-600"
//                     : "border-transparent hover:border-gray-300 hover:text-gray-700"
//                 } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200`}
//               >
//                 Home
//               </Link>
//               <Link
//                 to="/blogs"
//                 className={`${
//                   location.pathname === "/blogs"
//                     ? "border-blue-500 text-blue-600"
//                     : "border-transparent hover:border-gray-300 hover:text-gray-700"
//                 } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200`}
//               >
//                 Blogs
//               </Link>
//               <Link
//                 to="/appointment"
//                 className={`${
//                   location.pathname === "/appointment"
//                     ? "border-blue-500 text-blue-600"
//                     : "border-transparent hover:border-gray-300 hover:text-gray-700"
//                 } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200`}
//               >
//                 Add Appointment
//               </Link>
//             </div>
//           </div>

//           <div className="hidden sm:ml-6 sm:flex sm:items-center">
//             {isAuthenticated ? (
//               <div className="ml-3 relative">
//                 <div>
//                   <button
//                     onClick={toggleProfile}
//                     className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 items-center gap-2"
//                   >
//                     <span className="hidden md:block text-sm">
//                       {user?.name}
//                     </span>
//                     <img
//                       className="h-8 w-8 rounded-full object-cover border border-gray-200"
//                       src={
//                         user?.profileImage ||
//                         "https://randomuser.me/api/portraits/lego/1.jpg"
//                       }
//                       alt="User"
//                     />
//                     <ChevronDown size={16} />
//                   </button>
//                 </div>

//                 {profileOpen && (
//                   <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
//                     <Link
//                       to={getDashboardLink()}
//                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
//                       onClick={() => setProfileOpen(false)}
//                     >
//                       <div className="flex items-center">
//                         <User size={16} className="mr-2" />
//                         Dashboard
//                       </div>
//                     </Link>
//                     <button
//                       onClick={handleLogout}
//                       className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
//                     >
//                       <div className="flex items-center">
//                         <LogOut size={16} className="mr-2" />
//                         Sign out
//                       </div>
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <Button
//                 onClick={() => navigate("/login")}
//                 variant="primary"
//                 className="ml-4"
//               >
//                 Login
//               </Button>
//             )}
//           </div>

//           {/* Mobile menu button */}
//           <div className="flex items-center sm:hidden">
//             <button
//               onClick={toggleMenu}
//               className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
//             >
//               {isOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile menu */}
//       {isOpen && (
//         <div className="sm:hidden">
//           <div className="pt-2 pb-3 space-y-1">
//             <Link
//               to="/"
//               className={`${
//                 location.pathname === "/"
//                   ? "bg-blue-50 border-blue-500 text-blue-700"
//                   : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
//               } block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200`}
//               onClick={() => setIsOpen(false)}
//             >
//               Home
//             </Link>
//             <Link
//               to="/blogs"
//               className={`${
//                 location.pathname === "/blogs"
//                   ? "bg-blue-50 border-blue-500 text-blue-700"
//                   : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
//               } block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200`}
//               onClick={() => setIsOpen(false)}
//             >
//               Blogs
//             </Link>
//             <Link
//               to="/appointment"
//               className={`${
//                 location.pathname === "/appointment"
//                   ? "bg-blue-50 border-blue-500 text-blue-700"
//                   : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
//               } block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200`}
//               onClick={() => setIsOpen(false)}
//             >
//               Add Appointment
//             </Link>

//             {isAuthenticated ? (
//               <>
//                 <Link
//                   to={getDashboardLink()}
//                   className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 text-base font-medium transition-colors duration-200"
//                   onClick={() => setIsOpen(false)}
//                 >
//                   Dashboard
//                 </Link>
//                 <button
//                   onClick={() => {
//                     handleLogout()
//                     setIsOpen(false)
//                   }}
//                   className="w-full text-left block pl-3 pr-4 py-2 border-l-4 border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 text-base font-medium transition-colors duration-200"
//                 >
//                   Sign out
//                 </button>
//               </>
//             ) : (
//               <Link
//                 to="/login"
//                 className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 text-base font-medium transition-colors duration-200"
//                 onClick={() => setIsOpen(false)}
//               >
//                 Login
//               </Link>
//             )}
//           </div>
//         </div>
//       )}
//     </nav>
//   )
// }

// export default Navbar


import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, User, LogOut } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import Button from "../common/Button";

const Navbar = ({ transparent = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navbarClass = transparent && !isScrolled
    ? "bg-transparent text-white"
    : "bg-white text-gray-800 border-b";

  const linkClass = (path) =>
    location.pathname === path
      ? "text-blue-600"
      : "text-gray-600 hover:text-blue-600";

  const getDashboardLink = () => {
    switch (user?.role) {
      case "doctor":
        return "/doctor/dashboard";
      case "patient":
        return "/patient/dashboard";
      case "admin":
        return "/admin/dashboard";
      default:
        return "/";
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className={`fixed w-full z-50 transition-all ${navbarClass}`}>
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        <Link to="/" className="text-xl font-bold">MediCare</Link>

        <div className="hidden sm:flex gap-6 items-center">
          <Link to="/" className={linkClass("/")}>Home</Link>
          <Link to="/blogs" className={linkClass("/blogs")}>Blogs</Link>
          <Link to="/appointment" className={linkClass("/appointment")}>Add Appointment</Link>

          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2"
              >
                <span className="text-sm">{user?.name}</span>
                <img
                  className="h-8 w-8 rounded-full"
                  src={user?.profileImage || "https://randomuser.me/api/portraits/lego/1.jpg"}
                  alt="User"
                />
                <ChevronDown size={16} />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow text-sm z-10">
                  <Link to={getDashboardLink()} className="block px-4 py-2 hover:bg-gray-100" onClick={() => setProfileOpen(false)}>
                    <User size={16} className="inline mr-2" /> Dashboard
                  </Link>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-100">
                    <LogOut size={16} className="inline mr-2" /> Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Button onClick={() => navigate("/login")} className="text-sm">
              Login
            </Button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="sm:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden px-4 pb-4">
          <Link to="/" className="block py-2" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/blogs" className="block py-2" onClick={() => setIsOpen(false)}>Blogs</Link>
          <Link to="/appointment" className="block py-2" onClick={() => setIsOpen(false)}>Add Appointment</Link>

          {isAuthenticated ? (
            <>
              <Link to={getDashboardLink()} className="block py-2" onClick={() => setIsOpen(false)}>Dashboard</Link>
              <button onClick={() => { handleLogout(); setIsOpen(false); }} className="block py-2 w-full text-left">
                Sign out
              </button>
            </>
          ) : (
            <Link to="/login" className="block py-2" onClick={() => setIsOpen(false)}>Login</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
