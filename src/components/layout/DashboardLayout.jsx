import React, { useState, useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import Sidebar from "./Sidebar"
import { useAuthStore } from "../../store/authStore"

const DashboardLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const { role, isLoading } = useAuthStore()  // Assuming there's a loading state for role
  const navigate = useNavigate()

  console.log('dashboard')
  // Redirect to login if no role is found
  useEffect(() => {
    if (!isLoading && !role) {
      navigate("/login")
    }
  }, [role, isLoading, navigate])

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>  // Optional loading state
  }

  if (!role) {
    console.error('no role')
    return null  // Optionally, you can return a redirect here if you want to handle it differently
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      
      <div className="flex flex-1">
        <Sidebar
          role={role}
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
