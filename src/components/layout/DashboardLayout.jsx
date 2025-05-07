import React, { useState } from "react"
import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
import { useAuthStore } from "../../store/authStore"

const DashboardLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const { user } = useAuthStore()

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar
          role={user.role}
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
        />
        <main className="flex-1 p-4 md:p-8 pt-20 md:ml-64 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
