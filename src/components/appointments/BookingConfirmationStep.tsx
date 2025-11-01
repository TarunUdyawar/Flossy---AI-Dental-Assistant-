import { APPOINTMENT_TYPES } from "@/lib/utils";
import { Button } from "../ui/button";
import { ChevronLeftIcon, CalendarIcon, ClockIcon, DollarSignIcon, MapPinIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import DoctorInfo from "./DoctorInfo";

interface BookingConfirmationStepProps {
  selectedDentistId: string;
  selectedDate: string;
  selectedTime: string;
  selectedType: string;
  isBooking: boolean;
  onBack: () => void;
  onConfirm: () => void;
  onModify: () => void;
}

function BookingConfirmationStep({
  selectedDentistId,
  selectedDate,
  selectedTime,
  selectedType,
  isBooking,
  onBack,
  onConfirm,
  onModify,
}: BookingConfirmationStepProps) {
  const appointmentType = APPOINTMENT_TYPES.find((t) => t.id === selectedType);

  return (
    <div className="space-y-6">
      {/* Header with back button */}
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="bg-gradient-to-br from-gray-500/10 to-gray-600/5 border border-gray-500/20 rounded-xl hover:border-blue-500/30 transition-all duration-300"
        >
          <ChevronLeftIcon className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Confirm Your Appointment
        </h2>
      </div>

      <Card className="max-w-2xl bg-gradient-to-br from-blue-500/10 to-purple-600/5 border border-blue-500/20 rounded-xl sm:rounded-2xl backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl text-white flex items-center gap-2">
            <span className="text-blue-400">✨</span>
            Appointment Summary
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* doctor info */}
          <div className="bg-gray-900/30 rounded-xl p-4 border border-blue-500/10">
            <DoctorInfo doctorId={selectedDentistId} />
          </div>

          {/* appointment details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-600/5 border border-purple-500/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <span className="text-lg">{appointmentType?.icon}</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-400">Appointment Type</p>
              </div>
              <p className="font-semibold text-sm sm:text-base text-white">{appointmentType?.name}</p>
              <p className="text-xs text-purple-400 mt-1">{appointmentType?.duration}</p>
            </div>

            <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-orange-500/20 rounded-lg">
                  <CalendarIcon className="w-4 h-4 text-orange-400" />
                </div>
                <p className="text-xs sm:text-sm text-gray-400">Date</p>
              </div>
              <p className="font-semibold text-sm sm:text-base text-white">
                {new Date(selectedDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <ClockIcon className="w-4 h-4 text-green-400" />
                </div>
                <p className="text-xs sm:text-sm text-gray-400">Time</p>
              </div>
              <p className="font-semibold text-sm sm:text-base text-white">{selectedTime}</p>
            </div>

            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <MapPinIcon className="w-4 h-4 text-blue-400" />
                </div>
                <p className="text-xs sm:text-sm text-gray-400">Location</p>
              </div>
              <p className="font-semibold text-sm sm:text-base text-white">Dental Center</p>
            </div>

            <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border border-yellow-500/20 rounded-xl p-4 sm:col-span-2">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-yellow-500/20 rounded-lg">
                  <DollarSignIcon className="w-4 h-4 text-yellow-400" />
                </div>
                <p className="text-xs sm:text-sm text-gray-400">Cost</p>
              </div>
              <p className="font-bold text-lg sm:text-xl text-yellow-400">{appointmentType?.price}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* action buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          variant="outline" 
          onClick={onModify}
          className="bg-gradient-to-br from-gray-500/10 to-gray-600/5 border border-gray-500/20 rounded-xl hover:border-blue-500/30 text-white transition-all duration-300"
        >
          Modify Appointment
        </Button>
        <Button 
          onClick={onConfirm} 
          disabled={isBooking}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl px-6 py-3 font-semibold shadow-lg shadow-blue-500/20 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isBooking ? "Booking..." : "Confirm Booking"}
        </Button>
      </div>
    </div>
  );
}

export default BookingConfirmationStep;