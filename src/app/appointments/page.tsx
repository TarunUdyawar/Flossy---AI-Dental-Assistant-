"use client";

import { AppointmentConfirmationModal } from "@/components/appointments/AppointmentConfirmationModal";
import BookingConfirmationStep from "@/components/appointments/BookingConfirmationStep";
import DoctorSelectionStep from "@/components/appointments/DoctorSelectionStep";
import ProgressSteps from "@/components/appointments/ProgressSteps";
import TimeSelectionStep from "@/components/appointments/TimeSelectionStep";
import DentalNavbar from "@/components/NavBar";
import { useBookAppointment, useUserAppointments } from "@/hooks/use-appointments";
import { format } from "date-fns";
import { useState } from "react";

function AppointmentsPage() {
  // state management for the booking process
  const [selectedDentistId, setSelectedDentistId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [bookedAppointment, setBookedAppointment] = useState<any>(null);

  const bookAppointmentMutation = useBookAppointment();
  const { data: userAppointments = [] } = useUserAppointments();

  const handleSelectDentist = (dentistId: string) => {
    setSelectedDentistId(dentistId);
  };

  const handleBookAppointment = async () => {
    // Validation
    if (!selectedDentistId || !selectedDate || !selectedTime || !selectedType) {
      console.error("Missing required fields:", {
        selectedDentistId,
        selectedDate,
        selectedTime,
        selectedType,
      });
      return;
    }

    try {
      const appointmentData = {
        doctorId: selectedDentistId,
        date: selectedDate,
        time: selectedTime,
        reason: selectedType,
      };

      console.log("Booking appointment with data:", appointmentData);

      const result = await bookAppointmentMutation.mutateAsync(appointmentData);
      
      console.log("Appointment booked successfully:", result);

      // Store the appointment data for the modal
      setBookedAppointment(result);
      setShowConfirmationModal(true);
      
    } catch (error) {
      console.error("Failed to book appointment:", error);
      // TODO: Add toast notification for error
      alert("Failed to book appointment. Please try again.");
    }
  };

  const handleModalClose = (open: boolean) => {
    setShowConfirmationModal(open);
    
    // Reset form when modal closes
    if (!open) {
      setSelectedDentistId(null);
      setSelectedDate("");
      setSelectedTime("");
      setSelectedType("");
      setCurrentStep(1);
      setBookedAppointment(null);
    }
  };

  const handleStepTwoBack = () => {
    setCurrentStep(1);
    // Optionally clear selections when going back
    setSelectedDate("");
    setSelectedTime("");
    setSelectedType("");
  };

  return (
    <>
      <DentalNavbar />

      <div className="max-w-7xl mx-auto px-6 py-8 pt-24">
        {/* header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Book an Appointment</h1>
          <p className="text-muted-foreground">
            Find and book with verified dentists in your area
          </p>
        </div>

        <ProgressSteps currentStep={currentStep} />

        {/* Step 1: Doctor Selection */}
        {currentStep === 1 && (
          <DoctorSelectionStep
            selectedDentistId={selectedDentistId}
            onContinue={() => {
              if (selectedDentistId) {
                setCurrentStep(2);
              } else {
                alert("Please select a dentist to continue");
              }
            }}
            onSelectDentist={handleSelectDentist}
          />
        )}

        {/* Step 2: Time Selection */}
        {currentStep === 2 && selectedDentistId && (
          <TimeSelectionStep
            selectedDentistId={selectedDentistId}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            selectedType={selectedType}
            onBack={handleStepTwoBack}
            onContinue={() => {
              if (selectedDate && selectedTime && selectedType) {
                setCurrentStep(3);
              } else {
                alert("Please select date, time, and appointment type");
              }
            }}
            onDateChange={setSelectedDate}
            onTimeChange={setSelectedTime}
            onTypeChange={setSelectedType}
          />
        )}

        {/* Step 3: Confirmation */}
        {currentStep === 3 && selectedDentistId && (
          <BookingConfirmationStep
            selectedDentistId={selectedDentistId}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            selectedType={selectedType}
            isBooking={bookAppointmentMutation.isPending}
            onBack={() => setCurrentStep(2)}
            onModify={() => setCurrentStep(2)}
            onConfirm={handleBookAppointment}
          />
        )}
      </div>

      {/* Confirmation Modal */}
      {bookedAppointment && (
        <AppointmentConfirmationModal
          open={showConfirmationModal}
          onOpenChange={handleModalClose}
          appointmentDetails={{
            doctorName: bookedAppointment.doctorName || "Doctor",
            appointmentDate: bookedAppointment.date 
              ? format(new Date(bookedAppointment.date), "EEEE, MMMM d, yyyy")
              : "",
            appointmentTime: bookedAppointment.time || "",
            userEmail: bookedAppointment.patientEmail || "",
          }}
        />
      )}

      {/* Existing Appointments Section */}
      {userAppointments.length > 0 && (
        <div className="mb-8 max-w-7xl mx-auto px-6 py-8">
          <h2 className="text-xl font-semibold mb-4">Your Upcoming Appointments</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {userAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="bg-card border rounded-lg p-4 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="size-10 bg-primary/10 rounded-full flex items-center justify-center overflow-hidden">
                    <img
                      src={appointment.doctorImageUrl}
                      alt={appointment.doctorName}
                      className="size-10 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{appointment.doctorName}</p>
                    <p className="text-muted-foreground text-xs">
                      {appointment.reason}
                    </p>
                  </div>
                </div>
                <div className="space-y-1 text-sm">
                  <p className="text-muted-foreground">
                    📅 {format(new Date(appointment.date), "MMM d, yyyy")}
                  </p>
                  <p className="text-muted-foreground">🕐 {appointment.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default AppointmentsPage;