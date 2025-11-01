'use client';

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { syncUser } from "@/lib/actions/users";

const UserSync = () => {
  const { isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    const handleUserSync = async () => {
      if (isLoaded && isSignedIn) {
        try {
          await syncUser();
        } catch (error) {
          console.error("Handle Sync User Error:", error);
        }
      }
    };

    handleUserSync();
  }, [isLoaded, isSignedIn]);

  return null;
};

export default UserSync;
