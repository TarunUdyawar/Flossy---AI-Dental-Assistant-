import React from 'react';
import { Mic, Calendar, User, Home, Crown, Clock } from 'lucide-react';
import { getUserAppointments, getUserAppointmentStats } from '@/lib/actions/appointment';
import DentalNavbar from '@/components/NavBar';
import { currentUser } from '@clerk/nextjs/server';
import { format, isAfter, isSameDay, parseISO } from "date-fns";
import Link from 'next/link';

const FlossyDashboard = async () => {
  const appointmentStats = await getUserAppointmentStats();
  const user = await currentUser();
  const appointments = await getUserAppointments();

  // Filter for upcoming CONFIRMED appointments only (today or future)
  const upcomingAppointments = appointments?.filter((appointment) => {
    const appointmentDate = parseISO(appointment.date);
    const today = new Date();
    const isUpcoming = isSameDay(appointmentDate, today) || isAfter(appointmentDate, today);
    return isUpcoming && appointment.status === "CONFIRMED";
  }) || [];

  // Get the next appointment (earliest upcoming one)
  const nextAppointment = upcomingAppointments[0];



// Define the structure for nextAppointmentData
type NextAppointmentData = {
  doctorName: string;
  service: string;
  date: string;
  day: string;
  time: string;
  status: string;
  upcomingCount: number;
};

// Initialize variable with explicit type
let nextAppointmentData: NextAppointmentData | null = null;

if (nextAppointment) {
  const appointmentDate = parseISO(nextAppointment.date);
  const formattedDate = format(appointmentDate, "EEEE, MMMM d, yyyy");
  const dayOfWeek = format(appointmentDate, "EEEE");
  const isToday = isSameDay(appointmentDate, new Date());

  nextAppointmentData = {
    doctorName: nextAppointment.doctorName,
    service: nextAppointment.service || "General Checkup",
    date: formattedDate,
    day: isToday ? "Today" : dayOfWeek,
    time: nextAppointment.time,
    status: nextAppointment.status,
    upcomingCount: upcomingAppointments.length - 1,
  };
}

  // Get member since date
  const memberSince = user?.createdAt ? format(new Date(user.createdAt), "MMM yyyy") : "N/A";

  return (
    <div className="min-h-screen bg-[#0f1117]">
      {/* Navbar */}
      <DentalNavbar />

      <main className="max-w-7xl mx-auto px-6 py-8 sm:py-12 mt-20">
        {/* Welcome Section */}
        <div className="bg-gradient-to-br from-[#1e2330] to-[#252938] rounded-2xl border-2 border-[#f97316]/30 p-6 sm:p-8 mb-8 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#f97316]/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#fb923c]/10 rounded-full blur-3xl -ml-24 -mb-24"></div>
          
          <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                <span className="text-green-400 font-medium text-sm">Online & Ready</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
                Good {new Date().getHours() < 12 ? "morning" : new Date().getHours() < 18 ? "afternoon" : "evening"}, {user?.firstName}!
              </h1>
              <p className="text-gray-400 text-base sm:text-lg">
                Your personal AI dental assistant is ready to help you maintain perfect oral health.
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="w-28 h-28 bg-gradient-to-br from-[#f97316] to-[#fb923c] rounded-full flex items-center justify-center shadow-2xl shadow-orange-500/30 text-5xl">
                🦷
              </div>
            </div>
          </div>
        </div>

        {/* Stats and Next Appointment Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Dental Health Stats Section */}
          <div className="bg-gradient-to-br from-[#1e2330] to-[#252938] rounded-2xl border border-gray-800/50 p-6 sm:p-8 shadow-xl">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-6 text-[#f97316]">🦷</div>
              <div>
                <h2 className="text-xl font-bold text-white">Your Dental Health</h2>
                <p className="text-gray-400 text-sm">Keep track of your dental care journey</p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-6">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-[#f97316] mb-2">
                  {appointmentStats.completedAppointments}
                </div>
                <div className="text-gray-400 text-xs sm:text-sm">Completed Visits</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-[#f97316] mb-2">
                  {appointmentStats.totalAppointments}
                </div>
                <div className="text-gray-400 text-xs sm:text-sm">Total Appointments</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-[#f97316] mb-2">
                  {memberSince}
                </div>
                <div className="text-gray-400 text-xs sm:text-sm">Member Since</div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-[#2a2f3f]/50 rounded-xl p-4 sm:p-6 border border-gray-800/50">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-6 h-6 text-[#f97316] flex-shrink-0 mt-1">📋</div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Ready to get started?</h3>
                  <p className="text-gray-400 text-sm">
                    Book your first appointment or try our AI voice assistant for instant dental advice.
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/voice" className="bg-gradient-to-r from-[#f97316] to-[#fb923c] text-white font-semibold px-6 py-2.5 rounded-lg hover:shadow-lg hover:shadow-orange-500/30 transition-all text-sm text-center">
                  Try AI Assistant
                </Link>
                <Link href="/appointments" className="bg-gray-800 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-gray-700 transition-all text-sm text-center">
                  Book Appointment
                </Link>
              </div>
            </div>
          </div>

          {/* Next Appointment Section */}
          <div className="bg-gradient-to-br from-[#1e2330] to-[#252938] rounded-2xl border border-gray-800/50 p-6 sm:p-8 shadow-xl">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-6 h-6 text-[#f97316]" />
              <h2 className="text-xl font-bold text-white">Next Appointment</h2>
            </div>

            {nextAppointmentData ? (
              <>
                {/* Status Badge */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-[#f97316]/20 border border-[#f97316]/30 rounded-full">
                    <div className="w-2 h-2 bg-[#f97316] rounded-full"></div>
                    <span className="text-[#f97316] text-sm font-medium">Upcoming</span>
                  </div>
                  <div className="px-3 py-1.5 bg-green-500/20 border border-green-500/30 rounded-full">
                    <span className="text-green-400 text-sm font-medium uppercase">
                      {nextAppointmentData.status}
                    </span>
                  </div>
                </div>

                {/* Appointment Details */}
                <div className="space-y-4">
                  {/* Doctor and Service */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#f97316]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-[#f97316]" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">
                        {nextAppointmentData.doctorName}
                      </div>
                      <div className="text-gray-400 text-sm">
                        {nextAppointmentData.service}
                      </div>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#f97316]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-[#f97316]" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">
                        {nextAppointmentData.date}
                      </div>
                      <div className="text-gray-400 text-sm">
                        {nextAppointmentData.day}
                      </div>
                    </div>
                  </div>

                  {/* Time */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#f97316]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-[#f97316]" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">
                        {nextAppointmentData.time}
                      </div>
                      <div className="text-gray-400 text-sm">Local time</div>
                    </div>
                  </div>
                </div>

                {/* Additional Appointments */}
                {nextAppointmentData.upcomingCount > 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-800/50">
                    <p className="text-gray-400 text-sm">
                      +{nextAppointmentData.upcomingCount} more upcoming appointment{nextAppointmentData.upcomingCount > 1 ? 's' : ''}
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8">
                <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 mb-4">No upcoming appointments</p>
                <Link href="/appointments" className="inline-block bg-gradient-to-r from-[#f97316] to-[#fb923c] text-white font-semibold px-6 py-2.5 rounded-lg hover:shadow-lg hover:shadow-orange-500/30 transition-all text-sm">
                  Schedule Now
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid sm:grid-cols-2 gap-6">
          {/* AI Voice Assistant Card */}
          <div className="bg-gradient-to-br from-[#1e2330] to-[#252938] rounded-2xl border border-gray-800/50 p-6 sm:p-8 hover:border-[#f97316]/30 transition-all shadow-xl">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-[#f97316] to-[#fb923c] rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30 flex-shrink-0">
                <Mic className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">AI Voice Assistant</h2>
                <p className="text-gray-400 text-sm sm:text-base">Get instant dental advice through voice calls</p>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#f97316] rounded-full"></div>
                <span className="text-gray-300 text-sm sm:text-base">24/7 availability</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#f97316] rounded-full"></div>
                <span className="text-gray-300 text-sm sm:text-base">Professional dental guidance</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#f97316] rounded-full"></div>
                <span className="text-gray-300 text-sm sm:text-base">Instant pain relief advice</span>
              </li>
            </ul>

            <Link href="/voice" className="block w-full bg-gradient-to-r from-[#f97316] to-[#fb923c] text-white font-semibold py-3 sm:py-4 rounded-xl hover:shadow-lg hover:shadow-orange-500/30 transition-all hover:scale-[1.02] text-center">
              <span className="flex items-center justify-center gap-2">
                <Mic className="w-5 h-5" />
                Start Voice Call
              </span>
            </Link>
          </div>

          {/* Book Appointment Card */}
          <div className="bg-gradient-to-br from-[#1e2330] to-[#252938] rounded-2xl border border-gray-800/50 p-6 sm:p-8 hover:border-[#f97316]/30 transition-all shadow-xl">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-[#f97316] to-[#fb923c] rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30 flex-shrink-0">
                <Calendar className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Book Appointment</h2>
                <p className="text-gray-400 text-sm sm:text-base">Schedule with verified dentists in your area</p>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#f97316] rounded-full"></div>
                <span className="text-gray-300 text-sm sm:text-base">Verified dental professionals</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#f97316] rounded-full"></div>
                <span className="text-gray-300 text-sm sm:text-base">Flexible scheduling</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#f97316] rounded-full"></div>
                <span className="text-gray-300 text-sm sm:text-base">Instant confirmations</span>
              </li>
            </ul>

            <Link href="/appointments" className="block w-full bg-gradient-to-r from-[#f97316] to-[#fb923c] text-white font-semibold py-3 sm:py-4 rounded-xl hover:shadow-lg hover:shadow-orange-500/30 transition-all hover:scale-[1.02] text-center">
              <span className="flex items-center justify-center gap-2">
                <Calendar className="w-5 h-5" />
                Schedule Now
              </span>
            </Link>
          </div>
        </div>

      </main>
    </div>
  );
};

export default FlossyDashboard;