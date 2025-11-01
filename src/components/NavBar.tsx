"use client";
import React from "react";
import { Home, Calendar, Mic, Crown } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DentalNavbar() {
  const { user } = useUser();
  const pathname = usePathname();

  return (
    <nav className="bg-[#1a1d29] border-b border-gray-800 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left section - Logo and Navigation */}
          <div className="flex items-center gap-8">
            {/* Tooth Logo */}
            <Link href="/" className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-[#f97316] to-[#fb923c] rounded-lg flex items-center justify-center text-xl sm:text-2xl shadow-lg shadow-orange-500/50">
                🦷
              </div>
              <span className="text-xl sm:text-2xl font-bold tracking-tight">Flossy</span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-1">
              <NavLink 
                icon={<Home size={18} />} 
                label="Dashboard" 
                href="/dashboard" 
                active={pathname === "/dashboard"} 
              />
              <NavLink 
                icon={<Calendar size={18} />} 
                label="Appointments" 
                href="/appointments" 
                active={pathname === "/appointments"} 
              />
              <NavLink 
                icon={<Mic size={18} />} 
                label="Voice" 
                href="/voice" 
                active={pathname === "/voice"} 
              />
           
            </div>
          </div>

          {/* Right section - User Info */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <div className="text-white font-medium text-sm">
                {user?.firstName} {user?.lastName}
              </div>
              <div className="text-gray-400 text-xs">
                {user?.emailAddresses?.[0]?.emailAddress}
              </div>
            </div>
            <UserButton />
          </div>
        </div>
      </div>
    </nav>
  );
}

interface NavLinkProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
}

function NavLink({ icon, label, href, active = false }: NavLinkProps) {
  return (
    <Link href={href}>
      <button
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
          active
            ? "text-white bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30"
            : "text-gray-400 hover:text-white hover:bg-gray-800/50"
        }`}
      >
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </button>
    </Link>
  );
}