import React, { useState, useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
import { useAuthStore } from "../../store/authStore"

const DashboardLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const { user, loading } = useAuthStore()  // Assuming there's a loading state for user
  const navigate = useNavigate()

  // Redirect to login if no user is found
  useEffect(() => {
    if (!loading && !user) {
      navigate("/login")
    }
  }, [user, loading, navigate])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>  // Optional loading state
  }

  if (!user) {
    return null  // Optionally, you can return a redirect here if you want to handle it differently
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* <Navbar /> */}
      <div className="flex flex-1">
        <Sidebar
          role={user.role}
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
        />
        <main className="flex-1 md:p-4 pt-24 min-h-screen overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
