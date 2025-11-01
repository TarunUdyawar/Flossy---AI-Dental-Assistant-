import { useAvailableDoctors } from "@/hooks/use-doctors";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { MapPinIcon, PhoneIcon, StarIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { DoctorCardsLoading } from "./DoctorCardsLoading";

interface DoctorSelectionStepProps {
  selectedDentistId: string | null;
  onSelectDentist: (dentistId: string) => void;
  onContinue: () => void;
}

function DoctorSelectionStep({
  onContinue,
  onSelectDentist,
  selectedDentistId,
}: DoctorSelectionStepProps) {
  const { data: dentists = [], isLoading } = useAvailableDoctors();

  if (isLoading)
    return (
      <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Choose Your Dentist
        </h2>
        <DoctorCardsLoading />
      </div>
    );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        Choose Your Dentist
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {dentists.map((dentist) => (
          <Card
            key={dentist.id}
            className={`cursor-pointer transition-all duration-300 hover:scale-105 backdrop-blur-sm border rounded-xl sm:rounded-2xl ${
              selectedDentistId === dentist.id 
                ? "bg-gradient-to-br from-blue-500/20 to-purple-600/10 border-blue-500/30 shadow-lg shadow-blue-500/20" 
                : "bg-gradient-to-br from-gray-500/10 to-gray-600/5 border-gray-500/20 hover:border-blue-500/30"
            }`}
            onClick={() => onSelectDentist(dentist.id)}
          >
            <CardHeader className="pb-4">
              <div className="flex items-start gap-4">
                <div className="relative">
                  <Image
                    src={dentist.imageUrl!}
                    alt={dentist.name}
                    width={64}
                    height={64}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl object-cover ring-2 ring-blue-500/20"
                  />
                  {selectedDentistId === dentist.id && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                      <StarIcon className="w-3 h-3 fill-white text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <CardTitle className="text-base sm:text-lg text-white">{dentist.name}</CardTitle>
                  <CardDescription className="text-blue-400 font-medium text-sm">
                    {dentist.speciality || "General Dentistry"}
                  </CardDescription>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1">
                      <StarIcon className="w-3 h-3 sm:w-4 sm:h-4 fill-amber-400 text-amber-400" />
                      <span className="text-xs sm:text-sm font-medium text-white">5.0</span>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-400">
                      ({dentist.appointmentCount} appointments)
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
                <MapPinIcon className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                <span>DentWise Clinic</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
                <PhoneIcon className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                <span>{dentist.phone}</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-400 line-clamp-2">
                {dentist.bio || "Experienced dental professional providing quality care."}
              </p>
              <Badge 
                variant="secondary" 
                className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-400"
              >
                Licensed Professional
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedDentistId && (
        <div className="flex justify-end">
          <Button 
            onClick={onContinue}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl px-6 py-3 font-semibold shadow-lg shadow-blue-500/20 transition-all duration-300 hover:scale-105"
          >
            Continue to Time Selection
          </Button>
        </div>
      )}
    </div>
  );
}
export default DoctorSelectionStep;