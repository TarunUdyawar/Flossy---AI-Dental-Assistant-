import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircleIcon, MailIcon, CalendarIcon, ClockIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface AppointmentConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appointmentDetails: {
    doctorName: string;
    appointmentDate: string;
    appointmentTime: string;
    userEmail: string;
  };
}

export function AppointmentConfirmationModal({
  open,
  onOpenChange,
  appointmentDetails,
}: AppointmentConfirmationModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-green-500/20 rounded-2xl backdrop-blur-sm">
        <DialogHeader className="text-center space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 shadow-lg shadow-green-500/20">
            <CheckCircleIcon className="h-8 w-8 text-green-400" />
          </div>

          <DialogTitle className="text-xl font-bold text-center bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            Appointment Confirmed!
          </DialogTitle>

          <DialogDescription className="text-center text-gray-400">
            Your appointment has been successfully booked
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Email Notification Section */}
          <div className="flex flex-col items-center space-y-3">
            <div className="relative">
              <Image
                src="/email-sent.png"
                alt="Email sent"
                width={120}
                height={120}
                className="mx-auto"
              />
            </div>

            <div className="text-center space-y-1">
              <div className="flex items-center justify-center gap-2 text-sm font-medium">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <MailIcon className="h-4 w-4 text-blue-400" />
                </div>
                <span className="text-blue-400">Details sent to your inbox</span>
              </div>
              {appointmentDetails?.userEmail && (
                <p className="text-xs text-gray-500">{appointmentDetails.userEmail}</p>
              )}
            </div>
          </div>

          {/* Appointment Summary */}
          {appointmentDetails && (
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-600/5 border border-blue-500/20 rounded-xl p-4 space-y-3 backdrop-blur-sm">
              <h4 className="font-semibold text-sm text-center mb-3 text-white">Quick Summary</h4>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm bg-gray-900/30 rounded-lg p-3 border border-gray-500/10">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <UserIcon className="h-4 w-4 text-purple-400" />
                  </div>
                  <span className="font-medium text-white">{appointmentDetails.doctorName}</span>
                </div>

                <div className="flex items-center gap-3 text-sm bg-gray-900/30 rounded-lg p-3 border border-gray-500/10">
                  <div className="p-2 bg-orange-500/20 rounded-lg">
                    <CalendarIcon className="h-4 w-4 text-orange-400" />
                  </div>
                  <span className="text-gray-300">{appointmentDetails.appointmentDate}</span>
                </div>

                <div className="flex items-center gap-3 text-sm bg-gray-900/30 rounded-lg p-3 border border-gray-500/10">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <ClockIcon className="h-4 w-4 text-green-400" />
                  </div>
                  <span className="text-gray-300">{appointmentDetails.appointmentTime}</span>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <Link href="/appointments" className="w-full">
              <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/20 transition-all duration-300 hover:scale-105">
                View My Appointments
              </Button>
            </Link>

            <Button 
              variant="outline" 
              className="w-full bg-gradient-to-br from-gray-500/10 to-gray-600/5 border border-gray-500/20 rounded-xl hover:border-blue-500/30 text-white transition-all duration-300" 
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>
          </div>

          {/* Additional Info */}
          <div className="text-center text-xs text-gray-500 border-t border-gray-500/20 pt-4">
            <p>
              Please arrive 15 minutes early for your appointment.
              <br />
              Need to reschedule? Contact us 24 hours in advance.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}