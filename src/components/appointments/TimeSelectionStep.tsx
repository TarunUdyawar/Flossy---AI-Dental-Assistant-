import { useAvailableDoctors } from "@/hooks/use-doctors";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { APPOINTMENT_TYPES } from "@/lib/utils";
import DoctorInfo from "./DoctorInfo";
import { useState } from "react";

interface TimeSelectionStepProps {
  selectedDentistId: string;
  selectedDate: string;
  selectedTime: string;
  selectedType: string;
  onBack: () => void;
  onContinue: () => void;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
  onTypeChange: (type: string) => void;
}

function TimeSelectionStep({
  selectedDentistId,
  selectedDate,
  selectedTime,
  selectedType,
  onBack,
  onContinue,
  onDateChange,
  onTimeChange,
  onTypeChange,
}: TimeSelectionStepProps) {
  const [date, setDate] = useState<Date | undefined>();

  // Available time slots
  const timeSlots = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
  ];

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      onDateChange(selectedDate.toISOString());
    }
  };

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
          Select Date & Time
        </h2>
      </div>

      {/* Doctor Info */}
      <Card className="bg-gradient-to-br from-blue-500/10 to-purple-600/5 border border-blue-500/20 rounded-xl sm:rounded-2xl backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base sm:text-lg text-white">Selected Dentist</CardTitle>
        </CardHeader>
        <CardContent>
          <DoctorInfo doctorId={selectedDentistId} />
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
        {/* Calendar Section */}
        <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/20 rounded-xl sm:rounded-2xl backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg text-white flex items-center gap-2">
              <span className="text-orange-400">📅</span>
              Choose Date
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              disabled={(date) => date < new Date()}
              className="rounded-xl border border-orange-500/20 bg-gray-900/30"
            />
          </CardContent>
        </Card>

        {/* Time Slots Section */}
        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 rounded-xl sm:rounded-2xl backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg text-white flex items-center gap-2">
              <span className="text-green-400">🕐</span>
              Choose Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  className={`w-full rounded-lg sm:rounded-xl transition-all duration-300 ${
                    selectedTime === time
                      ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg shadow-green-500/20"
                      : "bg-gray-900/30 border-gray-500/20 hover:border-green-500/30 text-gray-300"
                  }`}
                  onClick={() => onTimeChange(time)}
                  disabled={!selectedDate}
                >
                  {time}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Appointment Type Section */}
      <Card className="bg-gradient-to-br from-purple-500/10 to-pink-600/5 border border-purple-500/20 rounded-xl sm:rounded-2xl backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-base sm:text-lg text-white flex items-center gap-2">
            <span className="text-purple-400">🦷</span>
            Appointment Type
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {APPOINTMENT_TYPES.map((type) => (
              <Card
                key={type.id}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 backdrop-blur-sm border rounded-xl ${
                  selectedType === type.id 
                    ? "bg-gradient-to-br from-purple-500/20 to-pink-600/10 border-purple-500/30 shadow-lg shadow-purple-500/20" 
                    : "bg-gradient-to-br from-gray-500/10 to-gray-600/5 border-gray-500/20 hover:border-purple-500/30"
                }`}
                onClick={() => onTypeChange(type.id)}
              >
                <CardContent className="p-4 space-y-2">
 
                  <h4 className="font-semibold text-sm sm:text-base text-white">{type.name}</h4>
                  <p className="text-xs sm:text-sm text-gray-400">{type.duration}</p>
                  <p className="text-base sm:text-lg font-bold text-purple-400">{type.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Continue Button */}
      {selectedDate && selectedTime && selectedType && (
        <div className="flex justify-end">
          <Button 
            onClick={onContinue} 
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl px-6 py-3 font-semibold shadow-lg shadow-blue-500/20 transition-all duration-300 hover:scale-105"
          >
            Continue to Confirmation
          </Button>
        </div>
      )}
    </div>
  );
}

export default TimeSelectionStep;