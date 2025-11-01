'use client'
import React from "react";
import {
  Settings,
  Users,
  Calendar,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  DollarSign,
} from "lucide-react";
import DentalNavbar from "@/components/NavBar";
import { useUser } from "@clerk/nextjs";
import AdminStats from "@/components/admin/AdminStats";
import DoctorsManagement from "@/components/admin/DoctorsManagement";
import { useGetAppointments } from "@/hooks/use-appointments";
import { useGetDoctors } from "@/hooks/use-doctors";

const AdminDashboardClient = () => {
  const {user} = useUser()
  const {data : doctors=[],isLoading:doctorsLoading} = useGetDoctors()
  const {data : appointments=[],isLoading:appointmentLoading} = useGetAppointments()
  
 const stats ={
  totalDoctors : doctors.length,
  totalAppoinments : appointments.length,
  activeDoctors : doctors.filter((doctor)=>doctor.isActive).length,
  activeAppointments : appointments.filter((appointment)=>appointment.status === 'COMPLETED').length
 }
  if(doctorsLoading || appointmentLoading) return <p>LOADING....</p>
  return (
    <div className="min-h-screen bg-[#0f1117]">
      <DentalNavbar />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Welcome Header Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#1e2330] to-[#252938] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 mb-6 sm:mb-8 border border-gray-800/50 shadow-2xl">
          {/* Decorative gradient orbs */}
          <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 sm:w-64 h-48 sm:h-64 bg-blue-500/10 rounded-full blur-3xl"></div>

          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-4 sm:mb-5">
                <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                <span className="text-orange-400 text-xs sm:text-sm font-medium">
                  Admin Dashboard
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 tracking-tight">
                Welcome back,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                 {user?.firstName}
                </span>
              </h1>

              <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl">
                Manage doctors, oversee appointments, and monitor your dental
                practice performance.
              </p>
            </div>

            <button className="group flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-gray-800 to-gray-900 hover:from-orange-500/20 hover:to-orange-600/20 border border-gray-700 hover:border-orange-500/50 rounded-2xl sm:rounded-3xl transition-all duration-300 shadow-lg hover:shadow-orange-500/20 flex-shrink-0">
              <Settings className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-gray-400 group-hover:text-orange-400 transition-colors duration-300" />
            </button>
          </div>
        </div>

     <AdminStats 
     totalDoctors = {stats.totalDoctors}
     totalAppointments = {stats.totalAppoinments}
     activeDoctors = {stats.activeDoctors}
     activeAppoinments = {stats.activeAppointments}
     />
  <DoctorsManagement/>
      
      </div>
    </div>
  );
};



export default AdminDashboardClient;
