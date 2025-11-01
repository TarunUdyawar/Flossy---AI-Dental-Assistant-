import { useAvailableDoctors } from "@/hooks/use-doctors";
import Image from "next/image";
import { StarIcon } from "lucide-react";

function DoctorInfo({ doctorId }: { doctorId: string }) {
  const { data: doctors = [] } = useAvailableDoctors();
  const doctor = doctors.find((d) => d.id === doctorId);

  if (!doctor) return null;

  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        <Image
          src={doctor.imageUrl!}
          alt={doctor.name}
          width={48}
          height={48}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl object-cover ring-2 ring-blue-500/30"
        />
        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center border-2 border-gray-900">
          <StarIcon className="w-3 h-3 fill-white text-white" />
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-sm sm:text-base text-white">{doctor.name}</h3>
        <p className="text-xs sm:text-sm text-blue-400 font-medium">
          {doctor.speciality || "General Dentistry"}
        </p>
        <div className="flex items-center gap-1 mt-1">
          <StarIcon className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span className="text-xs text-gray-400">5.0 • {doctor.appointmentCount} appointments</span>
        </div>
      </div>
    </div>
  );
}

export default DoctorInfo;