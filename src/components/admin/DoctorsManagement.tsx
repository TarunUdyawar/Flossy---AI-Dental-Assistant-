import React, { useState } from "react";
import { Stethoscope, Mail, Phone, Edit, Plus, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Gender } from "@prisma/client";
import { useCreateDoctor, useGetDoctors, useUpdateDoctor } from "../../hooks/use-doctors";

const DoctorsManagement = () => {
  const { data: doctors = [], isLoading } = useGetDoctors();
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  
  const createDoctorMutation = useCreateDoctor();
  const updateDoctorMutation = useUpdateDoctor();
  
  // Form states for Add Doctor
  const [addForm, setAddForm] = useState({
    name: "",
    speciality: "",
    email: "",
    phone: "",
    gender: "MALE" as Gender,
    isActive: true,
  });

  // Form states for Edit Doctor
  const [editForm, setEditForm] = useState({
    name: "",
    speciality: "",
    email: "",
    phone: "",
    gender: "" as Gender,
    isActive: true,
  });

  const handleEditDoctor = (doctor: any) => {
    setSelectedDoctor(doctor);
    setEditForm({
      name: doctor.name,
      speciality: doctor.speciality,
      email: doctor.email,
      phone: doctor.phone,
      gender: doctor.gender,
      isActive: doctor.isActive,
    });
    setIsEditDialogOpen(true);
  };

  const handleCloseEditDoctor = () => {
    setIsEditDialogOpen(false);
    setSelectedDoctor(null);
    setEditForm({
      name: "",
      speciality: "",
      email: "",
      phone: "",
      gender: "" as Gender,
      isActive: true,
    });
  };

  const handleCloseAddDoctor = () => {
    setIsAddDialogOpen(false);
    setAddForm({
      name: "",
      speciality: "",
      email: "",
      phone: "",
      gender: "MALE",
      isActive: true,
    });
  };

  const handleAddDoctor = () => {
    createDoctorMutation.mutate({ ...addForm }, { onSuccess: handleCloseAddDoctor });
  };

  const handleSaveChanges = () => {
    if (selectedDoctor) {
      updateDoctorMutation.mutate(
        { id: selectedDoctor.id, ...editForm },
        { onSuccess: handleCloseEditDoctor }
      );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0f1117] p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Skeleton */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-7 h-7 bg-orange-500/20 rounded-lg animate-pulse" />
                <div className="h-8 w-64 bg-gray-800/50 rounded-lg animate-pulse" />
              </div>
              <div className="h-4 w-80 bg-gray-800/30 rounded animate-pulse" />
            </div>
            <div className="h-11 w-40 bg-gray-800/50 rounded-lg animate-pulse" />
          </div>

          {/* Doctor Cards Skeleton */}
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card
                key={i}
                className="bg-gradient-to-br from-[#1e2330] to-[#252938] border border-gray-800/50"
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                    {/* Avatar Skeleton */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-700/30 rounded-full animate-pulse ring-2 ring-gray-700/50" />

                    {/* Info Skeleton */}
                    <div className="flex-1 min-w-0 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="h-6 w-48 bg-gray-700/30 rounded animate-pulse" />
                        <div className="h-5 w-16 bg-gray-700/30 rounded-full animate-pulse" />
                      </div>
                      <div className="h-4 w-40 bg-gray-700/20 rounded animate-pulse" />
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                        <div className="h-4 w-52 bg-gray-700/20 rounded animate-pulse" />
                        <div className="h-4 w-36 bg-gray-700/20 rounded animate-pulse" />
                      </div>
                    </div>

                    {/* Right Section Skeleton */}
                    <div className="flex sm:flex-col items-center gap-3 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end">
                      <div className="flex flex-col items-center gap-1 px-4 py-2 bg-gray-900/50 rounded-lg border border-gray-800/50">
                        <div className="h-8 w-12 bg-gray-700/30 rounded animate-pulse" />
                        <div className="h-3 w-20 bg-gray-700/20 rounded animate-pulse" />
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="h-7 w-16 bg-gray-700/30 rounded-full animate-pulse" />
                        <div className="h-9 w-20 bg-gray-700/30 rounded animate-pulse" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Loading Indicator */}
          <div className="fixed bottom-8 right-8 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="font-medium">Loading doctors...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1117] p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Stethoscope className="w-6 h-6 sm:w-7 sm:h-7 text-orange-400" />
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                Doctors Management
              </h1>
            </div>
            <p className="text-gray-400 text-sm sm:text-base">
              Manage and oversee all doctors in your practice
            </p>
          </div>
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white gap-2 rounded-lg px-4 sm:px-6 py-2 sm:py-3 font-medium transition-all duration-300 shadow-lg hover:shadow-orange-500/20"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            Add Doctor
          </Button>
        </div>

        {/* Doctors List */}
        <div className="space-y-4">
          {doctors.map((doctor, index) => (
            <Card
              key={doctor.id || index}
              className="bg-gradient-to-br from-[#1e2330] to-[#252938] border border-gray-800/50 hover:border-gray-700/50 transition-all duration-300 shadow-xl"
            >
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                  {/* Avatar */}
                  <Avatar className="w-16 h-16 sm:w-20 sm:h-20 ring-2 ring-gray-700/50">
                    <AvatarImage src={doctor.imageUrl} alt={doctor.name} />
                    <AvatarFallback className="bg-gradient-to-br from-orange-500 to-orange-600 text-white text-lg sm:text-xl font-bold">
                      {doctor.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  {/* Doctor Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start gap-2 sm:gap-3 mb-2">
                      <h3 className="text-lg sm:text-xl font-bold text-white">
                        {doctor.name}
                      </h3>
                      <Badge
                        variant="secondary"
                        className="bg-gray-800/50 text-gray-300 border border-gray-700/50 text-xs"
                      >
                        {doctor.gender === "MALE" ? "Male" : "Female"}
                      </Badge>
                    </div>

                    <p className="text-gray-400 text-sm sm:text-base mb-3">
                      {doctor.speciality}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                      <div className="flex items-center gap-2 text-gray-500 text-xs sm:text-sm">
                        <Mail className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{doctor.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 text-xs sm:text-sm">
                        <Phone className="w-4 h-4 flex-shrink-0" />
                        <span>{doctor.phone}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Section - Stats and Actions */}
                  <div className="flex sm:flex-col items-center gap-3 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    {/* Appointments Count */}
                    <div className="flex flex-col items-center gap-1 px-4 py-2 bg-gray-900/50 rounded-lg border border-gray-800/50">
                      <span className="text-2xl sm:text-3xl font-bold text-white">
                        {doctor._count?.appointments || 0}
                      </span>
                      <span className="text-xs text-gray-400">
                        Appointments
                      </span>
                    </div>

                    {/* Status and Edit Button */}
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Badge
                        className={`${
                          doctor.isActive
                            ? "bg-green-500/10 text-green-400 border-green-500/20"
                            : "bg-gray-500/10 text-gray-400 border-gray-500/20"
                        } border px-3 py-1 text-xs sm:text-sm font-medium`}
                      >
                        {doctor.isActive ? "Active" : "Inactive"}
                      </Badge>

                      <Button
                        onClick={() => handleEditDoctor(doctor)}
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-white hover:bg-gray-800/50 gap-2 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                        <span className="hidden sm:inline">Edit</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Empty State */}
          {doctors.length === 0 && (
            <Card className="bg-gradient-to-br from-[#1e2330] to-[#252938] border border-gray-800/50">
              <CardContent className="p-12 text-center">
                <Stethoscope className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">
                  No doctors yet
                </h3>
                <p className="text-gray-500 mb-4">
                  Get started by adding your first doctor
                </p>
                <Button
                  onClick={() => setIsAddDialogOpen(true)}
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Doctor
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Add Doctor Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-[#1a1d28] border border-gray-800 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">
              Add New Doctor
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Add a new doctor to your practice.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="add-name" className="text-gray-300">
                  Name <span className="text-orange-500">*</span>
                </Label>
                <Input
                  id="add-name"
                  placeholder="Dr. John Smith"
                  value={addForm.name}
                  onChange={(e) =>
                    setAddForm({ ...addForm, name: e.target.value })
                  }
                  className="bg-[#0f1117] border-gray-700 text-white placeholder:text-gray-500 focus:border-orange-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="add-speciality" className="text-gray-300">
                  Speciality <span className="text-orange-500">*</span>
                </Label>
                <Input
                  id="add-speciality"
                  placeholder="General Dentistry"
                  value={addForm.speciality}
                  onChange={(e) =>
                    setAddForm({ ...addForm, speciality: e.target.value })
                  }
                  className="bg-[#0f1117] border-gray-700 text-white placeholder:text-gray-500 focus:border-orange-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="add-email" className="text-gray-300">
                Email <span className="text-orange-500">*</span>
              </Label>
              <Input
                id="add-email"
                type="email"
                placeholder="doctor@example.com"
                value={addForm.email}
                onChange={(e) =>
                  setAddForm({ ...addForm, email: e.target.value })
                }
                className="bg-[#0f1117] border-gray-700 text-white placeholder:text-gray-500 focus:border-orange-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="add-phone" className="text-gray-300">Phone</Label>
              <Input
                id="add-phone"
                placeholder="9876543210"
                value={addForm.phone}
                onChange={(e) => setAddForm({ ...addForm, phone: e.target.value })}
                className="bg-[#0f1117] border-gray-700 text-white placeholder:text-gray-500 focus:border-orange-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="add-gender" className="text-gray-300">Gender</Label>
                <Select
                  value={addForm.gender}
                  onValueChange={(value) =>
                    setAddForm({ ...addForm, gender: value as Gender })
                  }
                >
                  <SelectTrigger className="bg-[#0f1117] border-gray-700 text-white">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1d28] border-gray-700">
                    <SelectItem value="MALE">Male</SelectItem>
                    <SelectItem value="FEMALE">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="add-status" className="text-gray-300">Status</Label>
                <Select
                  value={addForm.isActive ? "active" : "inactive"}
                  onValueChange={(value) =>
                    setAddForm({ ...addForm, isActive: value === "active" })
                  }
                >
                  <SelectTrigger className="bg-[#0f1117] border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1d28] border-gray-700">
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button
              variant="ghost"
              onClick={handleCloseAddDoctor}
              className="text-gray-400 hover:text-white hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddDoctor}
              className="bg-orange-500 hover:bg-orange-600 text-white"
              disabled={
                !addForm.name ||
                !addForm.email ||
                !addForm.speciality ||
                createDoctorMutation.isPending
              }
            >
              {createDoctorMutation.isPending && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              {createDoctorMutation.isPending ? "Adding..." : "Add Doctor"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Doctor Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-[#1a1d28] border border-gray-800 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">
              Edit Doctor
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Update doctor information and status.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name" className="text-gray-300">Name</Label>
                <Input
                  id="edit-name"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  className="bg-[#0f1117] border-gray-700 text-white placeholder:text-gray-500 focus:border-orange-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-speciality" className="text-gray-300">Speciality</Label>
                <Input
                  id="edit-speciality"
                  value={editForm.speciality}
                  onChange={(e) =>
                    setEditForm({ ...editForm, speciality: e.target.value })
                  }
                  className="bg-[#0f1117] border-gray-700 text-white placeholder:text-gray-500 focus:border-orange-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-email" className="text-gray-300">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={editForm.email}
                onChange={(e) =>
                  setEditForm({ ...editForm, email: e.target.value })
                }
                className="bg-[#0f1117] border-gray-700 text-white placeholder:text-gray-500 focus:border-orange-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-phone" className="text-gray-300">Phone</Label>
              <Input
                id="edit-phone"
                value={editForm.phone}
                onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                placeholder="9876543210"
                className="bg-[#0f1117] border-gray-700 text-white placeholder:text-gray-500 focus:border-orange-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-gender" className="text-gray-300">Gender</Label>
                <Select
                  value={editForm.gender}
                  onValueChange={(value) =>
                    setEditForm({ ...editForm, gender: value as Gender })
                  }
                >
                  <SelectTrigger className="bg-[#0f1117] border-gray-700 text-white">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1d28] border-gray-700">
                    <SelectItem value="MALE">Male</SelectItem>
                    <SelectItem value="FEMALE">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-status" className="text-gray-300">Status</Label>
                <Select
                  value={editForm.isActive ? "active" : "inactive"}
                  onValueChange={(value) =>
                    setEditForm({ ...editForm, isActive: value === "active" })
                  }
                >
                  <SelectTrigger className="bg-[#0f1117] border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1d28] border-gray-700">
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button
              variant="ghost"
              onClick={handleCloseEditDoctor}
              className="text-gray-400 hover:text-white hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveChanges}
              className="bg-orange-500 hover:bg-orange-600 text-white"
              disabled={updateDoctorMutation.isPending}
            >
              {updateDoctorMutation.isPending && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              {updateDoctorMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DoctorsManagement;